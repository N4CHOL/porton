// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom';

export default function AddButton({buttonTxt,route}) {
  const navigate = useNavigate();

  const handleClick = (route) => {
      // Use navigate function to navigate to a different route
      navigate(route);
  };
  return (
    <>
    <button onClick={() => handleClick(route)}  className='bg-blue-500 text-black hover:bg-blue-300 '>
        <FormattedMessage id={buttonTxt}/>
    </button>
    </>
  )
}
