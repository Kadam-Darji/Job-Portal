const mongoose = require('mongoose');
require('dotenv').config();
// const db_link = 'mongodb+srv://:wyYTUlFQnm95kQA5@cluster0.9hnfgm9.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(process.env.db_link)
.then((db)=>{
    // console.log(process.env.db_link);
    console.log('database connected succefully!!!!');
})
.catch((err)=>{
    console.log(err);
})

const studentSchema = mongoose.Schema({
    FirstName:{
        type : String,
        required : true
    },
    MiddleName:{
        type : String,
        required : true
    },
    LastName:{
        type : String,
        required : true
    },
    Id:{
        type:String,
        unique : true,
        // required : true
    },
    email:{
        type:String,
        unique : true,
        required:true
    },
    Contact:{
        type:String,
        required : true
    },
    Address : {
        type:String,
    },
    Batch:{
      type:String,
      required : true  
    },
    SPI:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Resume:{
        type:String
    },
    verifiedEmail:{
        type:Boolean
    }
});

const StudentModel = mongoose.model('StudentModel',studentSchema);
module.exports = StudentModel;
