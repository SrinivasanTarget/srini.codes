import Feeds from '../components/feeds/Feeds'
import Greeting from '../components/greeting/Greeting'

export default function Tweets() {
  return (
    <div className='relative mx-10vw pb-16'>
      <Greeting
        url={new URL('../assets/images/twitter.webp', import.meta.url).href}
        isName={false}
        description={'I tweet my learnings on testing regularly 🚀'}
        subdescription={''}
        isSocial={true}
      />
      <Feeds />
    </div>
  )
}
