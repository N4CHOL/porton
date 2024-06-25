// eslint-disable-next-line no-unused-vars
import {React} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'


export default function NavbarExitButton() {



    return (
        <>
         <button  className='bg-transparent px-2 py-1'>
            <FontAwesomeIcon size='1x' icon={faRightFromBracket} />
        </button>
   
        </>
    )
}
