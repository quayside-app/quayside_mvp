'use client'
import React from 'react'
import Image from 'next/image'

export default function Model({children, ...props}) {
    return (
        <div {...props} className='fixed inset-0 bg-gray-500 bg-opacity-75 z-50'>
            <div className='relative rounded-lg shadow bg-neutral-800'>
                <button type='button' onClick={handleClose} className='absolute top-3 right-3 rounded-lg  w-8 h-8 inline-flex justify-center items-center hover:bg-gray-600'>
                    <Image src={xIcon} alt='exit' width='10' height='10' />
                </button>
                {children}
            </div>
        </div>

    )
}


