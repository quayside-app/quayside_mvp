/**
 * Dropdown Component
 *
 * This component renders a dropdown button with an image, a label, and a dropdown icon.
 *
 *
 *
 * Usage:
 * <Dropdown label="Example" clickAction={someFunction} imagePath="/path/to/image.png" />
 *
 */
'use client'
import React from 'react'
import Image from 'next/image'

import dropdownIcon from '../../public/svg/dropdown.svg'

/**
 * Generates the function comment for the given function body.
 *
 * @param {Object} props - The props object containing the function parameters.
 * @param {string} props.label - The label for the dropdown button.
 * @param {function} props.clickAction - The click action function for the dropdown button.
 * @param {string} props.imagePath - The path to the image for the dropdown button.
 * @return {JSX.Element} - The JSX element representing the dropdown button.
 */

const Dropdown = ({ label, clickAction, imagePath }) => {
  return (

    <button type='button' onClick={clickAction} className='flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-700' aria-controls='dropdown-example' data-collapse-toggle='dropdown-example'>
      <div className='flex w-full'>
        <div className='flex w-11/12'>
          <Image priority src={imagePath} alt={label} height='20' width='20' />
          <span className='flex my-auto ml-3 text-left whitespace-nowrap text-xs xl:text-lg'>{label}</span>
        </div>
        <div className='flex 1-1/12 justify-end'>
          <Image priority src={dropdownIcon} alt='Dropdown Icon' height='20' width='20' />
        </div>
      </div>
    </button>

  )
}

export default Dropdown
