'use client'
import React, { useState } from 'react'
import { useApiResponse } from '@/app/ApiResponseContext'

import cookieCutter from 'cookie-cutter'

import Input from '../components/Input'
import xIcon from '../../public/svg/x.svg'

import Image from 'next/image'


const NewProjectModal = ({ isOpen, handleClose }) => {
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

  async function submitForm(e) {
    e.preventDefault() // Prevents page from refreshing

    // Send data to DB
    try {
      const response = await fetch('/api/mongoDB/createProject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.prompt,
          apiKey: formData.apiKey,
          endDate: formData.question1,
          budget: formData.question2,
          userIDs:['6521d8581bcf69b7d260608b'], // TODO: change this
          //stakeholders: formData.question3,
        })
      });

      if (!response.ok) {
        // Not a 2xx response, handle error
        const body = await response.json();
        switch (response.status) {
          case 400:
            console.error('Input Error:', body.message);
            break;
          default:
            console.error('Error:', body.message);
        }
      return;
      }
      
      
    } catch (error) {
      console.error('Error submitting form:', error);
      return;
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
      // const result = await response.json()
      const data = await response.json()
      setApiResponse(data.choices)
    })

    // Print out form data in console
    Object.entries(formData).forEach(([key, value]) => {
      // cookies().set(key, value)
      cookieCutter.set(key, value)

      console.log(key, value)
    })

    handleClose()
  }

  // async function setCookie(key, value) {
  //     "use server"
  //     cookies().set(key, value)
  //   }

  if (!isOpen) return null
  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 z-50'>
      <div id='authentication-modal' tabIndex='-1' className='fixed w-full p-4 '>

        <div className='relative rounded-lg shadow bg-gray-900'>
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

              <button type='submit' className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
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
