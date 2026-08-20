import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Globe from 'react-globe.gl'
import * as THREE from 'three'
import { useSEO } from '../hooks/useSEO'

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

// Conference data with coordinates
const CONFERENCES = [
  { city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, conf: 'AppiumConf', year: '2019', talk: 'Life Cycle of an Appium Command' },
  { city: 'Austin', country: 'USA', lat: 30.2672, lng: -97.7431, conf: 'SeleniumConf', year: '2017', talk: 'Dockerize Appium Tests: Test Inside Containers', video: 'https://youtu.be/jGW6ycW_tTQ' },
  { city: 'Chicago', country: 'USA', lat: 41.8781, lng: -87.6298, conf: 'SeleniumConf', year: '2023', talk: 'Clean Code Practices for Test Automation' },
  { city: 'Colombo', country: 'Sri Lanka', lat: 6.9271, lng: 79.8612, conf: 'SLASSCOM', year: '2019', talk: 'Shift Left for Better End-User Experience' },
  { city: 'Dublin', country: 'Ireland', lat: 53.3498, lng: -6.2603, conf: 'Quest for Quality', year: '2018', talk: 'On Demand Private Appium Device Cloud using ATD' },
  { city: 'Tallinn', country: 'Estonia', lat: 59.4370, lng: 24.7536, conf: 'Nordic Testing Days', year: '2025', talk: 'Advanced Appium Workshop' },
  { city: 'Barcelona', country: 'Spain', lat: 41.3851, lng: 2.1734, conf: 'SeleniumConf', year: '2018', talk: 'Next Level Front-end Testing with DevTools & WebDriver' },
  { city: 'Belgrade', country: 'Serbia', lat: 44.7866, lng: 20.4489, conf: 'Belgrade Test Conference', year: '2018', talk: 'On Demand Private Appium Device Cloud' },
  { city: 'Vilnius', country: 'Lithuania', lat: 54.6872, lng: 25.2797, conf: 'TestCon Europe', year: '2025', talk: 'Testing Agentic AI Applications: Beyond Traditional QA' },
  { city: 'Budapest', country: 'Hungary', lat: 47.4979, lng: 19.0402, conf: 'HUSTEF', year: '2024', talk: 'Mobile App Crashes in Production: Lessons Learned' },
  { city: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, conf: 'XConf', year: '2023', talk: 'Addressing Unconscious Bias & Ethics in Testing', video: 'https://youtu.be/QMr30Za_-vM' },
  { city: 'Brussels', country: 'Belgium', lat: 50.8503, lng: 4.3517, conf: 'FOSDEM', year: '2017', talk: 'Future of Mobile Automation Testing, Appium Steals It', video: 'https://video.fosdem.org/2017/H.2213/mobile_testing_with_appium.mp4' },
  { city: 'Bangalore', country: 'India', lat: 12.9716, lng: 77.5946, conf: 'SeleniumConf & AppiumConf', year: '2018', talk: 'Code Once Test Anywhere: Appium Device Cloud using ATD' },
  { city: 'Chennai', country: 'India', lat: 13.0827, lng: 80.2707, conf: 'TechXpresso - IDFC First Bank', year: '2026', talk: 'Testing Autonomous AI Agents: Beyond Traditional QA' },
  { city: 'Goa', country: 'India', lat: 15.2993, lng: 74.1240, conf: 'NullCon', year: '2026', talk: 'Hacking with AI: MCP for Security Testing' },
  { city: 'Valencia', country: 'Spain', lat: 39.4699, lng: -0.3763, conf: 'SeleniumConf & AppiumConf', year: '2025', talk: 'Advanced Appium 2.0 Workshop', video: 'https://youtu.be/lugEm6j1Nl8' },
]

