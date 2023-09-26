import React from 'react'
import Image from 'next/image'
import searchIcon from '../../public/svg/search.svg'
import logo from '../../public/quaysideLogo.png'

const Navbar = () => {
  return (

    <div className='drop-shadow-2xl'>
      <nav className=' bg-neutral-800 p-2 text-white w-full drop-shadow-2xl'>

        <div className='flex'>

          <div className='flex w-2/12 lg:w-1/12 justify-start mx-1'>
            {/* Hamburger */}
            <div className='flex'>
              <div className=''>
                <button className='text-white text-3xl md:text-4xl font-bold opacity-70 hover:opacity-100 align-super'> &#9776; </button>
              </div>
            </div>

            {/* Logo */}
            <div className='flex mx-2'>
              <div className='my-auto'>
                <Image src={logo} height={30} width={30} className='' />
              </div>
            </div>
          </div>

          {/* Current Directory */}
          <div className='flex w-4/12 justify-star mx-1'>
            <div className='flex bg-neutral-600 px-4 rounded-3xl overflow-hidden'>
              <input
                type='text' className='bg-neutral-600  text-xs'
                defaultValue='/quayside/Your-App'
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className='flex w-5/12 justify-end mx-1'>
            <div className='flex overflow-hidden  bg-neutral-600 rounded-3xl'>
              <input
                type='search'
                placeholder='Search...'
                className='flex  px-3 text-xs  bg-neutral-600 text-white md:text-base'
              />
              <button className='px-4  flex items-center justify-center'>
                <Image priority src={searchIcon} alt="Search" height='15' width='15' className='md:h-15 md:w-15'/>
              </button>
            </div>
          </div>

        </div>
      </nav>
    </div>

  )
}

export default Navbar
