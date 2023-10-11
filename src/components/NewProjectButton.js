'use client';
import React, { useState } from 'react'

import Dropdown from '../components/Dropdown'
import NewProjectModal from '../components/NewProjectModal'
import plusIcon from '../../public/svg/plus.svg'



export default function NewProjectButton () {
  
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
        <NewProjectModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />
        <li> <Dropdown clickAction={() => { setIsOpen(true); console.log('Here') }} label='New Project' imagePath={plusIcon} /> </li>
    </div>
  )
}
