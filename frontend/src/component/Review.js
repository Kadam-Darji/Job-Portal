import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";

import axios from 'axios';
const StudentsBlock = (props)=>{
    return (<div className="card mx-auto my-3" style={{width:"18rem"}}>
        <div className="card-body">
            <div class="card-header">
        {props.data.FirstName+' '+props.data.LastName}
    </div>
    <ul class="list-group list-group-flush my-1">
        <li class="list-group-item">Email: {props.data.email}</li>
        <li class="list-group-item">Contact: {props.data.Contact}</li>
        <li class="list-group-item">SPI: {props.data.SPI}</li>
    </ul>
    <button  style={{backgroundColor:"#33b249",marginRight:"20px"}} type="button" className="btn text-white" onClick={()=>window.open(props.data.Resume)}>Resume</button>
    <a href={"mailto:"+props.data.email} className="btn btn-primary">Send Email</a>
        </div>
    </div>)
}
const ReviewPage = ()=>{
    let {jobid} = useParams();
    const [job,setJob] = useState([]);
    const [candidates,setCandidates] = useState([]);
    useEffect(()=>{
        axios.post("http://localhost:5000/job/review",{jobid:jobid}).then((res)=>{
            setJob(res.data.name);
            setCandidates(res.data.candidates);
        });
    }
    ,[])
    return(<div>
        {candidates.length!==0 && <div style={{fontSize:'xx-large'}}>{job}</div>}
        {candidates?candidates.map((c)=><div style={{display:"flex",flexDirection:"row"}}><StudentsBlock data={c}></StudentsBlock></div>):<div className="display-1">Loading....</div>}
        </div>
    )
}

export default ReviewPage;