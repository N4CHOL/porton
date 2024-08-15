import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom';
import "./burgerButton.css"

export default function BurgerButton({ route, buttonTxt, izquierdaId,derechaId }) {

    const [modalState, setModalState] = useState(false)
    const navigate = useNavigate()
    const handleClick = (route) => {
        // Use navigate function to navigate to a different route
        navigate(route);
    };


    return (
        <>
            <button onClick={() => setModalState(!modalState)} className='bg-blue-500 text-black hover:bg-blue-300 '>
                <FormattedMessage id={buttonTxt} />
            </button>

            {modalState && <div className='burgerModalOverlay' onClick={() => setModalState(!modalState)}>
                <div className='burgerModal' onClick={(e) => e.stopPropagation()}>
                    <button className='bg-blue-500 text-black hover:bg-blue-300 p-8 mr-2 ' onClick={(e) => handleClick(`register/${derechaId}`)} ><FormattedMessage id='DX' /></button>
                    <button className='bg-blue-500 text-black hover:bg-blue-300 p-8 ' onClick={(e) => handleClick(`register/${izquierdaId}`)}><FormattedMessage id='SX' /></button>
                </div>
            </div>}
        </>
    )
}
