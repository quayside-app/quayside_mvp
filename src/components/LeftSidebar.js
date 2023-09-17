import React from 'react';
import Dropdown from '../components/Dropdown';

import plusIcon from "../../public/svg/plus.svg";
import starIcon from "../../public/svg/star.svg";
import tableIcon from "../../public/svg/table.svg";
import teamIcon from "../../public/svg/team.svg";
import targetIcon from "../../public/svg/target.svg";

const LeftSidebar = () => {
  return (

        <div className="flex w-1/6 bg-gray-50 dark:bg-gray-800 justify-center rounded-md m-5 py-5 ">
            <div className="flex flex-wrap">
              <ul className="font-medium">
                <li> <span className="ml-3 flex justify-center py-5">Directory</span> </li>
                <li> <Dropdown label = "New Project" image_path={plusIcon}/> </li>
                <li> <Dropdown label = "Task" image_path={plusIcon}/> </li>
                <li><div class="pt-4 my-10 space-y-2 font-medium border-t border-gray-200"></div></li>
                <li> <Dropdown label = "Starred" image_path={starIcon}/> </li>
                <li> <Dropdown label = "Projects" image_path={tableIcon}/> </li>
                <li> <Dropdown label = "Team" image_path={teamIcon}/> </li>
                <li> <Dropdown label = "Objectives" image_path={targetIcon}/> </li>
              </ul>
            </div>
        </div>


  );
};

export default LeftSidebar;