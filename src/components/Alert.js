'use client'
import React from 'react'

export default function Alert ({ heading = 'Warning', content }) {
  return (

    <div className='bg-black border-l-4 border-red-500 text-red-400 p-4 m-4 rounded-lg' role='alert'>
      <p className='font-bold'>{heading}</p>
      <p>{content}</p>
    </div>

  )
}
