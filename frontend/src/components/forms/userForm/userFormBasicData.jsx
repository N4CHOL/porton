// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FormattedMessage } from 'react-intl'
import "./userForm.css"
import FormField from '../field/formField'

export default function UserFormBasicData() {
    return (
        <div className='grid rounded p-8 bg-card-background ml-8 mr-4' style={{ height: 'fit-content' }}  >

            <div className=''>
                <div className=' grid justify-center'>
                    <h1 className='text-custom-white'><FormattedMessage id="BasicData" /> </h1>
                </div>
                <div className='mt-8'>
                   
                    <FormField stiling={"userInput"} span={"Name"}/>
                </div>
                <div className='mt-8'>
                    <FormField stiling={"userInput"} span={"Surname"}/>
                </div>
                <div className='mt-8'>
                    <FormField stiling={"userInput"} span={"Position"}/>
                </div>
                <div className='mt-8'>
                    <span className='text-custom-white'><FormattedMessage id="Phone" /></span>
                    <div className='grid grid-cols-12'>
                    <input className='col-span-2 justify-center' placeholder='000' style={{ width: '70%' }} />
                    <input className='col-span-10' style={{ width: '40%' }} />
                    </div>
                </div>
            </div>
        </div>

    )
}
