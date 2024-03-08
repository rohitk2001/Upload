/* eslint-disable no-unused-expressions */
import {useState} from "react";
import './App.css';
import axios from 'axios';


function App() {
  const [file,setFile] = useState(null);
  const [progress,setProgress] = useState({started:false, pc:0});
  const [msg,setMsg] = useState(null)
  var vendor_id = '1';
  var template_id = '1';
  var purchaser_id = '1';


  function handleUpload(){
    if(!file){
      console.log("No file selected");
      return;
    }
    const fd = new FormData();
    fd.append('file',file);

    setMsg("Uploading...");
    setProgress(prevState => {
      return {...prevState, started: true}
    })
    /***** Testing the calling API */

    /*const axios = require('axios');*/
    /*let data = '\r\n';

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:6007/CreateClientInformation?vendor_id=1&purchaser_id=1&template_id=1',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios.request({config})
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });*/

    /***** end of testing */

    axios.get(`http://localhost:6007/CreateClientInformation?vendor_id=${vendor_id}&purchaser_id=${purchaser_id}&template_id=${template_id}`,{vendor_id:vendor_id,template_id:template_id,purchaser_id:purchaser_id},{
      onUploadProgress: (progressEvent) => { setProgress(prevState => {
        return {...prevState,pc:progressEvent.progress*100}
      })},
      headers: {
        "Custom-header": "value",
        
      }
    })
    .then(res=> {
      setMsg("Uploaded successful");
      console.log(res.data);
    })
    .catch(err => {
      setMsg("Uploaded failed");
      console.log(err)
    });

    // axios.post('http://localhost:6000/PdfToJSON',fd,{
    //   onUploadProgress: (progressEvent) => { setProgress(prevState => {
    //     return {...prevState,pc:progressEvent.progress*100}
    //   })},
    //   headers: {
    //     "Custom-header": "value",
    //   }
    // })
    // .then(res=> {
    //   setMsg("Uploaded successful");
    //   console.log(res.data);
    // })
    // .catch(err => {
    //   setMsg("Uploaded failed");
    //   console.log(err)
    // });
  }

  return (
    <div className="App"> 
      <input onChange={(e) => {  setFile(e.target.files[0]) }} type="file"/>
      <button onClick={handleUpload}>Upload</button>
      { progress.started && <progress max="100" value={progress.pc}></progress>}
      { msg && <span>{msg}</span>}
    </div>
  );
}

export default App;
