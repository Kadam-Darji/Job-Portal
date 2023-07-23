const express = require('express');
const {postCompany,loginCompany,getAllCompanies,getMyCompany,updateCompany,deleteCompany,updatePassword} = require('../Controller/CompanyController');
const fetchuser = require('../middleware/fetchuser');
const companyRouter = express.Router();
const {encryption} = require('../middleware/hasing');
const { check } = require('express-validator');

companyRouter.route('/signup')
.post(check("Name").notEmpty().withMessage("Name is Empty!"),
check("Email").isEmail().withMessage("Email is not valid!"),
check("Password").isLength({min:8}).withMessage("Password is not valid!"),
check("Address").notEmpty().withMessage("Address is empty!"),encryption,postCompany);    // company signup

companyRouter.route('/login')
.post(loginCompany);    // company login

companyRouter.route('')
.get(fetchuser,getMyCompany);  //get all compaines details

companyRouter.route('/password')
.put(fetchuser,encryption,updatePassword);

companyRouter.route('/:id')
.delete(fetchuser,deleteCompany)
.put(updateCompany);

module.exports = companyRouter;