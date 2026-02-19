import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Globe from 'react-globe.gl'

const styles = `
  @keyframes pulse-dot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
  }
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes glow-pulse {
    0%, 100% { filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.6)); }
    50% { filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.9)); }
  }
`

// Conference data with coordinates
const CONFERENCES = [
  { city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, conf: 'SeleniumConf', year: '2016' },
  { city: 'Austin', country: 'USA', lat: 30.2672, lng: -97.7431, conf: 'AppiumConf', year: '2023' },
  { city: 'Chicago', country: 'USA', lat: 41.8781, lng: -87.6298, conf: 'SeleniumConf', year: '2018' },
  { city: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, conf: 'Tech Summit', year: '2019' },
  { city: 'Colombo', country: 'Sri Lanka', lat: 6.9271, lng: 79.8612, conf: 'QA Summit', year: '2022' },
  { city: 'Dublin', country: 'Ireland', lat: 53.3498, lng: -6.2603, conf: 'SeleniumConf', year: '2017' },
  { city: 'Tallinn', country: 'Estonia', lat: 59.4370, lng: 24.7536, conf: 'Nordic Testing Days', year: '2019' },
  { city: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734, conf: 'European Testing Conf', year: '2018' },
  { city: 'Belgrade', country: 'Serbia', lat: 44.7866, lng: 20.4489, conf: 'Heapcon', year: '2019' },
  { city: 'Vilnius', country: 'Lithuania', lat: 54.6872, lng: 25.2797, conf: 'TestCon Europe', year: '2023' },
  { city: 'Budapest', country: 'Hungary', lat: 47.4979, lng: 19.0402, conf: 'Craft Conf', year: '2018' },
  { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, conf: 'Selenium Conf', year: '2024' },
  { city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869, conf: 'GIDS', year: '2023' },
  { city: 'Brussels', country: 'Belgium', lat: 50.8503, lng: 4.3517, conf: 'FOSDEM', year: '2025' },
]

// Home base (India - Bangalore)
const HOME = { city: 'Bangalore', country: 'India', lat: 12.9716, lng: 77.5946 }

// Generate arcs from home to each conference
const arcsData = CONFERENCES.map((conf, i) => ({
  startLat: HOME.lat,
  startLng: HOME.lng,
  endLat: conf.lat,
  endLng: conf.lng,
  color: [`rgba(245, 158, 11, 0.8)`, `rgba(234, 179, 8, 0.4)`],
  conf: conf.conf,
  city: conf.city,
  index: i,
}))

// Points for all locations
const pointsData = [
  { ...HOME, size: 0.8, color: '#10b981', label: 'Home Base' },
  ...CONFERENCES.map(c => ({ ...c, size: 0.5, color: '#f59e0b', label: c.conf }))
]

