// eslint-disable-next-line no-unused-vars
import { React, useEffect, useState } from 'react'
import WorkOrderFormBasic from '../../../components/admin/workOrderForm/WorkOrderFormBasic'
import WorkOrderFormDate from '../../../components/admin/workOrderForm/WorkOrderFormDate';
import FormTitle from '../../../components/titles/formTitle/formTitle';
import SendButton from '../../../components/buttons/sendButton/SendButton';
import WorkOrderFormTask from '../../../components/admin/workOrderForm/WorkOrderFormTask';
import { useNavigate, useParams } from 'react-router-dom';
import { showSuccessToast } from '../../../components/toast/Toast';
import apiService from '../../../utilities/services/ApiCall';



export default function WorkOrderEdit() {
  
let {id} = useParams()
  //const [items, setItems] = useState([]);
   
  const [data, setData] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [asignee, setAsignee] = useState({});
  const [activities, setActivities] = useState([]);
  const [dateHourSchedueled, setDateHourSchedueled] = useState("");
  const [dateHourSchedueledEnd, setDateHourSchedueledEnd] = useState("");
  const [priority, setPriority] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/maintenance-plan/detail/${id}`);
        setData(response.data);  // Assuming the response has a data property that contains the fetched data
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
      console.log(data)

      if (data) {
        setName(data.name)

      }
    };
  
    fetchData();  // Call the async function to fetch data
  }, [id]);
  
  


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
    if (activities.length > 0) {
      activities.forEach((activity, index) => {
        if (!activity.name) {
          if (!errors.activities) {
            errors.activities = [];
          }
          errors.activities[index] = { name: "activity name is required" };
          console.log("Activity name is required for activity at index", index);
        }
      });
    }

    setErrors(errors);
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
      showSuccessToast("asd");
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
        <WorkOrderFormTask errors={errors} setErrors={setErrors} activities={activities} setActivities={setActivities} />
      </div>
      <SendButton handleSubmit={handleSubmit} />

    </>
  )
}
