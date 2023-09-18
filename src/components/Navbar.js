import React from 'react';
import Image from 'next/image';
import NavbarSvg from '../../static/svg/navbarsvg';
import logo from '../../static/Quayside-Logo.png'

const Navbar = () => {
    return (
        <div className='px-5'>
            <nav className=" rounded-md dark:bg-gray-800 p-4 text-white">
                <div className="flex justify-beginning items-center">
                    <div className="">
                        <button className="text-white text-4xl font-bold opacity-70 hover:opacity-100 mr-2">
                            &#9776;
                        </button>
                    </div>
                    <div className=''>
                        <Image
                            src={logo}
                            height={35}
                            width={35}
                        />
                    </div>
                    <div className=''>
                        <input
                            type='text'
                            className='bg-gray-400 rounded-md py-1'
                            defaultValue={'/quayside/Your-App'}
                        />
                    </div>

                    <div className='flex border border-gray-300 rounded-md overflow-hidden'>
                        <input
                            type='search'
                            placeholder='Search...'
                            className='flex-grow py-1 px-3 text-gray-700'
                        />
                        <button className='bg-gray-400 px-2 flex items-center justify-center'>
                            <NavbarSvg
                            height='15px'
                            width='15'
                            color='#fffffff'/>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;