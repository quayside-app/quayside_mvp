'use client'
import React, { useState } from 'react'

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
export default function LeftSidebar () {
  const [isOpen, setIsOpen] = useState(false)

  const dropdownItems = [
    { label: 'New Project', imagePath: plusIcon },
    { label: 'Task', imagePath: plusIcon },
    { label: 'Starred', imagePath: starIcon },
    { label: 'Projects', imagePath: tableIcon },
    { label: 'Team', imagePath: teamIcon },
    { label: 'Objectives', imagePath: targetIcon }
  ]

  return (
    <div className='flex w-1/6 bg-gray-800 text-white justify-center rounded-md py-5'>
      {/* New Project Modal */}
      <NewProjectModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />

      <div className='flex flex-wrap'>
        <ul className='font-medium'>
          {/* Directory */}
          <li>
            <span className='ml-3 flex justify-center py-5'>Directory</span>
          </li>

          {/* Dropdown items */}
          {dropdownItems.map((item, index) => (
            <li key={index}>
              <Dropdown
                label={item.label}
                imagePath={item.imagePath}
                clickAction={() => setIsOpen(item.label === 'New Project')}
              />
            </li>
          ))}
        </ul>
        <div className='pt-4 my-10 space-y-2 font-medium border-t border-gray-200' />
      </div>
    </div>
  )
}
