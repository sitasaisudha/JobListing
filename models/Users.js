const mongoose = require('mongoose')
const Users = mongoose.model('user' ,{
    name :String,
    mail : String,
    mobile:String,
    password :String
})
module.exports = Users