// eslint-disable-next-line no-unused-vars
import React from 'react'
import AdminSidebarClosed from '../adminSidebar/AdminSidebarClosed'
import OperatorSidebarClose from '../operatorSidebar/OperatorSidebarClose'


export default function SidebarClosed({userRol}) {
    return (
        <>
         {userRol === "admin" ?
                <AdminSidebarClosed/>
             :
                userRol === "operator" && 
                    <OperatorSidebarClose />
            }
        </>
    )
}
