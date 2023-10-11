'use client';
import React, { useState } from 'react'

import NewProjectModal from '../components/NewProjectModal'
import plusIcon from '../../public/svg/plus.svg'
import Button from '../components/Button'



export default function NewProjectButton () {
  
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
        <NewProjectModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />
        <li> <Button clickAction={() => { setIsOpen(true); console.log('Here') }} label='New Project' imagePath={plusIcon} /> </li>
    </div>
  )
}
