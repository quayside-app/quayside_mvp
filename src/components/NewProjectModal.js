'use client'
import React, { useState } from 'react'
import { useApiResponse } from '@/app/ApiResponseContext'
import { useSession } from 'next-auth/react'

import cookieCutter from 'cookie-cutter'

import Input from '../components/Input'
import Alert from '../components/Alert'
import xIcon from '../../public/svg/x.svg'

import Image from 'next/image'

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
  const [errorMessage, setMessage] = useState(null)
  const { data: session } = useSession()
  const [formData, setFormData] = useState({
    apiKey: '',
    prompt: '',
    question1: '',
    question2: '',
    question3: ''
  })

  const { setApiResponse } = useApiResponse()

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
    } catch (error) {
      console.error('Error setting new project.')
      return
    }

    // Get ChatGPT input
    fetch('/api/chat-gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // magically sending formData to route.js where the API call is handled
      body: JSON.stringify({
        prompt: formData.prompt,
        apiKey: formData.apiKey
      })
    }).then(async (response) => {
      console.log('TEST RESPONSE', response)
      const body = await response.json()
      if (!response.ok) {
        setMessage(body.message)
        return
      }
      setApiResponse(body.choices)
      handleClose()
    }).catch(error => {
      throw new Error('Error sending ChatGPT model POST: ' + error)
    })

    // Print out form data in console
    Object.entries(formData).forEach(([key, value]) => {
      cookieCutter.set(key, value)
      console.log(key, value)
    })
  }

  if (!isOpen) return null
  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 z-50'>
      {errorMessage && <Alert heading='Error' content={errorMessage} />}

      <div id='authentication-modal' tabIndex='-1' className='fixed w-full p-4 '>

        <div className='relative rounded-lg shadow bg-black'>
          <button type='button' onClick={handleClose} className='absolute top-3 right-3 rounded-lg  w-8 h-8 inline-flex justify-center items-center hover:bg-gray-600'>
            <Image src={xIcon} alt='exit' width='10' height='10' />
          </button>
          <div className='px-6 py-6 lg:px-8'>
            <h3 className='mb-4 text-xl font-medium text-white'>New Project</h3>
            <form className='space-y-6' onSubmit={submitForm}>
              <Input name='apiKey' value={formData.apiKey} changeAction={handleInput} label='ChatGPT API Key' placeholder='••••••••' />
              <Input name='prompt' value={formData.prompt} changeAction={handleInput} label='What is your project about?' placeholder='I want to bake a cake!' />
              <Input name='question1' value={formData.question1} changeAction={handleInput} label='When should the project be completed?' placeholder='Feb 30, 2041' />
              <Input name='question2' value={formData.question2} changeAction={handleInput} label='What is the budget allocated for this project?' placeholder='One Billion Dollars and 1 cent' />
              <Input name='question3' value={formData.question3} changeAction={handleInput} label='Who are the key stakeholders involved in this project?' placeholder='my boss' />

              <button type='submit' className='w-full text-white bg-gray-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProjectModal
