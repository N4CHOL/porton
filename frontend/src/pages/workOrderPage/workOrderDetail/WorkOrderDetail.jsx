import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiService from '../../../utilities/services/ApiCall';
import { PuffLoader } from 'react-spinners';
import WorkOrderDetailBasic from '../../../components/woView/WorkOrderDetailBasic';


export default function WorkOrderDetail() {
  let { id } = useParams()
  const [data, setData] = useState(null);

  useEffect(() => {
    apiService.get(`/maintenance-plan/detail/${id}`)
      .then(response => {
        setData(response);  // Assuming the response has a data property
        console.log(response)
      })
      .catch(error => {
        console.error("Error fetching maintenance plan details:", error);
      });
  }, [apiService]);


  return (
    <>
      {data && data != null ? (

        <>
          <WorkOrderDetailBasic data={data} />
          <div className='grid grid-cols-12 gap-8 ml-8'>
            <div className='col-span-6'>
        
            </div>
            <div className='bg-card-background col-span-6'>
              <p>{data.name}</p>
            </div>
          </div>

        </>


      ) : (
        <div className=" flex justify-center items-center">
          <PuffLoader color="#3b82f6" loading={true} size={150} />
        </div>
      )}
    </>
  )
}


