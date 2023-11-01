import React , { useState, useEffect } from 'react';
import { GearIcon, BookIcon, TrashIcon, QrCodeIcon } from '../assets/icon';
import { ActiveRoom } from "../profile/index";
import moment from 'moment';

import Axios from 'axios';



function secondsToHHMMSS(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds}`;
};


// function calculateRemainingTimes(items) {
//   const now = Math.floor(Date.now() / 1000);
  
//   if(Array.isArray(items)){
//     return items.map(item => {
//       console.log("momejt(item.end_dates)", moment(item.end_dates).toDate());
//       console.log("roomname ", item.room_name);
//       const remaining = moment(item.end_dates).toDate() - now;
//       return {
//         remainingTime: remaining >= 0 ? secondsToHHMMSS(remaining) : '0:0:0.000000',
//       };
//     });
//   }else{
//     const updatedItems = {};
//     for (const key in items) {
//       const item = items[key];
      
//       if (item.end_dates !== null && item.end_dates !== undefined) {
//         const remaining = moment(item.end_dates).toDate() - now;
//         updatedItems[key] = {
  
//           remainingTime: remaining >= 0 ? secondsToHHMMSS(remaining) : '0:0:0.000000',
//         };
//       } else {
//         const updatedItems = {};
//         for (const key in items) {
//           const item = items[key];
//           const endDates = item?.end_dates || null; // Optional chaining with null fallback
//           const remaining = endDates ? moment(endDates).toDate() - now : 0;
          
//           updatedItems[key] = {
//             remainingTime: remaining >= 0 ? secondsToHHMMSS(remaining) : '0:0:0.000000',
//           };
//         }
//         return updatedItems;
//       }
//     }
//   }
    
// }

function TableRow({ item, onRefresh, onRowClick, showToast, openModal, onRowClickSetting }) {
  // const [remainingTime, setRemainingTime] = useState(calculateRemainingTimes(item));
  
  const [roomStatus, setRoomStatus] = useState(item.room_status);
  const itemsPerPage = 10; // Adjust as needed

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  
  // useEffect(() => {
  //   // Create an interval to update the remaining times every 1000 seconds
  //   const interval = setInterval(() => {
  //     setRemainingTime(currentRemainingTimes => {
  //       return calculateRemainingTimes(currentRemainingTimes);
  //     });
  //   }, 1000);

  //   // Clean up the interval when the component unmounts
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const onCloseModals = () => {
      // console.log("this is the on close modal pressed");
      setIsModalOpen(false);
  };

  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   if (item.end_date <= Math.floor(Date.now() / 1000)) {
  //     // If the end_date has passed, update room status using your API
  //     Axios
  //       .post(`https://web-intractive-system-app-api.onrender.com/room/toggle/${item.id}`, {}, {
  //         headers: { Authorization: `Bearer ${token}` }
  //       })
  //       .then(response => {
          
  //         setRoomStatus(response.data.room_status);
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  // }, [item.end_date, item.id]);



  const toggleRoomStatus = (roomId) => {
    
    // // Send a request to toggle the room status
    //   Axios.post(`/room/toggle/${roomId}`, {}, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((response) => {
    //     console.log(`Room ${roomId} status toggled successfully.`);
    //     // You might want to update the data or UI based on the response
    //   })
    //   .catch((error) => {
    //     console.error(`Error toggling room ${roomId} status:`, error);
    //   });

      openModal(<ActiveRoom onCloseModals={onCloseModals} />, '700px','3000px', 'Active DateTime Option');
  };




  const onHandleRemoveRoom = (roomId) =>{
      console.log("roomId from onHandleRemoveRoom function: ", roomId);
      Axios.post("https://web-intractive-system-app-api.onrender.com/room/delete/"+roomId, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        // window.location.href = 'admin.html';
        console.log("deleted successfully");
        showToast('Room deleted successfully', 'success', 'Successful');
        onRefresh();
      })
      .catch(error => {
          console.log(error);
      });
  };


  
  const closeModal = () => {
    setIsModalOpen(false);
  };


  
  const onCloseModal = () => {
    // console.log("this is the on close modal pressed");
    onRefresh(true);
    setIsModalOpen(false);
};


  // const toggleModal = (content, width, height, title) => {
  //     setModalContent(content);
  //     setModalWidth(width);
  //     setModalHeight(height);
  //     setIsModalOpen(true);
  //     setModalTitle(title);
  // };


  const downloadQRCode = (qrCodeBase64) => {	
    // Generate the QR code image from the qrCodeBase64	
    // const qrCodeData = `data:image/png;base64,${qrCodeBase64}`;	
      
    // Create an anchor element	
    const a = document.createElement('a');	
    a.href = qrCodeBase64;	
    a.download = `qr_code_${item.id}.png`; // Set the download filename	
    a.style.display = 'none';	
      
    // Add the anchor element to the document	
    document.body.appendChild(a);	
      
    // Trigger a click event on the anchor element to start the download	
    a.click();	
      
    // Clean up by removing the anchor element	
    document.body.removeChild(a);	
  };

  
  return (
    <tr>
      <th scope="row">{item.id}</th>
      <td>{item.room_name}</td>
      <td>Wedding room</td>
      <td>{item.remaining_time || '0:0:0.000000'}</td>
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
        <button className="btn btn-outline-secondary" id={`gearButton_${item.id}`} onClick={() => downloadQRCode(item.qr_code)} >
          <QrCodeIcon/>
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
