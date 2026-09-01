import { useCallback, useEffect, useRef, useState } from 'react'
import { ensureModelContext, type ModelContextImplementation } from '../webmcp/modelContext'
import { Recorder, Player, isRecordingSupported, MAX_RECORDING_MS } from './audio'
import { answer, synthesize, transcribe, VoiceApiError } from './assistant'
import type { GeminiContent, FunctionCall } from './bridge'

type Status = 'idle' | 'listening' | 'transcribing' | 'thinking' | 'speaking'

interface Message {
  id: number
  role: 'user' | 'assistant'
  text: string
  tools?: string[]
  error?: boolean
}

const SUGGESTIONS = [
  'What books has Srini written?',
  'Where did he speak in 2025?',
  'Which open source projects does he maintain?',
  'How can I get in touch with him?',
]

const SPEAK_KEY = 'srini-voice-speak'

const readSpeakPreference = () => {
  try {
    return localStorage.getItem(SPEAK_KEY) !== 'off'
  } catch {
    return true
  }
}

interface Props {
  onClose: () => void
}

export default function VoiceAssistant({ onClose }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const [detail, setDetail] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft] = useState('')
  const [level, setLevel] = useState(0)
  const [speak, setSpeak] = useState(readSpeakPreference)
  const [webmcp, setWebmcp] = useState<{ implementation: ModelContextImplementation; tools: number } | null>(null)

  const history = useRef<GeminiContent[]>([])
  const recorder = useRef<Recorder | null>(null)
  const player = useRef<Player>(new Player())
  const abort = useRef<AbortController | null>(null)
  const timer = useRef<number>(0)
  const listRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)
  const micSupported = isRecordingSupported()

  // Show which WebMCP implementation is answering and how many tools it exposes.
  useEffect(() => {
    let cancelled = false
    const update = async () => {
      try {
        const { context, implementation } = ensureModelContext()
        const tools = await context.getTools()
        if (!cancelled) setWebmcp({ implementation, tools: tools.length })
      } catch {
        if (!cancelled) setWebmcp(null)
      }
    }
    update()
    const { context } = ensureModelContext()
    context.addEventListener('toolchange', update)
    return () => {
      cancelled = true
      context.removeEventListener('toolchange', update)
    }
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  useEffect(() => {
    const currentPlayer = player.current
    return () => {
      abort.current?.abort()
      recorder.current?.cancel()
      currentPlayer.stop()
      window.clearTimeout(timer.current)
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const push = useCallback((message: Omit<Message, 'id'>) => {
    const id = nextId.current++
    setMessages((prev) => [...prev, { ...message, id }])
    return id
  }, [])

  const patch = useCallback((id: number, changes: Partial<Message>) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...changes } : m)))
  }, [])

  const toggleSpeak = () => {
    const next = !speak
    setSpeak(next)
    try {
      localStorage.setItem(SPEAK_KEY, next ? 'on' : 'off')
    } catch {
      // Preference is a convenience only.
    }
    if (!next) {
      player.current.stop()
      if (status === 'speaking') setStatus('idle')
    }
  }

  const fail = useCallback(
    (error: unknown) => {
      if (abort.current?.signal.aborted) return
      const message =
        error instanceof VoiceApiError
          ? error.message
          : error instanceof DOMException && error.name === 'NotAllowedError'
          ? 'Microphone access was blocked. Allow the microphone or type your question instead.'
          : error instanceof Error
          ? error.message
          : String(error)
      push({ role: 'assistant', text: message, error: true })
      setStatus('idle')
      setDetail('')
    },
    [push]
  )

  /** Runs the answer + speech half of a turn for an already-known question. */
  const ask = useCallback(
    async (question: string) => {
      const controller = new AbortController()
      abort.current = controller
      push({ role: 'user', text: question })
      const assistantId = push({ role: 'assistant', text: '', tools: [] })
      setStatus('thinking')
      setDetail('Asking the site through WebMCP')
      try {
        const result = await answer(
          question,
          history.current,
          (call: FunctionCall) => {
            setDetail(`Calling ${call.name}`)
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantId ? { ...m, tools: [...(m.tools ?? []), call.name] } : m))
            )
          },
          controller.signal
        )
        history.current = result.history
        patch(assistantId, { text: result.text })
        if (speak) {
          setStatus('speaking')
          setDetail('Generating speech')
          const { audio, sampleRate } = await synthesize(result.text, controller.signal)
          if (controller.signal.aborted) return
          setDetail('')
          await player.current.play(audio, sampleRate)
        }
        setStatus('idle')
        setDetail('')
      } catch (error) {
        setMessages((prev) => prev.filter((m) => m.id !== assistantId || m.text))
        fail(error)
      }
    },
    [fail, patch, push, speak]
  )

  const submitText = (event?: React.FormEvent) => {
    event?.preventDefault()
    const question = draft.trim()
    if (!question || status !== 'idle') return
    setDraft('')
    player.current.unlock()
    ask(question)
  }

  const startListening = async () => {
    if (status !== 'idle') return
    player.current.unlock()
    player.current.stop()
    const rec = new Recorder()
    rec.onLevel = setLevel
    recorder.current = rec
    try {
      await rec.start()
    } catch (error) {
      recorder.current = null
      fail(error)
      return
    }
    setStatus('listening')
    setDetail('Tap the microphone when you are done')
    timer.current = window.setTimeout(() => void stopListening(), MAX_RECORDING_MS)
  }

  const stopListening = async () => {
    window.clearTimeout(timer.current)
    const rec = recorder.current
    recorder.current = null
    if (!rec) return
    setStatus('transcribing')
    setDetail('Transcribing with Gemini')
    const controller = new AbortController()
    abort.current = controller
    try {
      const clip = await rec.stop()
      if (clip.durationMs < 400) {
        setStatus('idle')
        setDetail('')
        return
      }
      const text = await transcribe(clip, controller.signal)
      if (!text) {
        push({ role: 'assistant', text: "I didn't catch that. Try again a little closer to the mic.", error: true })
        setStatus('idle')
        setDetail('')
        return
      }
      await ask(text)
    } catch (error) {
      fail(error)
    }
  }

  const cancelTurn = () => {
    abort.current?.abort()
    recorder.current?.cancel()
    recorder.current = null
    player.current.stop()
    window.clearTimeout(timer.current)
    setStatus('idle')
    setDetail('')
  }

  const onMicClick = () => {
    if (status === 'listening') void stopListening()
    else if (status === 'idle') void startListening()
    else cancelTurn()
  }

  const micLabel =
    status === 'listening'
      ? 'Stop recording'
      : status === 'idle'
      ? 'Ask by voice'
      : status === 'speaking'
      ? 'Stop speaking'
      : 'Cancel'

  return (
    <div
      role='dialog'
      aria-label='Voice assistant'
      className='glass-card rounded-2xl w-[min(92vw,380px)] flex flex-col overflow-hidden shadow-glass-lg'
      style={{ maxHeight: 'min(80vh, 640px)' }}
    >
      <style>{`
        @keyframes voice-pulse { 0%,100% { transform: scale(1); opacity: .45 } 50% { transform: scale(1.12); opacity: .15 } }
        @keyframes voice-dot { 0%,80%,100% { opacity: .2 } 40% { opacity: 1 } }
        .voice-dot { animation: voice-dot 1.2s infinite ease-in-out }
        .voice-dot:nth-child(2) { animation-delay: .15s }
        .voice-dot:nth-child(3) { animation-delay: .3s }
        @media (prefers-reduced-motion: reduce) { .voice-dot, .voice-ring { animation: none !important } }
      `}</style>

      {/* Header */}
      <div className='flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10'>
        <div className='min-w-0'>
          <div className='text-sm font-semibold text-white leading-tight'>Ask about Srini</div>
          <div className='text-[11px] text-white/50 leading-tight truncate'>
            Answers only from what this site says
          </div>
        </div>
        <div className='flex items-center gap-1.5'>
          {webmcp && (
            <span
              className='glass-pill text-[10px] font-mono text-accent-light px-2 py-0.5 rounded-md whitespace-nowrap'
              title={`WebMCP ${webmcp.implementation}: ${webmcp.tools} tools on document.modelContext`}
            >
              WebMCP · {webmcp.implementation} · {webmcp.tools}
            </span>
          )}
          <button
            type='button'
            onClick={toggleSpeak}
            aria-pressed={speak}
            aria-label={speak ? 'Turn spoken replies off' : 'Turn spoken replies on'}
            className='glass-button rounded-full w-8 h-8 flex items-center justify-center text-white/70 hover:text-white'
          >
            {speak ? <SpeakerIcon /> : <SpeakerOffIcon />}
          </button>
          <button
            type='button'
            onClick={onClose}
            aria-label='Close assistant'
            className='glass-button rounded-full w-8 h-8 flex items-center justify-center text-white/70 hover:text-white'
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Transcript */}
      <div ref={listRef} className='flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[180px]'>
        {messages.length === 0 && (
          <div className='space-y-3'>
            <p className='text-sm text-white/70 leading-relaxed'>
              Ask anything about Srinivasan: his books, talks, projects, writing or how to reach him. I look it
              up through the site&apos;s WebMCP tools and answer out loud.
            </p>
            <div className='flex flex-wrap gap-2'>
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type='button'
                  onClick={() => {
                    player.current.unlock()
                    ask(suggestion)
                  }}
                  disabled={status !== 'idle'}
                  className='glass-pill text-xs text-white/80 hover:text-white px-2.5 py-1.5 rounded-lg text-left disabled:opacity-50'
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message) => (
          <div key={message.id} className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
            <div
              className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                message.role === 'user'
                  ? 'bg-accent-hover/80 text-white rounded-br-md'
                  : message.error
                  ? 'bg-red-500/10 border border-red-400/30 text-red-100 rounded-bl-md'
                  : 'bg-white/[0.07] border border-white/10 text-gray-100 rounded-bl-md'
              }`}
            >
              {message.text || (
                <span className='inline-flex gap-1 items-center h-5' aria-hidden='true'>
                  <span className='voice-dot w-1.5 h-1.5 rounded-full bg-accent-light' />
                  <span className='voice-dot w-1.5 h-1.5 rounded-full bg-accent-light' />
                  <span className='voice-dot w-1.5 h-1.5 rounded-full bg-accent-light' />
                </span>
              )}
              {message.tools && message.tools.length > 0 && (
                <div className='mt-2 flex flex-wrap gap-1' aria-label='WebMCP tools used'>
                  {message.tools.map((tool, i) => (
                    <span
                      key={`${tool}-${i}`}
                      className='font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/30 border border-white/10 text-accent-light'
                    >
                      ⚙ {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Status */}
      <div className='px-4 h-6 text-[11px] text-white/50 flex items-center gap-2' aria-live='polite'>
        {status !== 'idle' && (
          <>
            <span className='w-1.5 h-1.5 rounded-full bg-accent-light animate-pulse' aria-hidden='true' />
            <span className='truncate'>
              {status === 'listening'
                ? 'Listening'
                : status === 'transcribing'
                ? 'Transcribing'
                : status === 'thinking'
                ? 'Thinking'
                : 'Speaking'}
              {detail ? ` · ${detail}` : ''}
            </span>
          </>
        )}
      </div>

      {/* Controls */}
      <form onSubmit={submitText} className='px-4 pb-4 pt-1 flex items-center gap-2'>
        <div className='relative flex-shrink-0'>
          {status === 'listening' && (
            <span
              className='voice-ring absolute inset-0 rounded-full bg-accent'
              style={{
                transform: `scale(${1 + level * 0.9})`,
                opacity: 0.25 + level * 0.3,
                transition: 'transform 80ms linear, opacity 80ms linear',
              }}
              aria-hidden='true'
            />
          )}
          <button
            type='button'
            onClick={onMicClick}
            disabled={!micSupported && status === 'idle'}
            aria-label={micLabel}
            title={micSupported ? micLabel : 'Microphone not supported here; type instead'}
            className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-colors touch-target ${
              status === 'listening'
                ? 'bg-red-500 text-white'
                : status === 'idle'
                ? 'bg-accent-hover text-white hover:bg-accent shadow-glow-amber'
                : 'bg-white/10 text-white border border-white/20'
            } disabled:opacity-40`}
          >
            {status === 'listening' ? <StopIcon /> : status === 'idle' ? <MicIcon /> : <CloseIcon />}
          </button>
        </div>
        <input
          type='text'
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={status === 'idle' ? 'Or type a question…' : 'Working…'}
          disabled={status !== 'idle'}
          aria-label='Type a question'
          className='flex-1 min-w-0 bg-white/5 border border-white/10 focus:border-accent/60 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none disabled:opacity-50'
        />
        <button
          type='submit'
          disabled={status !== 'idle' || !draft.trim()}
          aria-label='Send question'
          className='glass-button rounded-full w-10 h-10 flex items-center justify-center text-white disabled:opacity-40'
        >
          <SendIcon />
        </button>
      </form>
    </div>
  )
}

const MicIcon = () => (
  <svg width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
    <rect x='9' y='3' width='6' height='11' rx='3' />
    <path d='M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8' />
  </svg>
)

const StopIcon = () => (
  <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
    <rect x='6' y='6' width='12' height='12' rx='2' />
  </svg>
)

const CloseIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' aria-hidden='true'>
    <path d='M6 6l12 12M18 6L6 18' />
  </svg>
)

const SendIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
    <path d='M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z' />
  </svg>
)

const SpeakerIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
    <path d='M11 5L6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14' />
  </svg>
)

const SpeakerOffIcon = () => (
  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
    <path d='M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6' />
  </svg>
)
