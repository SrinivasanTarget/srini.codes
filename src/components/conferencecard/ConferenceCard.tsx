type conference = {
  title: string
  url: string
  description: string
  reverse: boolean
}

export default function ConferenceCard({ conference }: { conference: conference }) {
  const cardBaseClasses = "col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto"; // For reverse layout
  const cardClasses = `
    text-custom-gray-light bg-custom-gray-dark 
    shadow-lg shadow-custom-highlight/20 
    hover:shadow-custom-highlight/40 transition-shadow duration-300
    rounded-xl my-4 p-4
  `; // Common classes for both normal and reverse

  const titleClasses = "font-semibold text-xl mb-1 font-lora text-custom-highlight";
  const descriptionClasses = "leading-tight text-justify text-custom-gray-light hover:text-custom-highlight transition-colors duration-300";
  const timelineBarClasses = "h-full w-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pointer-events-none";
  const timelineDotClasses = "w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md";

  return conference.reverse ? (
    <div className='flex flex-row-reverse md:contents'>
      <div className={`${cardClasses} col-start-1 md:col-start-1 col-end-5 md:col-end-5 ml-auto`}>
        <h3 className={titleClasses}>{conference.title}</h3>
        <a
          className={descriptionClasses}
          href={conference.url}
          target='_blank'
          rel='noreferrer'
        >
          {conference.description}
        </a>
      </div>
      <div className='col-start-5 col-end-6 md:mx-auto relative mr-10'>
        <div className='h-full w-6 flex items-center justify-center'>
          <div className={timelineBarClasses}></div>
        </div>
        <div className={timelineDotClasses}></div>
      </div>
    </div>
  ) : (
    <div className='flex md:contents'>
      <div className='col-start-5 col-end-6 mr-10 md:mx-auto relative'>
        <div className='h-full w-6 flex items-center justify-center'>
          <div className={timelineBarClasses}></div>
        </div>
        <div className={timelineDotClasses}></div>
      </div>
      <div className={`${cardClasses} col-start-6 md:col-start-6 col-end-10 md:col-end-10 mr-auto`}>
        <h3 className={titleClasses}>{conference.title}</h3>
        <a
          className={descriptionClasses}
          href={conference.url}
          target='_blank'
          rel='noreferrer'
        >
          {conference.description}
        </a>
      </div>
    </div>
  )
}
