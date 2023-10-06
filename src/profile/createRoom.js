import React, { useState, useEffect } from 'react';
import { Button, Modal } from '../components/index';
// import jwt_decode from 'jsonwebtoken';
import '../styles/app.css';
import DatePicker from 'react-datepicker';

import Axios from 'axios'; // Import Axios
// import { Modal } from 'bootstrap';



export const CreateRoom = (props) => {

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user');

    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [restrictedWord, setRestrictedWord] = useState('');
    const [defaultGreeting, setDefaultGreeting] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    // const [startDate, setStartDate] = useState(() => new Date()); // Initialize with the current date and time
    const [startDate, setStartDate] = useState(null); // Initialize with the current date and time
    // const [endDate, setEndDate] = useState(() => new Date()); // Initialize with the current date and time
    const [endDate, setEndDate] = useState(null); // Initialize with the current date and time
    const [isActiveChecked, setIsActiveChecked] = useState(false);

    useEffect(() => {
        onHandleRestrictedWord();
        onHandleDefaultGreeting();
    }, []);


    const onHandleRestrictedWord = () => {
        Axios.get("https://web-intractive-system-app-api.onrender.com/get/defaultRestrictWord")
        .then(response => {
          // Handle the response data and update the state
          const words = response.data.map(item => item.content);
          const defaultWordString = words.join("\n");
          const newValue = defaultWordString.split('\n')
            .map((line) => line.replace(/'/g, "u0027").replace(/\.,/g, ".|").replace(/!,/g, "!|"))
            .join('\n');
            setRestrictedWord(newValue);
        })
        .catch(error => {
          console.error(error);
        });
    };


    const onHandleDefaultGreeting = () => {
        Axios.get("https://web-intractive-system-app-api.onrender.com/get/defaultGreeting")
        .then(response => {
          // Handle the response data and update the state
          const words = response.data.map(item => item.content);
          const defaultGreeting = words.join("\n");
          const newValue = defaultGreeting.split('\n')
            .map((line) => line.replace(/'/g, "u0027").replace(/\.,/g, ".|").replace(/!,/g, "!|"))
            .join('\n');
            setDefaultGreeting(newValue)
        })
        .catch(error => {
          console.error(error);
        });
    };  


    const onHandleCreateRoom = () => { 

        const restrictedWordArray = restrictedWord.split('\n');
        const defaultGreetingArray = defaultGreeting.split('\n');

        // Replace single quotes with 'u0027' in each element of the array
        const restrictedWordModified = restrictedWordArray.map((word) => word.replace(/'/g, 'u0027'));
        const defaultGreetingModified = defaultGreetingArray.map((greeting) => greeting.replace(/'/g, 'u0027'));

        // Combine the modified array elements back into a single string with '|'
        const restrictedWordFinal = restrictedWordModified.join('|');
        const defaultGreetingFinal = defaultGreetingModified.join('|');

        Axios.post("https://web-intractive-system-app-api.onrender.com/room/create", {
            roomName : roomName,
            roomDescription : roomDescription,
            remainingDuration :0,
            ownerId : userId,
            roomMode : 0,
            roomStatus : 0,
            restrictedWord : restrictedWordFinal,
            defaultGreeting : defaultGreetingFinal,
            gameMode : 0,
            themeIndex : 0,
            layoutDirection : 0,
            startDate: startDate,
            endDate: endDate,
          }, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => {
            console.log("room created");
            // showCreateRoomModal("Create Room Successfully");
            setShowSuccessModal(true);
            // window.parent.hideModal();
            props.onCloseModal(); 

          })
          .catch(error => {
              console.log(error);
          });
    };


    const showCreateRoomModal = (message) => {
        setModalContent(message);
        setShowModal(true);
    };


    const onHandleCloseSuccessModal = () => {
        setShowModal(false);
    };


    const onHandleRoomNameChange = (e) => {
        setRoomName(e.target.value);
    };


    const onHandleRoomDescriptionChange = (e) => {
        setRoomDescription(e.target.value);
    };


    return (
        <div className="container">
        <table className="user-table">
            <tbody>
                <tr>
                    <th className="user-table-label-cell" style={{ padding: '10px' }}>Active mode: </th>
                    <td style={{ padding: '29px' }}>
                    <div className="form-check form-switch custom-switch-input">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            role="switch"
                            checked={isActiveChecked}
                            onChange={() => setIsActiveChecked(!isActiveChecked)}
                        />
                    </div>
                    </td>
                </tr>
            <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Start Date: </th>
                        <td style={{ padding: '10px' }}>
                            <DatePicker
                                     // Set the width to 100%
                                    className="form-control custom-datepicker-width-create-room" // Apply the custom-datepicker class here
                                    selected={isActiveChecked ? new Date() : startDate} // Conditionally set to new Date()
                                    onChange={(date) => setStartDate(date)}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="MMMM d, yyyy h:mm aa"
                                    disabled={!isActiveChecked} 
                                    minDate={isActiveChecked ? new Date() : null} // Set minDate conditionally
                                />
                        </td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>End Date: </th>
                        <td style={{ padding: '10px' }}>
                            <DatePicker
                                className="form-control custom-datepicker-width-create-room"
                                selected={isActiveChecked ? new Date() : endDate} // Conditionally set to new Date()
                                onChange={(date) => setEndDate(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                disabled={!isActiveChecked}
                                minDate={isActiveChecked ? new Date() : null} // Set minDate conditionally 
                                
                            />
                        </td>
                    </tr>
                <tr>
                    <th className="user-table-label-cell" style={{ padding: '10px' }}>Room Name:</th>
                    <td style={{ padding: '10px' }}><input type="text" name="roomName" className="form-control" onChange={onHandleRoomNameChange} /></td>
                </tr>
                <tr>
                    <th className="user-table-label-cell" style={{ padding: '10px' }}>Room Description:</th>
                    <td style={{ padding: '10px' }}><input type="text" name="roomDesc" className="form-control" onChange={onHandleRoomDescriptionChange} /></td>
                </tr>
                <tr>
                    <th className="user-table-label-cell" style={{ padding: '10px' }}>Restricted Word:</th>
                    <td style={{ padding: '10px' }}> <textarea className="form-control" id="restricWordArea" rows="4" value={restrictedWord} onChange={(e) => setRestrictedWord(e.target.value)}></textarea></td>
                </tr>
                <tr>
                    <th className="user-table-label-cell" style={{ padding: '10px' }}>Default Greeting:</th>
                    <td style={{ padding: '10px' }}> <textarea className="form-control" id="defaultGreetArea" rows="4" value={defaultGreeting} onChange={(e) => setDefaultGreeting(e.target.value)} ></textarea></td>
                </tr>
            </tbody>
        </table>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <Button type="button" classType="btn btn-danger"  text="Discard" buttonWidth="20%" onClick={props.onCloseModals} />
            <Button type="button" classType="btn btn-primary"  text="Save" buttonWidth="20%" onClick={onHandleCreateRoom} />
        </div>
    
    
        {/* {showModal && (
            <>
                <Modal 
                    show={showModal}
                    onHide={() => onHandleCloseSuccessModal()}
                    title = "Success"
                    content={modalContent}
                    width="400px"
                    height="200px"
                />
            </>
        )}  */}

       
    </div>

    
    );
};
