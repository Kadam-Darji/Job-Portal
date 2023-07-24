import React, { useEffect,useContext} from 'react'
// import { Link } from 'react-router-dom'
import {  Link, useNavigate,useLocation } from 'react-router-dom'
import JobContext from '../context/jobcontext/JobContext';
import logo from "../JP2.png"
const Navbar = () => {
  const {handleSubmitC,handleSubmitS,LoginC,LoginS,token} = useContext(JobContext);
  // let login = localStorage.getItem('login');
  let navigate = useNavigate();
  // const [Login, setLogin] = useState(login);
  let sub = ()=>{
    handleSubmitS('','');
    handleSubmitC('','');
  // setLogin(false);
  navigate('/');
} 
  return (
    <div> 
       <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#282828"}}>
      <a className='navbar-brand' href='#'><img src={logo} height={"70px"} width={"210px"} style={{marginRight:"0",padding:"0"}}></img></a>
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {(!LoginC&&!LoginS)&&<li className="nav-item">
          <Link className="navbar-brand" to="/">Home</Link>
        </li>}
        {!(LoginS)?<></>:
        <>
        <li className="nav-item">
          <Link className="navbar-brand" to="/Job">Jobs</Link>
        </li>
        <li className="nav-item">
          <Link className="navbar-brand" to="/student/Profile">Profile</Link>
        </li>
        <li className="nav-item">
        <Link className="navbar-brand" to="/password">ChangePassword</Link>
      </li>
        <li className="nav-item">
          <button className='btn btn-outline-primary' onClick={sub}>Log Out</button>
        </li>
        </>
        }
        {!(LoginC)?<></>:
      <>
      <li className="nav-item">
        <Link className="navbar-brand" to="/PostJob">Post Job</Link>
      </li>
      <li className="nav-item">
        <Link className="navbar-brand" to="/myJobs">Recruitment</Link>
      </li>
      <li className="nav-item">
        <Link className="navbar-brand" to="/company/Profile">Profile</Link>
      </li>
      <li className="nav-item">
        <Link className="navbar-brand" to="/password">Change Password</Link>
      </li>
      <li className="nav-item">
        <button className='btn btn-outline-primary' onClick={sub}>LogOut</button>
      </li>
      </>
      }
</ul>
</div>
  </div>
</nav>
          </div>
  )
}

export default Navbar