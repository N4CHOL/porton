// eslint-disable-next-line no-unused-vars
import React from 'react'
import UsersAdminLayout from '../../components/users/usersAdminLayout'
export default function UserAdmin() {
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

      <UsersAdminLayout columns={columns} titleTxt={"Users"} />

    </>


  )
}
