// const { default: mongoose } = require('mongoose')
const mongoose = require('mongoose')
const Jobs = mongoose.model('job', {
    company_name : String,
    logo:String,
    job_position :String,
    job_type: String,
    job_place : String,
    location:String,
    job_description : String,
    about_company : String,
    skills_required : Array

})
module.exports = Jobs