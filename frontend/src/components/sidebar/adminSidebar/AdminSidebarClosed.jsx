/* eslint-disable no-unused-vars */
import React from 'react'
import { faClipboardList, faCalendarDays, faPaste, faChartLine, faIndustry, faAddressBook, faEye, faUserAlt, faCog, } from "@fortawesome/free-solid-svg-icons"
import LogoLittle from '../../logo/logoLittle'
import SidebarIconButton from '../../buttons/sidebarIconButton/SidebarIconButton'


export default function AdminSidebarClosed() {
  return (
    <div className='flex flex-col justify-between grid-rows-auto h-screen w-full'>
    <div className=' grid justify-center gap-4 mt-3 '>
        <div className='px-8'>
            <LogoLittle  width={40} />
        </div>
        <div>{'\u200B'}</div>
        <SidebarIconButton routeID={'/workInProgress'} icon={faClipboardList} styling={"brightness-50"} />
        <SidebarIconButton routeID={'/workInProgress'} icon={faCalendarDays} styling={"brightness-50"} />
        <SidebarIconButton routeID={'/workInProgress'} icon={faPaste} styling={"brightness-50"} />
        <div>{'\u200B'}</div>
        <SidebarIconButton routeID={'/workInProgress'} icon={faChartLine} styling={"brightness-50"} />
        <SidebarIconButton routeID={'/iris'} icon={faEye} />
        <SidebarIconButton routeID={'/matriceria'} icon={faCog} />
        <SidebarIconButton routeID={'/workInProgress'} icon={faIndustry} styling={"brightness-50"} />
        <SidebarIconButton routeID={'/workInProgress'} icon={faAddressBook} styling={"brightness-50"} />
        <SidebarIconButton routeID={'/workInProgress'} icon={faUserAlt} styling={"brightness-50"} />
    </div>

</div>
  )
}
