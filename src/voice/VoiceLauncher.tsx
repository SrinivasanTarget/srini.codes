import { lazy, Suspense, useState } from 'react'

// The panel, audio pipeline and Gemini bridge only load on first open so the
// homepage bundle stays untouched for visitors who never use the assistant.
const VoiceAssistant = lazy(() => import('./VoiceAssistant'))

/** Floating microphone button that opens the voice assistant. */
export default function VoiceLauncher() {
  const [open, setOpen] = useState(false)

  return (
    <div className='fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden'>
      {open && (
        <Suspense
          fallback={
            <div className='glass-card rounded-2xl w-[min(92vw,380px)] h-40 flex items-center justify-center text-sm text-white/60'>
              Loading assistant…
            </div>
          }
        >
          <VoiceAssistant onClose={() => setOpen(false)} />
        </Suspense>
      )}
      <button
        type='button'
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close voice assistant' : 'Ask about Srini by voice'}
        title='Ask about Srini'
        className={`group relative w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 touch-target ${
          open ? 'bg-white/10 border border-white/20' : 'bg-accent-hover hover:bg-accent shadow-glow-amber animate-pulse-glow'
        }`}
      >
        {open ? (
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' aria-hidden='true'>
            <path d='M6 9l6 6 6-6' />
          </svg>
        ) : (
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
            <rect x='9' y='3' width='6' height='11' rx='3' />
            <path d='M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8' />
          </svg>
        )}
      </button>
    </div>
  )
}
