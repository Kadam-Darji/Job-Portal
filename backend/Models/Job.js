const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    Vacancy:{
        type : Number,
        required : true
    },
    Criteria:{
        type : Number,
        required : true
    },
    Description:{
        type : String,
        required : true
    },
    CompanyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CompanyModel'
     },
    Package:{
        type : Number,
        required : true
    },
    Position:{
        type : String,
        required : true
    },
    students:{
        type: [mongoose.Types.ObjectId]
    }
});

const JobModel = mongoose.model('JobModel',JobSchema);
module.exports = JobModel;