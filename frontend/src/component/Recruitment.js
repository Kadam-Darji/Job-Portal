import React, { useEffect,useContext } from 'react'
import Job from './Job';
import JobContext from '../context/jobcontext/JobContext';

const Recruitment = () => {
    const {getMyJobs,DeleteJob,jobs,Review} = useContext(JobContext);
    useEffect(()=>{
        getMyJobs();
    },[])
  return (
    <div>
      {jobs.length === 0 &&<div class="spinner-border text-primary" role="status" style={{marginTop:"18%",scale:"1.8"}}>
    <span class="sr-only"></span>
</div>}
        {jobs?jobs.map((value,idx)=>{    
       return <Job data = {value} key={idx} review={Review} handleDelete={DeleteJob} login={'company'}/>
    }):<></>}
    </div>
  )
}

export default Recruitment;