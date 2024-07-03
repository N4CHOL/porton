import { React, useEffect, useState } from 'react';
import FormField from '../../forms/field/formField';
import { FormattedMessage } from 'react-intl';
import apiService from '../../../utilities/services/ApiCall';

export default function WorkOrderFormBasic({ setPriority, setAsignee, setName, name, setDescription, description,errors, setErrors }) {
    const [prioritySelect, setPrioritySelect] = useState([]);
    const [profileSelect, setProfileSelect] = useState([]);

    useEffect(() => {
        // Fetch profile data
        apiService.get("/profile")
            .then(response => {
                setProfileSelect(response);  // Assuming the response has a data property that is an array

            })
            .catch(error => {
                console.error("Error fetching profile details:", error);
            });

        // Fetch priority data
        apiService.get("/shared/priorities")
            .then(response => {
                setPrioritySelect(response);  // Assuming the response has a data property that is an array
            })
            .catch(error => {
                console.error("Error fetching priorities details:", error);
            });
    }, []);

    const handleSelectChange = (event) => {
        const selectedId = event.target.value;
        const selected = prioritySelect.find(priority => priority.priorityId === selectedId);
        setPriority(selected);

    };

    const handleSelectChangeProfile = (event) => {
        const selectedId = event.target.value;
        const selected = profileSelect.find(profile => profile.profileId === selectedId);
        setAsignee(selected);
        console.log(profileSelect)
    };
    console.log(profileSelect)
    return (
        <div className='bg-card-background ml-8 p-8 grid md:grid-cols-12 '>
            <div className='col-span-8'>
                <FormField value={name} setValue={setName} styling={"w-80 mb-8"} span={"Name"} />
                {errors.name && <p className="text-red-500"><FormattedMessage id='errorName'/></p>}
                <div className='grid'>
                    <span className='text-custom-white'><FormattedMessage id="description" defaultMessage="Description" /></span>
                    <textarea className="w-80 mb-8" value={description} rows={4} onChange={(e) => setDescription(e.target.value)} />
                </div>
            </div>

            <div className='col-span-4'>
                <div className='grid grid-cols-2'>
                    <div className='col-span-2'>
                        <span className='text-custom-white'><FormattedMessage id="priority" defaultMessage="Priority" /></span>
                        <select id="priority" onChange={handleSelectChange} defaultValue={"1"}>
                            <option value="1" disabled>Select an option</option>
                            {prioritySelect && prioritySelect.map((option, index) => (
                                <option key={index} value={option.priorityId}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                        {errors.priority && <p className="text-red-500"><FormattedMessage id='errorPriority'/></p>}
                    </div>
                    <div>
                        <span className='text-custom-white'><FormattedMessage id="assignee" defaultMessage="Assignee" /></span>
                        <select id="assignee" onChange={handleSelectChangeProfile} defaultValue={"1"}>
                            <option value="1" disabled>Select an option</option>
                            {profileSelect && profileSelect.map((option, index) => (
                                <option key={index} value={option.profileId}>
                                    {option.firstName} {option.user.lastName}
                                </option>
                            ))}
                        </select>
                        {errors.asignee && <p className="text-red-500"><FormattedMessage id='errorAsignee'/></p>}
                    </div>
                </div>
            </div>
        </div>
    );
}