const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const studentRouter = require('./Router/StudentRouter');
const companyRouter = require('./Router/companyRouter');
const JobRouter = require('./Router/JobRouter');
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());
app.use('/student',studentRouter);
app.use('/company',companyRouter);
app.use('/job',JobRouter);

if (app.get("env") === "production") {
    app.use(enforce.HTTPS({ trustProtoHeader: true }));
 }

const Port = process.env.Port || 5000;
app.listen(Port,()=>{
    console.log('Server is Listing at port 5000');
})

app.get('/',(req,res)=>{
    res.json({
        error:false,
        message:"Welcome to Job Portal API"
    })
})