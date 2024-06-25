// eslint-disable-next-line no-unused-vars
import React from 'react'
import UserFormBasicData from '../../../components/forms/userForm/userFormBasicData'
import UserFormAccountData from '../../../components/forms/userForm/userFormAccountData'

export default function UsersForm() {
  return (
    <div className='grid md:grid-cols-2'>
      <UserFormBasicData/>
      <UserFormAccountData/>
    </div>
  )
}
