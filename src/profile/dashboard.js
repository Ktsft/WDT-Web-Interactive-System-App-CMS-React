import React, { useState, useEffect } from 'react';
import { Loading, Table, Navbar, Toast, SuperAdminTable } from '../components/index';
import { useUser } from './userProvider'; // Import useUser from the context
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import Axios from 'axios';
import "react-toastify/dist/ReactToastify.css";


export const Dashboard = () => {

    const token = localStorage.getItem('token');
    const roles = localStorage.getItem('role');

    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState('');
    const [toastShow, setToastShow] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastHeader, setToastHeader] = useState('');
    const [toastType, setToastType] = useState('');
    const [adminRow, setAdminRow] = useState([]);

    const { user, login, logout } = useUser(); // Access user context

    useEffect(() => {
        if(token && user){
            getUserById(user);
            if(roles === 'superadmin'){
                getUserRolesAdmin();
            }else if(roles === 'admin'){
                getAllRoom(false);
            }
        }
      }, [token, user]); // This effect runs only once when the component mounts 


    // //   useEffect(() => {
    // //     const interval = setInterval(() => {
    // //         setRoom((prevRoom) => {

    // //             const updatedRoom = prevRoom.map((item) => {
    // //                 const now = moment();
    // //                 const currentDate = new Date();
    // //                 const startDateValue = moment(item.start_date).toDate();
    // //                 const formattedStartDatetime = moment(startDateValue).format("MMMM D, YYYY h:mm A");
    // //                 const endDaateValue = moment(item.end_dates).toDate();
    // //                 const formattedEndDatetime = moment(endDaateValue).format("MMMM D, YYYY h:mm A");
    // //                 const remaining_duration_check = Math.floor((endDaateValue - currentDate) / 1000);
    // //                 // const momentFormattedStartDatetime = moment(formattedStartDatetime, "MMMM D, YYYY h:mm A");
    // //                 // const momentFormattedEndDatetime = moment(formattedEndDatetime, "MMMM D, YYYY h:mm A");

    // //                 const remainingSecondsStart = moment(item.start_date).diff(now, 'seconds');                    
    // //                 const remainingSecondss = moment(item.end_dates).diff(now, 'seconds');
    // //                 var past;
    // //                 if(remainingSecondsStart <= 0 && item.room_status != 3){
    // //                     const hours = Math.floor(remainingSecondss / 3600);
    // //                     const minutes = Math.floor((remainingSecondss % 3600) / 60);
    // //                     const seconds = remainingSecondss % 60;
    // //                     var remainingTimes = `${hours}:${minutes}:${seconds}`;
    // //                     past = 1;
    // //                     //console.log("step 1.2 remainingTimes: ", remainingTimes);
    // //                 }else{
    // //                     // console.log("step 1.1s room name: ", item.room_name);
    // //                     // console.log("step 1.2s remainingTimes: ", remainingTimes);
    // //                     past = 0;
    // //                 }

    // //                 // if(item.remaining_duration == 86400 && item.room_status == 0){
    // //                 //     remainingTimes = '24:00:00';
    // //                 // }

    // //                 if (remaining_duration_check < 0 && item.room_status != 0){
    // //                     console.log("room names test: ", item.room_name);
    // //                     Axios.post("https://web-intractive-system-app-api.onrender.com/room/zeroRemaining", {
    // //                         id: item.id,
    // //                     },{
    // //                         headers: { Authorization: `Bearer ${token}` }
    // //                     }).then(response2 => {
    // //                         console.log("success");
    // //                     })
    // //                     .catch(error2 => {
    // //                             console.log("Error exception on update room setting: ", error2);
    // //                     })
    // //                 }

    // //                 var formattedCountDownTime = "";
    // //                 if(item.last_count_down_time != null && item.room_status != 4){
    // //                     formattedCountDownTime = formatCountdownTime(item.last_count_down_time);
    // //                 }else{
    // //                 }

    // //                 // if (remainingTimes === 'NaN:NaN:NaN' ||  item.room_status != 4) {
    // //                 //     // If remainingTimes is NaN or negative, set it to "24:00:00"
    // //                 //     remainingTimes = '24:00:00';
    // //                 //   }
    // //                 var statusActivate = 0;
    // //                 //   if(remainingSecondss < 0 && item.room_status != 4 && item.room_status != 1  && item.room_status != 5){
    // //                 //     // console.log("access the door");
    // //                 //     //console.log("step 1 room name: ", item.room_name);
    // //                 //     remainingTimes = '24:00:00';
    // //                 //   }


    // //                 //   if(remaining_duration_check > 0 && item.room_status != 4 && item.last_count_down_time == ""){
    // //                 //     console.log("update 1");
                        
    // //                 //     // console.log("room name: ", item.room_name);
    // //                 //     //console.log("step 2 room name: ", item.room_name);
    // //                 //     Axios.post("https://web-intractive-system-app-api.onrender.com/room/remainingtime", {
    // //                 //         id: item.id,
    // //                 //     },{
    // //                 //         headers: { Authorization: `Bearer ${token}` }
    // //                 //     }).then(response2 => {
    // //                 //         // console.log("success");
    // //                 //     })
    // //                 //     .catch(error2 => {
    // //                 //             console.log("Error exception on update room setting: ", error2);
    // //                 //     })
    // //                 //   }
    // //                 //   else if(remaining_duration_check < 0 && item.room_status != 4  &&  item.last_count_down_time == ""){
    // //                 //     // console.log("update 2");
    // //                 //     // console.log("room name: ", item.room_name);
    // //                 //     // console.log("==========================");
    // //                 //     // console.log("room name: ", item.room_name);
    // //                     // Axios.post("https://web-intractive-system-app-api.onrender.com/room/zeroRemaining", {
    // //                     //     id: item.id,
    // //                     // },{
    // //                     //     headers: { Authorization: `Bearer ${token}` }
    // //                     // }).then(response2 => {
    // //                     //     console.log("success");
    // //                     // })
    // //                     // .catch(error2 => {
    // //                     //         console.log("Error exception on update room setting: ", error2);
    // //                     // })
    // //                 //   }else if(remaining_duration_check < 0){
    // //                 //     // console.log("room name minus: ", item.room_name);
    // //                 //     Axios.post("https://web-intractive-system-app-api.onrender.com/room/zeroRemaining", {
    // //                 //         id: item.id,
    // //                 //     },{
    // //                 //         headers: { Authorization: `Bearer ${token}` }
    // //                 //     }).then(response2 => {
    // //                 //         console.log("success");
    // //                 //     })
    // //                 //     .catch(error2 => {
    // //                 //             console.log("Error exception on update room setting: ", error2);
    // //                 //     })
    // //                 //   }
                      
                    
    // //                 // const isActive = remainingTimes !== '24:00:00';

    // //                 return {
    // //                     ...item,
    // //                     remaining_time: remainingTimes,
    // //                     local_format_end_date: formattedEndDatetime,
    // //                     local_format_start_date: formattedStartDatetime,
    // //                     status_Activate: statusActivate,
    // //                     last_countdown_time: formattedCountDownTime, // Format last_countdown_time
    // //                     pastStatus: past
    // //                   };
    // //                 });
    // //                 return updatedRoom;
    // //               });
    // //     }, 1000);

    // //     return () => {
    // //         clearInterval(interval);
    // //     };
    // //   }, []);


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setRoom((prevRoom) => {

    //             const updatedRoom = prevRoom.map((item) => {
    //                 const now = moment();
    //                 const currentDate = new Date();
    //                 const startDateValue = moment(item.start_date).toDate();
    //                 const formattedStartDatetime = moment(startDateValue).format("MMMM D, YYYY h:mm A");
    //                 const endDaateValue = moment(item.end_dates).toDate();
    //                 const formattedEndDatetime = moment(endDaateValue).format("MMMM D, YYYY h:mm A");
    //                 const remaining_duration_check = Math.floor((endDaateValue - currentDate) / 1000);
    //                 // const momentFormattedStartDatetime = moment(formattedStartDatetime, "MMMM D, YYYY h:mm A");
    //                 // const momentFormattedEndDatetime = moment(formattedEndDatetime, "MMMM D, YYYY h:mm A");

    //                 const remainingSecondsStart = moment(item.start_date).diff(now, 'seconds');                    
    //                 const remainingSecondss = moment(item.end_dates).diff(now, 'seconds');
    //                 var past;
    //                 if(remainingSecondsStart <= 0 && item.room_status != 3){
    //                     const hours = Math.floor(remainingSecondss / 3600);
    //                     const minutes = Math.floor((remainingSecondss % 3600) / 60);
    //                     const seconds = remainingSecondss % 60;
    //                     var remainingTimes = `${hours}:${minutes}:${seconds}`;
    //                     past = 1;
    //                     //console.log("step 1.2 remainingTimes: ", remainingTimes);
    //                 }else{
    //                     // console.log("step 1.1s room name: ", item.room_name);
    //                     // console.log("step 1.2s remainingTimes: ", remainingTimes);
    //                     past = 0;
    //                 }

    //                 // if(item.remaining_duration == 86400 && item.room_status == 0){
    //                 //     remainingTimes = '24:00:00';
    //                 // }

    //                 if (remaining_duration_check < 0 && item.room_status != 0){
    //                     console.log("room names test: ", item.room_name);
    //                     Axios.post("https://web-intractive-system-app-api.onrender.com/room/zeroRemaining", {
    //                         id: item.id,
    //                     },{
    //                         headers: { Authorization: `Bearer ${token}` }
    //                     }).then(response2 => {
    //                         console.log("success");
    //                     })
    //                     .catch(error2 => {
    //                             console.log("Error exception on update room setting: ", error2);
    //                     })
    //                 }

    //                 var formattedCountDownTime = "";
    //                 if(item.last_count_down_time != null && item.room_status != 4){
    //                     formattedCountDownTime = formatCountdownTime(item.last_count_down_time);
    //                 }else{
    //                 }

    //                 // if (remainingTimes === 'NaN:NaN:NaN' ||  item.room_status != 4) {
    //                 //     // If remainingTimes is NaN or negative, set it to "24:00:00"
    //                 //     remainingTimes = '24:00:00';
    //                 //   }
    //                 var statusActivate = 0;
    //                 //   if(remainingSecondss < 0 && item.room_status != 4 && item.room_status != 1  && item.room_status != 5){
    //                 //     // console.log("access the door");
    //                 //     //console.log("step 1 room name: ", item.room_name);
    //                 //     remainingTimes = '24:00:00';
    //                 //   }


    //                 //   if(remaining_duration_check > 0 && item.room_status != 4 && item.last_count_down_time == ""){
    //                 //     console.log("update 1");
                        
    //                 //     // console.log("room name: ", item.room_name);
    //                 //     //console.log("step 2 room name: ", item.room_name);
    //                 //     Axios.post("https://web-intractive-system-app-api.onrender.com/room/remainingtime", {
    //                 //         id: item.id,
    //                 //     },{
    //                 //         headers: { Authorization: `Bearer ${token}` }
    //                 //     }).then(response2 => {
    //                 //         // console.log("success");
    //                 //     })
    //                 //     .catch(error2 => {
    //                 //             console.log("Error exception on update room setting: ", error2);
    //                 //     })
    //                 //   }
    //                 //   else if(remaining_duration_check < 0 && item.room_status != 4  &&  item.last_count_down_time == ""){
    //                 //     // console.log("update 2");
    //                 //     // console.log("room name: ", item.room_name);
    //                 //     // console.log("==========================");
    //                 //     // console.log("room name: ", item.room_name);
    //                     // Axios.post("https://web-intractive-system-app-api.onrender.com/room/zeroRemaining", {
    //                     //     id: item.id,
    //                     // },{
    //                     //     headers: { Authorization: `Bearer ${token}` }
    //                     // }).then(response2 => {
    //                     //     console.log("success");
    //                     // })
    //                     // .catch(error2 => {
    //                     //         console.log("Error exception on update room setting: ", error2);
    //                     // })
    //                 //   }else if(remaining_duration_check < 0){
    //                 //     // console.log("room name minus: ", item.room_name);
    //                 //     Axios.post("https://web-intractive-system-app-api.onrender.com/room/zeroRemaining", {
    //                 //         id: item.id,
    //                 //     },{
    //                 //         headers: { Authorization: `Bearer ${token}` }
    //                 //     }).then(response2 => {
    //                 //         console.log("success");
    //                 //     })
    //                 //     .catch(error2 => {
    //                 //             console.log("Error exception on update room setting: ", error2);
    //                 //     })
    //                 //   }
                      
                    
    //                 // const isActive = remainingTimes !== '24:00:00';

    //                 return {
    //                     ...item,
    //                     remaining_time: remainingTimes,
    //                     local_format_end_date: formattedEndDatetime,
    //                     local_format_start_date: formattedStartDatetime,
    //                     status_Activate: statusActivate,
    //                     last_countdown_time: formattedCountDownTime, // Format last_countdown_time
    //                     pastStatus: past
    //                   };
    //                 });
    //                 return updatedRoom;
    //               });
    //     }, 1000);

    //     return () => {
    //         clearInterval(interval);
    //     };
    //   }, []);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const updatedRoom = await Promise.all(room.map(async (item) => {
                    const now = moment();
                    const currentDate = new Date();
                    const startDateValue = moment(item.start_date).toDate();
                    const formattedStartDatetime = moment(startDateValue).format("MMMM D, YYYY h:mm A");
                    const endDaateValue = moment(item.end_dates).toDate();
                    const formattedEndDatetime = moment(endDaateValue).format("MMMM D, YYYY h:mm A");
                    const remaining_duration_check = Math.floor((endDaateValue - currentDate) / 1000);
    
                    const remainingSecondsStart = moment(item.start_date).diff(now, 'seconds');
                    const remainingSecondss = moment(item.end_dates).diff(now, 'seconds');
                    var past;
                    if (remainingSecondsStart <= 0 && item.room_status !== 3) {
                        const hours = Math.floor(remainingSecondss / 3600);
                        const minutes = Math.floor((remainingSecondss % 3600) / 60);
                        const seconds = remainingSecondss % 60;
                        var remainingTimes = `${hours}:${minutes}:${seconds}`;
                        past = 1;
                    } else {
                        past = 0;
                    }
    
                    if (remaining_duration_check < 0 && item.room_status !== 0) {
                        console.log("room names test: ", item.room_name);
                        await updateZeroRemaining(item.id);
                    }else if(remaining_duration_check > 0 && item.room_status != 4 && item.last_count_down_time == ""){
                        await updateActiveRoom(item.id);
                    }
    
                    var formattedCountDownTime = "";
                    if (item.last_count_down_time !== null && item.room_status !== 4) {
                        formattedCountDownTime = formatCountdownTime(item.last_count_down_time);
                    } else {
                    }
    
                    var statusActivate = 0;
    
                    return {
                        ...item,
                        remaining_time: remainingTimes,
                        local_format_end_date: formattedEndDatetime,
                        local_format_start_date: formattedStartDatetime,
                        status_Activate: statusActivate,
                        last_countdown_time: formattedCountDownTime,
                        pastStatus: past
                    };
                }));
                setRoom(updatedRoom);
            } catch (error) {
                console.error("Error in fetchData:", error);
            }
        };
    
        const interval = setInterval(fetchData, 1000);
    
        return () => {
            clearInterval(interval);
        };
    }, [room]);
    
    const updateZeroRemaining = async (roomId) => {
        try {
            const response = await Axios.post(
                "https://web-intractive-system-app-api.onrender.com/room/zeroRemaining",
                { id: roomId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Success updating zeroRemaining:", response.data);
            // Add your additional asynchronous operations here
        } catch (error) {
            console.log("Error updating zeroRemaining:", error);
        }
    };
    

    const updateActiveRoom = async(roomId) => {
        try{
            Axios.post("https://web-intractive-system-app-api.onrender.com/room/remainingtime", {
                id: roomId,
            },{
                headers: { Authorization: `Bearer ${token}` }
            }).then(response2 => {
                // console.log("success");
            })
            .catch(error2 => {
                    console.log("Error exception on update room setting: ", error2);
            })
        }catch(error){
            console.log("Error updating active remaining:", error);
        }
    }


      function formatCountdownTime(timeString) {
        const parts = timeString.split(':');
        if (parts.length === 3) {
          const hours = parts[0].padStart(2, '0');
          const minutes = parts[1].padStart(2, '0');
          const seconds = parts[2].padStart(2, '0');
          return `${hours}:${minutes}:${seconds}`;
        }
        return 'Invalid Time'; // Handle invalid input
      }




      const getAllRoom = (isRefresh) => {

        // console.log("this is the result of isRefresh: ", isRefresh);

        Axios.get("https://web-intractive-system-app-api.onrender.com/room/get", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            // console.log('this is the room resposne: ', response.data);
            // console.log("isRefresh: ", isRefresh);
            setRoom(response.data);
            // console.log("this is the response data from dashboard: ", response.data['end_dates']);
            if(isRefresh === true){
                // setToastHeader('Successful');
                // setToastMessage('Create Room Successfully'); // Set toast message on error
                // setToastShow(true); // Show the toast on error
                // setToastType('success');
                // // Automatically hide the toast after a certain duration (e.g., 5000 milliseconds or 5 seconds)
                toast.success("Create room success !", {
                    position: toast.POSITION.TOP_CENTER
                });                
            }
        })
        .catch(error => {
            console.log("Error catch from dashbaord get all room");
        })

    };



    const getUserById = (userId) => {
        // console.log("this is the userid from getUserByid: ", userId);
        // console.log("this is the userId: ", userId);
        Axios.get(`https://web-intractive-system-app-api.onrender.com/user/get/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            // console.log('User response:', response.data.username);
            // console.log("this is the username from dashbaord: ", response.data.username);
            setUsername(response.data.username);
            // console.log("this is the username: ", username);
        })
        .catch(error => {
          console.log('Error while fetching user:', error);
        })
    };


    const toggleModal = () => {
        setShowModal(!showModal);
    };


    const showToast = (message, type, header) => {
        setToastMessage(message);
        setToastType("success");
        setToastHeader(header);
        setToastShow(true);
        setTimeout(() => {
            setToastShow(false);
        }, 2000); // Adjust the duration as needed
    };


    const getUserRolesAdmin = () => {
        Axios.get("https://web-intractive-system-app-api.onrender.com/get/adminAccount", {
        })
        .then(response => {
            // console.log("this is the response: ", response);
            setAdminRow(response.data)
        })
        .catch(error => {
            console.log("Error catch from dashbaord get all room");
        })
    };

    return(
        <div>
            <ToastContainer />
            <Loading show={loading}/>
            <div style={{ paddingTop: '95px' }}>
            <div className="container dashboard-container">
                <Navbar onShowModal={toggleModal}  username={ username? username:''} onRefresh={() => getAllRoom(false)} isRoles = {roles} />
                <div className="table-container">
                    {roles === 'admin' ? (
                        // Render admin table if roles are 'admin'
                            <Table data={room} onRefresh={() => getAllRoom(false)} showToast={showToast} />
                        ) : roles === 'superadmin' ? (
                        // Render superadmin table if roles are 'superadmin'
                            // <p>Unknown user role</p>
                            <SuperAdminTable data={adminRow} onRefresh={() => getUserRolesAdmin()} />
                            // <SuperAdminTable data={room} onRefresh={() => getAllRoom(false)} showToast={showToast} />
                        ) : (
                        // Render some default content when the role is neither 'admin' nor 'superadmin'
                        <p>Unknown user role</p>
                    )}
                </div>
            </div>
            </div>
        </div>
    )
}