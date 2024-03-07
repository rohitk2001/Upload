/* eslint-disable no-unused-expressions */
import {useState} from "react";
import './App.css';
import axios from "axios";

function App() {
  const [file,setFile] = useState(null);
  const [progress,setProgress] = useState({started:false, pc:0});
  const [msg,setMsg] = useState(null)


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
    axios.post('http://127.0.0.1:5000/upload',fd,{
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
