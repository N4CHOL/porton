// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FormattedMessage } from 'react-intl'
import PriorityPill from '../../priorityPill/PriorityPill'
import TaskDetail from './taskDetail/TaskDetail'
import { useNavigate } from 'react-router-dom'


export default function AdminCard({ cellData, setCellData }) {

  const navigate = useNavigate();

  const handleClick = (route) => {
   console.log(cellData)
      navigate(route);
  };
  
  console.log(cellData)

  return (
    <div className='mt-8 md:ml-8 md:mr-8 md:mt-10 mb-8 bg-card-background rounded' style={{ height: 'fit-content' }}>
      <button className='py-0 px-1 bg-card-background' onClick={() => setCellData("")}>x</button>

      <div className='grid  '>
        <div className='ml-8 mt-2 mb-3'>
          <PriorityPill priority={cellData.priority} />
        </div>
        <div>
          <h1 className=' ml-8 text-custom-white text-3xl '>
            {cellData.name}

          </h1>
          <h1 className=' ml-8 text-custom-white text-sm '>
            {cellData.description}
          </h1>
        </div>

        <div className='ml-8 mt-5 mr-6'>
          <p className='text-custom-white text-sm'>
          </p>
        </div>
        <div className='text-xl text-custom-white ml-8 mt-5'>
          <FormattedMessage id='Task' />:
          <TaskDetail task={cellData.activities} />
        </div>
        <div className=' text-black ml-8 mt-5'>
          <button className='bg-blue-500 hover:bg-blue-300 mb-4' onClick={() => handleClick(`detail/${cellData.maintenancePlanDetailId}`)} >
            <FormattedMessage id='Detail' />
          </button>
        </div>

      </div>

    </div>
  )
}
