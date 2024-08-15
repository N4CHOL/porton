// eslint-disable-next-line no-unused-vars
import React from 'react'
import DatePickerComponent from '../../datePicker/DatePickerComponent'
import { FormattedMessage } from 'react-intl'

export default function WorkOrderFormDate({dateHourSchedueledEnd ,setDateHourSchedueledEnd,setDateHourSchedueled, dateHourSchedueled, errors, setErrors}) {
  return (
    <div className='bg-card-background  p-8 grid md:grid-cols-12 ml-8 mt-8 md:ml-0 md:mt-0 mr-8 md:mr-0' >
        <div className='col-span-6 text-custom-white'>
        <DatePickerComponent date={dateHourSchedueled} setDate={setDateHourSchedueled} text={"DateStart"}/>
        {errors.dateHourSchedueled && <p className="text-red-500"><FormattedMessage id='errorDate'/></p>}
        </div>
        <div className='col-span-6 text-custom-white'>
        <DatePickerComponent date={dateHourSchedueledEnd} setDate={setDateHourSchedueledEnd} text={"DateEnd"}/>
        </div>
    </div>
  )
}
