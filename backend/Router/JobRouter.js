const express = require('express');
const {getJobs,postJob,deleteJob,getMyJobs, reviewJob} = require('../Controller/JobController');
const JobRouter = express.Router();
const fetchuser = require('../middleware/fetchuser');
JobRouter.route('')
.get(fetchuser,getJobs)
.post(fetchuser,postJob)

JobRouter.route('/myjobs')
.get(fetchuser,getMyJobs);

JobRouter.route('/:id')
.delete(fetchuser,deleteJob)

JobRouter.route('/review').post(reviewJob);

module.exports = JobRouter;