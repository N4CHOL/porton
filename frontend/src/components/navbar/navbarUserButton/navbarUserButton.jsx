// eslint-disable-next-line no-unused-vars
import {React,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import NavbarUserMenu from '../navbarUserMenu/navbarUserMenu'

export default function NavbarUserButton() {
    const [showUserMenu, setShowUserMenu] = useState(false);

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
    };
    return (
        <>
        <button onClick={toggleUserMenu}   className='bg-transparent px-2 py-1'>
            <FontAwesomeIcon size='1x' icon={faUser} />
        </button>

        {showUserMenu && <NavbarUserMenu />} {/* Render NavbarUserMenu if showUserMenu is true */}
        </>
    )
}
