import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';

export default function WorkOrderDetailBasic({ data }) {
    return (
        <>

            <div className='ml-8  p-8 bg-card-background  mb-8 grid grid-cols-12'>
                <div className='col-span-11'>
                    <div>
                        <h1 className='text-custom-white text-4xl'>{data.name}</h1>
                    </div>
                    <div>
                        <p className='custom-white-grey'>{data.description}</p>
                    </div>
                    <div className=' grid'>
                        <div className='inline-flex'>
                            <div className='text-custom-white mr-2'><FontAwesomeIcon icon={faUser} /></div>
                            <div className='text-custom-white'><h1 className='text-xl'><FormattedMessage id='assignee' />:</h1></div>
                            <div className='custom-white-grey mt-1 ml-1'><p>{data.asignee.firstName}</p></div>
                            <div className='custom-white-grey mt-1 ml-1'><p>{data.asignee.user.lastName}</p></div>
                        </div>
                        <div className='inline-flex'>
                            <div className='text-custom-white mr-2'><FontAwesomeIcon icon={faUser} /></div>
                            <div className='text-custom-white'><h1 className='text-xl'><FormattedMessage id='priority' />:</h1></div>
                            <div className='custom-white-grey mt-1 ml-1'><p>{data.priority.name}</p></div>
                        </div>
                    </div>
                </div>
                <div className='col-span-1 flex flex-col items-start justify-start gap-4'>
                    <button className='bg-blue-500 hover:bg-blue-300 h-10 py-2 px-4 w-full'>modificar</button>
                    <button className='bg-red-500 hover:bg-red-300 h-10 py-2 px-4 w-full'>eliminar</button>
                </div>
            </div>

        </>
    )
}
