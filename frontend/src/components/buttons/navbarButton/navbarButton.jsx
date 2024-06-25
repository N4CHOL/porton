// eslint-disable-next-line no-unused-vars
import React from 'react'
import NavbarUserButton from '../../navbar/navbarUserButton/navbarUserButton'
import NavbarExitButton from '../../navbar/navbarExitButton/navbarExitButton'

export default function NavbarButton() {
    return (
        <>
            <div className='flex grid grid-cols-2 gap-3'>
                <div className='col'>
                    <NavbarUserButton />
                </div>
                <div className='col'>
                    <NavbarExitButton />
                </div>
            </div>

        </>

    )
}
