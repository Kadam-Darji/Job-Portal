import React  from "react";

const Job = (props) => {
  return (
    <div className="card my-2" >
      <div className="card-body">
        <h2 className="card-title">{props.data.Position}</h2>
        <p className="card-text"><strong>Description: </strong>{props.data.Description}</p>
        <p className="card-text"><strong>Package: </strong>{props.data.Package} LPA</p>
        <p className="card-text"><strong>Vacancy: </strong>{props.data.Vacancy}</p>
        <p className="card-text"><strong>Criteria: </strong>{props.data.Criteria}</p>
       {props.login === 'company'&& <div><button className="btn btn-outline-danger" onClick={()=>{props.handleDelete(props.data._id)}}>Delete</button>
         <button className="btn btn-outline-primary" onClick={()=>{props.review(props.data._id)}} style={{margin:"5px"}}>Review</button></div>}
       {props.login === 'student' && !props.data.applied&& <button className="btn btn-outline-primary" onClick={()=>props.handleApply(props.data._id)}>Apply</button>}
       {props.login === 'student' && props.data.applied && <button className="btn btn-outline-primary">Applied</button>}
       </div>
    </div>
  );
};

export default Job;
