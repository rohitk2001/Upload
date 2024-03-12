import React from 'react';
import './LoginForm.css';
import { Link } from "react-router-dom";


const LoginForm = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h3>Login</h3>
                <div className='input-box'>
                    <input type="text" placeholder="Username" required />
                </div>
                <div className='input-box'>
                    <input type="password" placeholder="Password" required />
                </div>
                <Link to="/tally"><button>Sign In</button></Link>
            </form>
        </div>
    );
};

export default LoginForm