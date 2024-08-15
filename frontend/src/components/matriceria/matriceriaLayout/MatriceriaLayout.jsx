// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import AdminTitle from '../../titles/adminTitle/AdminTitle.jsx'
import AddButton from '../../buttons/addButton/addButton'

import DataTable from '../../table/DataTable.jsx'
import MatriceriaCard from './MatriceriaCard.jsx'
import BurgerButton from '../../buttons/burgerButton/BurgerButton.jsx'
import "../compensatorButton.css"

export default function MatriceriaLayout({ data, columns, titleTxt, izquierdaId, derechaId }) {


    const [cellData, setCellData] = useState("")

    return (
        <div>
            <div className='md:mt-4 ml-4 md:ml-8 grid no-wrap md:grid-cols-12'>
                <div className=' md:col-span-11'>
                    <AdminTitle titleTxt={titleTxt} />
                </div>
                {
                    data != "" && (
                        <div className='mt-8 md:mt-2 md:col-span-1 justify-end'>
                            <BurgerButton route={"new"} buttonTxt={"new"} izquierdaId={izquierdaId} derechaId={derechaId} />
                        </div>
                    )
                }
            </div>
            <div className={`grid mt-8 ml-2 md:ml-8 ${cellData !== "" ? 'md:grid-cols-12' : 'card-closed'}`}>
                <div className='md:col-span-6'>
                    <DataTable columns={columns} cellData={cellData} data={data} setCellData={setCellData} />
                </div>
                {cellData !== "" &&
                    <div className='compensatorModalOverlay' onClick={(e) => setCellData("")}>
                        <div className='detailModal' onClick={(e) => e.stopPropagation()}>
                            <MatriceriaCard cellData={cellData} setCellData={setCellData} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
