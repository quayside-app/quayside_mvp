import React from 'react'
import Image from 'next/image'
import NavbarSvg from '../../static/svg/navbarsvg'
import logo from '../../static/Quayside-Logo.png'

const Navbar = () => {
  return (
    <div className='px-5'>
      <nav className='rounded-md dark:bg-gray-800 p-4 text-white'>
        <div className='flex flex-col md:grid md:grid-cols-3'> {/* Stack elements on mobile, grid on larger screens */}
          {/* Hamburger & Logo */}
          <div className='flex items-center space-x-2 mb-2 md:mb-0'> {/* Added bottom margin for mobile */}
            <button className='text-white text-3xl md:text-4xl font-bold opacity-70 hover:opacity-100'>
              &#9776;
            </button>
            <Image src={logo} height={30} width={30} className='md:h-35 md:w-35' /> {/* Smaller logo on mobile */}
          </div>

          {/* Current Directory */}
          <div className='flex items-center justify-center md:justify-start mb-2 md:mb-0'> {/* Centered on mobile, left on larger screens */}
            <input
              type='text'
              className='bg-gray-400 rounded-md py-1 text-xs md:text-base'
              defaultValue='/quayside/Your-App'
            />
          </div>

          {/* Search Bar */}
          <div className='flex items-center justify-center md:justify-end'> {/* Centered on mobile, right on larger screens */}
            <div className='flex border border-gray-300 rounded-md overflow-hidden'>
              <input
                type='search'
                placeholder='Search...'
                className='flex-grow py-1 px-3 text-xs md:text-gray-700 md:text-base'
              />
              <button className='bg-gray-400 px-2 flex items-center justify-center'>
                <NavbarSvg height='12px' width='12' color='#FFFFFF' className='md:h-15 md:w-15' /> {/* Smaller icon on mobile */}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
