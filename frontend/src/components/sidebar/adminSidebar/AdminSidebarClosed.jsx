/* eslint-disable no-unused-vars */
import React from 'react'
import { faClipboardList, faCalendarDays, faPaste, faChartLine, faIndustry, faAddressBook, faEye, faUserAlt, } from "@fortawesome/free-solid-svg-icons"
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
        <SidebarIconButton routeID={'/dashboard'} icon={faClipboardList} />
        <SidebarIconButton routeID={'/dashboard'} icon={faCalendarDays} />
        <SidebarIconButton routeID={'/dashboard'} icon={faPaste} />
        <div>{'\u200B'}</div>
        <SidebarIconButton routeID={'/dashboard'} icon={faChartLine} />
        <SidebarIconButton routeID={'/iris'} icon={faEye} />
        <SidebarIconButton routeID={'/dashboard'} icon={faIndustry} />
        <SidebarIconButton routeID={'/dashboard'} icon={faAddressBook} />
        <SidebarIconButton routeID={'/dashboard'} icon={faUserAlt} />
    </div>

</div>
  )
}
