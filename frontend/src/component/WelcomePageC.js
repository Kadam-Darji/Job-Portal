import React from 'react'
import {useNavigate} from 'react-router-dom';

const WelcomePageC = () => {
    const navigate = useNavigate();
  
  const handelLogin = () => {
    navigate('/auth/company');

  }
  const handleSignup = () =>{
    navigate('/signup/company');
  }
  return (
    <div className=" d-flex d-grid  col-6 mx-auto container  mydiv border-dark justify-content-center flex-column" style={{backgroundColor:'#ECF9F3',background:' linear-gradient(0.35turn,#ECF9F3, #ECF9F5)'}}>
      <h1 className='text-center'>For <strong className="text-success">Companies</strong></h1>
      <div className="text-center">
      <button className="col-4 btn btn-success text-center" onClick={handelLogin}>Login</button>
      </div>
      <div className="d-flex mx-auto gap-2 col-6 container">
      <p className="my-2 text-center">Don't have an Account ?</p>
      <button className="btn btn-link text-center" onClick={handleSignup}>Sign up</button>
    </div>
    </div>
  )
}

export default WelcomePageC