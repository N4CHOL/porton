// eslint-disable-next-line no-unused-vars
import React from 'react'

export default function TaskDetail({ task }) {
    return (
        <div>
            {task.map((item, index) => (
                <div className='bg-custom-black mr-8 grid grid-cols-12'  key={index}>
                    <div className='ml-4 col-span-2'> 
                        ...
                    </div>
                    <div> 
                    {item.name}
                    </div>
                </div>
            ))}

        </div>
    )
}
