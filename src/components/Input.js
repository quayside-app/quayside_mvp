import React from 'react';


const Input = ({label, placeholder}) => {
  return (

    <div>
        <label className="block mb-2 text-sm font-medium text-white">{label} </label>
        <input placeholder={placeholder} className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dbg-gray-600 border-gray-500 placeholder-gray-400" required/>
    </div>

  );
};

export default Input;