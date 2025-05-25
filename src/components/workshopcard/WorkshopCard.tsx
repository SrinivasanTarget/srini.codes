type workshop = {
  imageURL: string
  description: string
  subdescription: string
  source: string
  title: string
}

export default function WorkshopCard({ workshop }: { workshop: workshop }) {
  return (
    <div className='relative col-span-full mt-12 flex flex-col items-start rounded-lg p-6 md:p-8
                   bg-custom-gray-dark hover:bg-gradient-to-r from-custom-gray-dark via-custom-black to-custom-gray-dark 
                   lg:col-span-4 lg:mt-0 transition-all duration-300 ease-in-out transform hover:scale-105'>
      <img
        className='h-24 md:h-32 w-auto flex-none object-contain mb-4' // Adjusted image height and margin
        src={new URL(`../../assets/images/${workshop.imageURL}`, import.meta.url).href}
        decoding='async'
        alt={workshop.title || 'workshop image'} // Use title for alt text if available
      />
      {/* Consider min-h for description container if text length varies significantly */}
      <div className='mb-4 flex flex-none items-end min-h-[4rem] md:min-h-[5rem]'> 
        <h2 className='text-xl md:text-2xl font-medium text-custom-gray-light'>{workshop.description}</h2>
      </div>
      <p className='text-base md:text-lg text-custom-gray-medium mb-8 max-w-sm flex-auto'>
        {workshop.subdescription}
      </p>
      <a
        className='group relative rounded-lg inline-flex text-lg font-inter 
                   bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                   hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 ease-in-out
                   px-6 py-3' // Simplified padding
        href={workshop.source}
        target='_blank'
        rel='noreferrer'
      >
        {/* Changed text-inverse to text-white for better contrast on gradient */}
        <div className='relative flex h-full w-full items-center justify-center whitespace-nowrap text-white space-x-2'>
          <span>Visit Workshop</span>
        </div>
      </a>
    </div>
  )
}
