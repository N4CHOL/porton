// eslint-disable-next-line no-unused-vars
import {React,useEffect, useState} from 'react'
import AdminLayout from '../../components/admin/admin layout/adminLayout'
import apiService from '../../utilities/services/ApiCall';
import { format } from 'date-fns';
import { FormattedMessage } from 'react-intl';


export default function WorkOrderAdmin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiService.get("/maintenance-plan/detail")
        .then(response => {
            setData(response);  // Assuming the response has a data property
        })
        .catch(error => {
            console.error("Error fetching maintenance plan details:", error);
        });
}, [apiService]);


  const columns = [
    {
      header: "ID",
      accessorKey: "maintenancePlanDetailId"
    },
    {
      header: <FormattedMessage id='name'/>,
      accessorKey: "name"
    },
    {
      header: <FormattedMessage id='assignee'/>,
      accessorKey: "asignee.firstName"
    },
    {
      header: <FormattedMessage id='priority'/>,
      accessorKey: "priority.name"
    },
    {
      header:  <FormattedMessage id='DateEnd'/>,
      accessorKey: "dateHourSchedueledEnd",
      cell: ({ getValue }) => {
        const dateValue = getValue();
        return format(new Date(dateValue), 'dd-MM-yyyy ');
      }
    },
  ]

  return (
    <>
    <AdminLayout data={data} columns = {columns} titleTxt={"WorkOrder"}/>
    </>
   
    
  )
}
