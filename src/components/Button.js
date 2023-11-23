'use client'
import React from 'react'
import Image from 'next/image'

const Button = ({ label, clickAction, imagePath, className }) => {
  return (
    <div className={className}>
      <button type='button' onClick={clickAction} className='flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-700' aria-controls='dropdown-example' data-collapse-toggle='dropdown-example'>
        <div className='flex w-full'>
          {imagePath && <Image priority src={imagePath} alt={label} height='20' width='20' className='mr-3' />}
          <span className='flex my-auto truncate text-xs xl:text-lg'>{label}</span>
        </div>
      </button>
    </div>

  )
}

export default Button
