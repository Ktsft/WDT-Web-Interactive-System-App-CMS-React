import { getAllByDisplayValue, waitFor } from '@testing-library/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import '../styles/app.css';
import { UserIcon, PasswordIcon, EmailIcon, AuthenticatePassIcon } from '../assets/icon';
// import { Button } from '../components/button';
import { Button, Loading } from '../components/index';


import Axios from 'axios'; // Import Axios


export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoginActive, setIsLoginActive] = useState(true);
    const [isRegistrationActive, setIsRegistrationActive] = useState(false);
    const [loading, setLoading] = useState(false);


    const clearInput = () => {
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };


    const onChangeEmail = (event) => {
        // console.log("this is the value of username: ", event.target.value);
        let email = event.target.value;
        setEmail(email);
    };


    const onChangePassword = (event) =>{
        let password = event.target.value;
        setPassword(password);
    };


    const onChangeUsername = (event) => {
        // console.log("this is the value of username: ", event.target.value);
        let username = event.target.value;
        setUsername(username);
    };


    const onChangeConfirmPassword = (event) => {
        // console.log("this is the value of username: ", event.target.value);
        let confirmPassword = event.target.value;
        setConfirmPassword(confirmPassword);
    };



    const handleLoginOnClick = () => {
        setIsLoginActive(true);
        setIsRegistrationActive(false);
        clearInput();
    };

    
    const handleRegisteronClick = () => {
        setIsLoginActive(false);
        setIsRegistrationActive(true);
        clearInput();
    };


    const handleSubmitClick = () => {
        
        setLoading(true);
        if(isRegistrationActive){
            console.log("step 1");
            console.log("this is the password: ", password);
            console.log("this is the confirm pass: ", confirmPassword);
            if (password === confirmPassword) {
                console.log("i have access register submit");
            
                Axios.post("https://web-intractive-system-app-api.onrender.com/user/create", {
                    email: email,
                    username: username,
                    password: password
                    },
                    {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    }})
                    .then(response => {
                        setLoading(false);
                        console.log("Success","Register account successfully")
                        // showModal(response.data)
                        // window.location.href = 'login.html';
                    })
                    .catch(error => {
                        console.log("Error catch from register: ", error.response.data);
                        // showModal("Error", error.response.data)
                    });
            }

        }else{

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
                setLoading(false);
                console.log("U have login successfully");
            })
            .catch(error => {
                console.log("Error catch from login: ", error.response.data);
                // showModal("Login error: ",error.response.data)
            });

        }


    };


    const registrationForm = (
        <div style={{ width: '100%' }}>
            <div className="input-group flex-nowrap mb-3 justify-content-center"> {/* Add justify-content-center */}
                <span className="input-group-text"><EmailIcon /></span>
                <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" onChange={onChangeEmail} disabled={loading} value={email}  />
            </div>
            <div className="input-group flex-nowrap mb-3 justify-content-center"> {/* Add justify-content-center */}
                <span className="input-group-text"><UserIcon /></span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" onChange={onChangeUsername} disabled={loading} value={username} />
            </div>
            <div className="input-group flex-nowrap justify-content-center mb-3"> {/* Add justify-content-center */}
                <span className="input-group-text"><PasswordIcon /></span>
                <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" onChange={onChangePassword} disabled={loading} value={password}/>
            </div>
            <div className="input-group flex-nowrap justify-content-center mb-3"> {/* Add justify-content-center */}
                <span className="input-group-text"><AuthenticatePassIcon /></span>
                <input type="password" className="form-control" placeholder="Confirm password" aria-label="confirmPassword" aria-describedby="addon-wrapping" onChange={onChangeConfirmPassword} disabled={loading} value={confirmPassword}/>
            </div>    
        </div>
    );


    return (
        <div>
            <Loading show={loading}/>
            <div className="login-body d-flex justify-content-center align-items-center vh-100">
                <form>
                    <div className="container login-container">
                        <div className="input-group flex-nowrap mb-3 justify-content-between"> {/* Add justify-content-between */}
                            <Button type="button" classType={`btn ${isLoginActive ? 'btn-primary' : 'btn-secondary'} btn-lg`} text="Login" onClick={handleLoginOnClick} disabled={loading} />
                            <Button type="button" classType={`btn ${isLoginActive ? 'btn-secondary' : 'btn-primary'} btn-lg`} text="Register " onClick={handleRegisteronClick}  disabled={loading} />
                        </div>
                        {isRegistrationActive ? (
                            registrationForm
                        ):(
                            <div style={{ width: '100%' }}>
                                <div className="input-group flex-nowrap mb-3 justify-content-center"> {/* Add justify-content-center */}
                                    <span className="input-group-text"><EmailIcon /></span>
                                    <input type="text" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="addon-wrapping" onChange={onChangeEmail} disabled={loading} value={email} />
                                </div>
                                <div className="input-group flex-nowrap justify-content-center mb-3"> {/* Add justify-content-center */}
                                    <span className="input-group-text"><PasswordIcon /></span>
                                    <input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" onChange={onChangePassword} disabled={loading}  value={password}/>
                                </div>
                            </div>
                        )}
                        <div className="input-group flex-nowrap justify-content-center">
                            <Button type="button" classType="btn btn-outline-light btn-lg btn-block" text="Submit" onClick={handleSubmitClick} disabled={loading}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
