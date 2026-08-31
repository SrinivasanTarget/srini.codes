import { useEffect, useState, useRef, useCallback, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useSEO, routeSEO } from '../hooks/useSEO'
import {
  CONFERENCES,
  Conference,
  HOME,
  TIMELINE,
  VIRTUAL_CONFERENCES,
  VIRTUAL_YEARS,
  prefersReducedMotion,
} from './conferences/data'
import type { SpeakerGlobeHandle } from './conferences/SpeakerGlobe'

// three.js and react-globe.gl are ~1.2MB of the route's JavaScript. Loading
// them lazily lets the heading, stats, timeline and talk cards paint straight
// away instead of sitting behind a blank screen until WebGL is ready.
const SpeakerGlobe = lazy(() => import('./conferences/SpeakerGlobe'))

const styles = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
  .fade-in-up-slow { animation: fade-in-up 1s ease-out forwards; }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .fade-in-up, .fade-in-up-slow { animation: none; }
    .speaker-map *, .speaker-map *::before, .speaker-map *::after {
      transition-duration: 0.01ms !important;
      transition-delay: 0ms !important;
    }
  }
`

const CountUp = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }
    let raf: number
    const start = performance.now()
    const duration = 1200
    const tick = (t: number) => {
      const progress = Math.min((t - start) / duration, 1)
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])

  return (
    <>
      {display}
      {suffix}
    </>
  )
}

const Conferences = () => {
  useSEO(routeSEO('/conferences'))

  const [isLoaded, setIsLoaded] = useState(false)
  const [globeReady, setGlobeReady] = useState(false)
  const [selectedConf, setSelectedConf] = useState<Conference | null>(null)
  const [showVirtual, setShowVirtual] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [showHint, setShowHint] = useState(false)
  const globeRef = useRef<SpeakerGlobeHandle>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const travelTo = useCallback((dest: { lat: number; lng: number }, altitude = 1.5) => {
    globeRef.current?.travelTo(dest, altitude)
  }, [])

  const selectConf = useCallback(
    (conf: Conference) => {
      setSelectedConf(conf)
      setShowVirtual(false)
      travelTo(conf, 1.5)
    },
    [travelTo]
  )

  const showOverview = useCallback(() => {
    setSelectedConf(null)
    setShowVirtual(false)
    globeRef.current?.pointOfView(
      { lat: 20, lng: 77, altitude: 2.5 },
      prefersReducedMotion() ? 0 : 1000
    )
  }, [])

  const openVirtual = useCallback(() => {
    setShowVirtual(true)
    setSelectedConf(null)
    travelTo(HOME, 2.0)
  }, [travelTo])

  const navigateConf = useCallback(
    (direction: 1 | -1) => {
      if (!selectedConf) return
      const index = TIMELINE.findIndex(c => c.city === selectedConf.city)
      const next = TIMELINE[(index + direction + TIMELINE.length) % TIMELINE.length]
      selectConf(next)
    },
    [selectedConf, selectConf]
  )

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!globeReady) return
    setShowHint(true)
    const timer = setTimeout(() => setShowHint(false), 6000)
    return () => clearTimeout(timer)
  }, [globeReady])

  const uniqueCountries = new Set(CONFERENCES.map(c => c.country)).size
  const uniqueCities = CONFERENCES.length

  return (
    <div className='speaker-map min-h-screen bg-black text-white overflow-hidden'>
      <style>{styles}</style>

      {/* Navigation */}
      <nav className='fixed top-0 left-0 right-0 z-50 px-6 py-4'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <Link
            to='/'
            className='flex items-center gap-2 text-white/60 hover:text-white transition-colors'
          >
            <svg aria-hidden='true' className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
            </svg>
            <span className='text-sm font-medium'>Back</span>
          </Link>
          <div className='text-sm text-white/40 font-mono'>SPEAKER MAP</div>
        </div>
      </nav>

      {/* Globe Container */}
      <div
        ref={containerRef}
        onPointerDown={() => setShowHint(false)}
        className={`fixed inset-0 ${isLoaded ? 'fade-in-up-slow' : ''}`}
      >
        {dimensions.width > 0 && (
          <Suspense fallback={null}>
            <SpeakerGlobe
              ref={globeRef}
              width={dimensions.width}
              height={dimensions.height}
              selectedConf={selectedConf}
              showVirtual={showVirtual}
              onReady={() => setGlobeReady(true)}
              onSelectConf={selectConf}
            />
          </Suspense>
        )}
      </div>

      {/* Overlay Gradient */}
      <div className='fixed inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/50' />

      {/* Globe Loading State */}
      {!globeReady && (
        <div className='fixed inset-0 z-10 flex items-center justify-center pointer-events-none'>
          <div className='flex items-center gap-3 px-4 py-2 rounded-full bg-glass-white backdrop-blur-xl border border-glass-border'>
            <div className='w-4 h-4 rounded-full border-2 border-accent-light/30 border-t-accent-light animate-spin motion-reduce:animate-none' />
            <span className='text-xs text-white/60'>Loading globe&hellip;</span>
          </div>
        </div>
      )}

      {/* Interaction Hint */}
      {showHint && (
        <div className='fade-in-up fixed top-[42%] left-1/2 -translate-x-1/2 z-10 pointer-events-none'>
          <div className='px-4 py-2 rounded-full bg-glass-white backdrop-blur-xl border border-glass-border text-xs text-white/70 whitespace-nowrap'>
            Drag to explore &middot; Click a marker
          </div>
        </div>
      )}

      {/* Stats Panel */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 p-4 sm:p-6 z-10
          transition-all duration-700 delay-500
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        <div className='max-w-4xl mx-auto'>
          {/* Title */}
          <div className='mb-4 sm:mb-6'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-1 sm:mb-2'>
              <span className='bg-gradient-to-r from-accent-light to-accent bg-clip-text text-transparent'>
                Conference Speaking
              </span>
            </h1>
            <p className='text-white/50 text-xs sm:text-sm md:text-base'>
              Sharing knowledge on test automation, Appium & Selenium across the globe
            </p>
          </div>

          {/* Stats */}
          <div className='flex flex-wrap gap-4 sm:gap-6 mb-4 sm:mb-6'>
            <div className='flex items-center gap-3'>
              <div className='hidden sm:flex w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] items-center justify-center'>
                <svg aria-hidden='true' className='w-6 h-6 text-accent-light' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <div>
                <p className='text-xl sm:text-2xl font-bold text-white'><CountUp value={uniqueCountries} /></p>
                <p className='text-xs text-white/40 uppercase tracking-wider'>Countries</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <div className='hidden sm:flex w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] items-center justify-center'>
                <svg aria-hidden='true' className='w-6 h-6 text-accent-light' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <div>
                <p className='text-xl sm:text-2xl font-bold text-white'><CountUp value={uniqueCities} /></p>
                <p className='text-xs text-white/40 uppercase tracking-wider'>Cities</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <div className='hidden sm:flex w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] items-center justify-center'>
                <svg aria-hidden='true' className='w-6 h-6 text-accent-light' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' />
                </svg>
              </div>
              <div>
                <p className='text-xl sm:text-2xl font-bold text-white'><CountUp value={CONFERENCES.length + VIRTUAL_CONFERENCES.length} suffix='+' /></p>
                <p className='text-xs text-white/40 uppercase tracking-wider'>Talks</p>
              </div>
            </div>
          </div>

          {/* Conference List */}
          <div role='group' aria-label='Conference locations' className='flex flex-nowrap sm:flex-wrap gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0'>
            {TIMELINE.map(conf => (
              <button
                key={conf.city}
                onClick={() => selectConf(conf)}
                aria-pressed={selectedConf?.city === conf.city && !showVirtual}
                className={`
                  shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                  ${selectedConf?.city === conf.city && !showVirtual
                    ? 'bg-accent-hover text-white shadow-glow-amber'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {conf.city}{' '}
                <span className={selectedConf?.city === conf.city && !showVirtual ? 'text-white/70' : 'text-white/30'}>
                  &rsquo;{conf.year.slice(2)}
                </span>
              </button>
            ))}
            <button
              onClick={() => {
                if (showVirtual) {
                  setShowVirtual(false)
                } else {
                  openVirtual()
                }
              }}
              aria-pressed={showVirtual}
              className={`
                shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 inline-flex items-center gap-1.5
                ${showVirtual
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <svg aria-hidden='true' className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' />
              </svg>
              Virtual ({VIRTUAL_CONFERENCES.length})
            </button>
          </div>
        </div>
      </div>

      {/* Selected Conference Card */}
      {selectedConf && (
        <div
          role='region'
          aria-label={`${selectedConf.city} conference details`}
          className='fade-in-up fixed top-20 right-3 left-3 sm:left-auto sm:right-6 sm:top-24 z-20 w-auto sm:w-72 p-4 rounded-2xl bg-glass-white backdrop-blur-xl border border-glass-border shadow-glass'
        >
          <div className='flex items-start justify-between mb-3'>
            <div>
              <div className='flex items-center gap-2'>
                <h2 className='font-semibold text-white'>{selectedConf.city}</h2>
                <span className='px-1.5 py-0.5 rounded-md bg-accent-muted text-accent-light text-[10px] font-mono'>
                  {selectedConf.year}
                </span>
              </div>
              <p className='text-sm text-white/50'>{selectedConf.country}</p>
            </div>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => navigateConf(-1)}
                aria-label='Previous conference'
                className='p-1 rounded-lg hover:bg-white/10 transition-colors'
              >
                <svg aria-hidden='true' className='w-4 h-4 text-white/40' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
              </button>
              <button
                onClick={() => navigateConf(1)}
                aria-label='Next conference'
                className='p-1 rounded-lg hover:bg-white/10 transition-colors'
              >
                <svg aria-hidden='true' className='w-4 h-4 text-white/40' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
              </button>
              <button
                onClick={() => setSelectedConf(null)}
                aria-label='Close conference details'
                className='p-1 rounded-lg hover:bg-white/10 transition-colors'
              >
                <svg aria-hidden='true' className='w-4 h-4 text-white/40' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-sm'>
              <div className='w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0'>
                <svg aria-hidden='true' className='w-3 h-3 text-accent-light/80' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
              </div>
              <span className='text-white/70'>{selectedConf.conf}</span>
            </div>
            <div className='flex items-start gap-2 text-sm'>
              <div className='w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5'>
                <svg aria-hidden='true' className='w-3 h-3 text-accent-light/80' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' />
                </svg>
              </div>
              <span className='text-white/50 text-xs leading-relaxed'>{selectedConf.talk}</span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {selectedConf.video && (
                <a
                  href={selectedConf.video}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full bg-accent-hover/80 hover:bg-accent-hover text-white text-xs font-medium transition-colors'
                >
                  <svg aria-hidden='true' className='w-3 h-3' fill='currentColor' viewBox='0 0 24 24'>
                    <path d='M8 5v14l11-7z' />
                  </svg>
                  <span>Watch Talk</span>
                </a>
              )}
              {selectedConf.city === HOME.city && (
                <button
                  onClick={openVirtual}
                  className='inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-medium transition-colors'
                >
                  <svg aria-hidden='true' className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' />
                  </svg>
                  <span>Virtual Talks ({VIRTUAL_CONFERENCES.length})</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Virtual Conferences Panel */}
      {showVirtual && (
        <div
          role='region'
          aria-label='Virtual conferences'
          className='fade-in-up fixed top-20 right-3 left-3 sm:left-auto sm:right-6 sm:top-24 z-20 w-auto sm:w-80 max-h-[70vh] rounded-2xl bg-glass-white backdrop-blur-xl border border-glass-border shadow-glass overflow-hidden flex flex-col'
        >
          <div className='flex items-center justify-between p-4 border-b border-white/5'>
            <div className='flex items-center gap-2'>
              <svg aria-hidden='true' className='w-4 h-4 text-emerald-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' />
              </svg>
              <h2 className='font-semibold text-white text-sm'>Virtual Conferences</h2>
              <span className='text-xs text-white/40'>{VIRTUAL_CONFERENCES.length}</span>
            </div>
            <button
              onClick={() => setShowVirtual(false)}
              aria-label='Close virtual conferences'
              className='p-1 rounded-lg hover:bg-white/10 transition-colors'
            >
              <svg aria-hidden='true' className='w-4 h-4 text-white/40' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='overflow-y-auto p-3 space-y-1.5'>
            {VIRTUAL_YEARS.map(year => (
              <div key={year}>
                <p className='px-1 pt-2 pb-1 text-[10px] font-mono text-white/30 uppercase tracking-wider'>
                  {year}
                </p>
                <div className='space-y-1.5'>
                  {VIRTUAL_CONFERENCES.filter(vc => vc.year === year).map((vc, i) => (
                    <div
                      key={i}
                      className='p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors'
                    >
                      <div className='flex items-center justify-between mb-1'>
                        <span className='text-xs font-semibold text-emerald-400/80'>{vc.conf}</span>
                        {vc.video && (
                          <a
                            href={vc.video}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-accent-light/70 hover:text-accent-light transition-colors'
                            title='Watch Talk'
                            aria-label={`Watch ${vc.talk} (opens in new tab)`}
                          >
                            <svg aria-hidden='true' className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 24 24'>
                              <path d='M8 5v14l11-7z' />
                            </svg>
                          </a>
                        )}
                      </div>
                      <p className='text-xs text-white/60 leading-relaxed'>{vc.talk}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend (interactive) */}
      <div className='hidden sm:flex flex-col items-start gap-1.5 fixed top-24 left-6 z-10'>
        <button
          onClick={() => travelTo(HOME, 1.8)}
          aria-label='Fly to home base'
          className='flex items-center gap-2 text-xs text-white/40 hover:text-white/80 transition-colors'
        >
          <div className='w-2 h-2 rounded-full bg-emerald-400' />
          <span>Home Base</span>
        </button>
        <button
          onClick={showOverview}
          aria-label='Show all in-person conferences'
          className='flex items-center gap-2 text-xs text-white/40 hover:text-white/80 transition-colors'
        >
          <div className='w-2 h-2 rounded-full bg-amber-400' />
          <span>In-Person ({CONFERENCES.length})</span>
        </button>
        <button
          onClick={openVirtual}
          aria-label='Show virtual conferences'
          className='flex items-center gap-2 text-xs text-white/40 hover:text-white/80 transition-colors'
        >
          <svg aria-hidden='true' className='w-2 h-2 text-emerald-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' />
          </svg>
          <span>Virtual ({VIRTUAL_CONFERENCES.length})</span>
        </button>
      </div>
    </div>
  )
}

export default Conferences
