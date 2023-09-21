import React from "react";
import Image from "next/image";
import NavbarSvg from "../../static/svg/navbarsvg";
import logo from "../../static/Quayside-Logo.png";

const Navbar = () => {
    return (

      <div className="px-5">
        <nav className="rounded-md bg-gray-800 p-4 text-white">

          <div className="flex flex-wrap"> {/* Stack elements on mobile, grid on larger screens */}
            
            {/* Hamburger */}
            <div className="flex w-1/12 items-center "> {/* Added bottom margin for mobile */}
                <button className="text-white text-3xl md:text-4xl font-bold opacity-70 hover:opacity-100"> &#9776; </button>
            </div>

            {/* Logo */}
            <div className="w-1/12 mx-2">
              <Image src={logo} height={30} width={30} className="" /> {/* Smaller logo on mobile */}
            </div>
  
            {/* Current Directory */}
            <div className="flex w-4/12"> {/* Centered on mobile, left on larger screens */}
    
              <input type="text" className=" bg-gray-400 rounded-md p-2 text-xs "
                defaultValue="/quayside/Your-App"/>
            </div>
  
            {/* Search Bar */}
            <div className="flex w-4/12"> {/* Centered on mobile, right on larger screens */}
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <input
                  type="search"
                  placeholder="Search..."
                  className="flex py-1 px-3 text-xs md:text-gray-700 md:text-base"
                />
                <button className="bg-gray-400 px-2 flex items-center justify-center">
                  <NavbarSvg height="12px" width="12" color="#FFFFFF" className="md:h-15 md:w-15" /> {/* Smaller icon on mobile */}
                </button>
              </div>
            </div>

          </div>
        </nav>
      </div>

    );
  };
  
  export default Navbar;
  