'use client'
import React, { useState, useEffect } from 'react'

import Image from 'next/image'
import searchIcon from '../../public/svg/search.svg'
import logo from '../../public/quaysideLogo.png'
import { useSession, signOut } from 'next-auth/react'

/**
 * A Navbar component that fetches a user's name from a specified API and displays a navigation bar with several interactive elements.
 *
 * @returns {React.Element} The rendered navigation bar with a hamburger icon, logo, current directory input field, search bar, and a display of the fetched user's name.
 *
 * @example
 * // Importing the component
 * import Navbar from './Navbar';
 *
 * // Using the component
 * <Navbar />
 */
const Navbar = () => {
  const [name, setName] = useState(null)
  const { data: session } = useSession()

  /**
   * Fetches user data from a specified API when the component mounts.
   * It constructs a full name from the fetched first name and last name and sets this full name in the local state.
   * TODO use user creds
   */
  useEffect(() => {
    fetch(`/api/mongoDB/getUsers?id=${session.userId}`, {
      method: 'GET',
      headers: {}
    }).then(async (response) => {
      const body = await response.json()
      if (!response.ok) {
        console.error(body.message)
      } else {
        setName(body.users[0].firstName + ' ' + body.users[0].lastName)
      }
    }).catch(error => {
      console.error(error)
    })
  })
  return (

    <div className='drop-shadow-2xl'>
      <nav className=' bg-neutral-800 p-2 text-white w-full drop-shadow-2xl'>

        <div className='flex w-full'>

          <div className='flex w-2/12  justify-start mx-1'>
            {/* Hamburger */}
            <div className='flex'>
              <div className=''>
                <button className='text-white text-3xl md:text-4xl font-bold opacity-70 hover:opacity-100 align-super'> &#9776; </button>
              </div>
            </div>

            {/* Logo */}
            <div className='flex mx-2'>
              <div className='my-auto'>
                <Image src={logo} alt='quayside logo' height={30} width={30} className='' />
              </div>
            </div>
          </div>

          {/* Current Directory */}
          <div className='flex w-4/12 justify-start mx-1'>
            <div className='flex bg-neutral-600 px-4 rounded-3xl overflow-hidden'>
              <input
                type='text' className='bg-neutral-600  text-xs'
                defaultValue='/quayside/Your-App'
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className='flex w-4/12 lg:w-5/12 justify-end px-1'>
            <div className='flex overflow-hidden  bg-neutral-600 rounded-3xl'>
              <input
                type='search'
                placeholder='Search...'
                className='flex  px-3 text-xs  bg-neutral-600 text-white md:text-base'
              />
              <button className='px-4 items-center justify-center '>
                <Image priority src={searchIcon} alt='Search' height='15' width='15' className='md:h-15 md:w-15' />
              </button>
            </div>
          </div>

          {/* Sign Out */}
          <div className='flex w-2/12  lg:w-1/12 justify-end  my-auto text-right px-2'>
            <button onClick={() => signOut()}>Sign Out</button>
          </div>

          {/* User Avatar Icon */}
          {session && session.user && (
          <div>
            <img
              src={session.user.image}
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          </div>
        )}
          {/* User */}
          <div className='flex w-2/12  lg:w-1/12 justify-end  my-auto text-right px-2'> {name} </div>

        </div>
      </nav>
    </div>

  )
}

export default Navbar
