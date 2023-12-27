import React from 'react'

/**
 * An Input component that renders a text input field with an associated label.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.name - The name attribute of the input element.
 * @param {string} props.value - The current value of the input element.
 * @param {Function} props.changeAction - The function to be called when the value of the input element changes.
 * @param {string} props.label - The text to be used as the label for the input element.
 * @param {string} props.placeholder - The placeholder text for the input element.
 * @example
 * // Importing the component
 * import Input from './Input';
 *
 * // Using the component
 * <Input name="username" value={username} changeAction={handleUsernameChange} label="Username" placeholder="Enter your username" />
 *
 * @returns {React.Element} The rendered input and label elements.
 */

const Input = ({label, variant, changeAction, ...props}) => {

  if (variant === 'multiline') {
    return(
      <div className='rounded-lg  bg-neutral-600 '>
        <label className='block mb-2 text-sm font-medium text-white px-3 pt-3'>{label} </label>
        <textarea {...props} type='text' onChange={changeAction} className=' text-white  text-sm rounded-lg  bg-neutral-600 outline-none block w-full p-3  '/>
      </div>
    )
  } 

  if (variant === 'clear') {
    return(
      <div>
        <label className='block mb-2 text-sm font-medium text-white'>{label} </label>
        <input {...props} type='text' onChange={changeAction} className=' text-white  text-md rounded-lg bg-transparent outline-none block w-full ' />
      </div>
    )
  } 

  if (variant === 'inline') {
    return(
      <div className='flex mb-2'>
        <label className='my-auto text-sm font-medium text-white '>{label} </label>
        <input {...props} type='text' onChange={changeAction} className='ml-5 flex-auto text-white  text-sm rounded-lg  bg-neutral-600 outline-none block p-2.5  ' />
      </div>
    )
  } 
  
  return (
    <div>
      <label className='block mb-2 text-sm font-medium text-white '>{label} </label>
      <input {...props} type='text' onChange={changeAction} className=' text-white  text-sm rounded-lg  bg-neutral-600 outline-none block w-full p-2.5  ' />
    </div>
  )
  
}

export default Input
