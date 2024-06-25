// eslint-disable-next-line no-unused-vars
import React from 'react'
import DatePickerComponent from '../../datePicker/DatePickerComponent'

export default function WorkOrderFormDate({dateHourSchedueledEnd ,setDateHourSchedueledEnd,setDateHourSchedueled, dateHourSchedueled}) {
  return (
    <div className='bg-card-background  p-8 grid md:grid-cols-12'>
        <div className='col-span-6 text-custom-white'>
        <DatePickerComponent date={dateHourSchedueled} setDate={setDateHourSchedueled} text={"DateStart"}/>
        </div>
        <div className='col-span-6 text-custom-white'>
        <DatePickerComponent date={dateHourSchedueledEnd} setDate={setDateHourSchedueledEnd} text={"DateEnd"}/>
        </div>
    </div>
  )
}
