// Removed NavLink import
// import { NavLink } from 'react-router-dom' 

type ArrowProps = { // Renamed type for clarity
  link: string // Kept link prop, parent can decide how to use it with onClick
  context: string
  onClick?: (link: string) => void // Optional onClick prop
}

export default function NavigationArrow({ arrow }: { arrow: ArrowProps }) {
  // Default onClick handler if none is provided
  const handleClick = () => {
    if (arrow.onClick) {
      arrow.onClick(arrow.link);
    } else {
      // If it's a hash link for same-page scroll, use window.location
      if (arrow.link.startsWith('#')) {
        window.location.href = arrow.link;
      } else {
        console.log('NavigationArrow clicked. Link:', arrow.link, 'Context:', arrow.context);
        // For external links, window.open(arrow.link, '_blank') could be an option if needed.
      }
    }
  };

  return (
    <button
      type="button"
      className='text-custom-highlight inline-flex items-center text-left font-inter pl-2 group focus:outline-none' // Added group for focus styling on children
      onClick={handleClick}
    >
      <span className='mr-4 text-xl font-inter text-custom-gray-light group-hover:text-custom-highlight transition-colors duration-300'>{arrow.context}</span>
      <div className='relative inline-flex h-14 w-14 flex-none items-center justify-center p-1'>
        {/* Updated border and hover effect colors */}
        <div className='absolute border-2 border-custom-gray-dark rounded-full 
                        group-hover:border-custom-highlight transition-colors duration-300 
                        group-focus:ring-2 group-focus:ring-custom-highlight'> 
          <svg
            className='transform rotate-[270deg] text-custom-gray-medium group-hover:text-custom-highlight transition-colors duration-300'
            width='40'
            height='40'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M15.101 5.5V23.1094L9.40108 17.4095L8.14807 18.6619L15.9862 26.5L23.852 18.6342L22.5996 17.3817L16.8725 23.1094V5.5H15.101Z'
              fill='currentColor'
            ></path>
          </svg>
        </div>
      </div>
    </button>
  )
}
