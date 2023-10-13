'use client';
import React, { useState } from 'react'

import ContactUsModal from '../components/ContactUsModal'
import NewProjectModal from '../components/NewProjectModal'
import plusIcon from '../../public/svg/plus.svg'
import Button from '../components/Button'



export default function ContactUsButton () {
    const handleContactClick = () => {
        setContactModalOpen(true)
        console.log('Contact Us clicked')
    }
    const [isContactModalOpen, setContactModalOpen] = useState(false)

  return (
    <div>
        <ContactUsModal isOpen={isContactModalOpen} handleClose={() => setContactModalOpen(false)} />
        <div className=''>
            <button
                type='button'
                className='flex justify-center items-center w-full p-2 text-base text-white transition duration-75 group hover:bg-gray-700 '
                onClick={handleContactClick}
            >
                <span className=' text-xs xl:text-lg'>Contact Us</span>
            </button>
        </div>
    </div>

  )
}
