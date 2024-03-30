import React from 'react';
import axios from 'axios';
import { useState } from "react";
import tally from './tally.png';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [vendor_id, setVendorId] = useState(0);
    const [template_id, setTemplateId] = useState(0);
    const [purchaser_id, setPurchaserId] = useState(0);
    const [msg, setMsg] = useState(null)

    function handleUpload() {
        axios.get(`http://localhost:6009/ProcessInvoices?vendor_id=${vendor_id}`, { vendor_id: vendor_id }, {
            headers: {
                "Custom-header": "value",

            }
        })
            .then(res => {
                setMsg(res.data.Message+" :"+res.data.Code);
                console.log(res.data);
            })
            .catch(err => {
                setMsg("Please connect with system admin!")
                console.log(err)
            });

    }


    return (
        <div>
            <img src={tally} />
            <div className='wrapper'>
                <form>
                    <button onClick={handleUpload}>Process Pending Invoices</button>
                </form>
                {msg && <span>{msg}</span>}
            </div>
        </div>
    );
};

export default Upload