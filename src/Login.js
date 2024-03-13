import React from 'react';
import { useState } from "react";
import './LoginForm.css';
import { Link } from "react-router-dom";


const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function submit() {
        console.log(username + " " + password)
    }

    return (
        <div className='wrapper'>
            <form action="">
                <h3>Login</h3>
                <div className='input-box'>
                    <input type="text" placeholder="Username" required onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div className='input-box'>
                    <input type="password" placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <Link to="/tally"><button onClick={submit}>Sign In</button></Link>
            </form>
        </div>
    );
};

export default LoginForm