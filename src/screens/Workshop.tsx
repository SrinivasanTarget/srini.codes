import Greeting from '../components/greeting/Greeting'
import WorkshopCard from '../components/workshopcard/WorkshopCard'
import { workshops } from '../portfolio/workshops'

export default function Workshop() {
  return (
    <div className='relative mx-10vw'>
      <Greeting
        url={new URL('../assets/images/thumbsup.webp', import.meta.url).href}
        isName={false}
        description={'I run Appium workshops regularly on Appium & Selenium Conferences 🚀'}
        subdescription={'Invest in yourself with a premium workshop'}
        showLogo={false}
        isSocial={true}
      />
      <div className='relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl p-3'>
        {workshops.map((workshop, i) => (
          <WorkshopCard
            key={i}
            workshop={{
              title: workshop.title,
              description: workshop.description,
              subdescription: workshop.subdescription,
              imageURL: workshop.imageURL,
              source: workshop.source,
            }}
          />
        ))}
      </div>
    </div>
  )
}
