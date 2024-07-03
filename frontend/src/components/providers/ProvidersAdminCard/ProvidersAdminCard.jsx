// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage } from 'react-intl'
import { faThumbTack } from '@fortawesome/free-solid-svg-icons'
import EditDeleteButtons from '../../buttons/editDeleteButtons/editDeleteButtons'


export default function ProvidersAdminCard({ cellData, setCellData }) {

    return (
        <div className='mt-8 md:ml-8 md:mr-8 md:mt-10 mb-8 bg-card-background rounded' style={{ height: 'fit-content' }}>
            <button className='py-0 px-1 bg-card-background' onClick={() => setCellData("")}>x</button>

            <div className='grid  '>
                <div>
                    <h1 className=' ml-8 text-white text-3xl '>
                        {cellData.name}
                    </h1>
                </div>

                <div className='h-24 grid grid-cols-12 ml-8 mt-5 mr-6 items-center justify-center'>
                    <p className='text-custom-white text-sm col-span-3'><FormattedMessage id='Adress' />:</p>
                    <p className='text-custom-white text-md col-span-9'>{cellData.language}</p>
                    <p className='text-custom-white text-sm col-span-3'><FormattedMessage id='email' />:</p>
                    <p className='text-custom-white text-md col-span-9'>{cellData.language}</p>
                    <p className='text-custom-white text-sm col-span-3'><FormattedMessage id='Phone' />:</p>
                    <p className='text-custom-white text-md col-span-9'>{cellData.language}</p>
                </div>
                <div className='h-24 grid grid-cols-12 ml-8 mr-6 items-center justify-center '>
                    <FontAwesomeIcon className='col-span-1 text-custom-hover' icon={faThumbTack} />
                    <h1 className='col-span-10 text-sm text-custom-white'>
                        <FormattedMessage id='registeredMarksTitle' />
                    </h1>

                </div>
                <div className=' grid rounded ml-8 mr-6 items-center justify-center bg-custom-black mb-8'>s</div>


              
                <div className='grid grid-cols-2 justify-end mb-3'>
                    <div></div>
                    <div className='col-span-1  justify-end mr-6'> 
                    <EditDeleteButtons route={`form/${cellData.id}`} />
                    </div>

                </div>
            </div>

        </div>
    )
}
