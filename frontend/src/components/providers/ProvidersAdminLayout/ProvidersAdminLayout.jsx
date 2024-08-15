// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'

import DataTable from '../../table/DataTable.jsx'
import AdminTitle from '../../titles/adminTitle/AdminTitle.jsx'
import ProvidersAdminCard from '../ProvidersAdminCard/ProvidersAdminCard.jsx'
import AddButton from '../../buttons/addButton/addButton.jsx'

export default function ProvidersAdminLayout({columns, titleTxt}) {
    const [cellData, setCellData] = useState("")

    return (
        <div>
            <div className='md:mt-4 ml-4 md:ml-8 grid  md:grid-cols-12'>
                <div className=' md:col-span-11'>
                    <AdminTitle titleTxt={titleTxt} />
                </div>
                <div className='mt-8 md:mt-1 md:col-span-1 justify-end'>
                    <AddButton route={"new"} buttonTxt={"new"} />
                </div>
            </div>
            <div className={`grid mt-8 ml-2 md:ml-8 ${cellData !== "" ? 'md:grid-cols-3' : 'card-closed'}`}>
                <div className='md:col-span-2'>
                <DataTable columns={columns} cellData={cellData} setCellData={setCellData} />
                </div>
                {cellData !== "" && <ProvidersAdminCard cellData={cellData} setCellData={setCellData} />}
            </div>
        </div>
    )
}
