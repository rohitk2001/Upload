import React from 'react';
import { useState } from "react";
import './LoginForm.css';
import { Link } from "react-router-dom";
import axios from 'axios';


const LoginForm = () => {
    const [UserName, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [isValid, setValid] = useState({ show: "", msg: "" })

    function submit() {
        axios.get(`http://localhost:6007/CreateClientInformation?UserName=${UserName}&Password=${Password}`, { UserName: UserName, Password: Password }, {
            headers: {
                "Custom-header": "value",

            }
        })
            .then(res => {
                setValid({ show: true, msg: "Uploaded Successfully" })
                console.log(res.data);
            })
            .catch(err => {
                setValid({ show: false, msg: "Uploading Failed" })
                console.log(err)
            });
    }
    let logInLink;

    if (isValid.show) {
        logInLink = "/tally";
    } else {
        logInLink = "/";
    }

    return (
        <div className='wrapper'>
            <form>
                <h3>User Registration</h3>
                <div className='input-box'>
                    <input type="text" placeholder="Username" required onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div className='input-box'>
                    <input type="password" placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <Link to={logInLink}><button onClick={submit}>Validate Me</button></Link>
            </form>
            {isValid.show === false && alert("Login Failed")}
            <h1>{isValid.msg}</h1>
        </div>
    );
};

export default LoginForm