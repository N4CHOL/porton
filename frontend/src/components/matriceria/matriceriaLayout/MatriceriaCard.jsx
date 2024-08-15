// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'
import MatriceriaValues from './MatriceriaValues';


export default function MatriceriaCard({ cellData, setCellData }) {

    const navigate = useNavigate();
    console.log(cellData)

    const handleClick = (route) => {
        navigate(route);
    };

    const sortedActivities = cellData.activities.sort((a, b) =>
        Number(a.description) - Number(b.description)
    );

    // Update the state with the sorted activities
    //setCellData({ ...cellData, activities: sortedActivities });



    return (
        <div className='mt-8 md:ml-8 md:mr-8 md:mt-10 mb-8 bg-card-background rounded' style={{ width: 'fit-content', height: 'fit-content' }}>


            <div className='grid mt-8'>
                <MatriceriaValues activities={cellData.activities} />
            </div>
            <button className='bg-blue-500 text-black hover:bg-blue-300 ' onClick={(e) => setCellData("")}><FormattedMessage id='close' /></button>
        </div>
    )
}
