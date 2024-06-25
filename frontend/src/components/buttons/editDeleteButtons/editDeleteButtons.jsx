// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom';

export default function EditDeleteButtons({route,deleteTrue}) {
    const navigate = useNavigate();

    const handleClick = (route) => {
        // Use navigate function to navigate to a different route
        navigate(route);
    };

  return (
    <div className='grid grid-cols-2 justify-end'>
        {deleteTrue && <button className='px-2 py-1 mr-2 bg-transparent text-red-400 hover:text-red-500'><FormattedMessage id="Delete"/></button>}

        <button onClick={() => handleClick(route)}  className='px-2 py-1 bg-blue-500 text-black hover:bg-blue-400' ><FormattedMessage id="Edit"/></button>
    </div>
  )
}
