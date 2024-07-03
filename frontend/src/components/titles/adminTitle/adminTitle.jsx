// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function AdminTitle({titleTxt}) {
  return (
    <>
        <h1 className='text-custom-white'>
            <FormattedMessage id={titleTxt}/>
        </h1>
    </>
  )
}
