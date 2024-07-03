// eslint-disable-next-line no-unused-vars
import { React, useState } from 'react'
import WorkOrderFormBasic from '../../../components/admin/workOrderForm/WorkOrderFormBasic'
import WorkOrderFormDate from '../../../components/admin/workOrderForm/WorkOrderFormDate';
import FormTitle from '../../../components/titles/formTitle/formTitle';
import SendButton from '../../../components/buttons/sendButton/SendButton';
import apiService from '../../../utilities/services/ApiCall';
import WorkOrderFormTask from '../../../components/admin/workOrderForm/WorkOrderFormTask';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast } from '../../../components/toast/Toast';



export default function WorkOrderForm() {



  //const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [asignee, setAsignee] = useState({});
  const [activities, setActivities] = useState([]);
  const [dateHourSchedueled, setDateHourSchedueled] = useState("");
  const [dateHourSchedueledEnd, setDateHourSchedueledEnd] = useState("");
  const [priority, setPriority] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const validateForm = () => {
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
      console.log("falta name")
    }
    if (Object.keys(priority).length === 0) {
      errors.priority = "Priority is required";
      console.log("falta pri")
    }

    if (Object.keys(asignee).length === 0) {
      errors.asignee = "Assignee is required";
      console.log("falta asig")
    }

    if (!dateHourSchedueled) {
      errors.dateHourSchedueled = "Scheduled start date is required";
      console.log("falta date")
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    showSuccessToast("asd");
    const isValid = validateForm();

    if (isValid) {
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
     
      //navigate("/work-order")
      //apiService.post("/maintenance-plan/detail", formData)
    } else {
      console.log("non valid")
    }
  }

  return (
    <>
      <div className=''>
        <FormTitle titleTxt={"WorkOrder"} />
      </div>
      <div className='grid md:grid-cols-2 md:gap-8'>
        <div>
          <WorkOrderFormBasic errors={errors} setErrors={setErrors} priority={priority} asignee={asignee} description={description} setDescription={setDescription} name={name} setName={setName}
            setPriority={setPriority} setAsignee={setAsignee} />
        </div>
        <div>
          <WorkOrderFormDate errors={errors} setErrors={setErrors} setDateHourSchedueled={setDateHourSchedueled} dateHourSchedueled={dateHourSchedueled} setDateHourSchedueledEnd={setDateHourSchedueledEnd}
            dateHourSchedueledEnd={dateHourSchedueledEnd} />
        </div>
      </div>
      <div className='mt-8 mb-8'>
        <WorkOrderFormTask activities={activities} setActivities={setActivities} />
      </div>
      <SendButton handleSubmit={handleSubmit} />

    </>
  )
}