// Online/virtual conferences
const VIRTUAL_CONFERENCES = [
  { conf: 'Automation Guild', year: '2026', talk: 'Testing Autonomous AI Agents' },
  { conf: 'TestMu Conf', year: '2025', talk: 'Mastering Appium 3 & QA for AI Agents' },
  { conf: 'Spartans Summit', year: '2025', talk: 'Building & Testing AI-Agent Powered LLM Apps', video: 'https://www.youtube.com/watch?v=9mHfvGN7FwU' },
  { conf: 'SeleniumConf', year: '2024', talk: 'Harnessing Open-Source: Building a Device Farm' },
  { conf: 'AppiumConf', year: '2024', talk: 'The Performance Paradox: Mobile App Optimisation' },
  { conf: 'Spartans Summit', year: '2024', talk: 'Web Performance Metrics for Testers', video: 'https://www.youtube.com/watch?v=uo_lX1pUv9o' },
  { conf: 'TestMu Conf', year: '2023', talk: 'Building Appium 2.0 Plugin Live', video: 'https://www.youtube.com/watch?v=b6yWXfLpazc' },
  { conf: 'SeleniumConf', year: '2022', talk: 'Build Your Own Appium 2.0 Driver' },
  { conf: 'TestMu Conf', year: '2022', talk: 'Appium: Endgame & What\'s Next?' },
  { conf: 'Automation Guild', year: '2022', talk: 'Testing Containers & k8s Manifests' },
  { conf: 'Worqference', year: '2022', talk: 'Automate Mobile Gestures Using Appium' },
  { conf: 'Agile India', year: '2022', talk: 'Speed Matters: Client Side Performance' },
  { conf: 'VodQA', year: '2022', talk: 'Build Appium 2.0 Plugins Workshop' },
  { conf: 'AppiumConf', year: '2021', talk: 'Build Your Own Appium Plugin' },
  { conf: 'Agile India', year: '2021', talk: 'Testing Service Mesh & k8s Manifests' },
  { conf: 'Automation Guild', year: '2021', talk: 'Consumer Driven Contracts' },
  { conf: 'Future of Testing: Mobile', year: '2021', talk: 'Appium 2.0: What\'s Next' },
  { conf: 'SeleniumConf', year: '2020', talk: 'Advanced Appium Workshop' },
]

// Home base (India - Bangalore)
const HOME = { city: 'Bangalore', country: 'India', lat: 12.9716, lng: 77.5946 }

// Chips and card navigation walk the talks in chronological order
const TIMELINE = [...CONFERENCES].sort(
  (a, b) => Number(a.year) - Number(b.year) || a.city.localeCompare(b.city)
)

const VIRTUAL_YEARS = [...new Set(VIRTUAL_CONFERENCES.map(vc => vc.year))].sort(
  (a, b) => Number(b) - Number(a)
)

// Generate arcs from home to each conference
const ROUTE_ARCS = CONFERENCES.map((conf, i) => ({
  startLat: HOME.lat,
  startLng: HOME.lng,
  endLat: conf.lat,
  endLng: conf.lng,
  color: [`rgba(245, 158, 11, 0.8)`, `rgba(234, 179, 8, 0.4)`],
  conf: conf.conf,
  city: conf.city,
  index: i,
}))

