'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import xIcon from '../../public/svg/x.svg';
import Input from '../components/Input';

export default function TaskModal({taskId, handleClose}) {


    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate:'',
        contributors:''
      });

    useEffect(() => {
    // Fetch Task data
    fetch(`/api/mongoDB/getTasks?taskID=${taskId}`, {
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
              taskId: taskId,
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
                    <Input variant='clear' name='name' value={formData.name} changeAction={handleInput}  />
                </h3>

                <div className='flex'>
                  <div className='w-2/3'>
                    <Input variant='multiline' name='description' label='Description'  value={formData.description} changeAction={handleInput}  />
                  </div>

                  <div className='w-1/3 ml-10 bg-neutral-600 rounded-lg p-3'>
                    
                    <Input variant='inline' name='startDate' label='Start Date' value={formData.startDate} changeAction={handleInput}  />
                    <Input variant='inline' name='endDate' label='End Date' value={formData.endDate} changeAction={handleInput} />
                    <Input variant='inline' name='contributors' label='Contributors' value={formData.contributors} changeAction={handleInput} />
                    </div>
                </div>
                <button type='submit'  className={`w-full text-white bg-gray-700  hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-md px-5 py-2.5 text-center`}>
                    Save
                </button>
              </form>

            </div>
          </div>
        </div>
    )

}