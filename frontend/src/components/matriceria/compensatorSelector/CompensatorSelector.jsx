import React, { useState } from 'react';
import "../compensatorButton.css";
import "./compensatorSelector.css"
import { FormattedMessage } from 'react-intl';

export default function CompensatorSelector({ data, valueChange, index, styling, span }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [integerPart, setIntegerPart] = useState(Math.floor(data));
    const [decimalPart, setDecimalPart] = useState(Math.round((data % 1) * 10));

    const openModal = () => setModalVisible(true);
    const closeModal = () => {
        const newValue = integerPart + decimalPart / 10;
        valueChange(index, newValue);
        setModalVisible(false);
    };

    const handleIntegerChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setIntegerPart(value >= 0 && value <= 10 ? value : integerPart);
    };

    const handleDecimalChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setDecimalPart(value >= 0 && value <= 9 ? value : decimalPart);
    };

    return (
        <div>
            <button className={styling} onClick={openModal}>
                {data}
            </button>
            {modalVisible && (
                <div className='compensatorModalOverlay' onClick={closeModal} aria-modal="true" role="dialog">
                    <div className="compensatorModal" onClick={(e) => e.stopPropagation()}>
                        <h2>Ajustar Valor</h2>
                        <h1 className='text-xl text-custom-white mb-4'>{span}</h1>
                        <div className="modalControls">
                            <div className="wheel-container">
                                <select className="p-2" value={integerPart} onChange={handleIntegerChange}>
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                                <span style={{ margin: '0 10px' }}>.</span>
                                <select className="p-2" value={decimalPart} onChange={handleDecimalChange}>
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            className="bg-red-500 text-black hover:bg-blue-300 mt-4"
                            onClick={closeModal}
                            aria-label="Close Modal"
                        >
                            <FormattedMessage id='close' />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}