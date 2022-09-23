import { NavLink } from 'react-router-dom'

type arrow = {
  link: string
  context: string
}

export default function NavigationArrow({ arrow }: { arrow: arrow }) {
  return (
    <NavLink
      className='text-primary inline-flex items-center text-left font-inter pl-2'
      to={arrow.link}
    >
      <span className='mr-4 text-xl font-inter text-white'>{arrow.context}</span>
      <div className='relative inline-flex h-14 w-14 flex-none items-center justify-center p-1'>
        <div className='absolute text-gray-600 border-2 rounded-full hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
          <svg
            className='transform rotate-[270deg] text-gray-400'
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
    </NavLink>
  )
}
