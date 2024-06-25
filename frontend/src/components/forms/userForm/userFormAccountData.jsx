// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FormattedMessage } from 'react-intl'
import "./userForm.css"
import FormField from '../field/formField'

export default function UserFormAccountData() {
    return (
        <div className='grid rounded p-8 bg-card-background ml-8 mr-4 mt-4 md:mt-0' style={{ height:'fit-content' }}  >

            <div className=''>

                <div className=' grid justify-center'>
                    <h1 className='text-custom-white'><FormattedMessage id="Account" /> </h1>
                </div>
                <div className='grid grid-cols-12  mt-8'>
                    <div className='col-span-3 md:col-span-1'>
                        <label className="toggle-switch">
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div>
                        <span className='text-custom-white'><FormattedMessage id="Active" /></span>
                    </div>
                </div>
                <div className='mt-8'>
                    <span className='text-custom-white'><FormattedMessage id="Role" /></span>
                </div>
                <div className='mt-8'>
                    <FormField stiling={"userInput"} span={"Username"} />
                </div>
                <div className='mt-8'>
                    <FormField stiling={"userInput"} span={"Email"} />
                </div>
                <div className='mt-8'>
                    <FormField stiling={"userInput"} span={"password"} />
                </div>

            </div>
        </div>

    )
}