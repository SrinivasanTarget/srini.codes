import Greeting from '../components/greeting/Greeting'
import ConferenceCard from '../components/conferencecard/ConferenceCard'
import { conferences } from '../portfolio/conferences'

export default function Talks() {
  return (
    <div className='relative mx-10vw pb-16'>
      <Greeting
        url={new URL('../assets/images/mic.webp', import.meta.url).href}
        isName={false}
        description={'International Conference Speaker 🚀'}
        subdescription={'I talk about testing mobile apps, web apps, microservices, and more'}
        isSocial={true}
      />
      <div className='relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-4 mx-auto max-w-7xl p-3'>
        <div className='col-span-full flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0 mb-16'>
          <div className='space-y-2 lg:space-y-0  pl-2'>
            <h2 className='leading-tight text-3xl md:text-4xl text-white'>Conference Timeline</h2>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50'>
        {conferences.map((conference, i) => (
          <ConferenceCard
            key={i}
            conference={{
              reverse: conference.reverse,
              title: conference.title,
              url: conference.url,
              description: conference.description,
            }}
          />
        ))}
      </div>
    </div>
  )
}
