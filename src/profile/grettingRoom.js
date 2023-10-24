import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../styles/app.css';
import { Loading } from '../components/index';




export const GrettingRoom = ({ id = 'default-id', onClose}) => {

    const [data, setData] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [messageStatus, setMessageStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedMessageIds, setSelectedMessageIds] = useState([]);


    const itemsPerPage = 10; // Number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);
    const token = localStorage.getItem('token');

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // const itemsToDisplay = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
        }
    };


    useEffect(() => {
        if(id !== 'default-id'){
            onHandleGrettingMessageDetailByRoom(id);
        }   
    }, []);


    const onHandleGrettingMessageDetailByRoom = (id) => {
        console.log("this is the id", id);
        Axios.get("https://web-intractive-system-app-api.onrender.com/get/greetingMessageDetailByRoom/"+id, {}, {
        })
        .then(response => {
            // console.log("this is the gretting room response: ", response.data);
            // const pendingData = response.data.filter(item => item.message_status === 0);
            // const approveData = response.data.filter(item => item.message_status === 1);
            // const rejectData = response.data.filter(item => item.message_status === 2);
            setData(response.data);
            setRoomName(response.data[0].room_name);
        })
        .catch(error => {
            console.log(error);
        });
    }; 


    const handleStatusChange = (status) => {
        setMessageStatus(status);
    };


    const handleRefresh = () => {
        // Call the API again to refresh the data
        onHandleGrettingMessageDetailByRoom(id);
    };


    const handleGreetingMessageStatus = (status, statusId, roomId) =>{
        // setLoading(true);


        if(status == 3){

            const messageIdsToApprove = data.map((item) => item.id);
            selectedMessageIds.push(...messageIdsToApprove);

            Axios.post("https://web-intractive-system-app-api.onrender.com/update/AutoApproveGreetingMessage", {
                room_id : selectedMessageIds,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
            //     setLoading(false);
            //     onHandleGrettingMessageDetailByRoom(roomId);
            //     // console.log("this is the response: ", response);
            // //   window.parent.hideModal();
                onHandleGrettingMessageDetailByRoom(roomId);
            })
            .catch(error => {
                console.log(error);
            });

        }else{
            Axios.post("https://web-intractive-system-app-api.onrender.com/update/greetingMessageStatus", {
            status : status,
            id : statusId,
            }, {
            headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setLoading(false);
                onHandleGrettingMessageDetailByRoom(roomId);
                // console.log("this is the response: ", response);
            //   window.parent.hideModal();
            })
            .catch(error => {
                console.log(error);
            });
        }
    };



    return(
        <div>
            {loading && (<div className="loading-overlay"></div>)}
            <Loading show={loading}/>
        <div className="container">
             <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="btn-group btn-group-toggle" data-toggle="buttons" >
                    <button type="button" className={`btn btn-outline-primary ${messageStatus === null ? 'active' : ''}`} onClick={() => handleStatusChange(null)}>
                        <i className="fa fa-eye"></i> All List
                    </button>
                    <button type="button" className={`btn btn-outline-secondary ${messageStatus === 0 ? 'active' : ''}`} onClick={() => handleStatusChange(0)}>
                        <i className="fa fa-eye"></i> Pending List
                    </button>
                    <button type="button" className={`btn btn-outline-success ${messageStatus === 1 ? 'active' : ''}`} onClick={() => handleStatusChange(1)}>
                        <i className="fa fa-eye"></i> Approve List
                    </button>
                    <button type="button" className={`btn btn-outline-danger ${messageStatus === 2 ? 'active' : ''}`} onClick={() => handleStatusChange(2)}>
                        <i className="fa fa-eye"></i> Decline List
                    </button>
                </div>
                <div className="btn-group btn-group-toggle float-right" data-toggle="buttons" style={{ marginLeft: '395px' }}>
                    <button id="autoApproveButton" className="btn btn-outline-dark" onClick={() => handleGreetingMessageStatus(3, 0, id)}>
                        <i className="fa fa-check"></i><span>Auto Approve Greeting</span>
                    </button>
                    <button id="refreshButton" className="btn btn-outline-primary" onClick={() => handleRefresh(id)}>
                        Refresh
                    </button>
                </div>
             </div>
            <hr />
            <p>Room Name: {roomName}</p>
            <hr />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Sender</th>
                        <th scope="col">Greeting Message</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                {/* {data[messageStatus === 0 ? 'pending' : messageStatus === 1 ? 'approve' : 'reject'].map((item, index) => (
                    
                ))} */}
                {data ? (
                    data
                    .filter((item) => messageStatus === null || item.message_status === messageStatus)
                    .slice(startIndex, endIndex)
                    .map((item, index) => (
                        <tr key={index}>
                    <td scope="row">{item.no}</td>
                    <td>{item.sender_name}</td>
                    <td>{item.content}</td>
                    <td>
                        <button type="button" className={`btn btn-outline-primary ${item.message_status === 0 || messageStatus === 0 ? 'active' : ''}`} style={{ marginRight: '5px' }} onClick={() => handleGreetingMessageStatus(0, item.id, id)} >Pending</button>
                        <button type="button" className={`btn btn-outline-success ${item.message_status === 1  || messageStatus === 1 ? 'active' : ''}`} style={{ marginRight: '5px' }} onClick={() => handleGreetingMessageStatus(1, item.id, id)} >Approve</button>
                        <button type="button" className={`btn btn-outline-danger ${item.message_status === 2  || messageStatus === 2 ? 'active' : ''}`} onClick={() => handleGreetingMessageStatus(2, item.id, id)} >Reject</button>
                    </td>
                    </tr>
                    ))
                    ) : (
                    <p>Loading data...</p>
                    )}
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
        </div>
    )
};