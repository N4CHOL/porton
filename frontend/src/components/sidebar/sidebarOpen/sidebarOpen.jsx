// eslint-disable-next-line no-unused-vars
import React from 'react'
import AdminSidebar from '../adminSidebar/AdminSidebar'
import OperatorSidebar from '../operatorSidebar/OperatorSidebar'



export default function SidebarOpen({ userRol }) {


    return (
        <>
            {userRol === "admin" ?
                <AdminSidebar />
             :
                userRol === "operator" && 
                    <OperatorSidebar />
            }
        </>

    )
}
