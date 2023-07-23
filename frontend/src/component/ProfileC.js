import React,{useContext,useEffect,useState,useRef} from 'react'
import axios from 'axios';
import JobContext from '../context/jobcontext/JobContext';
import "./ProfileC.css"
import { useNavigate } from 'react-router-dom';
const ProfileC = () => {
    const {token,showAlert,handleSubmitC,BaseUrl} = useContext(JobContext);
    const [user, setuser] = useState({eName:"",eEmail:"",eAddress:""});
    const [name,setname] = useState("");
    const [email, setemail] = useState("");
    const [address, setaddress] = useState("");
    const [id,setID] = useState('');
    const fill = useRef(null);
    const navigate = useNavigate();
    
    async function getProfile(){
      const url = `${BaseUrl}/company`;
      const response = await axios.get(url,{headers:{'auth-token':token}});
    // console.log('hello inside');
      console.log(response);
      const resp = response.data.data;
      setname(resp.Name);
      setemail(resp.Email);
      setaddress(resp.Address);
      setID(resp._id);
      setuser({eName:name,eEmail:email,eAddress:address});
    }
useEffect(() => {
 
  // console.log('hello');
  getProfile();
}, [])
const onChange=(event)=>{
  if(event.target.id==="eName")setname(event.target.value);
  else if(event.target.id==="eemail")setemail(event.target.value);
  else if(event.target.id==="eaddress")setaddress(event.target.value);

    setuser({...user,[event.target.name]:event.target.value});
}
const submit = async(id)=>{
  const url = `${BaseUrl}/company/${id}`
  let object = {Name:name,Address:address,Email:email};
  const response = await axios.put(url,object)
  .then((response)=>{
    if(response.data.success){
      showAlert('Updated Successfully','success');
      getProfile();
      fill.current.click();
    }
  })
  .catch((error)=>{
    showAlert(error.data.message,'danger');
  })
}


const handleDelete = async(id) =>{
  const url = `${BaseUrl}/company/${id}`;
  const response = await axios.delete(url,{headers:{'auth-token':token}})
  .then((response)=>{
    if(response.data.success){
      showAlert('Deleted Successfully','success');
      handleSubmitC('','');
      navigate('/');
    }
  })
  .catch((error)=>{
    showAlert(error.data.message,'danger');
  });
}
  return (
    <>
    <div className="page-content page-container mx-5" id="page-content">
    <div className="padding">
        <div className="row container d-flex justify-content-center">
<div className="col-xxl-6 col-md-12">    
<div className="card user-card-full">
  <div className="row m-l-0 m-r-0">
      <div className="col-sm-4 bg-c-lite-green user-profile">
          <div className="card-block text-center text-white">
              <div className="m-b-25">
                  <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image"/>
                </div>
                <h6 className="f-w-600">{name}</h6>
                <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
            </div>
        </div>
        <div className="col-sm-8">
            <div className="card-block">
                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                <div className="row">
                    <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Email</p>
                        <h6 className="text-muted f-w-400">{email}</h6>
                    </div>
                    <div className="col-sm-6">
                        <p className="m-b-10 f-w-600">Address</p>
                        <h6 className="text-muted f-w-400">{address}</h6>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
   <div>
    <div className="col">
   <button type="button" ref={fill} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Update
    </button>
    <button className='btn btn-danger mx-2' onClick={()=>handleDelete(id)}>Delete</button>
    </div>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Update</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <div className="form-floating mb-3 ">
    <input type="text" className="form-control" id="eName" value ={name} onChange={onChange} placeholder="name@example.com"/>
    <label for="eName">Name</label>
  </div> 
      <div className="form-floating mb-3  ">
    <input type="email" className="form-control" id="eemail" value = {email} onChange={onChange} placeholder="name@example.com"/>
    <label for="eemail">Email address</label>
  </div>
  

  <div className="form-floating mb-3  ">
    <input type="email" className="form-control" id="eaddress" value={address} onChange={onChange} placeholder="name@example.com"/>
    <label for="eaddress">Address</label>
  </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={()=>submit(id)}>Save changes</button>
          </div>
        </div>
      </div>
    </div></div>
    </>
  )
}

export default ProfileC