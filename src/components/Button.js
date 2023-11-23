'use client'
import React from 'react'
import Image from 'next/image'

const Button = ({ label, clickAction, imagePath, isCentered, className }) => {
  return (

      <button type='button' onClick={clickAction} className={`flex w-full p-1 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-700 ${className}`} aria-controls='dropdown-example' data-collapse-toggle='dropdown-example'>
        <div className={`flex w-full ${ isCentered && "justify-center"}`}>
          {imagePath && <Image priority src={imagePath} alt={label} height='20' width='20' className='mr-3' />}
          <span className='flex my-auto truncate text-xs xl:text-lg'>{label}</span>
        </div>
      </button>


  )
}

export default Button
