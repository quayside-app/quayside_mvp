'use client'
import React, { useState } from 'react'

import ContactUsModal from '../components/ContactUsModal'

/**
 * A button component for triggering a Contact Us modal.
 * When clicked, a modal for contacting will appear.
 *
 * @example
 * // Importing the component
 * import ContactUsButton from './ContactUsButton';
 *
 * // Using the component
 * <ContactUsButton />
 *
 * @returns {React.Element} The rendered button and modal elements.
 */
export default function ContactUsButton () {
  /**
     * Handles the click event for the Contact Us button
     */
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
