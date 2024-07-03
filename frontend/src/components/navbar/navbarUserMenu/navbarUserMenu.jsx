// eslint-disable-next-line no-unused-vars
import {React,useState} from 'react'
import "./navbarUserMenu.css"
import { FormattedMessage } from 'react-intl'
import LanguageSelector from '../../languageSelector/languageSelector';
export default function NavbarUserMenu({changeLanguage}) {
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const toggleUserMenu = () => {
        setShowLanguageMenu(!showLanguageMenu);
    };

    return (
        <div className='navbarUserMenuCard'>

            <div className='grid  w-full justify-center items-center'>
                <div>
                    <button onClick={toggleUserMenu} className='py-1 px-2'>
                       <label><FormattedMessage id='language'/></label>
                    </button>
                    {showLanguageMenu && <LanguageSelector changeLanguage={changeLanguage} />} {/* Render NavbarUserMenu if showUserMenu is true */}
                </div>
            </div>
        </div>
    )
}
