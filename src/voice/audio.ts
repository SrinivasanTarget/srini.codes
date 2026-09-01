/**
 * Microphone capture and speech playback.
 *
 * Capture uses MediaRecorder (Opus in WebM on Chromium/Firefox, AAC in MP4 on
 * Safari), then decodes and resamples the clip to 16 kHz mono 16-bit WAV in
 * the browser. WAV is the one format every Gemini audio model accepts, and
 * a 16 kHz clip keeps a 30-second question under 1 MB.
 *
 * Playback takes the raw PCM the Gemini TTS models return (16-bit little
 * endian, 24 kHz mono) and plays it through Web Audio.
 */

export interface RecordedAudio {
  base64: string
  mimeType: 'audio/wav'
  durationMs: number
}

export const MAX_RECORDING_MS = 30_000
const TARGET_SAMPLE_RATE = 16_000

const AudioContextCtor: typeof AudioContext | undefined =
  typeof window !== 'undefined'
    ? window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    : undefined

export const isRecordingSupported = () =>
  typeof navigator !== 'undefined' &&
  !!navigator.mediaDevices?.getUserMedia &&
  typeof MediaRecorder !== 'undefined' &&
  !!AudioContextCtor

const pickMimeType = () =>
  ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'].find((type) =>
    MediaRecorder.isTypeSupported(type)
  )

export class Recorder {
  private stream: MediaStream | null = null
  private recorder: MediaRecorder | null = null
  private chunks: Blob[] = []
  private meterContext: AudioContext | null = null
  private raf = 0
  private startedAt = 0
  /** Receives the microphone level (0..1) while recording, for the UI. */
  onLevel?: (level: number) => void

  async start() {
    if (!isRecordingSupported()) throw new Error('Microphone recording is not supported in this browser')
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
    })
    const mimeType = pickMimeType()
    this.chunks = []
    this.recorder = new MediaRecorder(this.stream, mimeType ? { mimeType } : undefined)
    this.recorder.ondataavailable = (event) => {
      if (event.data.size > 0) this.chunks.push(event.data)
    }
    this.recorder.start(250)
    this.startedAt = performance.now()
    this.startMeter()
  }

  get isRecording() {
    return this.recorder?.state === 'recording'
  }

  /** Stops capture and returns the clip as 16 kHz mono WAV. */
  async stop(): Promise<RecordedAudio> {
    const recorder = this.recorder
    if (!recorder) throw new Error('Not recording')
    await new Promise<void>((resolve) => {
      recorder.onstop = () => resolve()
      if (recorder.state === 'inactive') resolve()
      else recorder.stop()
    })
    const durationMs = performance.now() - this.startedAt
    const blob = new Blob(this.chunks, { type: recorder.mimeType || 'audio/webm' })
    this.release()
    if (blob.size === 0) throw new Error('No audio was captured')
    const base64 = await blobToWav16k(blob)
    return { base64, mimeType: 'audio/wav', durationMs }
  }

  cancel() {
    try {
      if (this.recorder && this.recorder.state !== 'inactive') this.recorder.stop()
    } catch {
      // Already stopped.
    }
    this.release()
  }

  private startMeter() {
    if (!this.onLevel || !AudioContextCtor || !this.stream) return
    const context = new AudioContextCtor()
    const source = context.createMediaStreamSource(this.stream)
    const analyser = context.createAnalyser()
    analyser.fftSize = 512
    source.connect(analyser)
    const samples = new Uint8Array(analyser.fftSize)
    this.meterContext = context
    const tick = () => {
      analyser.getByteTimeDomainData(samples)
      let sum = 0
      for (let i = 0; i < samples.length; i++) {
        const v = (samples[i] - 128) / 128
        sum += v * v
      }
      const rms = Math.sqrt(sum / samples.length)
      this.onLevel?.(Math.min(1, rms * 4))
      this.raf = requestAnimationFrame(tick)
    }
    this.raf = requestAnimationFrame(tick)
  }

  private release() {
    cancelAnimationFrame(this.raf)
    this.raf = 0
    this.meterContext?.close().catch(() => undefined)
    this.meterContext = null
    this.stream?.getTracks().forEach((track) => track.stop())
    this.stream = null
    this.recorder = null
    this.chunks = []
    this.onLevel?.(0)
  }
}

async function blobToWav16k(blob: Blob): Promise<string> {
  if (!AudioContextCtor) throw new Error('Web Audio is not available')
  const decoder = new AudioContextCtor()
  let decoded: AudioBuffer
  try {
    decoded = await decoder.decodeAudioData(await blob.arrayBuffer())
  } finally {
    decoder.close().catch(() => undefined)
  }
  // Downmix to mono and resample offline; OfflineAudioContext does the
  // interpolation with the browser's own resampler.
  const length = Math.max(1, Math.ceil(decoded.duration * TARGET_SAMPLE_RATE))
  const offline = new OfflineAudioContext(1, length, TARGET_SAMPLE_RATE)
  const source = offline.createBufferSource()
  source.buffer = decoded
  source.connect(offline.destination)
  source.start(0)
  const rendered = await offline.startRendering()
  return encodeWav(rendered.getChannelData(0), TARGET_SAMPLE_RATE)
}

function encodeWav(samples: Float32Array, sampleRate: number): string {
  const bytesPerSample = 2
  const buffer = new ArrayBuffer(44 + samples.length * bytesPerSample)
  const view = new DataView(buffer)
  const writeString = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i))
  }
  writeString(0, 'RIFF')
  view.setUint32(4, 36 + samples.length * bytesPerSample, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true) // PCM chunk size
  view.setUint16(20, 1, true) // PCM format
  view.setUint16(22, 1, true) // mono
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * bytesPerSample, true)
  view.setUint16(32, bytesPerSample, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, samples.length * bytesPerSample, true)
  let offset = 44
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]))
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
  }
  return bytesToBase64(new Uint8Array(buffer))
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk))
  }
  return btoa(binary)
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

/** Plays 16-bit PCM clips from the TTS model, one at a time. */
export class Player {
  private context: AudioContext | null = null
  private source: AudioBufferSourceNode | null = null

  /**
   * Browsers only let audio start from a user gesture. Call this from the
   * click that starts a turn so playback works after the async round trips.
   */
  unlock() {
    if (!AudioContextCtor) return
    this.context ??= new AudioContextCtor()
    if (this.context.state === 'suspended') this.context.resume().catch(() => undefined)
  }

  get isPlaying() {
    return this.source !== null
  }

  async play(base64: string, sampleRate: number): Promise<void> {
    this.unlock()
    const context = this.context
    if (!context) throw new Error('Web Audio is not available')
    this.stop()
    const bytes = base64ToBytes(base64)
    const frames = Math.floor(bytes.byteLength / 2)
    if (frames === 0) return
    const pcm = new Int16Array(bytes.buffer, bytes.byteOffset, frames)
    const buffer = context.createBuffer(1, frames, sampleRate)
    const channel = buffer.getChannelData(0)
    for (let i = 0; i < frames; i++) channel[i] = pcm[i] / 0x8000
    const source = context.createBufferSource()
    source.buffer = buffer
    source.connect(context.destination)
    this.source = source
    await new Promise<void>((resolve) => {
      source.onended = () => {
        if (this.source === source) this.source = null
        resolve()
      }
      source.start()
    })
  }

  stop() {
    const source = this.source
    this.source = null
    if (!source) return
    try {
      source.onended = null
      source.stop()
    } catch {
      // Already finished.
    }
  }
}
