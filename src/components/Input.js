/**
 * Dropdown Component
 *
 * This component takes allows us to use the same input style while chaning what it does in its action
 * We should think about reformatting this to allow us to change the type also if we so desire
 *
 *
 * Usage:
 * <Input name="apiKey" value={formData.apiKey} changeAction={handleInput} label="API Key" placeholder="Enter API Key" />
 */

import React from 'react'

/**
 * Generates a comment for the given function body.
 *
 * @param {string} name - The name of the input element.
 * @param {string} value - The value of the input element.
 * @param {function} changeAction - The action to be performed when the input value changes.
 * @param {string} label - The label for the input element.
 * @param {string} placeholder - The placeholder text for the input element.
 * @return {JSX.Element} - The JSX element representing the input component.
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
