//  Total edges (E): 4
//  Total nodes (N): 5
//  The cyclomatic complexity of the code is 1.


// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';


export default function SidebarButton({ routeID, langID, icon }) {
  const navigate = useNavigate();

  const handleClick = (route) => {
    // Use navigate function to navigate to a different route
    navigate(route);
  };
  return (
    <div className='grid grid-cols-3 w-full justify-center items-center hover:bg-custom-hover py-2' onClick={() => handleClick(routeID)}>
      <div className='ml-7' data-testid="sidebar-icon">
        <FontAwesomeIcon className='text-custom-white ' size='2x' icon={icon} />

      </div>
      <div>
        <h1 className='sidebarItemText' data-testid="sidebar-button"><FormattedMessage id={langID} /></h1>
      </div>
    </div>
  )
}
