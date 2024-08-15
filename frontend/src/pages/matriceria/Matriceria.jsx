import React, { useEffect, useState } from 'react'
import logo from '../../assets/img/page/SX.png';
import "./matriceria.css"
import apiService from '../../utilities/services/ApiCall';
import { PuffLoader } from 'react-spinners';
import SendButton from '../../components/buttons/sendButton/SendButton';
import { showSuccessToast } from '../../components/toast/Toast';
import CompensatorButton from '../../components/matriceria/CompensatorButton';
import MatriceriaImg from '../../components/matriceria/matriceriaImg/MatriceriaImg';
import MatriceriaImg2 from '../../components/matriceria/matriceriaImg2/MatriceriaImg2';
import { FormattedMessage } from 'react-intl';
import MatriceriaModalSend from '../../components/matriceria/matriceriaModalSend/MatriceriaModalSend';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';

export default function Matriceria() {
    const [data, setData] = useState(null);
    const [profile, setProfileSelect] = useState(null);
    const [page, setPage] = useState(true);
    const [send, setSend] = useState(false);
    const navigate = useNavigate()
    let { id } = useParams()
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        apiService.get(`/maintenance-plan/detail/${id}`)
            .then(response => {
                // Sort the activities by description in ascending order
                const sortedActivities = response.activities.sort((a, b) =>
                    Number(a.description) - Number(b.description)
                );
                // Update the state with the sorted activities
                setData({ ...response, activities: sortedActivities });
                setPage(response.description)
            })
            .catch(error => {
                console.error("Error fetching maintenance plan details:", error);
            });
            apiService.get(`/profile`)
            .then(response => {
           
                const userProfile = response.find(profile => profile.userProfileFk === user.userId);
                setProfileSelect(userProfile);
         
            })
            .catch(error => {
                console.error("Error fetching profile details:", error);
            });

    }, []);
  
    const removeActivityId = (activities) => {
        return activities.map(activity => {
            const { activityId, ...rest } = activity;
            return rest;
        });
    };

 
    const handleInputChange = (index, newValue) => {
        setData(prevData => {
            const updatedActivities = prevData.activities.map((activity, i) => {
                if (i === index) {
                    return { ...activity, name: newValue };
                }
                return activity;
            });
            const otheractivities = updatedActivities
            const activitiesWithoutId = removeActivityId(otheractivities);
            return { ...prevData, activities: updatedActivities, activitiesWithoutId };

        });

    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const activitiesWithoutId = removeActivityId(data.activities);
        const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS");

        const formData = {
            activities: activitiesWithoutId,
            asignee: profile || data.asignee,
            dateHourSchedueled: currentDate,
            dateHourSchedueledEnd: data.dateHourSchedueledEnd,
            description: data.description,
            name: "test3",
            priority: data.priority,
        };

        try {
            await apiService.post("/maintenance-plan/detail", formData);
            showSuccessToast("matriceriaSucces");
            console.log(formData)
        } catch (error) {
            console.error("Error submitting the form:", error);
            // Optionally, handle the error, e.g., show an error toast
        } finally {
            setSend(false);
            navigate("/matriceria")
        }
    };

    // const formData2 = {
    //     activities: data.activities,
    //     asignee: data.asignee,
    //     dateHourSchedueled: currentDate,
    //     dateHourSchedueledEnd: data.dateHourSchedueledEnd,
    //     description: data.description,
    //     name: "test1",
    //     priority: data.priority,
    // };


    return (
        <>
            {data && data != null ? (
                <>
                    {/* <div className='flex items-center justify-center'>
                        {/* <button className={`px-4 py-2 text-white rounded ${page ? 'bg-blue-300' : 'bg-blue-500'
                            }`} onClick={(e) => { setPage(!page) }} >
                            {page ? (
                                <div>
                                    Puerta derecha
                                </div>
                            ) : (
                                <div>Puerta izquierda

                                </div>
                            )}

                        </button> 
                    </div> */}
                    {page === 'DX (Derecho)' ? (
                        <div>
                            <MatriceriaImg data={data} handleInput={handleInputChange} />
                        </div>
                    ):(
                        <div>
                            <MatriceriaImg2 data={data} handleInput={handleInputChange} />
                        </div>
                    )}


                    {send &&
                        <div>
                            <MatriceriaModalSend data={data} handleInput={handleSubmit} setSend={setSend} />
                        </div>
                    }

                    <div className='grid mt-4'>

                        <div className='grid md:grid-cols-12'>

                        </div>

                        <div className='flex justify-end mr-6 h-16' >
                            <button className='bg-blue-500 hover:bg-blue-300 text-black' onClick={(e) => { setSend(!send) }} ><FormattedMessage id='Send' /></button>

                        </div>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center">
                    <PuffLoader color="#3b82f6" loading={true} size={150} />
                </div>
            )
            }
        </>
    );
}