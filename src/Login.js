import React from 'react';
import { useState } from "react";
import './LoginForm.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import tally from './tally.png';


const LoginForm = () => {
    const [UserName, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [isValid, setValid] = useState({ show: "", msg: "" });
    const [buttonText,setText] = useState("Validate Me");
    const [showButton,setButton] = useState(false);

    function submit() {
        if(UserName == "" || Password == ""){
            setValid({ show: null, msg: "Please enter the required fields"})
        }else{
            axios.get(`http://localhost:6007/CreateClientInformation?UserName=${UserName}&Password=${Password}`, { UserName: UserName, Password: Password }, {
                headers: { "Access-Control-Allow-Origin": "*",
                mode:"cors",
            },
            })
                .then(res => {
                    console.log(res.data)
                      
                    if(res.data.Code !== '200' && res.data.Code !== '156' && res.data.Code !== '154'){
                        setValid({ show: true, msg: res.data.Code+" :"+res.data.Message })
                        setButton(true)
                    }
                    if(res.data.Code === '200' || res.data.Code === '156'|| res.data.Code === '154'){
                        setValid({ show: true, msg: res.data.Code+" :"+res.data.Message })
                        //setText("Click to Navigate")
                        
                        setButton(true)
                    }
                })
                .catch(err => {
                    // setValid({ show: false, msg: "Uploading Failed" })
                    // console.log(err)
                    setValid({ show: false, msg: "Please connect with system admin" })
                    setButton(false)
                    console.log(err);
                });
        }
    }
    let logInLink;

    if (isValid.show) {
        logInLink = "/tally";
    } else {
        logInLink = "/";
    }

    return (
        <div>
            <img src={tally}/>
            <div className='wrapper'>
                <form> 
                    <h4 className='login-heading'>Login To Your Account</h4>
                    <span className='input-box'>
                        <label className='label-input'>Username</label>
                        <input className='input-field' type="text" placeholder="Username" required onChange={(e) => { setUsername(e.target.value) }} />
                    </span>
                    <span className='input-box'>
                        <label className='label-input-password'>Password</label>
                        <input className='input-field' type="password" style={{ "marginTop": '10px' }} placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }} />
                    </span>
                    {showButton == false && <Link to={logInLink}><button onClick={submit}>Validate me</button></Link>}
                    {showButton == true && <Link to={logInLink}><button>Click to Navigate</button></Link>}
                </form>
                <h5>{isValid.msg}</h5>
            </div>
        </div>
    );
};

export default LoginForm