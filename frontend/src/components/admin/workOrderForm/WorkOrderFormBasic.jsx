// eslint-disable-next-line no-unused-vars
import { React, useEffect, useState } from 'react'
import FormField from '../../forms/field/formField'
import { FormattedMessage } from 'react-intl'
import apiService from '../../../utilities/services/ApiCall'




export default function WorkOrderFormBasic({ setPriority, setAsignee,setName, name, setDescription, description  }) {
    const [prioritySelect, setPrioritySelect] = useState([]);
    const [profileSelect, setProfileSelect] = useState([]);

    useEffect(() => {
        apiService.get("/profile")
            .then(response => {
                setProfileSelect(response);  // Assuming the response has a data property
            })
            .catch(error => {
                console.error("Error fetching maintenance plan details:", error);
            });



        apiService.get("/shared/priorities")
            .then(response => {
                setPrioritySelect(response);  // Assuming the response has a data property
            })
            .catch(error => {
                console.error("Error fetching maintenance plan details:", error);
            });
    }, []);

    const handleSelectChange = (event) => {
        const selectedId = event.target.value;
        const selected = prioritySelect.find(priority => priority.priorityId === selectedId);
        setPriority(selected);
      
    };
    const handleSelectChangeProfile = (event) => {
        const selectedId = event.target.value;
        const selected = profileSelect.find(profileSelect => profileSelect.profileId === selectedId);
        setAsignee(selected);
 
    };

  
    return (
        <div className='bg-card-background ml-8 p-8 grid  md:grid-cols-12'>
            <div className='col-span-8 '>
                <FormField value={name} setValue={setName} stiling={"w-80 mb-8"} span={"Name"} />
                <div className='grid'>
                    <span className='text-custom-white'><FormattedMessage id={"Name"} /></span>
                    <textarea className="w-80 mb-8" value={description} rows={4} onChange={(e)=>setDescription(e.target.value)} />
                </div>
            </div>

            <div className='col-span-4 grid '>
                <div>
                    <span className='text-custom-white'><FormattedMessage id={"Name"} /></span>
                    <select id="options" value={prioritySelect?.name || ''} onChange={handleSelectChange}>
                        <option value="" disabled>Select an option</option>
                        {prioritySelect.map((option, index) => (
                            <option key={index} value={option.priorityId}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <span className='text-custom-white'><FormattedMessage id={"Name"} /></span>
                    <select id="options" value={prioritySelect?.name || ''} onChange={handleSelectChangeProfile}>
                        <option value="" disabled>Select an option</option>
                        {profileSelect.map((option, index) => (
                            <option key={index} value={option.profileId}>
                                {option.firstName}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </div>
    )
}
