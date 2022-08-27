type workshop = {
  imageURL: string
  description: string
  subdescription: string
  source: string
  title: string
}

export default function WorkshopCard({ workshop }: { workshop: workshop }) {
  return (
    <div className='bg-secondary relative col-span-full mt-12 flex flex-col items-start rounded-lg px-8 py-12 lg:col-span-4 lg:mt-0 lg:px-12 bg-gray-800 md:px-16 md:pb-20 hover:bg-gradient-to-r from-gray-700 via-gray-900 to-black'>
      <img
        className='h-32 w-auto flex-none object-contain'
        src={new URL(`../../assets/images/${workshop.imageURL}`, import.meta.url).href}
        decoding='async'
        alt='workshop image'
      />
      <div className='mb-4 flex h-32 flex-none items-end'>
        <h2 className='text-2xl font-medium md:text-3xl text-white'>{workshop.description}</h2>
      </div>
      <p className='text-lg text-secondary mb-8 max-w-sm flex-auto prose-dark text-gray-400'>
        {workshop.subdescription}
      </p>
      <a
        className='group relative rounded-2xl inline-flex text-lg font-inter bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
        href={workshop.source}
        target='_blank'
        rel='noreferrer'
      >
        <div className='relative flex h-full w-full items-center justify-center whitespace-nowrap text-inverse space-x-3 px-8 py-4'>
          <span>Visit</span>
        </div>
      </a>
    </div>
  )
}
