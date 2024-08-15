import React, { useState } from 'react';
import "./compensatorButton.css"
import { FormattedMessage } from 'react-intl';

function CompensatorButton({ data, valueChange, index, styling,span }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState(data);

    const openModal = () => {
        setModalVisible(true);
    };
    const closeModal = () => {
        valueChange(index,value)
        setModalVisible(false);

    }
        
    

    const increment = () => setValue(prev => {
        const newValue = parseInt(prev, 10) + 1;
        return newValue > 6 ? 6 : newValue;
      });
      const decrement = () => setValue(prev => {
        const newValue = parseInt(prev, 10) - 1;
        return newValue < -6 ? -6 : newValue;
      });


    return (
        <div>

            <button className={styling} onClick={openModal} >
                {data}
            </button>
            {modalVisible &&

                <div className='compensatorModalOverlay'onClick={() => closeModal()}>
                    <div className="compensatorModal"  onClick={(e) => e.stopPropagation()}>
                        <h2>Ajustar Valor</h2>
                        <h1 className='text-xl text-custom-white mb-4'>{span}</h1>
                        <div className="modalControls">
                            <button className='p-6' onClick={decrement}>-</button>
                            <span style={{ margin: '0 10px' }}>{value}</span>
                            <button className='p-6' onClick={increment}>+</button>
                        </div>
                        <button className="bg-blue-500 text-black hover:bg-blue-300  mt-4" onClick={closeModal}><FormattedMessage id='close'/></button>
                    </div>
                </div>}

        </div>
    )
}

export default CompensatorButton