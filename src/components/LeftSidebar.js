"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";


import Dropdown from '../components/Dropdown';
import NewProjectModal from '../components/NewProjectModal';

import plusIcon from "../../public/svg/plus.svg";
import starIcon from "../../public/svg/star.svg";
import tableIcon from "../../public/svg/table.svg";
import teamIcon from "../../public/svg/team.svg";
import targetIcon from "../../public/svg/target.svg";

//export default function LeftSidebar() => {
export default function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
        <div className="flex w-1/6 bg-gray-800 text-white justify-center rounded-md py-5 ">
            <NewProjectModal handleClose={() => setIsOpen(true)} isOpen={isOpen}/>
            <div className="flex flex-wrap">
              <ul className="font-medium">
                <li> <span className="ml-3 flex justify-center py-5">Directory</span> </li>
                
                {/* <button onClick={() => {console.log("hello")}} className="flex items-center w-full p-2 text-base text-white transition duration-75 rounded-lg group hover:bg-gray-700">
                    <Image priority src={plusIcon} alt={"Temp"}/>
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">New Proj</span>
   
                </button> */}

                <li> <Dropdown label = "New Project" clickAction={() => {setIsOpen(true); console.log("Here")} } image_path={plusIcon}/> </li>
                <li> <Dropdown label = "Task" image_path={plusIcon}/> </li>

                <li><div className="pt-4 my-10 space-y-2 font-medium border-t  border-gray-200"></div></li>

                <li> <Dropdown label = "Starred" image_path={starIcon}/> </li>
                <li> <Dropdown label = "Projects" image_path={tableIcon}/> </li>
                <li> <Dropdown label = "Team" image_path={teamIcon}/> </li>
                <li> <Dropdown label = "Objectives" image_path={targetIcon}/> </li>
              </ul>
            </div>

          
        </div>
  );
};

//export default LeftSidebar;