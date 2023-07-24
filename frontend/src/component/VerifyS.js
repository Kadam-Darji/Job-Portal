import {useContext} from "react";
import axios from "axios";
import JobContext from "../context/jobcontext/JobContext";
const VerifyS = ()=>{
    const {load,setLoad,showAlert,BaseUrl} = useContext(JobContext);
    const HandleVerify = async()=>{
        const email = document.getElementById("email").value;
        setLoad(true);
        localStorage.setItem('verifyEmail',email);
        axios.post(`${BaseUrl}/student/verify`,{Email:email,sendMail:true}).then((res)=>{
            setLoad(false);
            if(res.data.success){
                showAlert("Link sent to the mail!",'success');
            }
            else{
                console.log(res.data.message);
                showAlert("Error!",'danger');
            }
        }).catch((err)=>{
            showAlert(err,'danger');
        })
    }
    return (
        <div id="box" className="card container my-5 shadow-lg p-3 mb-5 bg-light rounded" style={{width: "25rem"}}>
          <div className="card-body">
          <h2 className="card-title">Student Verification</h2>
          <div className="form-floating mb-3 ">
        <input type="email" className="form-control" id="email" placeholder="name@example.com"/>
        <label for="email">Email address</label>
      </div>
      <div id="logins-btn" className='btn btn-outline-info my-3' style={{marginTop:"5rem"}} onClick={HandleVerify}>
      {load?<span class="spinner-border spinner-border-sm" style={{marginRight:5}} role="status" aria-hidden="true"></span>:<></>}
      {load?"Loading":"Verify"}</div>
      </div>
      </div>
      )
}

export default VerifyS;