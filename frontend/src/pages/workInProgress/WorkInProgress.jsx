import React from 'react'
import { FormattedMessage } from 'react-intl'
import logo from '../../assets/img/page/workInProgress.png';
import "./workInProgress.css"
export default function WorkInProgress() {
    return (
        <div className='flex grid justify-center'>
            <div>
                <h1 className='mt-20 text-custom-white'><FormattedMessage id='WorkInProgress' /></h1>

            </div>
            <div className='flex  justify-center'>
                <img className='workInProgressImg' src={logo} alt="Image Not Found" />

            </div>
        </div>
    )
}
