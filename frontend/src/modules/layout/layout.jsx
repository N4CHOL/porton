//  Total edges (E): 3
//  Total nodes (N): 4
//  The cyclomatic complexity of the code is 1.


//  Import
// eslint-disable-next-line no-unused-vars
import { React, useState, useEffect } from "react";
import Sidebar from '../shared/sidebar/Sidebar'
import Navbar from '../shared/navbar/navbar'
import { Outlet } from "react-router-dom";
import "./layout.css"
export default function Layout({ userRol }) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIsSidebarOpen(false)
        } 
    }, [userRol]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    return (
        <>
            <div>
                {/* Render Navbar component with toggleSidebar and isOpen props */}
                <Navbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
                {/* Conditional rendering of sidebar based on isSidebarOpen state */}
                <div className={`grid  ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
                    <div>
                        {/* Render Sidebar component with isOpen and toggleSidebar props */}
                        <Sidebar isOpen={isSidebarOpen} userRol={userRol} toggleSidebar={toggleSidebar} />
                    </div>
                    <div className={`grid  ${isSidebarOpen ? 'content-open' : 'content-closed'}`}>
                        {/* Render Outlet component */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
