import { Link } from 'react-router-dom'

const presentations = [
  {
    title: 'Advanced Appium Workshop with MCP-Powered Development Tools',
    event: 'Selenium Conf 2026',
    url: '/presentations/advanced-appium-workshop.html',
    tags: ['Appium', 'MCP', 'Workshop'],
  },
]

export default function Presentations() {
  return (
    <div className='bg-black text-white min-h-screen'>
      {/* Navigation */}
      <nav className='glass-nav sticky top-0 w-full z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between'>
          <Link
            to='/'
            className='text-2xl sm:text-3xl font-signature text-accent-light'
            style={{ WebkitFontSmoothing: 'antialiased' }}
          >
            Srinivasan Sekar
          </Link>
          <Link
            to='/'
            className='text-sm text-white/60 hover:text-white transition-colors'
          >
            &larr; Back to Portfolio
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24'>
        <h1 className='text-4xl sm:text-5xl font-heading font-bold mb-4'>
          Presentations
        </h1>
        <p className='text-white/60 text-lg mb-12 max-w-2xl'>
          Workshop slides and presentation decks from conferences and events.
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {presentations.map((pres) => (
            <a
              key={pres.title}
              href={pres.url}
              target='_blank'
              rel='noopener noreferrer'
              className='group glass-card-hover rounded-2xl p-6 border border-white/10 hover:border-accent/40 transition-all duration-300 block'
            >
              {/* Icon */}
              <div className='w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors'>
                <svg
                  className='w-6 h-6 text-accent-light'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5'
                  />
                </svg>
              </div>

              {/* Title */}
              <h2 className='text-lg font-semibold text-white group-hover:text-accent-light transition-colors mb-3 leading-snug'>
                {pres.title}
              </h2>

              {/* Event */}
              <p className='text-sm text-white/50 mb-4'>{pres.event}</p>

              {/* Tags */}
              <div className='flex flex-wrap gap-2'>
                {pres.tags.map((tag) => (
                  <span
                    key={tag}
                    className='text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/10'
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className='mt-5 flex items-center gap-1.5 text-sm text-accent-light/70 group-hover:text-accent-light transition-colors'>
                <span>View Slides</span>
                <svg
                  className='w-4 h-4 transform group-hover:translate-x-1 transition-transform'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 7l5 5m0 0l-5 5m5-5H6'
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
