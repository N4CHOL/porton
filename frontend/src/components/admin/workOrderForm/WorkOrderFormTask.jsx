// eslint-disable-next-line no-unused-vars
import { React, useState, useEffect } from 'react';
import "./workOrderForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import apiService from '../../../utilities/services/ApiCall';
import { FormattedMessage } from 'react-intl';
import "./workOrderForm.css"
export default function WorkOrderFormTask({ activities, setActivities, errors }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assetOptions, setAssetOptions] = useState([]);
  const [profileOptions, setProfileOptions] = useState([]);

  useEffect(() => {
    apiService.get("/assetsWO")
      .then(response => {
        setAssetOptions(response);  // Assuming the response has a data property
      })
      .catch(error => {
        console.error("Error fetching maintenance plan details:", error);
      });

    apiService.get("/profile")
      .then(response => {
        setProfileOptions(response);  // Assuming the response has a data property
      })
      .catch(error => {
        console.error("Error fetching maintenance plan details:", error);
      });
  }, []);

  const handleAddActivity = () => {
    // Generate a unique ID for the new activity
    const newId = activities.length ? activities[activities.length - 1].id + 1 : 1;
    const newActivity = { id: newId, name: name, description: description, asset: "", asignee: "" };
    setActivities([...activities, newActivity]);
    setName("");
    setDescription("");
    console.log(activities);
  };

  const handleInputChange = (id, field, value) => {
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    );
  };

  const handleAssetChange = (id, value) => {
    const selectedAsset = assetOptions.find(option => option.assetId === value);
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === id ? { ...activity, asset: selectedAsset } : activity
      )
    );
  };

  const handleAssigneeChange = (id, value) => {
    const selectedAssignee = profileOptions.find(option => option.profileId === value);
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === id ? { ...activity, asignee: selectedAssignee } : activity
      )
    );
  };
  const handleRemoveActivity = (id) => {
    setActivities(prevActivities =>
      prevActivities.filter(activity => activity.id !== id)
    );
  };

  return (
    <>
      <div className='bg-card-background ml-8 p-8 ml-8   mr-8 md:mr-0'>
        {activities.map(activity => (
          <div key={activity.id} className='taskDiv grid md:grid-cols-12'>
            <div className='col-span-4 mb-6 lg:mb-0  '>
              <div className='mb-4'>
                <input className='taskInput'
                  value={activity.name}
                  onChange={(e) => handleInputChange(activity.id, 'name', e.target.value)}
                />
                {errors.activities?.[activity.id]?.name && (
                  <p className="text-red-500">
                    <FormattedMessage id='errorName' />
                  </p>
                )}
              </div>
              <div>
                <input className='taskInput'
                  value={activity.description}
                  onChange={(e) => handleInputChange(activity.id, 'description', e.target.value)}
                />
              </div>

            </div>

            <div className='col-span-3 mb-8 lg:mb-0 '>
              <select
                id="asset"
                value={activity.asset?.assetId || ''}
                onChange={(e) => handleAssetChange(activity.id, e.target.value)}
                defaultValue=""
              >
                <option value='' disabled><FormattedMessage id='selectAsset' /></option>
                {assetOptions.map((option) => (
                  <option key={option.assetId} value={option.assetId}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='col-span-4   '>
              <select
                id="assignee"
                value={activity.asignee.profileId || ''}
                onChange={(e) => handleAssigneeChange(activity.id, e.target.value)}
                defaultValue=""
              >
                <option value='' disabled><FormattedMessage id='selectAsignee' /></option>
                {profileOptions.map((option) => (
                  <option key={option.profileId} value={option.profileId}>
                    {option.firstName} {option.user.lastName}
                  </option>
                ))}
              </select>
              {errors.activities?.[activity.id]?.asignee && (
                <p className="text-red-500">
                  <FormattedMessage id='errorAsignee' />
                </p>
              )}
            </div>

            <div className='col-span-1 flex justify-center'>
              <button className='text-red-500 bg-transparent ' onClick={() => handleRemoveActivity(activity.id)}> <FontAwesomeIcon icon={faTrashCan} /></button>
            </div>
          </div>
        ))}

        <button className='taskButton' onClick={handleAddActivity}>
          <FontAwesomeIcon className='text-custom-white' icon={faPlus} />
        </button>
      </div>
    </>
  );
}