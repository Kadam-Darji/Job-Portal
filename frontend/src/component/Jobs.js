import React, { useEffect,useContext, useState } from 'react'
import Job from './Job';
import JobContext from '../context/jobcontext/JobContext';
const Jobs = () => {
    const {getJobs,DeleteJob,jobs,Apply} = useContext(JobContext);
    const [spin,setSpin] = useState(true);
    useEffect(()=>{
        getJobs();
    },[])
    if(jobs && spin) setSpin(false);
  return (
    <div>
      {spin &&
  <div class="spinner-border text-primary" role="status" style={{marginTop:"18%",scale:"1.8"}}>
    <span class="sr-only"></span>
</div>}
      {!spin && (!jobs || !jobs.length) && <div class="display1" style={{fontSize:"xx-large",marginTop:"18%"}}>No Jobs available for you!</div>}
        {jobs?jobs.map((value,idx)=>{
       return <Job data = {value} key={idx} handleDelete={DeleteJob} handleApply={Apply} login = {'student'}/>
    }):<></>}
    </div>
  )
}

export default Jobs;