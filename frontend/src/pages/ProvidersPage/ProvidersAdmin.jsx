// eslint-disable-next-line no-unused-vars
import React from 'react'
import ProvidersAdminLayout from '../../components/providers/ProvidersAdminLayout/ProvidersAdminLayout'
export default function ProvidersAdmin() {
    const columns = [
        {
          header: "ID",
          accessorKey: "id"
        },
        {
          name: "Name",
          accessorKey: "name"
        },
        {
          name: "Language",
          accessorKey: "language"
        },
      ]
      return (
        <>
        <ProvidersAdminLayout columns = {columns} titleTxt={"Providers"}/>
        </>    
      )
    }
    