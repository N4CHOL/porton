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
import { faPager } from '@fortawesome/free-solid-svg-icons';



export default function WorkOrderForm() {



  //const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [asignee, setAsignee] = useState({});
  const [activities, setActivities] = useState([]);
  const [dateHourSchedueled, setDateHourSchedueled] = useState("");
  const [dateHourSchedueledEnd, setDateHourSchedueledEnd] = useState(null);
  const [priority, setPriority] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const validateForm = () => {
    let errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";

    }
    if (Object.keys(priority).length === 0) {
      errors.priority = "Priority is required";

    }

    if (Object.keys(asignee).length === 0) {
      errors.asignee = "Assignee is required";

    }

    if (!dateHourSchedueled) {
      errors.dateHourSchedueled = "Scheduled start date is required";

    }

    if (activities != null) {
   
      activities.forEach((activity) => {
        if (!errors.activities) {
          errors.activities = {};
        }


        // if (!activity.name.trim()) {
        //   if (!errors.activities[activity.id]) {
        //     errors.activities[activity.id] = {};
        //   }
        //   errors.activities[activity.id].name = { message: "Activity name is required" };
        // }

        // Check for activity assignee
        if (!activity.asignee.profileId) {
          
          if (!errors.activities[activity.id]) {
            errors.activities[activity.id] = {};
          }

          errors.activities[activity.id].asignee = { message: "asignee is required" };
        }
       
      });
    }

    if (errors.activities && Object.keys(errors.activities).length === 0) {
      delete errors.activities; // Remove the activities object if empty
    }

    setErrors(errors);
    console.log(errors)

    return Object.keys(errors).length === 0;
  };


  const handleSubmit = (event) => {
    
    event.preventDefault(); // Prevent default form submission behavior
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
      apiService.post("/maintenance-plan/detail", formData)
      showSuccessToast("workOrderSucces")
      navigate("/work-order")
    } else {
      console.log("non valid", activities[0].asignee )
    }
  }

  return (
    <>
      <div className=''>
        <FormTitle titleTxt={"WorkOrder"} />
      </div>
      <div className='grid xl:grid-cols-12 md:gap-8'>
        <div className='col-span-6'>
          <WorkOrderFormBasic errors={errors} setErrors={setErrors} priority={priority} asignee={asignee} description={description} setDescription={setDescription} name={name} setName={setName}
            setPriority={setPriority} setAsignee={setAsignee} />
        </div>
        <div className='col-span-6 md:ml-8 xl:ml-0'>
          <WorkOrderFormDate errors={errors} setErrors={setErrors} setDateHourSchedueled={setDateHourSchedueled} dateHourSchedueled={dateHourSchedueled} setDateHourSchedueledEnd={setDateHourSchedueledEnd}
            dateHourSchedueledEnd={dateHourSchedueledEnd} />
        </div>
      </div>
      <div className='mt-8 mb-8'>

        <WorkOrderFormTask errors={errors} setErrors={setErrors} activities={activities} setActivities={setActivities} />

      </div>
      <div className='flex justify-end mr-6 h-16'>
        <SendButton handleSubmit={handleSubmit} />
      </div>

    </>
  )
}
