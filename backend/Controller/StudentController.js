const StudentModel = require('../Models/Student');
const bcrypt = require('bcrypt');
const {authtokenfun} = require('../middleware/token');
const JobModel = require('../Models/Job');
const studentRouter = require('../Router/StudentRouter');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
module.exports.getStudents = async function getStudents(req,res){
    let data = await StudentModel.find();
    console.log(data);
    res.send('hello students');
    res.end();
}
module.exports.getStudent = async function getStudent(req,res){
    try{
        let data = await StudentModel.findById(req.user.id);
        if(data){
            res.status(200).json({success:true,message:"Success",data});
        }
        else{
            res.status(404).json({success:false,message:"Not Found"});
        }
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}
module.exports.postStudent = async function postStudent(req,res){
    let pdata = req.body
    // console.log(pdata);
    try{

        let data = await StudentModel.create({
            FirstName:pdata.FirstName,
            MiddleName:pdata.MiddleName,
            LastName:pdata.LastName,
            Id:pdata.Id,
            Contact:pdata.Contact,
            Address:pdata.Address,
            Batch:pdata.Batch,
            SPI:pdata.Spi,
            email : pdata.Email,
            password : pdata.Password
            // {,MiddleName,LastName,email,contact,Id,address,batch,spi}
        })
        // console.log(data);
        
        const authtoken = authtokenfun(data);
        
        if(data){
            res.status(200).json({success:true,message:"Student is Registered Successfully!!",authtoken});
        }
        else{
            res.status(401).json({success:false,message:"Student is Registered Successfully!!"})     
        }
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
    // res.end();
}

module.exports.deleteStudent = async function deleteStudent (req,res){
    let id = req.params.id;
    let user = req.user.id;
    // let result = await StudentModel.findOneAndRemove({email:data.Email});
    // res.json({suceess:true,result,message:"User deleted successfully!!!"});
    try{
        let response = await StudentModel.findById(id);
        if(!response){
            res.status(404).json({success:false,message:"Not Found"});
        }
        if(response.id.toString()!=user){
            res.status(401).json({success:false,message:"Not Allowed To Perform this Action"});
        }
        let resp = await StudentModel.findByIdAndDelete(id);
        if(resp){
            res.status(200).json({success:true,message:"Deleted Successfully"});
        }
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

module.exports.loginStudent = async function loginStudent (req,res){
    let data = req.body;
    try{
        let result = await StudentModel.findOne({email:data.Email});
        // console.log(result);
        if(!result){
            res.status(404).json({success:false,message:"Email is Not Registered"});
            res.end();
        }
     
        if(result){
            const flag = await bcrypt.compare(data.Password,result.password);
            if(flag){
                const authtoken = authtokenfun(result);
                res.status(200).json({success:true,message : "Successfully Logged in",authtoken});
            }
            else{
                res.status(401).json({success:false,message : "Password doesn't match"});
            }
        }
        

        
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

module.exports.updateStudent = async function updateStudent(req,res){
    let id = req.params.id;
    let {FirstName,MiddleName,LastName,Address,Contact,email,SPI,Batch,Resume} = req.body; 
    try{
        let resp = await StudentModel.findById(id);
        let newData = {FirstName,MiddleName,LastName,Address,Contact,email,SPI,Batch,Resume};
        console.log(newData);
        if(resp){
            resp=await StudentModel.findByIdAndUpdate(id,{$set:newData},{new:true});
            if(resp){
                res.status(200).json({success:true,message:"Successfully Updated",resp});
            }
            else{
                res.status(401).json({success:false,message:"Error"});
            }
        }
        else{
            res.status(404).json({success:false,message:"Student Not Found"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }

}

module.exports.updatePassword = async function updatePassword(req,res){
    let id = req.user.id;
    let {oldPassword,Password} = req.body;
    try{
        let resp = await StudentModel.findById(id);
        if(!resp){
            res.status(404).json({success:false,message:"Not Found"});
        }
        const flag = await bcrypt.compare(oldPassword,resp.password);
        
        let newData = {password:Password};
        if(flag){
       let response=await StudentModel.findByIdAndUpdate(id,{$set:{"password":Password}},{new:true});
            if(response){
                res.status(200).json({success:true,message:"Successfully Updated",response});
            }
            else{
                res.status(401).json({success:false,message:"Error"});
            }
        }
        else{
            res.status(400).json({success:false,message:"Password is Incorrect"});
            res.end();
        }
    }
    catch(error){
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

module.exports.apply = async (req,res)=>{
    const studentID = req.user.id;
    const jID = req.body.jobid;
    try{
        const st = await StudentModel.findById(studentID);
        if(!st.verifiedEmail) return res.status(400).json({success:false,message:"Please verify email first!"});
    }
    catch(err){
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
    try{
        await JobModel.findByIdAndUpdate(jID,{$addToSet:{students:studentID}});
        res.status(200).json({error:false,message:"SUCCESSFUL!"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:true,message:"Unknown error!"});
    }
}

//Delete User's Resume
module.exports.deleteResume = async(req,res)=>{
    const sid = req.user.id;
    console.log("CALLED!");
    try{
        await StudentModel.findByIdAndUpdate(sid,{Resume:""});
        res.status(200).json({success:true,message:"Resume Removed!"});
    }
    catch(err){
        res.status(500).json({success:false,message:"Resume Removed!"});
    }
}

module.exports.verifyProfile = async(req,res)=>{
    const email = req.body.Email;
    if(email){
        if(req.body.sendMail){
            const token = jwt.sign({"email":email,data:Date.now()/1000},"verification",{expiresIn:'1h'});
            const transport = nodemailer.createTransport({
                host:'smtp.gmail.com',
                port:587,
                secure:false,
                auth:{
                    user:'jobportal793@gmail.com',
                    pass:'jdbpopzbafsnydkn'
                },
                tls:{
                    rejectUnauthorized:false
                }
            });
            const options = {
                from:"kdrdarji@gmail.com",
                to:email,
                subject:"Verify your email for Job Portal",
                html:`<p>Hello,<br/>We've received a request for sending a link to verify your email.<br/>Click the below link to verify.<br/><a href='http://localhost:3000/student/finishVerify?user=student&token=${token}'>Verify</a></p>`
            }
            transport.sendMail(options,(err,info)=>{
                console.log("Sending Mail...");
                if(err){
                    res.status(200).json({success:false,message:err});
                }
                else{
                    res.status(200).json({success:true,message:'Verified'});
                }
                console.log("DONE!");
            })
        }
        else{
            const token = req.body.Token;
            try{
                const decoded = jwt.verify(token,"verification")
                if(decoded.email !== email) return res.status(400).json({success:false,message:"Invalid Email!"});
            }
            catch(err){
                console.log(err);
                return res.status(400).json({success:false,message:"Token expired!"});
            }
            try{
                await StudentModel.findOneAndUpdate({Email:email},{verifiedEmail:true});
                res.status(200).json({success:true,verified:true});
            }
            catch(err){
                console.log(err);
                res.status(400).json({success:false,message:err});
            }
        }
    }
    else {
        return res.status(400).json({success:false,message:"No email posted!"});
    }
}