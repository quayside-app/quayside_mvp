import React from 'react';
import Image from 'next/image';
import logo from '../../static/Quayside-Logo.png'
function roundedSearchBar(){
  return(
    <form>
      <input type='text' className='bg-gray-400 rounded-full'></input>
    </form>
  );
}
const Navbar = () => {
  return (
    <nav class="bg-gray-700 p-4 text-white">
    <div className="mx-auto">
      <div className="flex justify-beginning items-center">
          <div className="mx-2">
              <button className="text-white text-4xl font-bold opacity-70 hover:opacity-100">
                &#9776;
              </button>
          </div>
          <div className='pl-4'>
            <Image
            src={logo}
            height={35}
            width={35}
            />
          </div>
          {roundedSearchBar()}
      </div>
    </div>
  </nav>
  );
};

export default Navbar;