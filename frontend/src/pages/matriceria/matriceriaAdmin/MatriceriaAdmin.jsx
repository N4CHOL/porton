import { React, useEffect, useState } from 'react'
import { format } from 'date-fns';
import { FormattedMessage } from 'react-intl';
import AdminLayout from '../../../components/admin/admin layout/adminLayout';
import apiService from '../../../utilities/services/ApiCall';
import MatriceriaLayout from '../../../components/matriceria/matriceriaLayout/MatriceriaLayout';

export default function MatriceriaAdmin() {
  const [data, setData] = useState([]);
  const filteredData = data?.filter(datas => datas?.name === "test3");
  const izquierdaId = filteredData?.reduce((maxId, item) =>
    item.description === "SX (Izquierdo)" && (maxId === null || item.maintenancePlanDetailId > maxId)
      ? item.maintenancePlanDetailId
      : maxId,
    null
  ) || null;

  const derechaId = filteredData?.reduce((maxId, item) =>
    item.description === "DX (Derecho)" && (maxId === null || item.maintenancePlanDetailId > maxId)
      ? item.maintenancePlanDetailId
      : maxId,
    null
  ) || null;

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
      header: <FormattedMessage id='Fiancata' />,
      accessorKey: "description"
    },
    {
      header: <FormattedMessage id='DateMatriceria' />,
      accessorKey: "dateHourSchedueled",
      cell: ({ getValue }) => {
        const dateValue = getValue();
        return format(new Date(dateValue), 'dd-MM-yyyy ');
      }
    },
    {
      header: <FormattedMessage id='Cargado por' />,
      accessorKey: 'asignee.user.username'
    },
  ]

console.log(filteredData)

  return (
    <>
      <MatriceriaLayout data={filteredData} columns={columns} titleTxt={"Matriceria"} izquierdaId={izquierdaId} derechaId={derechaId} />
    </>

  )
}
