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
const Input = ({ name, value, changeAction, label, placeholder }) => {
  return (

    <div>
      <label className='block mb-2 text-sm font-medium text-white'>{label} </label>
      <input name={name} value={value} onChange={changeAction} placeholder={placeholder} type='text' className=' text-black border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dbg-gray-600 border-gray-500 placeholder-gray-400' required />
    </div>

  )
}

export default Input
