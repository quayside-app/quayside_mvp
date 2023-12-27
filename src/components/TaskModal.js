'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import xIcon from '../../public/svg/x.svg';
import Input from '../components/Input';

export default function TaskModal({isOpen, handleClose}) {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate:'',
        contributors:''
      });

    useEffect(() => {
    // Fetch Task data
    fetch(`/api/mongoDB/getTasks?taskID=${'65530c573f9666ab932b59e4'}`, {
        method: 'GET'
    }).then(async (response) => {
        const body = await response.json()
        if (!response.ok) {
        console.error(body.message)
        } else {
            setFormData({
                name: body.tasks[0].name || [],
                description: body.tasks[0].description || [],
                startDate: body.tasks[0].startDate || [],
                endDate: body.tasks[0].endDate || [],
                contributors: body.tasks[0].contributors || [],
            })
        }
    }).catch(error => {
        console.error('Error getting  Task data:', error)
    })
    }, [])

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
        // setLoading(true)
    
        // Send data to DB
        try {
          const response = await fetch('/api/mongoDB/editTask', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              taskId: '65530c573f9666ab932b59e4',
              name: formData.name,
              description: formData.description,
              startDate: formData.startDate,
              endDate: formData.endDate,
            })
          })
          const body = await response.json()
          if (!response.ok) {
            // Not a 2xx response, handle error
            console.error(body.message)
            return
          }
        } catch (error) {
          console.error('Error creating new project.')
        }
      }

    


    return(
        <div className='fixed  inset-24 z-10 '>

  
          <div className='relative rounded-lg  bg-neutral-800 m-24'>
            <button type='button' onClick={handleClose} className='absolute top-3 right-3 rounded-lg  w-8 h-8 inline-flex justify-center items-center hover:bg-gray-600'>
              <Image src={xIcon} alt='exit' width='10' height='10' />
            </button>
            <div className='px-6 py-6 lg:px-8'>

              <form className='space-y-6' onSubmit={submitForm}>
                <h3 className='mb-4 text-xl font-medium text-white'> 
                    <Input name='name' value={formData.name} changeAction={handleInput}  />
                </h3>

                <Input name='description' label='Description'  value={formData.description} changeAction={handleInput}  />
                <Input name='startDate' label='Start Date' value={formData.startDate} changeAction={handleInput}  />
                <Input name='endDate' label='End Date' value={formData.endDate} changeAction={handleInput} />
                <Input name='contributors' label='Contributors' value={formData.contributors} changeAction={handleInput} />

                <button type='submit'  className={`w-full text-white bg-gray-700  hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-md px-5 py-2.5 text-center`}>
                    Save
                </button>
              </form>

            </div>
          </div>
        </div>
    )

}