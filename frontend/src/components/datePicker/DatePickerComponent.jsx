// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';
import { FormattedMessage } from 'react-intl';

export default function DatePickerComponent({ setDate, date, text }) {
    const minDate = new Date();
    const maxDate = addDays(new Date(), 365); // Example: maximum date is 30 days from today

    const handleDateChange = (date) => {
        
        setDate(date);
    };


    return (
   
            <div>
                <label><FormattedMessage id={text}/></label>
                <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="YYYY-MM-DDTHH:mm:ss.SSS"
                    minDate={minDate}
                    maxDate={maxDate}
                />
            </div>
     
    );
}
