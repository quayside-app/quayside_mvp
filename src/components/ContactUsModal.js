'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import xIcon from '../../public/svg/x.svg'
import Input from '../components/Input'

/**
 * @description This compenent opens, initializes, and closes the Contact Us modal.
 * @param {boolean} isOpen - If handleClose is not pressed then 
 * @param {Function} props.handleClose - "Function" to close the modal when clicked
 * @returns {JSX.Element|null} The JSX Code for the Contact Us modal, or null if not open. 
 */

export default function ContactUsModal ({ isOpen, handleClose }) {
  if (!isOpen) return null

  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  })

  const [formSuccess, setFormSuccess] = useState(false)
  const [formSuccessMessage, setFormSuccessMessage] = useState('')

  /**
   * @function handleInput
   * @description Handles input changes for form elements.
   * @param {Event} e - The event object.
   */

  const handleInput = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }))
  }

/**
   * @function submitForm
   * @description Submits the form data to the server.
   * @param {Event} e - The event object.
   */

  const submitForm = (e) => {
    e.preventDefault()
    const formURL = e.target.action
    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value)
    })

    fetch(formURL, {
      method: 'POST',
      body: data,
      headers: {
        accept: 'application/json'
      }
    }).then((response) => response.json())
      .then((data) => {
        setFormData({
          email: '',
          subject: '',
          message: ''
        })
        setFormSuccess(true)
        setFormSuccessMessage(data.submission_text)
      })
  }

  /**
   * @function renderFormOrSuccess
   * @description Renders the form errors or a success message, based on form submission state.
   * @returns {JSX.Element} The JSX code for either the form or the success message.
   */

  const renderFormOrSuccess = () => {
    if (formSuccess) {
      return <div>{formSuccessMessage}</div>
    } else {
      return (
        <form className='space-y-6' method='POST' action='https://www.formbackend.com/f/664decaabbf1c319' onSubmit={submitForm}>
          <Input name='email' label='Your Email' placeholder='frodo.baggins@example.com' changeAction={handleInput} value={formData.email} />
          <Input name='subject' label='Subject' placeholder='Subject' changeAction={handleInput} value={formData.subject} />
          <Input name='message' label='Message' placeholder='Your message here...' changeAction={handleInput} value={formData.message} />
          <button type='submit' className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
            Send
          </button>
        </form>
      )
    }
  }

  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75'>
      <div className='fixed w-full p-4'>
        <div className='relative rounded-lg shadow bg-gray-900'>
          <button type='button' onClick={handleClose} className='absolute top-3 right-3 rounded-lg  w-8 h-8 inline-flex justify-center items-center hover:bg-gray-600'>
            <Image src={xIcon} alt='exit' width='10' height='10' />
          </button>
          <div className='px-6 py-6 lg:px-8'>
            <h3 className='mb-4 text-xl font-medium text-white'>Contact Us</h3>
            {renderFormOrSuccess()}
          </div>
        </div>
      </div>
    </div>
  )
}
