// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FormattedMessage } from 'react-intl'
import EditDeleteButtons from '../../buttons/editDeleteButtons/editDeleteButtons'
export default function UsersAdminCard({ cellData, setCellData }) {
    return (
        <div className='mt-8 md:ml-8 md:mr-8 md:mt-10 mb-8 bg-card-background rounded' style={{ height: 'fit-content' }}>
            <button className='py-0 px-1 bg-card-background' onClick={() => setCellData("")}>x</button>

            <div className='grid   '>
                <div>
                    <h1 className=' ml-8 text-white text-3xl '>
                        {cellData.name}
                    </h1>
                </div>

                <div className=' grid grid-cols-12 ml-8 mt-5 mr-6 items-center justify-center '>
                    <p className='py-2 text-custom-white text-sm col-span-3'><FormattedMessage id='Name' />:</p>
                    <p className='py-2 text-custom-white text-md col-span-9'>{cellData.id}</p>
                    <p className='py-2 text-custom-white text-sm col-span-3'><FormattedMessage id='Surname' />:</p>
                    <p className='py-2 text-custom-white text-md col-span-9'>{cellData.language}</p>
                    <p className='py-2 text-custom-white text-sm col-span-3'><FormattedMessage id='Position' />:</p>
                    <p className='py-2 text-custom-white text-md col-span-9'>{cellData.language}</p>
                    <p className='py-2 text-custom-white text-sm col-span-3'><FormattedMessage id='Role' />:</p>
                    <p className='py-2 text-custom-white text-md col-span-9'>{cellData.language}</p>
                    <p className='py-2 text-custom-white text-sm col-span-3'><FormattedMessage id='Email' />:</p>
                    <p className='py-2 text-custom-white text-md col-span-9'>{cellData.language}</p>
                    <p className='py-2 text-custom-white text-sm col-span-3'><FormattedMessage id='Phone' />:</p>
                    <p className='py-2 text-custom-white text-md col-span-9'>{cellData.language}</p>
                </div>
                
                <div className='grid justify-end mb-3 mt-20'>
                    
                    <div className=''>
                        <EditDeleteButtons deleteTrue={false} route={`form/${cellData.id}`} />
                    </div>

                </div>
            </div>

        </div>
    )
}
