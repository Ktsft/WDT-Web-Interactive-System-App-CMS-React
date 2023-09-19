import React , { useState, useEffect } from 'react';
import { GearIcon, BookIcon, TrashIcon, QrCodeIcon } from '../assets/icon';

import Axios from 'axios';



function secondsToHHMMSS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds}`;
};




function TableRow({ item }) {

  const remainingDuration = secondsToHHMMSS(item.end_date - Math.floor(Date.now() / 1000));
  
  const [roomStatus, setRoomStatus] = useState(item.room_status);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust as needed

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (item.end_date <= Math.floor(Date.now() / 1000)) {
      // If the end_date has passed, update room status using your API
      Axios
        .post(`https://web-intractive-system-app-api.onrender.com/room/toggle/${item.id}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          
          setRoomStatus(response.data.room_status);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [item.end_date, item.id]);



  const toggleRoomStatus = (roomId) => {
    // Send a request to toggle the room status
      Axios.post(`/room/toggle/${roomId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(`Room ${roomId} status toggled successfully.`);
        // You might want to update the data or UI based on the response
      })
      .catch((error) => {
        console.error(`Error toggling room ${roomId} status:`, error);
      });
  };




  return (
    <tr>
      <th scope="row">{item.id}</th>
      <td>{item.room_name}</td>
      <td>{remainingDuration}</td>
      <td>
      {roomStatus === 0 ? (
          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              role="switch"
              onChange={() => toggleRoomStatus(item.id)}
              id={`switch_${item.id}`}
            />
            <label className="custom-control-label" htmlFor={`switch_${item.id}`}></label>
          </div>
        ) : (
          <div className="form-check form-switch">
            <input
              type="checkbox"
              className="form-check-input"
              role="switch"
              onChange={() => toggleRoomStatus(item.id)}
              checked
              id={`switch_${item.id}`}
            />
            <label className="custom-control-label" htmlFor={`switch_${item.id}`}></label>
          </div>
        )}
      </td>
      <td>
        <button className="btn btn-outline-secondary" id={`gearButton_${item.id}`}>
          <GearIcon/>
        </button>
        <span style={{ marginLeft: '10px' }}></span>
        <button className="btn btn-outline-primary" id={`gearButton_${item.id}`}>
          <BookIcon/>
        </button>
        <span style={{ marginLeft: '10px' }}></span>
        <button className="btn btn-outline-danger" id={`gearButton_${item.id}`}>
          <TrashIcon/>
        </button>
        <span style={{ marginLeft: '10px' }}></span>
        <button className="btn btn-outline-secondary" id={`gearButton_${item.id}`}>
          <QrCodeIcon/>
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
