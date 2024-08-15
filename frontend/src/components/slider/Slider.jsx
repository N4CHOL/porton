// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import "./slider.css"
export default function Slider({ value, setValue }) {


    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div className="slider-container grid grid-cols-12">
            <div className='col-span-10'>
                <input
                    className='sliderBar'
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={value}
                    onChange={handleChange}

                />
            </div>
            <div className='col-span-2'>
                <span className='value-display'>{(value * 100).toFixed(0)}%</span>
            </div>

        </div>
    )
}
