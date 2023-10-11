import React, { useState, useEffect } from 'react';
import { Button, Loading } from '../components/index';
import { useHistory } from 'react-router-dom';
import '../styles/app.css';

import Axios from 'axios';


export const Verify = () => {

    const history = useHistory(); 
    const [loading, setLoading] = useState(false);
    // const [userId, setUserId] = useState(null);
    const [verifiedCode, setVerifiedCode] = useState('');
    localStorage.removeItem('user');

    useEffect(() => {
    
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            onHandleCheckVerifiedCode(id);
            // setUserId(id);
        }else{
            history.push('/login');
        }

    }, []);


    const onHandleCheckVerifiedCode = (verifiedCode) =>{
        Axios.get("https://web-intractive-system-app-api.onrender.com/verificationCode/get/"+verifiedCode, {}, {
            
          })
          .then(response => {
            // window.location.href = 'admin.html';
            console.log("this is the response: ", response.data);
            if(response.data == "Verified Code Not Found" || response.data == "User Verified"){
                history.push('/login');
            }
          })
          .catch(error => {
              console.log(error);
          });
    };

    const onChangeVerifiedCode = (event) => {
        console.log("value: ", event.target.value);
        let value = event.target.value;
        setVerifiedCode(value);
    };


    const onHandleAccountVerified = () => {
        Axios.post("https://web-intractive-system-app-api.onrender.com/account/verify", {
            id : verifiedCode,
        }, { })
          .then(response => {
            console.log("this is the response body: ", response);
          })
          .catch(error => {
              console.log(error);
          });
        
    };


    return(
        <div>
            <Loading show={loading}/>
            <div className="login-body d-flex justify-content-center align-items-center vh-100">
                <div className="container verify-container">
                    <div style={{ width: '50%' }}>
                            <div className="input-group flex-nowrap justify-content-center"> {/* Add justify-content-center */}
                        <input type="text" className="form-control" placeholder="Verified Code" aria-label="Verified Code" aria-describedby="addon-wrapping"  disabled={loading} onChange={onChangeVerifiedCode} />
                    </div>
                    <div className="text-center mb-3">
                        <br />
                        <p  style={{ color: 'white' }}>Please copy and key in the verification code to activate your account</p>
                    </div>
                    <div className="input-group flex-nowrap justify-content-center">
                        <Button type="button" classType="btn btn-outline-light  btn-block" text="Submit"  disabled={loading} onClick={onHandleAccountVerified}/>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )

};