import React from "react";
import Image from "next/image";

import dropdownIcon from "../../public/svg/dropdown.svg";


const Dropdown = ({label, image_path}) => {
    return (
        <button type="button" class="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
            <Image priority src={image_path} alt={label}/>
            <span className="flex-1 ml-3 text-left whitespace-nowrap">{label}</span>
            <Image priority src={dropdownIcon} alt="Dropdown Icon"/>
        </button>
    );
};

export default Dropdown;

