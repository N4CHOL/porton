import React from 'react'

export default function MatriceriaValues({ activities }) {
    return (
        <div className="">
            {/* First column */}
            <div className="flex grid p-8">
                {activities.map((activity, index) => {
                    let correctedindex = index + 1
                    let label = `Compensador Externo Nº ${correctedindex}`; // Default label

                    switch (index) {

                        case 10:
                        case 11:
                        case 12:

                            label = `Compensador Externo Nº ${correctedindex}`;
                            break;
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                            label = `Compensador Isla Delantera Nº ${correctedindex}`;
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
                                    disabled
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Second column
            <div className="col-span-12 md:col-span-6">
                {activities.slice(9, 20).map((activity, index) => {
                    let label = 'l'; // Default label
                    let correctedindex = index + 1
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


                    }

                    return (
                        <div key={9 + index} className="mb-4">
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
            </div> */}
        </div>

    )
}
