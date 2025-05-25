import ProfileCard from '../../components/profilecard/ProfileCard'

export default function AboutMe() {
  return (
    // Removed pb-16, pt-48. Section padding in Home.tsx should handle this.
    // Changed border color
    <div className='border-t border-custom-gray-dark'> 
      <div className='relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl' id='aboutme'> {/* Simplified mx-10vw to standard container padding */}
        <div className='relative grid grid-cols-1 md:grid-cols-3 gap-x-4 xl:gap-x-6 items-start'>
          {/* Changed text color, adjusted column span for better balance with ProfileCard */}
          <div className='col-span-1 md:col-span-2 text-custom-gray-light pr-3'> 
            <div>
              <h2 className='text-3xl md:text-4xl font-sign text-custom-highlight'>Srinivasan Sekar</h2>
              {/* Kept gradient for roles as it's a distinct visual feature. Ensure it's readable. */}
              <p className='max-w-md text-xl mt-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                Thoughtworker
              </p>
              <p className='max-w-md text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                Open Source Contributor
              </p>
              <p className='max-w-md text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                Conference Speaker
              </p>
              <p className='max-w-md text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                Blogger
              </p>
              <p className='max-w-md text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                Mentor
              </p>
            </div>
          </div>
          {/* ProfileCard will take the remaining column space */}
          <div className="col-span-1">
            <ProfileCard />
          </div>
        </div>
      </div>
    </div>
  )
}
