import React from "react";
import './WelcomePage.css';
import {useNavigate} from 'react-router-dom';


const WelcomePageS = () => {
  const navigate = useNavigate();
  
  const handelLogin = () => {
    navigate('/auth/student');

  }
  const handelSignup = () =>{
    navigate('/student/signup');
  }
  return (
    <div className="d-flex d-grid  col-6 mx-auto  container  mydiv border-dark justify-content-center flex-column">
      <h1 className='text-center'>For <strong className="text-info">Students</strong></h1>
      <div className="text-center">
      <button className="col-4 btn btn-outline-info text-center" onClick={handelLogin}>Login</button>
      </div>
      <div className="d-flex mx-auto gap-2 col-6 container">
      <p className="my-2 text-center">Don't have an Account ?</p>
      <button className="btn btn-link text-center" onClick={handelSignup}>Sign up</button>
    </div>
    </div>
  );
};

export default WelcomePageS;
