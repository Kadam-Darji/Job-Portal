import React, { useContext } from 'react'
import JobContext from '../context/jobcontext/JobContext';

const Alert = (props) => {
    const {alert} = useContext(JobContext);
    const capitalize=(word)=>{
        const lower =word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }
    return (
        <>
{alert&&
<div class={`alert alert-${alert.type}`} style={{zIndex:"1"}} role="alert">
  <strong>{capitalize(alert.type)}</strong> {alert.msg}
</div>
}
</>


    )
}

export default Alert
