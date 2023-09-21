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

/**
 * Represents the left sidebar component.
 * @returns {JSX.Element} The rendered component.
 */
export default function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownItems = [
    { label: "New Project", image_path: plusIcon },
    { label: "Task", image_path: plusIcon },
    { label: "Starred", image_path: starIcon },
    { label: "Projects", image_path: tableIcon },
    { label: "Team", image_path: teamIcon },
    { label: "Objectives", image_path: targetIcon },
  ];

  return (
    <div className="flex w-1/6 bg-gray-800 text-white justify-center rounded-md py-5">
      {/* New Project Modal */}
      <NewProjectModal handleClose={() => setIsOpen(false)} isOpen={isOpen} />

      <div className="flex flex-wrap">
        <ul className="font-medium">
          {/* Directory */}
          <li>
            <span className="ml-3 flex justify-center py-5">Directory</span>
          </li>

          {/* Dropdown items */}
          {dropdownItems.map((item, index) => (
            <li key={index}>
              <Dropdown
                label={item.label}
                image_path={item.image_path}
                clickAction={() => setIsOpen(item.label === "New Project")}
              />
            </li>
          ))}
        </ul>
        <div className="pt-4 my-10 space-y-2 font-medium border-t border-gray-200"></div>
      </div>
    </div>
  );
}

