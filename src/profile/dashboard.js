    import React, { useState, useEffect } from 'react';
    import { Loading, Table, Navbar } from '../components/index';
    import { useUser } from './userProvider'; // Import useUser from the context


    import Axios from 'axios'; // Import Axios

    export const Dashboard = () => {

        const token = localStorage.getItem('token');

        const [loading, setLoading] = useState(false);
        const [room, setRoom] = useState([]);
        const [showModal, setShowModal] = useState(false);
        const [username, setUsername] = useState('');

        const { user, login, logout } = useUser(); // Access user context
        // console.log("this is the user from dashbaord: ", user)
        
        useEffect(() => {
            if (token) {
              getAllRoom();
              if (user === null) {
                // console.log("step 1");
                // If user is null, attempt to retrieve userId from localStorage
                const userId = localStorage.getItem('user');
                getUserById(userId);
              }else{
                // console.log("step 2");
                getUserById(user);
              }
            }
          }, []); // This effect runs only once when the component mounts          


        if (token) {
            // Token exists in localStorage
            console.log('Token:', token);
        } else {
            // Token doesn't exist in localStorage
            console.log('Token not found');
        };


        const getAllRoom = () => {

            Axios.get("https://web-intractive-system-app-api.onrender.com/room/get", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                console.log('this is the room resposne: ', response.data);
                setRoom(response.data);
            })
            .catch(error => {
                console.log("Error catch from dashbaord get all room");
            })

        };


        const getUserById = (userId) => {
            console.log("this is the userId: ", userId);
            Axios.get(`https://web-intractive-system-app-api.onrender.com/user/get/${userId}`, {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                console.log('User response:', response.data.username);
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


        return(
            <div>
                <Loading show={loading}/>
                <div style={{ paddingTop: '95px' }}>
                    <div className="container dashboard-container">
                        <Navbar onShowModal={toggleModal}  username={ username? username:''} onRefresh={getAllRoom} />
                        <div className="table-container">
                            <Table data={room} onRefresh={getAllRoom} />
                        </div>
                    </div>
                </div>
            </div>
        )
        
    }