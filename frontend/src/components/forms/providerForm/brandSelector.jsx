// eslint-disable-next-line no-unused-vars
import React from 'react'
import { faThumbTack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'


export default function BrandSelector() {
  return (
    <div className='grid grid-cols-12'>
        <div>
        <FontAwesomeIcon className='text-custom-white' icon={faThumbTack}/>
        </div>
        <div>
            
        </div>
    </div>
  )
}
