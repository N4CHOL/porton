// eslint-disable-next-line no-unused-vars
import React from 'react'
import { faChartLine, faEye,} from "@fortawesome/free-solid-svg-icons"
import LogoLittle from '../../logo/logoLittle'
import SidebarIconButton from '../../buttons/sidebarIconButton/SidebarIconButton'

export default function OperatorSidebarClose() {
    return (
        <div className='flex flex-col justify-between grid-rows-auto h-screen w-full'>
            <div className=' grid justify-center gap-4 mt-3 '>
                <div className='px-8'>
                    <LogoLittle width={40} />
                </div>

            
         
                <div>{'\u200B'}</div>
                <SidebarIconButton routeID={'/data'} icon={faChartLine} />
                <SidebarIconButton routeID={'/iris'} icon={faEye} />
                
            </div>

        </div>
    )
}
