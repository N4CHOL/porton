// eslint-disable-next-line no-unused-vars
import React from 'react'
import { faClipboardList, faCalendarDays, faPaste, faChartLine, faIndustry, faAddressBook, faEye, faUserAlt, } from "@fortawesome/free-solid-svg-icons"
import "../sidebarOpen.css"
import Logo from '../../logo/logo';
import { useNavigate } from 'react-router-dom';
import SidebarButton from '../../buttons/sidebarButton/sidebarButton';

export default function AdminSidebar() {
    const navigate = useNavigate();

    const handleClick = (route) => {
        // Use navigate function to navigate to a different route
        navigate(route);
    };
  return (
    <div className='flex flex-col justify-between grid-rows-auto h-screen'>
    <div className=' grid justify-center gap-4 mt-3 '>
        <div onClick={() => handleClick("/dashboard")}  className='grid justify-center  '>
            <Logo width={160} />
        </div>
        <div>{'\u200B'}</div>
        <SidebarButton routeID={"/dashboard"} langID={"WorkOrder"} icon={faClipboardList}/>
        <SidebarButton routeID={"/dashboard"} langID={"Calendar"} icon={faCalendarDays}/>
        <SidebarButton routeID={"/dashboard"} langID={"Template"} icon={faPaste}/>
        <div>{'\u200B'}</div>
        <SidebarButton routeID={"/dashboard"} langID={"Data"} icon={faChartLine}/>
        <SidebarButton routeID={"/iris"} langID={"i.r.i.s"} icon={faEye}/>
        <SidebarButton routeID={"/dashboard"} langID={"Assets"} icon={faIndustry}/>
        <SidebarButton routeID={"/dashboard"} langID={"Providers"} icon={faAddressBook}/>
        <SidebarButton routeID={"/dashboard"} langID={"Users"} icon={faUserAlt}/>
    </div>
</div>
  )
}
