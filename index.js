// const Jobs = require('./models/Jobs')
const Jobs = require('./models/Jobs')
const Users = require('./models/Users')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mangoose = require('mongoose')
const dotenv = require('dotenv')
const ejs = require('ejs')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

app.use(express.static('./public'))
app.set('view engine' , 'ejs')

app.use(bodyparser.urlencoded({extended:false}))
// app.use(dotenv)
dotenv.config()
app.get('/', (req,res)=>{
    res.send("hi sita")
})
app.get('/health-api', (req,res)=>{
    res.json({status :"All good"})
})

// app.use(express.static)


app.post('/api/register' ,async (req, res)=>{
    const {name , mail ,mobile, pass_word } = req.body 
    try{
       
        const user = await Users.findOne({mail})
        if(user){
            return res.json({message:"user already exist"})
        }
        const password = await bcrypt.hash(pass_word ,4)
        console.log(password)

        Users.create({name,mail,mobile,password}).then(()=>{
            res.json({status :"successfully registerd"})
        }).catch((errro) =>{
            res.json({status :"failed to register"})
        })
    }
    catch(error){
        res.json({status: "failed to register"})
    }
   
    
   
    
})

app.post('/api/login',async (req,res)=>{
    const {mail, pass_word} = req.body 
    try{
        // 
        const user = Users.findOne({mail}).then((data)=>{
            // console.log(data.password)
            let pass_match = bcrypt.compare(pass_word ,data.password)
            if(pass_match){
                const token =  jwt.sign({ mail }, process.env.PRIVATE_KEY ,  { expiresIn: 60 * 60 });
                res.json({message :'successfully logged in' , token : token})

            }
        })
    
        
    
}catch(error){

}}

)


app.use((req,res,next)=>{
    const err = new Error("Not found")
    err.status = 404
    next(err)
})
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({error :{status : err.status || 500 , message : err.message}})
})
app.listen(process.env.PORT, ()=>{
    mangoose.connect(process.env.Mongo_URL, {
        useNewUrlParser: true,
       
        useUnifiedTopology: true
    }).then(()=>{
        console.log("server running on port :"+ process.env.PORT)
    }).catch((error)=>{
        console.log(error)
    })
})