export default function ProfileCard() {
  return (
    // Removed grid-specific classes, relying on parent in AboutMe.tsx for positioning.
    // Added themed border and ensured responsiveness.
    <div className='mt-0 hidden md:block'> {/* Now visible from md screens upwards, was xl:block */}
      <img
        decoding='async'
        loading='lazy'
        className='w-full h-auto max-h-[70vh] object-contain rounded-br-[25%] rounded-tl-[25%] rounded-bl-3xl rounded-tr-3xl border-4 border-custom-gray-dark hover:border-custom-highlight transition-colors duration-300'
        src='https://images.ctfassets.net/57ehn7fu4651/5u84KbcN7iYztK4XVmOH2S/610cde862058152caa1eddc2415ec41a/SrinivasanSekar.jpg?fm=webp'
        alt='Sai Krishna'
      />
    </div>
  )
}
