//  Total edges (E): 8
//  Total nodes (N): 7
//  The cyclomatic complexity of the code is 3.



// eslint-disable-next-line no-unused-vars
import React from "react";
import "./sidebar.css"
import SidebarClosed from "../../../components/sidebar/sidebarClosed/SidebarClosed";
import SidebarOpen from "../../../components/sidebar/sidebarOpen/SidebarOpen";
import MobileSidebar from "../../../components/sidebar/mobileSidebar/MobileSidebar";

export default function Sidebar({ isOpen, toggleSidebar, userRol }) {


    const isMobile = () => {
        return window.innerWidth <= 768; // Adjust the breakpoint 
    };

    return (
        <div className="container">
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            {/* Conditionally render content based on isOpen state */}
            {isOpen ? (
                // If sidebar is open, render the content
                <div className="content">
                    
                    {/* Check if the viewport is in mobile mode */}
                    {isMobile() ? <MobileSidebar userRol={userRol} toggleSidebar={toggleSidebar} /> : <SidebarOpen userRol={userRol} />}
                </div>
            ) : (
                // If sidebar is closed, render the SidebarClosed component
                <SidebarClosed userRol={userRol} />
            )}
        </div>
        </div>
    )
}