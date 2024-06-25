// eslint-disable-next-line no-unused-vars
import React from 'react'
import { faClipboardList, faChartLine, faEye, } from "@fortawesome/free-solid-svg-icons"
import "../sidebarOpen.css"
import Logo from '../../logo/logo';
import { useNavigate } from 'react-router-dom';
import SidebarButton from '../../buttons/sidebarButton/sidebarButton';


export default function OperatorSidebar() {
  const navigate = useNavigate();

  const handleClick = (route) => {
    // Use navigate function to navigate to a different route
    navigate(route);
  };
  return (
    <div className='flex flex-col justify-between grid-rows-auto h-screen'>
      <div className=' grid justify-center gap-4 mt-3 '>
        <div onClick={() => handleClick("/")} className='grid justify-center  '>
          <Logo width={160} />
        </div>
        <div>{'\u200B'}</div>
        <SidebarButton routeID={"/work-order"} langID={"WorkOrder"} icon={faClipboardList} />
        <div>{'\u200B'}</div>
        <SidebarButton routeID={"/data"} langID={"Data"} icon={faChartLine} />
        <SidebarButton routeID={"/iris"} langID={"i.r.i.s"} icon={faEye} />
      </div>
    </div>
  )
}
