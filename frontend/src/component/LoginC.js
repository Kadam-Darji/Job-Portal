import React,{useContext, useEffect, useState} from 'react'
import JobContext from '../context/jobcontext/JobContext';
import { mergeRight } from 'ramda';
const LoginC = () => {
  const {loginCompany,setLoad,load} = useContext(JobContext);
  const submit = async function (e){
    e.preventDefault();
    setLoad(true);
    let Email = document.getElementById('email').value;
    let Password = document.getElementById('password').value;
    loginCompany({Email,Password});
  }
    useEffect(()=>{
      window.addEventListener('keydown',(event)=>{
          if(event.key==='Enter'){
            const btn = document.getElementById('loginc-btn');
            if(btn){
              btn.click();
            }
          }
      })
    })
  return (
    <div className="card container my-5 shadow-lg p-3 mb-5 bg-light rounded alert-container" style={{width: "25rem"}}>
      <div className="card-body">
      <h2 className="card-title">Company Login</h2>
      <div className="form-floating mb-3 ">
    <input type="email" className="form-control" id="email" placeholder="name@example.com"/>
    <label for="email">Email address</label>
  </div>
  <div className="form-floating ">
    <input type="password" className="form-control" id="password" placeholder="Password"/>
    <label for="password">Password</label>
  </div>
  <button className='btn btn-outline-info'style={{marginTop:"2rem"}} onClick={submit} id="loginc-btn">
  {load?<span class="spinner-border spinner-border-sm" style={{marginRight:5}} role="status" aria-hidden="true"></span>:<></>}
  {load?"Loading":"Login"}</button>
  </div>
  </div>
  )
}

export default LoginC