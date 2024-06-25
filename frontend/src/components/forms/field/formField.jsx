// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function FormField({span, stiling, setValue, value}) {
  return (
    <div>
        <span className='text-custom-white'><FormattedMessage id={span} /></span>
        <input value={value} onChange={(e)=>setValue(e.target.value)} className={stiling}  />
    </div>
  )
}
