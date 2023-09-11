import { getAllByDisplayValue, waitFor } from '@testing-library/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import '../styles/app.css';
import { UserIcon, PasswordIcon } from '../assets/icon';
import { Button } from '../components/button';

import Axios from 'axios'; // Import Axios


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onChangeEmail = (event) => {
        // console.log("this is the value of username: ", event.target.value);
        let email = event.target.value;
        setEmail(email);
    }


    const onChangePassword = (event) =>{
        let password = event.target.value;
        setPassword(password);
    }


    const handleSubmitClick = () => {
        
        Axios.post("https://web-intractive-system-app-api.onrender.com/user/login", {
            email: email, password: password
        },{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            localStorage.setItem("token", response.data.data.token);
            // window.location.href = "admin.html";
            console.log("U have login successfully");
        })
        .catch(error => {
            console.log("Error catch from login: ", error.response.data);
            // showModal("Login error: ",error.response.data)
        });

    }

    return (
        <div className="login-body d-flex justify-content-center align-items-center vh-100">
            <form>
                <div className="container login-container">
                    <div className="input-group flex-nowrap mb-3 justify-content-center"> {/* Add justify-content-center */}
                        <span className="input-group-text"><UserIcon /></span>
                        <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" onChange={onChangeEmail} />
                    </div>
                    <div className="input-group flex-nowrap justify-content-center mb-3"> {/* Add justify-content-center */}
                        <span className="input-group-text"><PasswordIcon /></span>
                        <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" onChange={onChangePassword} />
                    </div>
                    <div className="input-group flex-nowrap justify-content-center">
                        <Button type="button" classType="btn btn-secondary btn-lg btn-block" text="Submit" onClick={handleSubmitClick} />
                    </div>
                </div>
            </form>
        </div>
    );
};
