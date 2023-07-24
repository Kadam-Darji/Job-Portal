import axios from 'axios';
import React, { useContext } from 'react'
import JobContext from '../context/jobcontext/JobContext';

const ChangePassword = () => {
    const {changePassword} = useContext(JobContext);
    const handleSubmit = async()=>{
        let oldPassword = document.getElementById('oldPassword').value;
        let newPassword = document.getElementById('newPassword').value;
        changePassword({oldPassword,newPassword});
    }
  return (
    <div className="card container my-5" style={{width: "25rem"}}>
      <div className="card-body">
      <h2 className="card-title">Change Password</h2>
      <div className="form-floating mb-3 ">
    <input type="password" className="form-control" id="oldPassword" placeholder="name@example.com"/>
    <label for="oldPassword">Old Password</label>
  </div>
  <div className="form-floating ">
    <input type="password" className="form-control" id="newPassword" placeholder="Password"/>
    <label for="newPassword">New Password</label>
  </div>
  <div className='btn btn-outline-info' style={{marginTop:"2rem"}}onClick={handleSubmit}>Save</div>
  </div>
  </div>
  )
}

export default ChangePassword