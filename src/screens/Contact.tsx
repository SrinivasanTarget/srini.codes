import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/images/ProfilePic.webp'

const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-4px) rotate(0.5deg); }
  }
  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }
  @keyframes pulse-ring {
    0% { transform: scale(1); opacity: 0.4; }
    50% { transform: scale(1.05); opacity: 0.2; }
    100% { transform: scale(1); opacity: 0.4; }
  }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.15); }
    50% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.25); }
  }
  @keyframes card-enter {
    0% { transform: perspective(1000px) rotateX(20deg) translateY(100px) scale(0.9); opacity: 0; }
    100% { transform: perspective(1000px) rotateX(0deg) translateY(0) scale(1); opacity: 1; }
  }
`

const CONTACT_INFO = {
  name: 'Srinivasan Sekar',
  title: 'Director of Engineering',
  subtitle: 'Open Source Contributor',
  company: 'TestMu AI',
  email: 'srinivasan.sekar1990@gmail.com',
  phone: '+919025582170',
  website: 'https://srini.codes',
  linkedin: 'srinivasan-sekar',
  twitter: 'srinivasanskr',
  github: 'srinivasanTarget',
}

const openDeepLink = (appUrl: string, webUrl: string) => {
  const start = Date.now()
  window.location.href = appUrl
  setTimeout(() => {
    if (Date.now() - start < 2000) {
      window.location.href = webUrl
    }
  }, 1500)
}

const Contact = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    setTilt({ x: rotateX, y: rotateY })
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
    setGlare({ x: 50, y: 50, opacity: 0 })
  }, [])

  const handleSaveContact = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${CONTACT_INFO.name}
N:Sekar;Srinivasan;;;
TITLE:${CONTACT_INFO.title}
ORG:${CONTACT_INFO.company}
TEL;TYPE=CELL:${CONTACT_INFO.phone}
EMAIL:${CONTACT_INFO.email}
URL:${CONTACT_INFO.website}
X-SOCIALPROFILE;TYPE=linkedin:https://www.linkedin.com/in/${CONTACT_INFO.linkedin}
X-SOCIALPROFILE;TYPE=twitter:https://twitter.com/${CONTACT_INFO.twitter}
X-SOCIALPROFILE;TYPE=github:https://github.com/${CONTACT_INFO.github}
END:VCARD`

    const blob = new Blob([vCard], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${CONTACT_INFO.name.replace(' ', '_')}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2500)
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi ${CONTACT_INFO.name.split(' ')[0]}! I found your contact via your digital card.`)
    window.open(`https://wa.me/${CONTACT_INFO.phone.replace('+', '')}?text=${message}`, '_blank')
  }

  const handleShare = async () => {
    const shareData = {
      title: CONTACT_INFO.name,
      text: `Connect with ${CONTACT_INFO.name} - ${CONTACT_INFO.title}`,
      url: 'https://srini.codes/contact',
    }

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        // User cancelled or share failed - fallback to clipboard
        navigator.clipboard.writeText('https://srini.codes/contact')
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText('https://srini.codes/contact')
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className='min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden'>
      <style>{styles}</style>

      {/* Ambient background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 -left-32 w-64 h-64 bg-white/5 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 -right-32 w-64 h-64 bg-white/5 rounded-full blur-3xl' />
      </div>

      {/* Apple Wallet Pass */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          relative w-full max-w-[360px] cursor-default
          ${isLoaded ? '' : 'opacity-0'}
        `}
        style={{
          perspective: '1000px',
          animation: isLoaded ? 'card-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'none',
        }}
      >
        {/* Pass Card */}
        <div
          className='relative rounded-[24px] overflow-hidden transition-transform duration-200 ease-out'
          style={{
            background: 'linear-gradient(145deg, #1a1a2e 0%, #16162a 50%, #0f0f1a 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)',
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: 'preserve-3d',
        }}>

          {/* Holographic shimmer overlay */}
          <div
            className='absolute inset-0 opacity-[0.03] pointer-events-none'
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              backgroundSize: '1000px 100%',
              animation: 'shimmer 8s infinite linear',
            }}
          />

          {/* Dynamic glare effect */}
          <div
            className='absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[24px]'
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 50%)`,
            }}
          />

          {/* Pass Header */}
          <div className='relative px-6 pt-6 pb-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center'>
                  <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                </div>
                <span className='text-[11px] font-medium text-white/40 uppercase tracking-[0.2em]'>Contact Pass</span>
              </div>
              <div className='flex items-center gap-1'>
                <div className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                <span className='text-[10px] text-emerald-400/80 font-medium'>Active</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className='mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />

          {/* Main Content */}
          <div className='px-6 py-6'>
            {/* Profile Section */}
            <div className='flex items-start gap-5 mb-6'>
              {/* Avatar with glow ring */}
              <div className='relative'>
                <div
                  className='absolute -inset-1 rounded-2xl bg-gradient-to-br from-white/30 to-white/20 opacity-40 blur-sm'
                  style={{ animation: 'pulse-ring 3s ease-in-out infinite' }}
                />
                <img
                  src={heroImage}
                  alt={CONTACT_INFO.name}
                  className='relative w-[72px] h-[72px] rounded-2xl object-cover ring-1 ring-white/10'
                />
              </div>

              {/* Name & Title */}
              <div className='flex-1 pt-1'>
                <h1 className='text-[22px] font-semibold text-white tracking-tight leading-tight'>
                  {CONTACT_INFO.name}
                </h1>
                <p className='text-sm text-gray-300 font-medium mt-1'>{CONTACT_INFO.title}</p>
                <p className='text-xs text-white/40 mt-0.5'>{CONTACT_INFO.subtitle}</p>
              </div>
            </div>

            {/* Contact Fields */}
            <div className='space-y-1'>
              {[
                { icon: 'globe', label: 'Website', value: 'srini.codes', href: CONTACT_INFO.website, color: 'amber' },
                { icon: 'mail', label: 'Email', value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}`, color: 'yellow' },
                { icon: 'phone', label: 'Phone', value: '+91 902 558 2170', href: `tel:${CONTACT_INFO.phone}`, color: 'emerald' },
              ].map((item, i) => {
                const colorClasses: Record<string, { bg: string; text: string }> = {
                  amber: { bg: 'bg-white/5', text: 'text-gray-400' },
                  yellow: { bg: 'bg-white/5', text: 'text-gray-400' },
                  emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
                }
                const colors = colorClasses[item.color] || colorClasses.amber
                return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.icon === 'globe' ? '_blank' : undefined}
                  rel={item.icon === 'globe' ? 'noopener noreferrer' : undefined}
                  className='flex items-center gap-4 py-3 px-3 -mx-3 rounded-xl hover:bg-white/[0.03] transition-colors group'
                  style={{ animation: isLoaded ? `slide-up 0.4s ease-out ${0.1 + i * 0.05}s both` : 'none' }}
                >
                  <div className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center`}>
                    {item.icon === 'globe' && (
                      <svg className={`w-4 h-4 ${colors.text}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' />
                      </svg>
                    )}
                    {item.icon === 'mail' && (
                      <svg className={`w-4 h-4 ${colors.text}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
                      </svg>
                    )}
                    {item.icon === 'phone' && (
                      <svg className={`w-4 h-4 ${colors.text}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
                      </svg>
                    )}
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-[10px] text-white/30 uppercase tracking-wider font-medium'>{item.label}</p>
                    <p className='text-sm text-white/90 truncate mt-0.5 group-hover:text-white transition-colors'>{item.value}</p>
                  </div>
                  <svg className='w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                  </svg>
                </a>
                )
              })}
            </div>
          </div>

          {/* Divider with notches */}
          <div className='relative mx-6'>
            <div className='h-px bg-white/[0.06]' />
            <div className='absolute -left-6 top-1/2 -translate-y-1/2 w-3 h-6 bg-black rounded-r-full' />
            <div className='absolute -right-6 top-1/2 -translate-y-1/2 w-3 h-6 bg-black rounded-l-full' />
          </div>

          {/* Social Links */}
          <div className='px-6 py-5'>
            <div
              className='flex justify-center gap-2.5'
              style={{ animation: isLoaded ? 'slide-up 0.4s ease-out 0.3s both' : 'none' }}
            >
              {[
                { name: 'LinkedIn', action: () => openDeepLink(`linkedin://in/${CONTACT_INFO.linkedin}`, `https://www.linkedin.com/in/${CONTACT_INFO.linkedin}`), icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { name: 'X', action: () => openDeepLink(`twitter://user?screen_name=${CONTACT_INFO.twitter}`, `https://twitter.com/${CONTACT_INFO.twitter}`), icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { name: 'GitHub', action: () => window.open(`https://github.com/${CONTACT_INFO.github}`, '_blank'), icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' },
                { name: 'WhatsApp', action: handleWhatsApp, icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z', color: 'emerald' },
                { name: 'Share', action: handleShare, icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z', isStroke: true },
              ].map((social) => (
                <button
                  key={social.name}
                  onClick={social.action}
                  className={`w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.12] hover:scale-105 active:scale-95 transition-all duration-200 ${social.color === 'emerald' ? 'hover:bg-emerald-500/20 hover:border-emerald-500/30' : ''}`}
                  aria-label={social.name}
                >
                  {social.isStroke ? (
                    <svg className='w-5 h-5 text-white/50' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d={social.icon} />
                    </svg>
                  ) : (
                    <svg className={`w-5 h-5 ${social.color === 'emerald' ? 'text-emerald-400/70' : 'text-white/50'}`} fill='currentColor' viewBox='0 0 24 24'>
                      <path d={social.icon} />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Wallet Button */}
          <div className='px-6 pb-6'>
            <button
              onClick={handleSaveContact}
              disabled={saveSuccess}
              className={`
                w-full py-4 rounded-2xl font-semibold text-sm
                flex items-center justify-center gap-2.5
                transition-all duration-500 active:scale-[0.98]
                ${saveSuccess
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                  : 'bg-white text-black hover:bg-white/90'
                }
              `}
              style={{ animation: isLoaded ? 'slide-up 0.4s ease-out 0.35s both' : 'none' }}
            >
              {saveSuccess ? (
                <>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  Added to Contacts
                </>
              ) : (
                <>
                  <svg className='w-5 h-5' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z'/>
                  </svg>
                  Add to Contacts
                </>
              )}
            </button>
          </div>

          {/* Pass Footer - Barcode */}
          <div className='px-6 pb-6'>
            <div className='flex flex-col items-center gap-3'>
              <div className='flex items-end gap-[2px] h-10 opacity-30'>
                {[4,8,3,6,8,2,6,8,4,8,3,5,7,3,8,4,6,2,8,5,3,7,4,8,6,3,5,8,4,7,3,6,8,2,5,8,4].map((h, i) => (
                  <div key={i} className='w-[3px] bg-white rounded-sm' style={{ height: `${h * 4}px` }} />
                ))}
              </div>
              <p className='text-[10px] text-white/20 font-mono tracking-[0.3em]'>SRINI.CODES</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <Link
        to='/'
        className={`
          mt-8 text-xs text-white/30 hover:text-white/60 transition-colors
          flex items-center gap-2 font-medium tracking-wide
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ animation: isLoaded ? 'slide-up 0.4s ease-out 0.5s both' : 'none' }}
      >
        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
        </svg>
        View Portfolio
      </Link>
    </div>
  )
}

export default Contact
