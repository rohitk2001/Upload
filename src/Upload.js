import React from 'react';
import { useState } from "react";
import './Upload.css';
import axios from 'axios';
import tally from './tally.png';


const Upload = () => {
    const [UserName, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [isValid, setValid] = useState({ show: "", msg: "" });
    const [buttonText,setText] = useState("Validate Me");
    const [showButton,setButton] = useState(false);
    const [msg, setMsg] = useState(null)

    function handleUpload() {
        
            axios.get(`http://localhost:6009/ProcessInvoices?UserName=${UserName}&Password=${Password}`, { UserName: UserName, Password: Password }, {
                headers: { "Access-Control-Allow-Origin": "*",
                mode:"cors",
            },
            })
                .then(res => {
                    console.log(res.data)
                    //setValid({ show: true, msg: res.data.InvoiceUploadID })
                    setValid({ show: true, msg: "Your Invoices have been processed, please check the status in the https://tally.digisure.in/TallyIntegration/InvoiceDetailsWithStatus" })
                
                    /*if(res.data.Code !== '200' && res.data.Code !== '156' && res.data.Code !== '154'){
                        //setValid({ show: false, msg: res.data.Code+" :"+res.data.Message })
                        setButton(false)
                    }
                    if(res.data.Code === '200' || res.data.Code === '156'|| res.data.Code === '154'){
                        setValid({ show: true, msg: res.data.Code+" :"+res.data.Message })
                        //setText("Click to Navigate")
                        setButton(true)
                    }*/
                })
                .catch(err => {
                    // setValid({ show: false, msg: "Uploading Failed" })
                    // console.log(err)
                    setValid({ show: false, msg: "Please connect with system admin" })
                    setButton(false)
                    console.log(err);
                });
    
        
    }
    /*let logInLink;

    if (isValid.show) {
        logInLink = "/tally";
    } else {
        logInLink = "/";
    }*/

    return (
        <div>
            <img src={tally} />
            <div className='wrapper'>
                
                    <button onClick={handleUpload}>Process Pending Invoices</button>

                
                <h5>{isValid.msg}</h5>
                {msg && <span>{msg}</span>}
            </div>
        </div>
    );
};

export default Upload