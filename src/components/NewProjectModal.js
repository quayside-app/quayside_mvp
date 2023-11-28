'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'

import Input from '../components/Input'
import Alert from '../components/Alert'
import xIcon from '../../public/svg/x.svg'
import loadIcon from '../../public/svg/load.svg'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

/**
 * A modal component for creating a new project. It provides a form to collect details about the project such as the ChatGPT API Key, project description, completion date, budget, and stakeholders.
 * On form submission, it sends the collected data to specified API endpoints to create a new project and fetch ChatGPT input.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {boolean} props.isOpen - A boolean indicating whether the modal is open or not.
 * @param {Function} props.handleClose - A function to be called to close the modal.
 *
 * @returns {React.Element} The rendered modal element with a form for creating a new project. The modal is displayed only when `isOpen` prop is `true`.
 *
 * @example
 * // Importing the component
 * import NewProjectModal from './NewProjectModal';
 *
 * // Using the component
 * <NewProjectModal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)} />
 */
const NewProjectModal = ({ isOpen, handleClose }) => {
  const router = useRouter()
  const [errorMessage, setMessage] = useState(null)
  const { data: session } = useSession()
  const [isLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    prompt: '',
    question1: '',
    question2: '',
    question3: ''
  })

  // Updates variables every time they are changed
  const handleInput = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    setFormData((prevState) => ({
      ...prevState, // Keeps previous values of other variables
      [fieldName]: fieldValue
    }))
  }

  async function submitForm (e) {
    e.preventDefault() // Prevents page from refreshing
    setLoading(true)

    // Send data to DB
    try {
      const response = await fetch('/api/mongoDB/createProject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.prompt,
          endDate: formData.question1,
          budget: formData.question2,
          userIDs: [`${session.userId}`]
          // stakeholders: formData.question3,
        })
      })
      const body = await response.json()
      if (!response.ok) {
        // Not a 2xx response, handle error
        console.error(body.message)
        setMessage(body.message)
        return
      }
      const projectID = body.project._id
      setLoading(false)
      handleClose()
      router.push(`/${projectID}`) // Routes to the document just created
    } catch (error) {
      console.error('Error creating new project.')
    }
  }

  if (!isOpen) return null
  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 z-50'>
      {errorMessage && <Alert heading='Error' content={errorMessage} />}

      <div id='authentication-modal' tabIndex='-1' className='fixed w-full pt-28 px-4'>

        <div className='relative rounded-lg shadow bg-black'>
          <button type='button' onClick={handleClose} className='absolute top-3 right-3 rounded-lg  w-8 h-8 inline-flex justify-center items-center hover:bg-gray-600'>
            <Image src={xIcon} alt='exit' width='10' height='10' />
          </button>
          <div className='px-6 py-6 lg:px-8'>
            <h3 className='mb-4 text-xl font-medium text-white'>New Project</h3>
            <form className='space-y-6' onSubmit={submitForm}>
              <Input name='prompt' value={formData.prompt} changeAction={handleInput} label='What is your project about?' placeholder='I want to bake a cake!' />
              <Input name='question1' value={formData.question1} changeAction={handleInput} label='When should the project be completed?' placeholder='Feb 30, 2041' />
              <Input name='question2' value={formData.question2} changeAction={handleInput} label='What is the budget allocated for this project?' placeholder='One Billion Dollars and 1 cent' />
              <Input name='question3' value={formData.question3} changeAction={handleInput} label='Who are the key stakeholders involved in this project?' placeholder='my boss' />

              {/* Disable the button and show loading symbol while isLoading */}
              <button type='submit' disabled={isLoading} className={`w-full text-white bg-gray-700 ${!isLoading && 'hover:bg-blue-800'} focus:ring-4  font-medium rounded-lg text-md px-5 py-2.5 text-center`}>
                {isLoading
                  ? <div className='flex flex-wrap items-center justify-center'> <Image src={loadIcon} alt='loading' width='25' height='25' className='animate-spin' /> <div className='text-md font-medium mx-3 '>Loading...</div></div>
                  : 'Create'}

              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProjectModal
