// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function SendButton({ handleSubmit }) {
  return (
    <>
    <button className='bg-blue-500 hover:bg-blue-300 text-black' onClick={handleSubmit} ><FormattedMessage id='Send'/></button>
    </>
  )
}
