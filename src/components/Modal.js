'use client'
import React from 'react'
import Image from 'next/image'

export default function Model({children, ...props}) {
    return (
        <div {...props} className='fixed inset-0 bg-gray-500 bg-opacity-75 z-50'>
            {children}
        </div>

    )
}


