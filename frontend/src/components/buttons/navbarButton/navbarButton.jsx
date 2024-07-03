// eslint-disable-next-line no-unused-vars
import React from 'react'
import NavbarUserButton from '../../navbar/navbarUserButton/navbarUserButton'
import NavbarExitButton from '../../navbar/navbarExitButton/navbarExitButton'

export default function NavbarButton() {
    return (
        <>
            <div className='flex grid grid-cols-12 gap-8 w-100'>
                <div className='col-span-2'>
                    <NavbarUserButton />
                </div>
                <div className='col-span-2'>
                    <NavbarExitButton />
                </div>
            </div>

        </>

    )
}
