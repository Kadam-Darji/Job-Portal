import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import JobContext from "../context/jobcontext/JobContext";
const FinishVerify = ()=>{
    const [state,setState] = useState(0);
    const [params] = useSearchParams();
    const email = localStorage.getItem("verifyEmail");
    const user = params.get("user");
    const {BaseUrl,showAlert} = useContext(JobContext);
    const navigate = useNavigate();
    useEffect(()=>{
        const token = params.get("token");
        axios.post(`${BaseUrl}/${user}/verify`,{Email:email,Token:token}).then((res)=>{
            if(res.data.success){
                setState(1);
                setTimeout(()=>navigate(`/${user}/Profile`),2000);
            }
            else{
                setState(2);
            }
        }).catch((err)=>{
            setState(2);
            showAlert(err.message,'danger');
        })
        localStorage.removeItem('verifyEmail');
    },[]);
    return (
        <div className="card d-flex" style={{margin:"16%"}}>
            {state === 0 && <div className="card-body justify-content-center align-items-center" >
                Verifying...
            </div>}
            {state === 1 && <div className="card-body justify-content-center align-items-center bg-success text-white" >
                Verified
            </div>}
            {state === 2 && <div className="card-body justify-content-center align-items-center bg-danger text-white" >
                Couldn't verify!
            </div>}
        </div>
    )
}

export default FinishVerify;