import React, { useState, useEffect } from 'react';
import { Loading, Table, Navbar, Toast, SuperAdminTable } from '../components/index';
import { useUser } from './userProvider'; // Import useUser from the context
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import Axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import { GearIcon, BookIcon, TrashIcon, QrCodeIcon } from '../assets/icon';
import { RoomSetting, GrettingRoom, ActiveRoom } from '../profile';
import { Modal } from '../components/index';
import _ from 'lodash';


export const Dashboard = () => {
    document.title = 'Dashboard'; 
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
    const [isModalOpens, setIsModalOpens] = useState(false); // State to control the modal
    const [selectedId, setSelectedId] = useState(null);
    const [modalHeight, setModalHeight] = useState(''); // Height for the modal
    const [modalWidth, setModalWidth] = useState(''); // Width for the modal
    const [modalContent, setModalContent] = useState(''); // Content for the modal
    const [modalTitle, setModalTitle] = useState(''); // Title for the modal
    const [latestCountDownTime, setLastestCountDownTime] = useState('');


    //Page
    const itemsPerPage = 10; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = room.slice(startIndex, endIndex);
    const totalPages = Math.ceil(room.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
        }
    };

    const { user, login, logout } = useUser(); // Access user context
    
    
    useEffect(() => {
        if(token && user){
            getUserById(user);
            if(roles === 'superadmin'){
                getUserRolesAdmin();
            }else if(roles === 'admin'){
                fetchData(0); // Replace getAllRoom with fetchData
            }
        }
      }, [token, user]); // This effect runs only once when the component mounts 


      const fetchData = async (status) => {
        try{
            console.log("fetch data status: ", status);
            
            if(status === 1){

                console.log("access status 1");
         
            }else{
                console.log("access status 0");
                const response = await Axios.get("https://web-intractive-system-app-api.onrender.com/room/get", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const updatedRoom = response.data.map(async (item) => {
        
                    const now = moment();
                      const currentDate = new Date();
                      const checkRoomName = item.room_name;
                      const startDateValue = moment(item.start_date).toDate();
                      const formattedStartDatetime = moment(startDateValue).format("MMMM D, YYYY h:mm A");
                      const endDaateValue = moment(item.end_dates).toDate();
                      const formattedEndDatetime = moment(endDaateValue).format("MMMM D, YYYY h:mm A");
                      const remaining_duration_check = Math.floor((endDaateValue - currentDate) / 1000);
                      const remainingSecondsStart = moment(item.start_date).diff(now, 'seconds');
                      const remainingSecondss = moment(item.end_dates).diff(now, 'seconds');
                      const remainingDurationChecking = item.remaining_duration;
                      var past;
                      var remainingTimes;


                    if (Number.isInteger(remainingDurationChecking)  && item.room_status == 6){
                        const hours = Math.floor(remainingDurationChecking / 3600);
                        const minutes = Math.floor((remainingDurationChecking % 3600) / 60);
                        const seconds = remainingDurationChecking % 60;
                        remainingTimes = `${hours}:${minutes}:${seconds}`;
                        past = 1;
                        const startDate = moment(item.start_date).toDate();
                        const endDate = moment(item.end_dates).toDate();
                
                        if (currentDate >= startDate && currentDate <= endDate && item.room_status != 5) {
                          // console.log('The room is still valid.');
                          // console.log("room name: ", item.room_name);
                          console.log("here4")
                          // console.log("here4 room name: ", item.room_name);
                          //const status = await updateActiveRoom(item.id);
                          // item.room_status = status
                        } else if (item.room_status != 0 && item.room_status != 5 && item.room_status != 4) {
                          console.log(item.room_status)
                          // console.log('The room is invalid because the current date and time are outside the specified range.');
                          // console.log("room name: ", item.room_name);
                          console.log("here");
                          const status  = await updateZeroRemaining(item.id);
                          item.room_status = status;
                        }
                        if (remaining_duration_check < 0 && item.room_status != 0 && item.room_status != 5 && item.room_status != 4) {
                          console.log("here2")
                          // console.log("room name:" , item.room_name);
                          const status  = await updateZeroRemaining(item.id);
                          item.room_status = status;
                        } else if (remaining_duration_check > 0 && item.room_status != 4  && item.last_count_down_time == "1"  && item.room_status != 5 ) {
                          console.log("here 3");
                          const status = await updateOldActiveRoom(item.id);
                          item.room_status = status;
                        }
                
                     var formattedCountDownTime = "";

                    }else{

                        if (remainingSecondsStart <= 0 && item.room_status !== 3 && item.room_status !== 5) {
                            const hours = Math.floor(remainingSecondss / 3600);
                            const minutes = Math.floor((remainingSecondss % 3600) / 60);
                            const seconds = remainingSecondss % 60;
                            remainingTimes = `${hours}:${minutes}:${seconds}`;
                            past = 1;
                          
                          }else{
                            past = 0;
                            remainingTimes = item.last_count_down_time;
                          }
                  
                          const startDate = moment(item.start_date).toDate();
                          const endDate = moment(item.end_dates).toDate();
                  
                          if (currentDate >= startDate && currentDate <= endDate && item.room_status != 5) {
                            // console.log('The room is still valid.');
                            // console.log("room name: ", item.room_name);
                            console.log("here4")
                            // console.log("here4 room name: ", item.room_name);
                            //const status = await updateActiveRoom(item.id);
                            // item.room_status = status
                          } else if (item.room_status != 0 && item.room_status != 5 && item.room_status != 4) {
                            console.log(item.room_status)
                            // console.log('The room is invalid because the current date and time are outside the specified range.');
                            // console.log("room name: ", item.room_name);
                            console.log("here");
                            const status  = await updateZeroRemaining(item.id);
                            item.room_status = status;
                          }
                          if (remaining_duration_check < 0 && item.room_status != 0 && item.room_status != 5 && item.room_status != 4) {
                            console.log("here2")
                            // console.log("room name:" , item.room_name);
                            const status  = await updateZeroRemaining(item.id);
                            item.room_status = status;
                          } else if (remaining_duration_check > 0 && item.room_status != 4 && item.last_count_down_time == "" && item.last_count_down_time == 1 && item.room_status != 5 ) {
                            console.log("here 3");
                            const status = await updateActiveRoom(item.id);
                            item.room_status = status;
                          }
                  
                       var formattedCountDownTime = "";
                        //   if (item.last_count_down_time !== "" ) {
                        //     // console.log("room name selected last countdown: ", item.room_name);
                        //     console.log("room name last count down function: ", item.room_name);  
                        //     item.remaining_duration = formatCountdownTime(item.remaining_duration);
                        //     console.log("room remainig duration last count down function: ", item.remaining_duration);
                        //   } 

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
        
                });
                setRoom(await Promise.all(updatedRoom));
            }
        }catch(error){
            console.error("Error in fetchData:", error);
        }
      };
      


      useEffect(() => {
        const throttledFetchData = _.throttle(() => fetchData(0), 3000); // Throttle to 3 seconds
        const timeoutId = setTimeout(throttledFetchData, 0);
      
        return () => {
          clearTimeout(timeoutId);
        };
      }, [room]);
      
    
    const updateZeroRemaining = async (roomId) => {
        try {
            const response = await Axios.post(
                "https://web-intractive-system-app-api.onrender.com/room/zeroRemaining",
                { id: roomId },
                { headers: { Authorization: `Bearer ${token} `} }
            );
            console.log("Success updating zeroRemaining:", response.data);
            return 0;

            // Add your additional asynchronous operations here
        } catch (error) {
            console.log("Error updating zeroRemaining:", error);
        }
    };
    

    const updateActiveRoom = async(roomId) => {
        // console.log("update active room ",roomId)
        try{
            Axios.post("https://web-intractive-system-app-api.onrender.com/room/remainingtime", {
                id: roomId,
            },{
                headers: { Authorization: `Bearer ${token} `}
            }).then(response2 => {
                // console.log("success remaining time");
                return 1;
            })
            .catch(error2 => {
                    console.log("Error exception on update room setting: ", error2);
            })
        }catch(error){
            console.log("Error updating active remaining:", error);
        }
    }

    const updateOldActiveRoom = async(roomId) => {
        // console.log("update active room ",roomId)
        try{
            Axios.post("https://web-intractive-system-app-api.onrender.com/room/oldremainingtime", {
                id: roomId,
            },{
                headers: { Authorization: `Bearer ${token} `}
            }).then(response2 => {
                // console.log("success remaining time");
                return 1;
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
            headers: { Authorization: `Bearer ${token} `}
        })
        .then(response => {
           
            setRoom(response.data);
            
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


    const toggleModal = (content, width, height, title) => {
        setModalContent(content);
        setModalWidth(width);
        setModalHeight(height);
        setModalTitle(title);
        setIsModalOpens(true);
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


    function formatDate(dateString) {
        if (dateString == null){
          return ""
        }else{
          return moment(dateString).format("MMMM D, YYYY h:mm A");
        }
      };



      const onHandleRemoveRoom = async (roomId) => {
        try {
            await Axios.post("https://web-intractive-system-app-api.onrender.com/room/delete/${roomId}", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            console.log("deleted successfully");
            showToast('Room deleted successfully', 'success', 'Successful');
    
            // Refresh the room data
            await getAllRoom(true);
        } catch (error) {
            console.log(error);
        }
    };
    

    const downloadQRCode = (qrCodeBase64, id) => {	
  
        const a = document.createElement('a');	
        a.href = qrCodeBase64;	
        a.download = `qr_code_${id}.png`;// Set the download filename	
        a.style.display = 'none';	
          
        // Add the anchor element to the document	
        document.body.appendChild(a);	
          
        // Trigger a click event on the anchor element to start the download	
        a.click();	
          
        // Clean up by removing the anchor element	
        document.body.removeChild(a);	
      };
    
      const onRowClickSetting = (id) =>{

        Axios.get("https://web-intractive-system-app-api.onrender.com/get/roomName/"+id,{ 
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            let roomNameValue = response.data[0].room_name;

            toggleModal(<GrettingRoom id={id} onClose={onCloseModal}/> , '1400px', '1500px', '[Greeting Page] Room name: ' + roomNameValue);
        })
        .catch(error => {
            console.log(error);
        });
    };


    const onRowClick = (id) => {
        // console.log(" **[id onRowClick]** ", id);
        setSelectedId(id); // Set the selected ID
        toggleModal(<RoomSetting id={id} onClose={onCloseModal} onCloseModals={onCloseModals} showToast={showToast}/>, '1000px', '1500px', 'Room Setting');
    };

    const onRefresh = async () => {
        setLoading(true);
        try {
          await getAllRoom(true); // Pass true to indicate a refresh
          showToast('Rooms refreshed successfully', 'success', 'Successful');
        } catch (error) {
          console.error('Error refreshing rooms:', error);
          showToast('Error refreshing rooms', 'error', 'Error');
        } finally {
          setLoading(false);
        }
      };
    

      const onCloseModal = () => {
        // console.log("this is the on close modal pressed");
        setIsModalOpens(false);
    };


    const onCloseModals = () => {
        // Close the modal
        setIsModalOpens(false);
        // Refresh the room data
        getAllRoom(false);
    };


    // const onSwitchClickSetting = async (roomId, status, lastRemainingCountdownTime, remaningtime, toggleRoomStatus) => {
    //     // console.log("status", statusOfActivate);
    //     console.log("status: ", toggleRoomStatus);
    //     console.log("remaningtime: ", remaningtime);
    //     console.log("status ***: ", status);
    //     console.log("id ***: ", roomId);
    //     if (lastRemainingCountdownTime !== '24:00:00') {
    //         if (status === 0) {
    //             setModalTitle("Warning");
    //             setModalContent("Please top up to renew the room date time!");
    //             setModalHeight("200px");
    //             setModalWidth("400px");
    //             setIsModalOpens(true);
    //         }
    
    //         if (status === 1) {
    //             console.log("rooms status 5");
    //             const id = roomId;
    //             await Axios.post("https://web-intractive-system-app-api.onrender.com/room/activate/update", {
    //                 id: id,
    //                 activeStatus: 5,
    //                 endDate: remaningtime
    //             }, {
    //                 headers: { Authorization: Bearer ${token} }
    //             });
    
    //         } else if (status === 5) {
    //             console.log("rooms status 1");
    //             const id = roomId;
    //             await Axios.post("https://web-intractive-system-app-api.onrender.com/room/activate/update", {
    //                 id: id,
    //                 activeStatus: 1,
    //                 endDate: ""
    //             }, {
    //                 headers: { Authorization: Bearer ${token} }
    //             });
    //         } else if (status === 4) {
    //             console.log("rooms status 4");
    //             const id = roomId;
    //             await Axios.post("https://web-intractive-system-app-api.onrender.com/room/activate/update", {
    //                 id: id,
    //                 activeStatus: 4
    //             }, {
    //                 headers: { Authorization: Bearer ${token} }
    //             });
    //         }
    
    //         // After updating the room, fetch new data
    //         await fetchData();
    //     }
    // };



    const onSwitchClickSetting = async (roomId, status, lastRemainingCountdownTime, remaningtime, toggleRoomStatus) => {
        try {
            console.log("Toggle Room Status:", toggleRoomStatus);
            console.log("Remaining Time:", remaningtime);
            console.log("Current Status:", status);
            console.log("Last Remaining Countdown Time:", lastRemainingCountdownTime);
            var duration = 0;
            if(lastRemainingCountdownTime != "" && lastRemainingCountdownTime != null){

                console.log('test');

                duration = formatCountdownTime(lastRemainingCountdownTime);
            }
            
            if (lastRemainingCountdownTime !== '24:00:00') {
                let newStatus;
    
                if (status === 0) {
                    // Handle the case when status is 0
                    setModalTitle("Warning");
                    setModalContent("Please top up to renew the room date time!");
                    setModalHeight("200px");
                    setModalWidth("400px");
                    setIsModalOpens(true);
                } else if (toggleRoomStatus === false) {
                    // Handle the case when status is 1
                    console.log("Rooms Status 5");
                    await Axios.post("https://web-intractive-system-app-api.onrender.com/room/activate/update", {
                        id: roomId,
                        activeStatus: 5,
                        endDate: remaningtime
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    newStatus = 5;

                      // Update the state with the new status
                setRoom(prevRoom => {
                    const updatedRoom = prevRoom.map(item => {
                        if (item.id === roomId) {
                            console.log("duration:: ", duration);
                            return {
                                ...item,
                                remaining_time: duration,
                                room_status: newStatus
                            };
                        }
                        return item;
                    });
                    console.log("Updated Room:", updatedRoom);
                    return updatedRoom;
                });
    
                // // After updating the room, fetch new data
                // console.log("Fetching Data...");
                await fetchData(0);
                } else if (toggleRoomStatus === true) {
                    // Handle the case when status is 5
                    console.log("Rooms Status 1");
                    const response = await Axios.post("https://web-intractive-system-app-api.onrender.com/room/activate/update", {
                        id: roomId,
                        activeStatus: 1,
                        endDate: null,
                        remaningDuration: duration
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });               
                  
                    
                    newStatus = 1;
                    await fetchData(0);

                } else if (status === 4) {
                    // Handle the case when status is 4
                    console.log("Rooms Status 4");
                    await Axios.post("https://web-intractive-system-app-api.onrender.com/room/activate/update", {
                        id: roomId,
                        activeStatus: 4
                    }, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    newStatus = 4;  



                      // Update the state with the new status
                setRoom(prevRoom => {
                    const updatedRoom = prevRoom.map(item => {
                        if (item.id === roomId) {
                            console.log("duration:: ", duration);
                            return {
                                ...item,
                                remaining_time: duration,
                                room_status: newStatus
                            };
                        }
                        return item;
                    });
                    console.log("Updated Room:", updatedRoom);
                    return updatedRoom;
                });
    
                // // After updating the room, fetch new data
                // console.log("Fetching Data...");
                await fetchData(0);
                }

                
    
              
            }
        } catch (error) {
            console.log("Error in onSwitchClickSetting:", error);
        }
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
                            <div>
                                <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Room ID</th>
                                        <th scope="col">Room Name</th>
                                        <th scope="col">Room Type</th>
                                        <th scope="col">Remaining Time</th>
                                        <th scope="col">Auto Start</th>
                                        <th scope="col">Active</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemsToDisplay.map((item) => (
                                        <tr key={item.id}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.room_name}</td>
                                            <td>{item.room_type}</td>
                                            <td>
                                                {item.room_status === 0 && item.remaining_duration != 86400 
                                                    ? '00:00:00'
                                                    : item.room_status === 0 || item.remaining_duration === 86400
                                                    ? '24:00:00'
                                                    : item.room_status === 1 || item.last_count_down_time === ""
                                                    ? item.remaining_time
                                                    :item.room_status === 5
                                                    ? item.last_count_down_time 
                                                    : null
                                                }
                                            </td>
                                            <td>
    {item.start_date && item.end_dates && item.active_status === 1 ? 
        "-" : 
        `${formatDate(item.start_date)} - ${formatDate(item.end_dates)}`
    }
</td>
<td>
    <div className="form-check form-switch">
        <input 
            type="checkbox"
            className="form-check-input"
            role="switch"
            onChange={(e) => onSwitchClickSetting(item.id, item.room_status, item.last_count_down_time, item.remaining_time, e.target.checked)}
            checked={item.pastStatus === 0 ? false : (item.room_status === 1 && item.remaining_duration !== 86400)}
            id={`switch_${item.id}`}
        />
        <label className="custom-control-label" htmlFor={`switch_${item.id}`}></label>
    </div>
</td>
<td>
    <button className="btn btn-outline-secondary" id={`gearButton_${item.id}`} onClick={() => onRowClick(item.id)}>
        <GearIcon/>
    </button>
    <span style={{ marginLeft: '10px' }}></span>
    <button className="btn btn-outline-primary" id={`gearButton_${item.id}`} onClick={() => onRowClickSetting(item.id)}>
        <BookIcon/>
    </button>
    <span style={{ marginLeft: '10px' }}></span>
    <button className="btn btn-outline-danger" id={`gearButton_${item.id}`} onClick={() => onHandleRemoveRoom(item.id)}>
        <TrashIcon/>
    </button>
    <span style={{ marginLeft: '10px' }}></span>
    <button className="btn btn-outline-secondary" id={`gearButton_${item.id}`} onClick={() => downloadQRCode(item.qr_code, item.id)} >
        <QrCodeIcon/>
    </button>
</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button
                                            className="page-link"
                                            onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                                        </li>
                                        {Array.from( { length: totalPages }, (_, index) => [
                                            <li
                                            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                                            key={index}
                                        >
                                            <button
                                            className="page-link"
                                            onClick={() => handlePageChange(index + 1)}
                                            >
                                            {index + 1}
                                            </button>
                                        </li>
                                        ])}
                                        <li
    className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
>
    <button
        className="page-link"
        onClick={() => handlePageChange(currentPage + 1)}
    >
        Next
    </button>
</li>
                                    </ul>
                                </nav>
                            </div>
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

            {isModalOpens && (
                <Modal
                    show={isModalOpens}
                    onHide={onCloseModal}
                    title={modalTitle}
                    width={modalWidth}
                    height={modalHeight}
                    content={modalContent}
                    // confirmationCallback={handleModalConfirmation} 
                />
            )}
        </div>
    )
}