const Conferences = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [globeReady, setGlobeReady] = useState(false)
  const [selectedConf, setSelectedConf] = useState<typeof CONFERENCES[0] | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const globeRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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
    if (globeRef.current && globeReady) {
      // Auto-rotate
      globeRef.current.controls().autoRotate = true
      globeRef.current.controls().autoRotateSpeed = 0.5
      globeRef.current.controls().enableZoom = true

      // Set initial view to show India
      globeRef.current.pointOfView({ lat: 20, lng: 77, altitude: 2.5 }, 1000)
    }
  }, [globeReady])

  const handlePointClick = useCallback((point: any) => {
    if (point.conf) {
      const conf = CONFERENCES.find(c => c.city === point.city)
      setSelectedConf(conf || null)

      if (globeRef.current) {
        globeRef.current.pointOfView({ lat: point.lat, lng: point.lng, altitude: 1.8 }, 1000)
      }
    }
  }, [])

  const uniqueCountries = new Set(CONFERENCES.map(c => c.country)).size
  const uniqueCities = CONFERENCES.length

  return (
    <div className='min-h-screen bg-black text-white overflow-hidden'>
      <style>{styles}</style>

      {/* Navigation */}
      <nav className='fixed top-0 left-0 right-0 z-50 px-6 py-4'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          <Link
            to='/'
            className='flex items-center gap-2 text-white/60 hover:text-white transition-colors'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
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
        className='fixed inset-0'
        style={{ animation: isLoaded ? 'fade-in-up 1s ease-out forwards' : 'none' }}
      >
        {dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl='//unpkg.com/three-globe/example/img/earth-night.jpg'
            bumpImageUrl='//unpkg.com/three-globe/example/img/earth-topology.png'
            backgroundImageUrl='//unpkg.com/three-globe/example/img/night-sky.png'
            arcsData={arcsData}
            arcColor='color'
            arcDashLength={0.5}
            arcDashGap={0.2}
            arcDashAnimateTime={2000}
            arcStroke={0.5}
            arcsTransitionDuration={1000}
            pointsData={pointsData}
            pointAltitude={0.01}
            pointColor='color'
            pointRadius='size'
            pointsMerge={false}
            onPointClick={handlePointClick}
            atmosphereColor='#f59e0b'
            atmosphereAltitude={0.2}
            onGlobeReady={() => setGlobeReady(true)}
          />
        )}
      </div>

      {/* Overlay Gradient */}
      <div className='fixed inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/50' />

      {/* Stats Panel */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 p-6 z-10
          transition-all duration-700 delay-500
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        <div className='max-w-4xl mx-auto'>
          {/* Title */}
          <div className='mb-6'>
            <h1 className='text-3xl md:text-4xl font-bold mb-2'>
              <span className='bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent'>
                Conference Speaking
              </span>
            </h1>
            <p className='text-white/50 text-sm md:text-base'>
              Sharing knowledge on test automation, Appium & Selenium across the globe
            </p>
          </div>

          {/* Stats */}
          <div className='flex flex-wrap gap-6 mb-6'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center'>
                <svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
              </div>
              <div>
                <p className='text-2xl font-bold text-white'>{uniqueCountries}</p>
                <p className='text-xs text-white/40 uppercase tracking-wider'>Countries</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center'>
                <svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                </svg>
              </div>
              <div>
                <p className='text-2xl font-bold text-white'>{uniqueCities}</p>
                <p className='text-xs text-white/40 uppercase tracking-wider'>Cities</p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center'>
                <svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' />
                </svg>
              </div>
              <div>
                <p className='text-2xl font-bold text-white'>25+</p>
                <p className='text-xs text-white/40 uppercase tracking-wider'>Talks</p>
              </div>
            </div>
          </div>

          {/* Conference List */}
          <div className='flex flex-wrap gap-2'>
            {CONFERENCES.map((conf, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedConf(conf)
                  if (globeRef.current) {
                    globeRef.current.pointOfView({ lat: conf.lat, lng: conf.lng, altitude: 1.5 }, 1000)
                  }
                }}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                  ${selectedConf?.city === conf.city
                    ? 'bg-amber-500 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {conf.city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Conference Card */}
      {selectedConf && (
        <div
          className='fixed top-24 right-6 z-20 w-72 p-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10'
          style={{ animation: 'fade-in-up 0.3s ease-out forwards' }}
        >
          <div className='flex items-start justify-between mb-3'>
            <div>
              <h3 className='font-semibold text-white'>{selectedConf.city}</h3>
              <p className='text-sm text-white/50'>{selectedConf.country}</p>
            </div>
            <button
              onClick={() => setSelectedConf(null)}
              className='p-1 rounded-lg hover:bg-white/10 transition-colors'
            >
              <svg className='w-4 h-4 text-white/40' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-sm'>
              <div className='w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center'>
                <svg className='w-3 h-3 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
              </div>
              <span className='text-white/70'>{selectedConf.year}</span>
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <div className='w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center'>
                <svg className='w-3 h-3 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' />
                </svg>
              </div>
              <span className='text-white/70'>{selectedConf.conf}</span>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className='fixed top-24 left-6 z-10 space-y-2'>
        <div className='flex items-center gap-2 text-xs text-white/40'>
          <div className='w-2 h-2 rounded-full bg-emerald-400' />
          <span>Home Base</span>
        </div>
        <div className='flex items-center gap-2 text-xs text-white/40'>
          <div className='w-2 h-2 rounded-full bg-amber-400' />
          <span>Conference City</span>
        </div>
      </div>
    </div>
  )
}

export default Conferences
