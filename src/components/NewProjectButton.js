'use client'
import React, { useState } from 'react'

import NewProjectModal from '../components/NewProjectModal'
import plusIcon from '../../public/svg/plus.svg'
import Button from '../components/Button'

/**
 * A component that renders a button for creating a new project.
 * When clicked, a modal for creating a new project is displayed.
 *
 * @returns {React.Element} The rendered button and modal elements. When the button is clicked, the modal will open, providing a form or interface for creating a new project.
 *
 * @example
 * // Importing the component
 * import NewProjectButton from './NewProjectButton';
 *
 * // Using the component
 * <NewProjectButton />
 */
export default function NewProjectButton () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <NewProjectModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />
      <li> <Button clickAction={() => { setIsOpen(true) }} label='New Project' imagePath={plusIcon} className='w-full p-2'/> </li>
    </div>
  )
}