// Flight animation: a one-shot comet travels the great circle between stops,
// paced so the dash head lands exactly when the camera arrives. The dash
// geometry (0.4 dash / 2 gap / 1 initial gap over one FLIGHT_TIME cycle)
// makes a single pulse traverse the arc in FLIGHT_TIME and fully exit by 2x.
const FLIGHT_TIME = 1500
const FLIGHT_ARC_REL_LEN = 0.4
const FLIGHT_COLOR = ['rgba(232, 184, 152, 0)', 'rgba(255, 221, 191, 0.8)', '#ffffff']
const RING_COLOR = (t: number) => `rgba(232, 184, 152, ${Math.sqrt(Math.max(0, 1 - t))})`

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// A tiny stylized airplane that rides each flight arc, nose along the path.
// Geometry points down +Z so Object3D.lookAt can steer it.
let planeTemplate: THREE.Group | null = null
const getPlaneTemplate = () => {
  if (planeTemplate) return planeTemplate
  const hull = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: 0xd4956a,
    emissiveIntensity: 0.7,
  })
  const trim = new THREE.MeshLambertMaterial({
    color: 0xe8b898,
    emissive: 0xd4956a,
    emissiveIntensity: 0.6,
  })
  const g = new THREE.Group()
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.18, 2.2, 8).rotateX(Math.PI / 2), hull)
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.8, 8).rotateX(Math.PI / 2), hull)
  nose.position.z = 1.5
  const wings = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 0.8), trim)
  wings.position.z = 0.15
  const tailplane = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.06, 0.45), trim)
  tailplane.position.z = -1.0
  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.5), trim)
  fin.position.set(0, 0.3, -1.0)
  g.add(body, nose, wings, tailplane, fin)

  // Soft additive halo so the plane reads clearly over any part of the globe
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255, 242, 230, 0.9)')
    grad.addColorStop(0.4, 'rgba(232, 184, 152, 0.35)')
    grad.addColorStop(1, 'rgba(232, 184, 152, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
    const halo = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(canvas),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
      })
    )
    halo.scale.setScalar(4.5)
    g.add(halo)
  }

  planeTemplate = g
  return planeTemplate
}

const latLngToUnit = (lat: number, lng: number) => {
  const phi = (lat * Math.PI) / 180
  const theta = (lng * Math.PI) / 180
  return new THREE.Vector3(Math.cos(phi) * Math.cos(theta), Math.cos(phi) * Math.sin(theta), Math.sin(phi))
}

const angularDistance = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) =>
  latLngToUnit(a.lat, a.lng).angleTo(latLngToUnit(b.lat, b.lng))

const slerpLatLng = (a: { lat: number; lng: number }, b: { lat: number; lng: number }, t: number) => {
  const u = latLngToUnit(a.lat, a.lng)
  const v = latLngToUnit(b.lat, b.lng)
  const angle = u.angleTo(v)
  if (angle === 0) return { lat: a.lat, lng: a.lng }
  const w = u
    .multiplyScalar(Math.sin((1 - t) * angle))
    .add(v.multiplyScalar(Math.sin(t * angle)))
    .divideScalar(Math.sin(angle))
  return {
    lat: (Math.asin(w.z) * 180) / Math.PI,
    lng: (Math.atan2(w.y, w.x) * 180) / Math.PI,
  }
}

