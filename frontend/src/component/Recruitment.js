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
      {jobs.length === 0 &&<h2>No Jobs Posted Yet!!!</h2>}
        {jobs?jobs.map((value,idx)=>{    
       return <Job data = {value} key={idx} review={Review} handleDelete={DeleteJob} login={'company'}/>
    }):<></>}
    </div>
  )
}

export default Recruitment;