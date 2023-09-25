"use client"; 
import React from "react";
import {useState} from "react"
import cookieCutter from 'cookie-cutter'

import Input from '../components/Input';
import xIcon from "../../public/svg/x.svg";

import Image from "next/image";


const NewProjectModal = ({isOpen, handleClose}) => {
    
    const [formData, setFormData] = useState({
        apiKey: "",
        prompt: "",
    });

    // Updates variables every time they are changed
    const handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
    
        setFormData((prevState) => ({
            ...prevState,  // Keeps previous values of other variables
            [fieldName]: fieldValue
        }));
    }

    const submitForm = (e) => {
        e.preventDefault()  // Prevents page from refreshing
    

        const response = fetch("/api/chat-gpt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            //magically sending formData to route.js where the API call is handled
            body: JSON.stringify({
                prompt: formData.prompt,
                apiKey: formData.apiKey,
            }),
            }).then(async (response) => {
            console.log("TEST RESPONSE", response)
            const result =  await response.json();
            });


        // Print out form data in console
        Object.entries(formData).forEach(([key, value]) => {
            //cookies().set(key, value)
            cookieCutter.set(key, value)

            console.log(key, value);
        })

        handleClose()
    }


    // async function setCookie(key, value) {
    //     "use server"
    //     cookies().set(key, value)
    //   }

    
    
    
    if (!isOpen) return null;
    return (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75">
                <div id="authentication-modal" tabIndex="-1"  className="fixed w-full p-4 ">
                
                        <div className="relative rounded-lg shadow bg-gray-900">
                            <button type="button" onClick={handleClose} className="absolute top-3 right-3 rounded-lg  w-8 h-8 inline-flex justify-center items-center hover:bg-gray-600">
                                <Image src={xIcon} alt="exit" width="10" height ="10"/>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h3 className="mb-4 text-xl font-medium text-white">New Project</h3>
                                <form className="space-y-6"  onSubmit={submitForm}>
                                    <Input name="apiKey" value={formData.apiKey} changeAction={handleInput} label="ChatGPT API Key" placeholder="••••••••"/>
                                    <Input name="prompt" value={formData.prompt} changeAction={handleInput} placeholder="I want to bake a cake!"/>

                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                        Create
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
            </div>        
    );
};


export default NewProjectModal;
