// eslint-disable-next-line no-unused-vars
import React from 'react'
import { faClipboardList, faCalendarDays, faPaste, faChartLine, faIndustry, faAddressBook, faEye, faUserAlt, faCog, } from "@fortawesome/free-solid-svg-icons"
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
    <div className='flex flex-col justify-between grid-rows-auto'>
    <div className=' grid justify-center gap-4 mt-4  '>
        <div onClick={() => handleClick("/dashboard")}  className='grid justify-center  '>
            <Logo width={160} />
        </div>
        <div>{'\u200B'}</div>
        <SidebarButton styling={"brightness-50"} routeID={"/workInProgress"} langID={"WorkOrder"}  icon={faClipboardList}/>
        <SidebarButton styling={"brightness-50"} routeID={"/workInProgress"} langID={"Calendar"} icon={faCalendarDays}/>
        <SidebarButton styling={"brightness-50"} routeID={"/workInProgress"} langID={"Template"} icon={faPaste}/>
        <div>{'\u200B'}</div>
        <SidebarButton styling={"brightness-50"} routeID={"/workInProgress"} langID={"Data"} icon={faChartLine}/>
        <SidebarButton routeID={"/iris"} langID={"i.r.i.s"} icon={faEye}/>
        <SidebarButton routeID={"/matriceria"} langID={"Matriceria"} icon={faCog}/>
        <SidebarButton styling={"brightness-50"} routeID={"/workInProgress"} langID={"Assets"} icon={faIndustry}/>
        <SidebarButton styling={"brightness-50"} routeID={"/workInProgress"} langID={"Providers"} icon={faAddressBook}/>
        <SidebarButton styling={"brightness-50"} routeID={"/workInProgress"} langID={"Users"} icon={faUserAlt}/>
    </div>
</div>
  )
}
