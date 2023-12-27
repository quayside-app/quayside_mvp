'use client'
import React from 'react'

export default function Alert ({ heading = 'Warning', content }) {
  return (

    <div className='bg-neutral-800 border-l-4 border-red-500 text-red-400 p-5 mx-4 mt-20 rounded-lg' role='alert'>
      <p className='font-bold'>{heading}</p>
      <p>{content}</p>
    </div>

  )
}
