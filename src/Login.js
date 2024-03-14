import React from 'react';
import { useState } from "react";
import './LoginForm.css';
import { Link } from "react-router-dom";
import axios from 'axios';


const LoginForm = () => {
    const [UserName, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [file,setFile] = useState(null);
    const [progress,setProgress] = useState({started:false, pc:0});
    const [msg,setMsg] = useState(null)

    function submit() {
        console.log(UserName + " " + Password)
        axios.get(`http://localhost:6007/CreateClientInformation?UserName=${UserName}&Password=${Password}`,{UserName:UserName,Password:Password},{
        onUploadProgress: (progressEvent) => { setProgress(prevState => {
            return {...prevState,pc:progressEvent.progress*100}
        })},
        headers: {
            "Custom-header": "value",
            
        }
        })
        .then(res => {
            setMsg("Uploaded successful");
            console.log(res.data);
        })
        .catch(err => {
            setMsg("Uploaded failed");
            console.log(err)
        });
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
                {/*<Link to="/tally"><button onClick={submit}>Validate Me</button></Link>*/}
                <button onClick={submit}>Validate Me</button>
            </form>
            <h1>{msg}</h1>
        </div>
    );
};

export default LoginForm