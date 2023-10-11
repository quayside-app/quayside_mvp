'use client'
import React from 'react'
import Image from 'next/image'


const Button = ({ label, clickAction, imagePath }) => {
  return (

    <button type='button' onClick={clickAction} className='flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-700' aria-controls='dropdown-example' data-collapse-toggle='dropdown-example'>
      <div className='flex w-full'>
        <div className='flex w-11/12'>

          {imagePath && <Image priority src={imagePath} alt={label} height='20' width='20' />}
          <span className='flex my-auto ml-3 text-left whitespace-nowrap text-xs xl:text-lg'>{label}</span>
        </div>
      </div>
    </button>

  )
}

export default Button;