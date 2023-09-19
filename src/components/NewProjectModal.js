"use client"; 
import React from 'react';

import Input from '../components/Input';
import xIcon from "../../public/svg/x.svg";

import Image from "next/image";


const NewProjectModal = ({isOpen, handleClose }) => {
    console.log("Yeehaw", isOpen)

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 ">
            <div id="authentication-modal" tabIndex="-1"  className="fixed w-full p-4 ">
            
                    <div className="relative rounded-lg shadow bg-gray-900">
                        <button type="button" onClick={handleClose} className="absolute top-3 right-3 rounded-lg  w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600" data-modal-hide="authentication-modal">
                            <Image src={xIcon} alt="exit" width="10" height ="10"/>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-white">New Project</h3>
                            <form className="space-y-6" action="#">
                                <Input label="ChatGPT API Key" placeholder="••••••••"/>
                                <Input label="Project Description" placeholder="I want to bake a cake!"/>
                        

                                <button className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>

                            </form>
                        </div>
                    </div>
                </div>

        </div>
        
    );
};

export default NewProjectModal;