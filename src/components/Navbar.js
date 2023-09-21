import React from "react";
import Image from "next/image";
import NavbarSvg from "../../static/svg/navbarsvg";
import logo from "../../static/Quayside-Logo.png";

const Navbar = () => {
    return (

      <div className="px-5">
        <nav className="rounded-md bg-neutral-800 p-2 text-white w-full">

          <div className="flex"> {/* Stack elements on mobile, grid on larger screens */}
            
            <div className="flex w-2/12 lg:w-1/12 justify-start mx-1">
              {/* Hamburger */}
              <div className="flex">
                  <div className="">
                    <button className="text-white text-3xl md:text-4xl font-bold opacity-70 hover:opacity-100 align-super"> &#9776; </button>
                  </div>
              </div>

              {/* Logo */}
              <div className="flex mx-2">
                <div className="my-auto">
                  <Image src={logo} height={30} width={30} className="" /> 
                </div>
              </div>
            </div>
  
            {/* Current Directory */}
            <div className="flex w-4/12 justify-star mx-1"> 
              <div className="flex bg-neutral-600 px-4 rounded-3xl overflow-hidden">
                <input type="text" minWidth="0" className="bg-neutral-600  text-xs"
                  defaultValue="/quayside/Your-App"/>
              </div>
            </div>
  
            {/* Search Bar */}
            <div className="flex w-5/12 justify-end mx-1">
              <div className="flex overflow-hidden  bg-neutral-600 rounded-3xl">
                <input
                  type="search"
                  placeholder="Search..."
                  className="flex  px-3 text-xs  bg-neutral-600 text-white md:text-base"
                />
                <button className="px-4  flex items-center justify-center">
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
  