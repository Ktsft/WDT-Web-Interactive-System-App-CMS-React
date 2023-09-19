import React, { useState, useEffect } from 'react';
import { Button, Modal, Loading } from '../components/index';
import '../styles/app.css';

import Axios from 'axios'; // Import Axios



export const CreateRoom = (props) => {
    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [restrictedWord, setRestrictedWord] = useState('');
    const [defaultGreeting, setDefaultGreeting] = useState('');
    

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
          setRestrictedWord(defaultWordString);

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
          setDefaultGreeting(defaultGreeting);

        })
        .catch(error => {
          console.error(error);
        });
    };  


    return (
        <div className="container">
            <table className="user-table">
                <tbody>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Room Name:</th>
                        <td><input type="text" name="roomName" className="form-control" /></td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Room Description:</th>
                        <td><input type="text" name="roomDesc" className="form-control" /></td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Restricted Word:</th>
                        <td style={{ padding: '10px' }}> <textarea className="form-control" id="restricWordArea" rows="4" value={restrictedWord} readOnly></textarea></td>
                    </tr>
                    <tr>
                        <th className="user-table-label-cell" style={{ padding: '10px' }}>Default Greeting:</th>
                        <td style={{ padding: '10px' }}> <textarea className="form-control" id="defaultGreetArea" rows="4" value={defaultGreeting} readOnly></textarea></td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Button type="button" classType="btn btn-danger"  text="Discard" buttonWidth="20%" onClick={props.onCloseModal} />
                <Button type="button" classType="btn btn-primary"  text="Save" buttonWidth="20%"  />
            </div>
        </div>
    );
};
