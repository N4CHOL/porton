// eslint-disable-next-line no-unused-vars
import React from 'react'
import FormTitle from '../../titles/formTitle/formTitle'
import FormField from '../field/formField'
import { FormattedMessage } from 'react-intl'
import BrandSelector from './brandSelector'

export default function ProviderForm() {
    return (
    <>
        <FormTitle titleTxt={"Providers"} />

        <div className='grid grid-cols-3 bg-card-background ml-8 mt-14 p-8'>
            <div>
                <FormField stiling={"w-80 mb-8"} span={"Name"} />
                <FormField stiling={"w-80 mb-8"} span={"Adress"} />
                <FormField stiling={"w-80 mb-8"} span={"Email"} />
                <div className='mt-8'>
                    <span className='text-custom-white'><FormattedMessage id="Phone" /></span>
                    <div className='grid grid-cols-12'>
                        <input className='col-span-3 justify-center' placeholder='000' style={{ width: '70%' }} />
                        <input className='col-span-9' style={{ width: '70%' }} />
                    </div>
                </div>
            </div>
            <div>

            </div>
            <div>
                <BrandSelector/>
            </div>

        </div>
    </>

    )
}
