import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { books, Book as BookData, BookLink } from '../portfolio/books'
import { useSEO, routeSEO } from '../hooks/useSEO'

const styles = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
`

const ICONS: Record<BookLink['icon'], string> = {
  book: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  cart: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z',
  external: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
}

/**
 * Renders the cover art, falling back to a typographic cover when the image
 * fails to load. Covers pulled from the publisher CDN are not vendored here.
 */
const BookCover = ({ book }: { book: BookData }) => {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className='relative w-64 sm:w-72 aspect-[2/3] rounded-lg shadow-2xl shadow-black/50 bg-gradient-to-br from-neutral-800 to-neutral-900 border border-white/10 flex flex-col justify-between p-6'>
        <p className='text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono'>
          {book.publisher}
        </p>
        <div>
          <p className='text-xl font-heading font-bold text-white leading-tight'>{book.title}</p>
          <p className='text-xs text-white/50 mt-3 leading-relaxed'>{book.subtitle}</p>
        </div>
        <p className='text-[11px] text-white/40'>{book.authors.join(' · ')}</p>
      </div>
    )
  }

  return (
    <img
      src={book.cover}
      alt={`Cover of ${book.title}`}
      onError={() => setFailed(true)}
      className='relative w-64 sm:w-72 rounded-lg shadow-2xl shadow-black/50'
      loading='lazy'
    />
  )
}

const BookSection = ({ book, index, isLoaded }: { book: BookData; index: number; isLoaded: boolean }) => {
  const isLatest = index === 0
  const delay = index * 0.15

  const stats = [
    { label: 'Publisher', value: book.publisher },
    ...(book.pages ? [{ label: 'Pages', value: String(book.pages) }] : []),
    { label: 'Released', value: book.date },
  ]

  return (
    <section
      id={book.slug}
      className={`scroll-mt-24 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      style={{ animation: isLoaded ? `fade-in-up 0.8s ease-out ${delay}s both` : 'none' }}
    >
      {/* Hero: Cover + Details */}
      <div className='flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 mb-12'>
        <div className='flex-shrink-0'>
          <div
            className='relative'
            style={{ animation: isLoaded ? 'float 6s ease-in-out infinite' : 'none' }}
          >
            <div className='absolute -inset-4 bg-white/5 rounded-2xl blur-2xl' />
            <BookCover book={book} />
          </div>
        </div>

        <div className='flex-1 text-center lg:text-left'>
          {isLatest && (
            <span className='inline-block mb-4 px-3 py-1 rounded-full bg-accent-light/10 border border-accent-light/20 text-accent-light/80 text-[10px] font-mono uppercase tracking-[0.15em]'>
              Just published
            </span>
          )}
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight'>
            {book.title}
          </h2>
          <p className='text-lg sm:text-xl text-gray-400 mb-6 leading-relaxed max-w-xl'>
            {book.subtitle}
          </p>

          <div className='mb-6'>
            <p className='text-white/70 text-sm'>
              by <span className='text-white font-medium'>{book.authors.join(', ')}</span>
            </p>
            {book.foreword && (
              <p className='text-white/50 text-sm mt-1'>
                Foreword by <span className='text-white/70'>{book.foreword.name}</span>
                <span className='text-white/40'> ({book.foreword.title})</span>
              </p>
            )}
          </div>

          {/* Stats */}
          <div className='flex flex-wrap justify-center lg:justify-start gap-4 mb-8'>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className='px-4 py-3 rounded-xl bg-white/5 border border-white/[0.06]'
              >
                <p className='text-white font-semibold text-sm'>{stat.value}</p>
                <p className='text-white/40 text-xs uppercase tracking-wider mt-0.5'>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-wrap justify-center lg:justify-start gap-3'>
            {book.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className={`px-6 py-3 rounded-lg transition-all duration-200 inline-flex items-center gap-2 font-medium text-sm ${
                  link.primary
                    ? 'bg-amber-600/80 hover:bg-amber-600'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/90'
                }`}
              >
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d={ICONS[link.icon]}
                  />
                </svg>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Blurb */}
      {book.blurb.length > 0 && (
        <div className='mb-8 space-y-4'>
          {book.blurb.map((paragraph, i) => (
            <p key={i} className='text-gray-300 leading-relaxed text-base sm:text-lg'>
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {/* What You'll Learn */}
      <h3 className='text-xl sm:text-2xl font-heading font-bold text-white mb-6'>
        What You&apos;ll Learn
      </h3>
      <div className='bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8'>
        <ul className='space-y-4'>
          {book.learnings.map((item, i) => (
            <li key={i} className='flex items-start gap-3'>
              <svg
                className='w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
              <span className='text-gray-300 leading-relaxed'>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {book.audience && (
        <div className='mt-6'>
          <h3 className='text-sm font-mono uppercase tracking-wider text-white/40 mb-2'>
            Who It&apos;s For
          </h3>
          <p className='text-gray-400 leading-relaxed'>{book.audience}</p>
        </div>
      )}

      {/* ISBN */}
      <p className='mt-8 text-center text-white/20 text-xs font-mono tracking-wider'>
        ISBN {book.isbn}
        {book.printIsbn && ` · Print ${book.printIsbn}`}
      </p>
    </section>
  )
}

const Book = () => {
  useSEO(routeSEO('/book'))

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Client-side navigation doesn't honour the hash, so deep links from the
    // site-wide banner (/book#<slug>) have to scroll themselves.
    const target = window.location.hash
      ? document.getElementById(window.location.hash.slice(1))
      : null
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)

    const timer = setTimeout(() => setIsLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

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
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            <span className='text-sm font-medium'>Back</span>
          </Link>
          <div className='text-sm text-white/40 font-mono'>BOOKS</div>
        </div>
      </nav>

      {/* Ambient background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 -left-32 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 -right-32 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl' />
      </div>

      {/* Main Content */}
      <div className='relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16'>
        <header
          className={`mb-14 text-center lg:text-left transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 leading-tight'>
            Books
          </h1>
          <p className='text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0'>
            Two books on the Model Context Protocol: one on building with it, one on breaking it.
          </p>
        </header>

        <div className='space-y-20 sm:space-y-28'>
          {books.map((book, index) => (
            <BookSection key={book.slug} book={book} index={index} isLoaded={isLoaded} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Book
