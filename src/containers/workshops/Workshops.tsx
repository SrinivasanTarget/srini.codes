import NavigationArrow from '../../components/navigationArrow/NavigationArrow'
import { workshops } from '../../portfolio/workshops'

type workshop = {
  imageURL: string
  description: string
  subdescription: string
  source: string
  title: string
}

export default function Workshops() {
  const workshop: workshop = workshops[0]
  return (
    <div className='relative mx-10vw pb-16' id='blogs'>
      <div className='relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-4 mx-auto max-w-7xl'>
        <div className='col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0 mb-16'>
          <div className='space-y-2 lg:space-y-0  pl-2'>
            <h2 className='leading-tight text-3xl md:text-4xl text-white'>Workshops</h2>
            <p className='leading-tight text-3xl md:text-4xl text-gray-400'>
              Find the latest of my workshops here
            </p>
          </div>
          <NavigationArrow arrow={{ link: 'workshop', context: 'See all workshops' }} />
        </div>
        <div className='col-span-full lg:col-span-6'>
          <img
            className='h-22 w-auto flex-none object-contain'
            src={new URL(`../../assets/images/${workshop.imageURL}`, import.meta.url).href}
            decoding='async'
            loading='lazy'
            alt='workshop image'
          />
        </div>
        <div className='col-span-full block lg:hidden h-20 lg:h-24'></div>
        <div className='col-span-full lg:col-span-5 lg:col-start-8 p-3'>
          <h2 className='text-3xl font-medium md:text-3xl text-white mb-16 lg:mt-16'>
            {workshop.description}
          </h2>
          <p className='mt-4 max-w-sm h-52 leading-tight text-2xl md:text-2xl text-gray-400'>
            {workshop.subdescription}
          </p>
          <a
            className='mt-16 group relative rounded-2xl inline-flex text-lg font-inter bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
            href={workshop.source}
            target='_blank'
            rel='noreferrer'
          >
            <div className='relative flex h-full w-full items-center justify-center whitespace-nowrap text-inverse space-x-3 px-8 py-4'>
              <span>Visit</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
