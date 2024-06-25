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
        <>
            <div className="navbar grid grid-cols-12 gap-8">
                {/* Left side of the navbar */}
                <div className={` col-span-3 text-black ${isOpen ? 'navbar-open' : 'navbar-closed'}`}  >
                    {/* Button to toggle sidebar */}
                    <button className="bg-transparent px-2 py-1" onClick={toggleSidebar}>
                        {/* Icon for the toggle button */}
                        <FontAwesomeIcon className='text-custom-white' size='1x' icon={faBarsStaggered} />
                    </button>
                </div>
                {/* Right side of the navbar */}
                <div className=" flex col-span-9  justify-end mr-3">
                    {/* Component for navbar buttons */}
                    <NavbarButton />
                </div>
            </div>
        </>
    )
}