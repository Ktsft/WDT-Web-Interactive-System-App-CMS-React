    import React, { useState, useEffect } from 'react';
    import '../styles/app.css';
    import Axios from 'axios';


    export const UserProfile = ({id = 'default-id', onClose}) => {

        // const [roomId, setRoomId] = useState("");
        // const [roomName, setRoomName] = useState("");
        const [data, setData] = useState([]);
        const [totalRoom, setTotalRoom] = useState(0);

        const itemsPerPage = 10; // Number of items to display per page
        const [currentPage, setCurrentPage] = useState(1);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const itemsToDisplay = data.slice(startIndex, endIndex);
        const totalPages = Math.ceil(data.length / itemsPerPage);

        useEffect(() => {
            if(id !== 'default-id'){
                onHandleTotalRoomCreated(id);
            }
        }, []);

        const onHandleTotalRoomCreated = (id) => {
            Axios.get("https://web-intractive-system-app-api.onrender.com/get/roomByCreated/"+id, {}, {
            })
            .then(response => {
            //console.log("this is the total_room: ", response.data);
                setTotalRoom(response.data[0].total_room);
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        };

        const handlePageChange = (newPage) => {
            if (newPage >= 1 && newPage <= totalPages) {
              setCurrentPage(newPage);
            }
        };

        return(
            <div className="container">
                <table className="user-table">
                    <tbody>
                        <tr>
                            <th className="user-table-label-cell" style={{ padding: '10px' }}>Total Room: </th>
                            <td style={{ padding: '10px' }}>{totalRoom}</td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Room ID</th>
                            <th scope="col">Room Name</th>
                            <th scope="col">Room Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsToDisplay.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <th>{item.room_name}</th>
                                <th>{item.room_description}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <nav aria-label="Page navigation" style={{ width: '100%' }}>
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
                    <button className="btn btn-danger" onClick={onClose}>Close</button>
                </div>
                
            </div>
        )
    }