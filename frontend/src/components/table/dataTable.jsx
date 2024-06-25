// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, } from "@tanstack/react-table"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, } from '@fortawesome/free-solid-svg-icons'
import { FormattedMessage } from 'react-intl'




export default function DataTable({ data, setCellData, columns }) {

  
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [sorting, setSorting] = useState([])
  const [filtering, setFiltering] = useState("")
  const UpdateCell = (celldata) => {
    setCellData(celldata)

  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    initialState: {

    },
    state: {
      pagination,
      sorting,
      globalFilter: filtering,

    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering
  })


  return (
    <div>
      <div className='mb-3'>
        <input className='h-7 w-50' type='text' value={filtering} onChange={(e) => setFiltering(e.target.value)} />

      </div>
      <table>
        <thead>
          {
            table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map((header) => (
                    <th key={header.id} onClick={header.column.getToggleSortingHandler()}>

                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(header.column.columnDef.header,
                            header.getContext()
                          )}

                          {
                            { 'asc': "⬆", 'desc': "⬇" }[header.column.getIsSorted() ?? null]

                          }


                        </div>
                      )}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {
            table.getRowModel().rows.map((row) => (
              <tr className=' justify-center' key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  // eslint-disable-next-line react/jsx-key
                  <td onClick={() => UpdateCell(row.original)} key={index}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr>

          </tr>
        </tfoot>
      </table>
      <button className='px-2 py-1 text-black mr-1 bg-blue-500 hover:bg-blue-400' disabled={!table.getCanPreviousPage()} onClick={() => table.firstPage()}><FormattedMessage id='first' /></button>
      <button className='px-2 py-1 text-black mr-2 bg-blue-500 hover:bg-blue-400' disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}><FontAwesomeIcon icon={faArrowLeft} /></button>
       <p className='inline'>{pagination.pageIndex}</p> 
      <button className='px-2 py-1 text-black mr-1 ml-2 bg-blue-500 hover:bg-blue-400' disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}><FontAwesomeIcon icon={faArrowRight} /></button>
      <button className='px-2 py-1 text-black mr-1 bg-blue-500 hover:bg-blue-400' disabled={!table.getCanNextPage()} onClick={() => table.setPageIndex(table.getPageCount() - 1)}><FormattedMessage id='last' /></button>
      <select
        className='bg-transparent text-custom-white'
        value={table.getState().pagination.pageSize}
        onChange={e => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[5, 10, 20, 30, 40, 50].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </div>
  )
}