// Points for all locations
const pointsData = [
  { ...HOME, size: 0.8, color: '#10b981', label: 'Home Base' },
  ...CONFERENCES.map(c => ({ ...c, size: 0.5, color: '#f59e0b', label: c.conf }))
]

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
  useSEO({
    title: 'Conference Talks & Speaker Map \u2014 Srinivasan Sekar',
    description:
      '34+ conference talks across 12 countries and 16 cities, plus 18 virtual events \u2014 an interactive speaker map of talks on Appium, Selenium, MCP, AI agents, and test automation by Srinivasan Sekar.',
    path: '/conferences',
  })

  const [isLoaded, setIsLoaded] = useState(false)
  const [globeReady, setGlobeReady] = useState(false)
  const [selectedConf, setSelectedConf] = useState<typeof CONFERENCES[0] | null>(null)
  const [showVirtual, setShowVirtual] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [showHint, setShowHint] = useState(false)
  const [flightArcs, setFlightArcs] = useState<any[]>([])
  const [rings, setRings] = useState<any[]>([])
  const globeRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lastLocationRef = useRef<{ lat: number; lng: number }>(HOME)
  const flightIdRef = useRef(0)
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timeoutsRef.current.delete(id)
      fn()
    }, ms)
    timeoutsRef.current.add(id)
  }, [])

  useEffect(() => {
    const timeouts = timeoutsRef.current
    return () => timeouts.forEach(clearTimeout)
  }, [])

  const planesRef = useRef<Map<number, { obj: THREE.Object3D; curve: THREE.CubicBezierCurve3; start: number }>>(
    new Map()
  )
  const planeRafRef = useRef(0)

  const stepPlanes = useCallback(() => {
    const planes = planesRef.current
    const now = performance.now()
    planes.forEach((flight, id) => {
      const t = (now - flight.start) / FLIGHT_TIME
      if (t >= 1) {
        flight.obj.parent?.remove(flight.obj)
        planes.delete(id)
        return
      }
      const pos = flight.curve.getPointAt(Math.max(0, t))
      const tangent = flight.curve.getTangentAt(Math.max(0, t))
      flight.obj.position.copy(pos)
      flight.obj.up.copy(pos.clone().normalize())
      flight.obj.lookAt(pos.clone().add(tangent))
      // Grow through climb-out, shrink into the landing ripple
      const phase = t < 0.12 ? 0.5 + (0.5 * t) / 0.12 : t > 0.88 ? 0.5 + (0.5 * (1 - t)) / 0.12 : 1
      flight.obj.scale.setScalar(3 * phase)
    })
    planeRafRef.current = planes.size ? requestAnimationFrame(stepPlanes) : 0
  }, [])

  useEffect(() => {
    const planes = planesRef.current
    return () => {
      if (planeRafRef.current) cancelAnimationFrame(planeRafRef.current)
      planes.forEach(f => f.obj.parent?.remove(f.obj))
      planes.clear()
    }
  }, [])

  // Rebuild the exact cubic bezier three-globe uses for the flight arc, so
  // the plane rides precisely on the drawn line (control points at 25%/75%
  // of the great circle, lifted to 1.5x the arc's peak altitude).
  const addPlane = useCallback(
    (from: { lat: number; lng: number }, to: { lat: number; lng: number }, id: number) => {
      const globe = globeRef.current
      if (!globe) return
      const peakAlt = (angularDistance(from, to) / 2) * 0.6
      const cpAlt = peakAlt * 1.5
      const point = (lat: number, lng: number, alt: number) => {
        const { x, y, z } = globe.getCoords(lat, lng, alt)
        return new THREE.Vector3(x, y, z)
      }
      const m1 = slerpLatLng(from, to, 0.25)
      const m2 = slerpLatLng(from, to, 0.75)
      const curve = new THREE.CubicBezierCurve3(
        point(from.lat, from.lng, 0),
        point(m1.lat, m1.lng, cpAlt),
        point(m2.lat, m2.lng, cpAlt),
        point(to.lat, to.lng, 0)
      )
      const obj = getPlaneTemplate().clone()
      obj.scale.setScalar(3)
      globe.scene().add(obj)
      planesRef.current.set(id, { obj, curve, start: performance.now() })
      if (!planeRafRef.current) planeRafRef.current = requestAnimationFrame(stepPlanes)
    },
    [stepPlanes]
  )

  const emitRing = useCallback(
    (lat: number, lng: number, key: string) => {
      const ring = { lat, lng, key }
      setRings(prev => [...prev, ring])
      schedule(() => setRings(prev => prev.filter(r => r !== ring)), FLIGHT_TIME * FLIGHT_ARC_REL_LEN)
    },
    [schedule]
  )

  const launchFlight = useCallback(
    (
      from: { lat: number; lng: number },
      to: { lat: number; lng: number },
      { takeoffRing = true } = {}
    ) => {
      if (prefersReducedMotion()) return false
      if (from.lat === to.lat && from.lng === to.lng) return false
      const id = ++flightIdRef.current
      const arc = {
        id,
        isFlight: true,
        startLat: from.lat,
        startLng: from.lng,
        endLat: to.lat,
        endLng: to.lng,
        color: FLIGHT_COLOR,
      }
      setFlightArcs(prev => [...prev, arc])
      schedule(() => setFlightArcs(prev => prev.filter(a => a.id !== id)), FLIGHT_TIME * 2)
      addPlane(from, to, id)
      if (takeoffRing) emitRing(from.lat, from.lng, `takeoff-${id}`)
      schedule(() => emitRing(to.lat, to.lng, `landing-${id}`), FLIGHT_TIME)
      return true
    },
    [schedule, emitRing, addPlane]
  )

  const travelTo = useCallback(
    (dest: { lat: number; lng: number }, altitude = 1.5) => {
      const from = lastLocationRef.current
      const flew = launchFlight(from, dest)
      lastLocationRef.current = dest
      if (globeRef.current) {
        const duration = prefersReducedMotion() ? 0 : flew ? FLIGHT_TIME : 1000
        globeRef.current.pointOfView({ lat: dest.lat, lng: dest.lng, altitude }, duration)
      }
    },
    [launchFlight]
  )

  const selectConf = useCallback(
    (conf: typeof CONFERENCES[0]) => {
      setSelectedConf(conf)
      setShowVirtual(false)
      travelTo(conf, 1.5)
    },
    [travelTo]
  )

  const showOverview = useCallback(() => {
    setSelectedConf(null)
    setShowVirtual(false)
    if (globeRef.current) {
      globeRef.current.pointOfView(
        { lat: 20, lng: 77, altitude: 2.5 },
        prefersReducedMotion() ? 0 : 1000
      )
    }
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

  const allArcs = useMemo(() => [...ROUTE_ARCS, ...flightArcs], [flightArcs])

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

  useEffect(() => {
    if (!globeReady) return
    setShowHint(true)
    const timer = setTimeout(() => setShowHint(false), 6000)
    return () => clearTimeout(timer)
  }, [globeReady])

  // Entrance: once the camera settles, a wave of comets fans out from home
  // along every route, each landing with a ripple at its city.
  const introPlayedRef = useRef(false)
  useEffect(() => {
    if (!globeReady || introPlayedRef.current) return
    introPlayedRef.current = true
    if (prefersReducedMotion()) return
    schedule(() => {
      emitRing(HOME.lat, HOME.lng, 'intro-takeoff')
      ROUTE_ARCS.forEach((arc, i) => {
        schedule(
          () => launchFlight(HOME, { lat: arc.endLat, lng: arc.endLng }, { takeoffRing: false }),
          i * 120
        )
      })
    }, 1200)
  }, [globeReady, schedule, emitRing, launchFlight])

  const handlePointClick = useCallback((point: any) => {
    if (point.label === 'Home Base') {
      const homeConf = CONFERENCES.find(c => c.city === HOME.city)
      if (homeConf) selectConf(homeConf)
      return
    }
    if (point.conf) {
      const conf = CONFERENCES.find(c => c.city === point.city)
      if (conf) selectConf(conf)
    }
  }, [selectConf])

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
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            globeImageUrl='/globe/earth-night.jpg'
            bumpImageUrl='/globe/earth-topology.png'
            backgroundImageUrl='/globe/night-sky.png'
            arcsData={allArcs}
            arcColor='color'
            arcDashLength={(d: any) => (d.isFlight ? FLIGHT_ARC_REL_LEN : 0.5)}
            arcDashGap={(d: any) => (d.isFlight ? 2 : 0.2)}
            arcDashInitialGap={(d: any) => (d.isFlight ? 1 : 0)}
            arcDashAnimateTime={(d: any) => (d.isFlight ? FLIGHT_TIME : 2000)}
            arcStroke={(d: any) => (d.isFlight ? 0.85 : 0.5)}
            arcAltitudeAutoScale={(d: any) => (d.isFlight ? 0.6 : 0.5)}
            arcsTransitionDuration={0}
            ringsData={rings}
            ringColor={() => RING_COLOR}
            ringMaxRadius={4}
            ringPropagationSpeed={3}
            ringRepeatPeriod={(FLIGHT_TIME * FLIGHT_ARC_REL_LEN) / 3}
            pointsData={pointsData}
            pointAltitude={0.01}
            pointColor='color'
            pointRadius='size'
            pointsMerge={false}
            pointLabel={(p: any) =>
              p.label === 'Home Base'
                ? 'Home Base &middot; Bangalore'
                : `${p.conf} &middot; ${p.city} &middot; ${p.year}`
            }
            onPointClick={handlePointClick}
            atmosphereColor='#f59e0b'
            atmosphereAltitude={0.2}
            onGlobeReady={() => setGlobeReady(true)}
          />
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
