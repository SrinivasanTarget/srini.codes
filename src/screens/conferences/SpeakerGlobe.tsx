import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import Globe from 'react-globe.gl'
import * as THREE from 'three'
import {
  CONFERENCES,
  Conference,
  FLIGHT_ARC_REL_LEN,
  FLIGHT_TIME,
  HOME,
  ROUTE_ARCS,
  pointsData,
  prefersReducedMotion,
} from './data'

// Everything in this module reaches into three.js, which is why it lives
// behind a lazy import: the surrounding page is readable long before the
// WebGL bundle finishes downloading.

const FLIGHT_COLOR = ['rgba(232, 184, 152, 0)', 'rgba(255, 221, 191, 0.8)', '#ffffff']
const RING_COLOR = (t: number) => `rgba(232, 184, 152, ${Math.sqrt(Math.max(0, 1 - t))})`

// A sleek little jet that rides each flight arc, nose along +Z so
// Object3D.lookAt can steer it. Smooth lathed fuselage, swept tapered
// wings with winglets, swept tail with a copper livery fin, and twin
// underwing nacelles; cloned per flight from this shared template.
let planeTemplate: THREE.Group | null = null
const getPlaneTemplate = () => {
  if (planeTemplate) return planeTemplate

  const hull = new THREE.MeshStandardMaterial({
    color: 0xf8f5f0,
    metalness: 0.4,
    roughness: 0.35,
    emissive: 0xd4956a,
    emissiveIntensity: 0.25,
    side: THREE.DoubleSide,
  })
  const copper = new THREE.MeshStandardMaterial({
    color: 0xe8b898,
    metalness: 0.6,
    roughness: 0.3,
    emissive: 0xd4956a,
    emissiveIntensity: 0.5,
    side: THREE.DoubleSide,
  })

  const g = new THREE.Group()

  // Fuselage: smooth teardrop profile lathed around the length axis
  const profile = [
    [0.0, 1.9],
    [0.13, 1.62],
    [0.24, 1.15],
    [0.31, 0.45],
    [0.31, -0.35],
    [0.24, -1.05],
    [0.12, -1.6],
    [0.05, -1.85],
    [0.0, -1.9],
  ].map(([r, z]) => new THREE.Vector2(r, z))
  const fuselage = new THREE.Mesh(new THREE.LatheGeometry(profile, 24).rotateX(Math.PI / 2), hull)

  // Swept tapered lifting surface, drawn in plan (span +X, forward +Y),
  // then laid flat so forward maps to +Z
  const surfaceGeo = (span: number, rootChord: number, tipChord: number, sweep: number) => {
    const shape = new THREE.Shape()
    shape.moveTo(0, rootChord * 0.55)
    shape.lineTo(span, rootChord * 0.55 - sweep)
    shape.lineTo(span, rootChord * 0.55 - sweep - tipChord)
    shape.lineTo(0, -rootChord * 0.45)
    shape.closePath()
    return new THREE.ExtrudeGeometry(shape, { depth: 0.06, bevelEnabled: false }).rotateX(Math.PI / 2)
  }

  const wingR = new THREE.Mesh(surfaceGeo(1.9, 1.0, 0.28, 1.05), hull)
  wingR.position.set(0.04, -0.06, 0.35)
  const wingL = wingR.clone()
  wingL.scale.x = -1

  const wingletGeo = new THREE.BoxGeometry(0.05, 0.4, 0.26)
  const wingletR = new THREE.Mesh(wingletGeo, copper)
  wingletR.position.set(1.92, 0.12, -0.35)
  wingletR.rotation.z = -0.35
  const wingletL = wingletR.clone()
  wingletL.position.x = -1.92
  wingletL.rotation.z = 0.35

  const stabR = new THREE.Mesh(surfaceGeo(0.75, 0.5, 0.18, 0.45), hull)
  stabR.position.set(0.03, 0.02, -1.45)
  const stabL = stabR.clone()
  stabL.scale.x = -1

  // Copper tail fin: same plan shape stood upright (span up, chord along Z)
  const finGeo = surfaceGeo(0.85, 0.75, 0.3, 0.55)
  finGeo.rotateX(-Math.PI / 2) // undo the flat lay: back to plan (span +X, forward +Y)
  finGeo.applyMatrix4(
    new THREE.Matrix4().makeBasis(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(1, 0, 0)
    )
  )
  const fin = new THREE.Mesh(finGeo, copper)
  fin.position.set(0, 0.1, -1.5)

  // Twin underwing engine nacelles
  const nacelleGeo = new THREE.CylinderGeometry(0.11, 0.13, 0.55, 12).rotateX(Math.PI / 2)
  const nacelleR = new THREE.Mesh(nacelleGeo, copper)
  nacelleR.position.set(0.65, -0.22, 0.45)
  const nacelleL = nacelleR.clone()
  nacelleL.position.x = -0.65

  g.add(fuselage, wingR, wingL, wingletR, wingletL, stabR, stabL, fin, nacelleR, nacelleL)

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


export interface SpeakerGlobeHandle {
  /** Fly the camera to a destination, trailing a comet and jet behind it. */
  travelTo: (dest: { lat: number; lng: number }, altitude?: number) => void
  /** Move the camera without launching a flight. */
  pointOfView: (pov: { lat: number; lng: number; altitude: number }, ms?: number) => void
}

interface SpeakerGlobeProps {
  width: number
  height: number
  selectedConf: Conference | null
  showVirtual: boolean
  onReady: () => void
  onSelectConf: (conf: Conference) => void
}

const SpeakerGlobe = forwardRef<SpeakerGlobeHandle, SpeakerGlobeProps>(function SpeakerGlobe(
  { width, height, selectedConf, showVirtual, onReady, onSelectConf },
  ref
) {
  const [flightArcs, setFlightArcs] = useState<any[]>([])
  const [rings, setRings] = useState<any[]>([])
  const [globeReady, setGlobeReady] = useState(false)
  const globeRef = useRef<any>(null)
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

  useImperativeHandle(
    ref,
    () => ({
      travelTo,
      pointOfView: (pov, ms = 1000) => globeRef.current?.pointOfView(pov, ms),
    }),
    [travelTo]
  )

  const allArcs = useMemo(() => [...ROUTE_ARCS, ...flightArcs], [flightArcs])

  const isActiveRoute = useCallback(
    (d: any) => !d.isFlight && !showVirtual && selectedConf?.city === d.city,
    [selectedConf, showVirtual]
  )

  const arcColor = useCallback(
    (d: any) => {
      if (d.isFlight) return d.color
      return isActiveRoute(d)
        ? ['rgba(245, 158, 11, 0.9)', 'rgba(234, 179, 8, 0.55)']
        : ['rgba(245, 158, 11, 0.16)', 'rgba(234, 179, 8, 0.1)']
    },
    [isActiveRoute]
  )
  const arcStroke = useCallback(
    (d: any) => (d.isFlight ? 0.85 : isActiveRoute(d) ? 0.5 : 0.2),
    [isActiveRoute]
  )
  const arcDashLength = useCallback(
    (d: any) => (d.isFlight ? FLIGHT_ARC_REL_LEN : isActiveRoute(d) ? 0.5 : 1),
    [isActiveRoute]
  )
  const arcDashGap = useCallback(
    (d: any) => (d.isFlight ? 2 : isActiveRoute(d) ? 0.2 : 0),
    [isActiveRoute]
  )
  const arcDashAnimateTime = useCallback(
    (d: any) => (d.isFlight ? FLIGHT_TIME : isActiveRoute(d) ? 2000 : 0),
    [isActiveRoute]
  )

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

  const handlePointClick = useCallback(
    (point: any) => {
      if (point.label === 'Home Base') {
        const homeConf = CONFERENCES.find(c => c.city === HOME.city)
        if (homeConf) onSelectConf(homeConf)
        return
      }
      if (point.conf) {
        const conf = CONFERENCES.find(c => c.city === point.city)
        if (conf) onSelectConf(conf)
      }
    },
    [onSelectConf]
  )

  return (
    <Globe
      ref={globeRef}
      width={width}
      height={height}
      globeImageUrl='/globe/earth-night.webp'
      bumpImageUrl='/globe/earth-topology.webp'
      backgroundImageUrl='/globe/night-sky.webp'
      arcsData={allArcs}
      arcColor={arcColor}
      arcDashLength={arcDashLength}
      arcDashGap={arcDashGap}
      arcDashInitialGap={(d: any) => (d.isFlight ? 1 : 0)}
      arcDashAnimateTime={arcDashAnimateTime}
      arcStroke={arcStroke}
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
      onGlobeReady={() => {
        setGlobeReady(true)
        onReady()
      }}
    />
  )
})

export default SpeakerGlobe
