'use client'
import React, { useState } from 'react'

// import Image from 'next/image' //'Image' is defined but never used. (no-unused-vars)

import Dropdown from '../components/Dropdown'
import NewProjectModal from '../components/NewProjectModal'

import plusIcon from '../../public/svg/plus.svg'
import starIcon from '../../public/svg/star.svg'
import tableIcon from '../../public/svg/table.svg'
import teamIcon from '../../public/svg/team.svg'
import targetIcon from '../../public/svg/target.svg'

/**
 * Represents the left sidebar component.
 * @returns {JSX.Element} The rendered component.
 */

export default function LeftSidebar ({ className }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={className}>
      <div className='flex  bg-neutral-800 text-white justify-center py-5'>
        {/* New Project Modal */}
        <NewProjectModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />

        <div className='flex flex-wrap mx-4'>
          <ul className='font-medium'>
            <li> <span className='ml-3 flex justify-center py-5'>Directory</span> </li>

            <li> <Dropdown clickAction={() => { setIsOpen(true); console.log('Here') }} label='New Project' imagePath={plusIcon} /> </li>
            <li> <Dropdown label='Task' imagePath={plusIcon} /> </li>

            <li><div className='my-10 space-y-2 font-medium border-t  border-gray-200' /></li>

            <li> <Dropdown label='Starred' imagePath={starIcon} /> </li>
            <li> <Dropdown label='Projects' imagePath={tableIcon} /> </li>
            <li> <Dropdown label='Team' imagePath={teamIcon} /> </li>
            <li> <Dropdown label='Objectives' imagePath={targetIcon} /> </li>
          </ul>

          <div className='pt-4 my-10 space-y-2 font-medium border-t border-gray-200' />
        </div>
      </div>
    </div>
  )
}
