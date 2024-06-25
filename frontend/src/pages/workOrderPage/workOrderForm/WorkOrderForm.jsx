// eslint-disable-next-line no-unused-vars
import { React, useState } from 'react'
import WorkOrderFormBasic from '../../../components/admin/workOrderForm/WorkOrderFormBasic'
import WorkOrderFormDate from '../../../components/admin/workOrderForm/WorkOrderFormDate';
import FormTitle from '../../../components/titles/formTitle/formTitle';
import SendButton from '../../../components/buttons/sendButton/SendButton';
import apiService from '../../../utilities/services/ApiCall';
import WorkOrderFormTask from '../../../components/admin/workOrderForm/WorkOrderFormTask';

export default function WorkOrderForm() {
  //const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [asignee, setAsignee] = useState({});
  const [activities, setActivities] = useState([]);
  const [dateHourSchedueled, setDateHourSchedueled] = useState("");
  const [dateHourSchedueledEnd, setDateHourSchedueledEnd] = useState("");
  const [priority, setPriority] = useState([]);


  const handleSubmit = () => {
    const formData = {
      activities,
      asignee,
      dateHourSchedueled,
      dateHourSchedueledEnd,
      description,
      name,
      priority,
    };
    console.log('Form Data:', formData);
    apiService.post("/maintenance-plan/detail", formData)

    // Perform further actions like sending the data to an API
  };


  return (
    <>
      <div className=''>
        <FormTitle titleTxt={"WorkOrder"} />
      </div>
      <div className='grid md:grid-cols-2 md:gap-8'>
        <div>
          <WorkOrderFormBasic priority={priority} asignee={asignee} description={description} setDescription={setDescription} name={name} setName={setName}
            setPriority={setPriority} setAsignee={setAsignee} />
        </div>
        <div>
          <WorkOrderFormDate setDateHourSchedueled={setDateHourSchedueled} dateHourSchedueled={dateHourSchedueled} setDateHourSchedueledEnd={setDateHourSchedueledEnd}
            dateHourSchedueledEnd={dateHourSchedueledEnd} />
        </div>
      </div>
      <div className='mt-8 mb-8'>
        <WorkOrderFormTask activities={activities} setActivities={setActivities}/>
      </div>
      <SendButton handleSubmit={handleSubmit} />

    </>
  )
}
