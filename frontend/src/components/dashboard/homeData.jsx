// eslint-disable-next-line no-unused-vars
import React from 'react'
import "./dashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from "@fortawesome/free-solid-svg-icons"



export default function HomeData() {




    return (
        <div className='justify-center homeCard'>
            <div className=' grid grid-cols-7'>
                <div>
                    <FontAwesomeIcon className='text-custom-white ' size='2x' icon={faChartLine} />
                </div>
                <div>
                    <h1 className='homeTitle'>Ver Datos</h1>
                </div>
            </div>

        </div>
    )
}
