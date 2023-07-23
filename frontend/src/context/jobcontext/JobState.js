import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import JobContext from "./JobContext";
import axios from "axios";
import Job from "../../component/Job";
const JobState = (props)=>{
    let loginS = localStorage.getItem('loginS');
    let loginC = localStorage.getItem('loginC');
    let Token = localStorage.getItem('token');
    const [LoginS, setLoginS] = useState(loginS);
    const [LoginC, setLoginC] = useState(loginC);
    const [token,settoken] = useState(Token);
    const [alert, setalert] = useState(null);
    const [jobs,setjobs] = useState('');
    const [load,setLoad] = useState(false);
    const navigate = useNavigate();
    const BaseUrl = 'http://localhost:5000'
    // const BaseUrl = 'http://localhost:5000'
    useEffect(()=>console.log("hello"),[alert]);


    function handleSubmitS(value,authtoken){
        localStorage.setItem('loginS',value);
        localStorage.setItem('token',authtoken);
        setLoginS(value);
        settoken(authtoken);
        setLoad(false);
    }
    function handleSubmitC(value,authtoken){
        localStorage.setItem('loginC',value);
        localStorage.setItem('token',authtoken);
        setLoginC(value);
        settoken(authtoken);
        setLoad(false);
    }
  const showAlert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null);
    }, 3000);
  }
  

  //To login into Student Account
  const loginStudent = async({Email,Password})=>{
      let url = `${BaseUrl}/student/login`;
       await axios.post(url,{Email,Password})
      .then((response)=>{
        if(response.data.success){
        handleSubmitS('true',response.data.authtoken);
        showAlert('Successfully Logged In','success');
        navigate('/student/Profile');
      }})
      .catch((err)=>{
          showAlert(err.response.data.message,'danger');
          console.log('error');
      });
      setLoad(false);
  }
   
  //To Register Student
  const RegisterStudent = async({FirstName,LastName,MiddleName,Email,Contact,Id,Address,Batch,Spi,Password})=>{
  let url = `${BaseUrl}/student/signup`;
         await axios.post(url,{FirstName,MiddleName,LastName,Email,Contact,Id,Address,Batch,Spi,Password})
            .then((response)=>{
              if(response.data.success){
              handleSubmitS('true',response.data.authtoken);
              showAlert('Successfully Created Student Profile','success');
              navigate('/student/Profile');
            }
              else{
                showAlert(response.data.message,'warning');
              }
          })
            .catch((err)=>{
                showAlert(err.response.data.message,'danger');
                console.log('error');
            });
          setLoad(false);   
  }

  //To login into Company Account 
  const loginCompany = async({Email,Password})=>{
      
      const url = `${BaseUrl}/company/login`
      await axios.post(url,{Email,Password})
      .then((response)=>{
        if(response.data.success){
        handleSubmitC('true',response.data.authtoken);
        showAlert('Successfully Logged In','success');
        navigate('/company/Profile');
      }})
      .catch((err)=>{
          showAlert(err.response.data.message,'danger');
          console.log('error');
      });
      setLoad(false);
  }


  //To update company
  const updateCompany = async({id,name,address,email})=>{
  const url = `${BaseUrl}/company/${id}`
  let object = {Name:name,Address:address,Email:email};
   await axios.put(url,object)
  .then((response)=>{
    if(response.data.success){
      showAlert('Updated Successfully','success');
    //   getProfile();
    //   fill.current.click();
    }
  })
  .catch((error)=>{
    showAlert(error.data.message,'danger');
  })
}

//To delete Company
const deleteCompany = async(id) =>{
  const url = `${BaseUrl}/company/${id}`;
  await axios.delete(url,{headers:{'auth-token':token}})
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
//To get Company details
const getProfile = async()=>{
    const url = `${BaseUrl}/company`;
    const response = await axios.get(url,{headers:{'auth-token':token}});
    console.log(response);
    return response;
}

//Get all jobs posted by a company
async function getMyJobs(){
    let url = `${BaseUrl}/job/myjobs`;
    let resp = await axios.get(url,{headers:{'auth-token':token}});
    setjobs(resp.data.resp);        
}
const handleDelete = async(id) =>{
  const url = `${BaseUrl}/job/${id}`;
  const resp = await axios.delete(url,{headers:{'auth-token':token}});
  if(resp){
    showAlert('Deleted Successfully','success');
    getJobs();
  }
  else{
    console.log("retry");
  }
}
  //To Change Password 
  const changePassword = async({oldPassword,newPassword}) =>{
    let api = "";
        if(LoginC){
            api = 'company';
            console.log("Hello there");
        }
        else{
            api = 'student';
        }
        let url = `${BaseUrl}/${api}/password`;
        await axios.put(url,{oldPassword,Password:newPassword},{headers:{'auth-token':token}})
        .then((response)=>{
            if(response.data.success){
                showAlert('Password Changed Successfully','success');
                let nav = `/${api}/Profile`
                navigate(nav);
            }    
        })
        .catch((error)=>{
            console.log(error.response.data.message);
            showAlert(error.response.data.message,'danger');
        });
  }

  //To load all jobs Present
  async function getJobs(){
      let url = `${BaseUrl}/job`;
      let resp = await axios.get(url,{headers:{'auth-token':token}});
      setjobs(resp.data.a);    
  }

  //To delete specific job (for company)
  const DeleteJob = async(id) =>{
    const url = `${BaseUrl}/job/${id}`;
    const resp = await axios.delete(url,{headers:{'auth-token':token}});
    if(resp){
      showAlert('Successfully Deleted','success');
      getMyJobs();
    }
    else{
        showAlert('Please retry','info');
      console.log("retry");
    }
  }
    const postJob = async function({Description,Vacancy,Criteria,Package,Position}){
      const url = `${BaseUrl}/job`;
      const response = await axios.post(url,{Description,Vacancy,Criteria,Package,Position},{headers:{
        'Content-Type':'application/json',
        'auth-token':token,
      }});
      if(response.data.success){
        showAlert('Successfully Created Job','success');
        navigate('/myJobs');
      }
      else{
        showAlert(response.data.message,'info');
      }
    }
    const Apply = async(jobID)=>{
      const url = `${BaseUrl}/student/apply`;
      axios.post(url,{
        jobid: jobID
      },{
        headers:{
          "auth-token":Token
        }
      }).then((r)=>{
        if(!r.error){
          showAlert("Successfully Applied!",'success');
          window.location.reload(true);
        }
        else{
          showAlert("Unknown Error",'error')
        }
      }).catch((err)=>{
        showAlert(err.response.data.message,'danger');
      })
    }
    const Review = async(JobID)=>{
      navigate('/review/'+JobID);
    }
    return(
        <JobContext.Provider value={{LoginS,LoginC,handleSubmitS,handleSubmitC,BaseUrl,token,getMyJobs,showAlert,alert,loginStudent,RegisterStudent,loginCompany,updateCompany,deleteCompany,getProfile,changePassword,jobs,DeleteJob,getJobs,postJob,Apply,Review,setLoad,load}}>
            {props.children}
        </JobContext.Provider>
    )
}

export default JobState;