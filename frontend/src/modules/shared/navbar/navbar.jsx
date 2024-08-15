//  Total edges (E): 6
//  Total nodes (N): 7
//  The cyclomatic complexity of the code is 2.

import "./navbar.css"
// eslint-disable-next-line no-unused-vars
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons"
import NavbarButton from "../../../components/buttons/navbarButton/navbarButton";

export default function Navbar({ toggleSidebar, isOpen }) {

    return (
        <div className="navbar">
            <div className=" grid grid-cols-12 gap-4">
                {/* Left side of the navbar */}
                <div className={`col-span-7 md:col-span-9 lg:col-span-11 text-black ${isOpen ? 'navbar-open' : 'navbar-closed'}`}  >
                    {/* Button to toggle sidebar */}
                    <button className="bg-transparent px-2 py-1" onClick={toggleSidebar}>
                        {/* Icon for the toggle button */}
                        <FontAwesomeIcon className='text-custom-white' size='1x' icon={faBarsStaggered} />
                    </button>
                </div>
                {/* Right side of the navbar */}
                <div className=" col-span-1  justify-end ">
                    {/* Component for navbar buttons */}
                    <NavbarButton />
                </div>
            </div>
        </div>
    )
}