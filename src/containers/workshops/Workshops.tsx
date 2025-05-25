// NavigationArrow import removed
import { workshops } from '../../portfolio/workshops'

type WorkshopDetails = { // Renamed type for clarity
  imageURL: string
  description: string
  subdescription: string
  source: string
  title: string
}

export default function Workshops() {
  // This component currently displays only the first workshop.
  // To display all workshops, a mapping function and likely the WorkshopCard component would be needed.
  const workshop: WorkshopDetails | undefined = workshops[0]; 

  if (!workshop) {
    return (
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center' id='workshops'>
        <h2 className='text-3xl md:text-4xl font-bold text-custom-highlight'>Workshops</h2>
        <p className='text-lg md:text-xl text-custom-gray-medium mt-4'>No workshops available at the moment.</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8' id='workshops'> {/* Updated id and container class */}
      <div className='text-center mb-12 md:mb-16'> {/* Centered title */}
        <h2 className='leading-tight text-3xl md:text-4xl font-bold text-custom-highlight'>Featured Workshop</h2>
        <p className='leading-tight text-lg md:text-xl text-custom-gray-medium mt-2'>
          Explore my latest workshop offering.
        </p>
        {/* NavigationArrow removed as "See all workshops" requires new state logic */}
      </div>
      {/* Custom layout for a single featured workshop */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
        <div className='col-span-full lg:col-span-6'>
          <img
            className='w-full h-auto max-h-[400px] object-contain rounded-lg shadow-lg border-2 border-custom-gray-dark' // Responsive image styling
            src={new URL(`../../assets/images/${workshop.imageURL}`, import.meta.url).href}
            decoding='async'
            loading='lazy'
            alt={workshop.title || 'Workshop image'} // Use title for alt text
          />
        </div>
        <div className='col-span-full lg:col-span-6 p-4 md:p-6'>
          <h3 className='text-2xl md:text-3xl font-semibold text-custom-gray-light mb-6'> {/* Themed description */}
            {workshop.description}
          </h3>
          <p className='text-base md:text-lg text-custom-gray-medium mb-8 leading-relaxed'> {/* Themed subdescription */}
            {workshop.subdescription}
          </p>
          <a
            className='group relative rounded-lg inline-flex text-lg font-inter 
                       bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                       hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 ease-in-out
                       transform hover:scale-105 px-8 py-3' // Adjusted padding and added hover effect
            href={workshop.source}
            target='_blank'
            rel='noopener noreferrer' // Added rel for security
          >
            <div className='relative flex h-full w-full items-center justify-center whitespace-nowrap text-white space-x-2'>
              <span>Visit Workshop</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
