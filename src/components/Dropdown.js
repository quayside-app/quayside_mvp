'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import dropdownIcon from '../../public/svg/dropdown.svg'

/**
 * A Dropdown component which renders a button with an image, label, and a dropdown icon.
 * When clicked, it triggers the provided click action.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.label - The label text to be displayed next to the image on the button.
 * @param {Function} props.clickAction - The action to be performed when the button is clicked.
 * @param {string} props.imagePath - The path to the image to be displayed on the button.
 * @example
 * // Importing the component
 * import Dropdown from './Dropdown';
 *
 * // Using the component
 * <Dropdown label="Click me" clickAction={() => alert('Button Clicked')} imagePath="/path/to/image.png" />
 *
 * @returns {React.Element} The rendered Dropdown button element.
 */
const Dropdown = ({ label, imagePath, dropdownComponents }) => {
  const [dropdownHidden, setDropdown] = useState(false)

  return (
    <div>
      <button type='button' onClick={() => setDropdown(!dropdownHidden)} className='flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-700' aria-controls='dropdown-example' data-collapse-toggle='dropdown-example'>
        <div className='flex w-full'>
          <div className='flex w-11/12'>
            <Image priority src={imagePath} alt={label} height='20' width='20' />
            <span className='flex my-auto ml-3 text-left whitespace-nowrap'>{label}</span>
          </div>
          <div className={`flex 1-1/12 justify-end my-auto ${dropdownHidden && '-rotate-90'}`}>
            <Image priority src={dropdownIcon} alt='Dropdown Icon' height='20' width='20' />
          </div>

        </div>
      </button>
      <div className={dropdownHidden && 'hidden'}>
        {dropdownComponents}
      </div>
    </div>

  )
}

export default Dropdown
