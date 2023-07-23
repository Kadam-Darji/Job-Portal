import React,{useContext, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import JobContext from '../context/jobcontext/JobContext'
const SignupC = () => {
  const {handleSubmitC,showAlert,BaseUrl,setLoad,load} = useContext(JobContext);
  const navigate = useNavigate();
  let sub = async function handleSubmit(e){
    e.preventDefault();
    setLoad(true);
      let Name = document.getElementById('Name').value;
      let Address = document.getElementById('address').value;
      let Email = document.getElementById('email').value;
      let Password = document.getElementById('password').value;
      
      const url = `${BaseUrl}/company/signup`;
      axios.post(url,{Name,Address,Email,Password})
      .then((response)=>{
        setLoad(false);
        console.log(response.data);
        if(response.data.success){
        handleSubmitC('true',response.data.authtoken);
        showAlert('Successfully Logged In','success');
        navigate('/');
      }
        else{
          showAlert(response.data.msg,'warning');
        }})
      .catch((err)=>{
        console.log(err);
          showAlert(err.response.data.message,'danger');
          console.log('error');
      });
  }
  useEffect(()=>{
      document.getElementById("box").addEventListener('keydown',(event)=>{
        if(event.key==="Enter"){
          const btns= document.getElementById("signupc-btn");
          if(btns) btns.click();
        }
      })
  },[]);
  return (
    <div id="box" className="card container my-5 shadow-lg p-3 mb-5 bg-light rounded" style={{width: "40rem"}}>
      <div className="card-body">
      <h2 className="card-title">Company Register</h2>
      <div className="form-floating mb-3 ">
    <input type="text" className="form-control" id="Name" placeholder="name@example.com"/>
    <label for="Name">Name</label>
  </div> 
      <div className="form-floating mb-3  ">
    <input type="email" className="form-control" id="email" placeholder="name@example.com"/>
    <label for="email">Email address</label>
  </div>
  
  <div className="form-floating mb-3  ">
    <input type="password" className="form-control" id="password" placeholder="name@example.com"/>
    <label for="password">Password</label>
  </div>
  <div className="form-floating mb-3  ">
    <input type="email" className="form-control" id="address" placeholder="name@example.com"/>
    <label for="address">Address</label>
  </div>
  <button id="signupc-btn" className='btn btn-info my-2'style={{marginTop:'5rem'}} onClick={sub}>
  {load?<span class="spinner-border spinner-border-sm" style={{marginRight:5}} role="status" aria-hidden="true"></span>:<></>}
  {load?"Loading":"Submit"}</button>
  </div>
  </div>
  )
}

export default SignupC