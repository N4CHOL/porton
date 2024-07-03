// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';




export default function SidebarIconButton({ routeID, icon, styling }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const handleClick = (route) => {
    // Use navigate function to navigate to a different route
    navigate(route);
  };


  return (
    <div className={`grid justify-center items-center w-full  hover:bg-custom-hover px-8 py-2 ${styling}`} onClick={() => handleClick(routeID)}>
          <FontAwesomeIcon className='text-custom-white' size='2x' icon={icon} />
    </div>
  )
}
