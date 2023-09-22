"use client";
import React from "react";
import Image from "next/image";

import dropdownIcon from "../../public/svg/dropdown.svg";


const Dropdown = ({label, clickAction, image_path}) => {
    return (

            <button type="button" onClick = {clickAction} className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                <div className="flex w-full">
                    <div className="flex w-11/12">
                        <Image priority src={image_path} alt={label} height="20" width="20" className="flex"/>
                        <span className="flex my-auto ml-3 text-left whitespace-nowrap text-xs xl:text-lg">{label}</span>
                    </div>
                    <div className="flex 1-1/12 justify-end">
                        <Image priority src={dropdownIcon} alt="Dropdown Icon" height="20" width="20"/>
                    </div>
                </div>
            </button>
        
    );
};

export default Dropdown;

