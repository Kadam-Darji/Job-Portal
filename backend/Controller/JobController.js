const { forEach } = require('ramda');
const JobModel = require('../Models/Job');
const StudentModel = require('../Models/Student');

module.exports.postJob = async function postJob(req,res){
    let data = req.body;
    let id = req.user.id;
    // let CompanyId = localStorage.getItem('CompanyId');
    console.log(data);
    if(id){
    let resp = await JobModel.create({
        Vacancy :  data.Vacancy,
        Criteria : data.Criteria,
        Description : data.Description,
        CompanyId : id,
        Package : data.Package,
        Position : data.Position
    })
    res.json({success : true,message : "Successfully Posted a Job"})
}
else{
    res.json({success:false,message:"Login first"});
}
}

module.exports.getMyJobs = async function getMyJobs(req,res){
    // let CompanyId = localStorage.getItem('CompanyId');
    if(req.user.id){
        let resp = await JobModel.find({CompanyId:req.user.id});
        res.send({success:true,resp});
    }
    else{
        res.json({success:false,message:"Login first"});
    }
}

module.exports.reviewJob = async (req,res)=>{
    if(!req.body.jobid){
        res.status(401).json({error:true,message:"Bad Request!"});
        return;
    }
    let id = req.body.jobid;
    try{
        const cands = await JobModel.findById(id);
        const s = cands.students;
        const data = await Promise.all(s.map(async (id)=>await StudentModel.findById(id).select('-password')));
        res.status(200).json({
            name:cands.Description,
            candidates:data
        })
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error!"});
    }
}

const delay = (ms)=>{
    return new Promise(resolve => setTimeout(resolve,ms));
}

module.exports.getJobs = async function getJobs(req,res){
    let id = req.user.id;
    await delay(5000);
    let data = await StudentModel.findById(id);
    const resp = await JobModel.find({Criteria:{$lte:data.SPI}});
    const a = resp.map((data)=>{
        const d={
            ...data._doc,
            ...{applied:data.students.some((i)=>i==id)}
        }
        return d;
    });
    if(a){
        res.send({success:true,a});
    }
    else{
        res.send({success:false,a});
    }
}

module.exports.deleteJob = async function deleteJob(req,res){
    let CompanyId = req.user.id;
    try{
    let data = await JobModel.findById(req.params.id);
    if(!data){
        res.status(404).json("Not Found");
    }
    else{
        if(data.CompanyId.toString()==req.user.id){
            let resp = await JobModel.findByIdAndDelete(req.params.id);
            res.status(200).json({success:true,message:"Successfully Deleted"});
        }
        else{
            res.status(401).json({success:false,message:"Can't Perform this action"});
        }
    }
}
    catch(error){
        res.status(500).json("Internal Server Error");
    }
}