import React, { useState } from 'react';


export default function MatriceriaModalSend({ data, handleInput, setSend }) {
    const [modalVisible, setModalVisible] = useState(true);
    const [value, setValue] = useState(data);
    const midPoint = Math.ceil(data.activities.length / 2);

    const closeModal = () => {

        setSend(false);

    }





    return (
        <div className='compensatorModalOverlay' onClick={closeModal}>
            <div className="compensatorSendModal" onClick={(e) => e.stopPropagation()}>
                <div className="grid grid-cols-12 gap-4">
                    {/* First column */}
                    <div className="col-span-12 md:col-span-6">
                        {data.activities.slice(0, 9).map((activity, index) => {
                            let label = 'l'; // Default label
                            switch (index) {
                                case 0:
                                    label = `Compensador Externo Nº ${index+1}`;
                                    break;
                                case 1:
                                    label = `Compensador Externo Nº ${index+1}`;
                                    break;
                                case 2:
                                    label = `Compensador Externo Nº ${index+1}`;
                                    break;
                                case 3:
                                    label = `Compensador Externo Nº ${index+1}`;
                                    break;
                                case 4:
                                    label = `Compensador Externo Nº ${index+1}`;
                                    break;
                                case 5:
                                    label = `Compensador Externo Nº ${index+1}`;
                                    break;
                                case 6:
                                    label = `Compensador Externo Nº ${index+1}`;
                                    break;
                                case 7:
                                    label = `Compensador Externo Nº ${index+1}`;
                                    break;
                                case 8:
                                    label = `Compensador Externo Nº ${index+1}`;
                                    break;
                                case 9:
                                    label = `Compensador Externo Nº ${index+1}`;
                                    break;


                            }

                            return (
                                <div key={index} className="mb-4">
                                    <div className="flex items-center">
                                        <p className="text-xl mr-2">{label}</p>
                                        <input
                                            value={activity.name}
                                            className="matriceriaInput w-full"
                                            type="text"
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Second column */}
                    <div className="col-span-12 md:col-span-6">
                        {data.activities.slice(9, 19).map((activity, index) => {
                            let label = 'l'; // Default label
                            switch (index) {
                                case 0:
                                    label = `Compensador Externo Nº ${index + 10}`;
                                    break;
                                case 1:
                                    label = `Compensador Externo Nº ${index + 10}`;
                                    break;
                                case 2:
                                    label = `Compensador Externo Nº ${index + 10}`;
                                    break;
                                case 3:
                                    label = `Compensador Isla Trasera Nº ${index + 10}`;
                                    break;
                                case 4:
                                    label = `Compensador Isla Trasera Nº ${index + 10}`;
                                    break;
                                case 5:
                                    label = `Compensador Isla Trasera Nº ${index + 10}`;
                                    break;
                                case 6:
                                    label = `Compensador Isla Delantera Nº ${index + 10}`;
                                    break;
                                case 7:
                                    label = `Compensador Isla Delantera Nº ${index + 10}`;
                                    break;
                                case 8:
                                    label = `Compensador Isla Delantera Nº ${index + 10}`;
                                    break;
                                case 9:
                                    label = `Compensador Isla Delantera Nº ${index + 10}`;
                                    break;
                                    case 10:
                                        label = `Compensador Isla Delantera Nº ${index + 10}`;
                                        break;

                            }

                            return (
                                <div key={9 + index} className="mb-4">
                                    <div className="flex items-center grid grid-cols-12">
                                        <div className='col-span-10'>
                                            <p className="text-xl ">{label}</p>
                                        </div>
                                        <div className='col-span-2'>
                                            <input
                                                disabled
                                                value={activity.name}
                                                className="matriceriaInput"
                                                type="text"
                                            />
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <h1 className='text-3xl text-custom-white'>Estos datos son correctos?</h1>
                </div>
                <button className="bg-blue-500 hover:bg-blue-300 text-black" onClick={handleInput}>Enviar</button>
            </div>
        </div>
    );
}

