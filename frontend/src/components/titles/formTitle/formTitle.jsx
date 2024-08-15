// eslint-disable-next-line no-unused-vars
import React from 'react'
import AdminTitle from '../adminTitle/AdminTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'


export default function FormTitle({ titleTxt }) {

    const back = () => {
        window.history.back()
    }

    return (
        <div className='grid md:grid-cols-12 items-center '>
            <div className='ml-8 col-span-1'>
                <button onClick={() => back()} className='px-1 py-1'>
                    <FontAwesomeIcon className='text-custom-white hover:text-blue-200' size='2x' icon={faArrowLeftLong} />

                </button>
            </div>
            <div className='col-span-11 ml-8 md:ml-0 '>
                <AdminTitle titleTxt={titleTxt} />
            </div>
        </div>
    )
}
