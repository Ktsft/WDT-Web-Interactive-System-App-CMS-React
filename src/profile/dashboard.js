    import React, { useState, useEffect } from 'react';
    import { Loading, Table, Navbar, Toast, SuperAdminTable } from '../components/index';
    import { useUser } from './userProvider'; // Import useUser from the context
    import moment from 'moment';
    import { toast, ToastContainer } from 'react-toastify';
    import "react-toastify/dist/ReactToastify.css";
  
  

    import Axios from 'axios'; // Import Axios

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
        // console.log("this is the user from dashbaord: ", user)
        // console.log("this is the outside user: ", user);
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


          useEffect(() => {
            const interval = setInterval(() => {
              setRoom((prevRoom) => {
                const updatedRoom = prevRoom.map((item) => {


                    const endDatetime = moment(item.end_dates).toDate();
                    const startDatetime = moment(item.start_date).toDate();

                    // console.log("==========================");
                    // console.log("room name: ", item.room_name);
                    
                    const startDateValue = moment(item.start_date).toDate();
                    const formattedStartDatetime = moment(startDateValue).format("MMMM D, YYYY h:mm A");
                    const endDaateValue = moment(item.end_dates).toDate();
                    const formattedEndDatetime = moment(endDaateValue).format("MMMM D, YYYY h:mm A");
                    // console.log("start datex: ", formattedDate);
                    // console.log("end date: ", item.end_dates);
                    // console.log("===========================");
                    
                    // const formattedEndDatetimess = moment.utc(endDatetime).format('DD/MM/YYYY HH:mm:ss a');
                    // const formattedStartDatetime = moment.utc(item.start_date).format('DD/MM/YYYY HH:mm:ss a');
                    // //============================
                    const now = moment();
                    // console.log("room name: ", item.room_name);
                    // console.log("formattedEndDatetime: ", formattedEndDatetime);
                    // console.log("formattedEndDatetimess: ", formattedEndDatetimess);
                    const remainingSecondsStart = moment(formattedStartDatetime).diff(now, 'seconds');                    
                    const remainingSecondss = moment(formattedEndDatetime).diff(now, 'seconds');

                    if(remainingSecondsStart <= 0){

                          // console.log("========================================");
                    // console.log("end datetime: ", endDatetime);
                    // console.log("remaining seconds: ", remainingSecondss);
                    const hours = Math.floor(remainingSecondss / 3600);
                    // console.log("remaining seconds: ", hours);
                    const minutes = Math.floor((remainingSecondss % 3600) / 60);
                    // console.log("remaining seconds: ", minutes);
                    const seconds = remainingSecondss % 60;
                    // console.log("remaining seconds: ", seconds);

                    var remainingTimes = `${hours}:${minutes}:${seconds}`;
                    // console.log("remaining times: ", remainingTimes);
                    // console.log("room name: ", item.room_name);
                    // console.log("========================================");
                //   if (remainingTimes < 0) {
                //     // If remainingSeconds is negative (in the past), set it to "24:00:00"
                //     return {
                //       ...item,
                //       remaining_time: '24:00:00',
                //     };
                //   } else {
                //     // If remainingSeconds is positive (in the future), format it as HH:MM:SS
                //     return {
                //       ...item,
                //       remaining_time: remainingTimes
                //     };
                //   }

                    }else{

                        var remainingTimes = "24:00:00";

                    }
                    
                  

                if (remainingTimes === 'NaN:NaN:NaN' || remainingSecondss < 0) {
                    // If remainingTimes is NaN or negative, set it to "24:00:00"
                    remainingTimes = '24:00:00';
                  }
                
                const isActive = remainingTimes !== '24:00:00';
                  
                return {
                    ...item,
                    remaining_time: remainingTimes,
                    roomStatus: isActive ? 1 : 0, // Set roomStatus to 1 if active, 0 if not
                    local_format_end_date: formattedEndDatetime,
                    local_format_start_date: formattedStartDatetime,
                  };
                });
                return updatedRoom;
              });
            }, 1000);
          
            return () => {
              clearInterval(interval);
            };
          }, []);
          


        if (token) {
            // Token exists in localStorage
            // console.log('Token:', token);
        } else {
            // Token doesn't exist in localStorage
            console.log('Token not found');
        };


        const getAllRoom = (isRefresh) => {

            // console.log("this is the result of isRefresh: ", isRefresh);

            Axios.get("https://web-intractive-system-app-api.onrender.com/room/get", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                // console.log('this is the room resposne: ', response.data);
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
            console.log("this is the userid from getUserByid: ", userId);
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
                        <Navbar onShowModal={toggleModal}  username={ username? username:''} onRefresh={() => getAllRoom(true)} isRoles = {roles} />
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
                {/* <Toast show={toastShow} message={toastMessage} type={toastType} title={toastHeader} /> */}
               
            </div>
        )
        
    }