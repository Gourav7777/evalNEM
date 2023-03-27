

const express = require("express")
const bcrypt = require("bcrypt")
const userroute = express.Router()
const {UserModel} = require("../Model/usermodel")
var jwt = require('jsonwebtoken');

 userroute.post("/register",async(req,res)=>{

    // {
    //     "name": "ram",
    //     "email" : "ram@gmail.com",
    //     "gender" : "Male",
    //     "password" : "ram",
    //     "age" : 20,
    //     "city" :"paris",
    //    "is_married" :false
    //     }
    
    console.log(req.body)
    const {name,email,gender,password,age,city,is_married} = req.body

      

      bcrypt.hash(password, 5, async(err, hash)=> {
         
        const user = new UserModel({name,email,gender,password:hash,age,city,is_married})
        await user.save()
        res.status(200).send({"msg":"new user has been added"})
    });


 })


 userroute.post("/login",async(req,res)=>{

    // {
    
    //     "email" : "ram@gmail.com",
   
    //     "password" : "ram",
   
    //     }
    
    const email = req.body.email
    const password = req.body.password
  
   const user = await UserModel.findOne({email})

   if(user){

    bcrypt.compare(password, user.password, async(err, result)=> {
         
        if(result){
           res.status(200).send({"msg":"login successfull","token":jwt.sign({ "userID": user._id }, 'batman')})
        }
        else{
          res.status(400).send({"msg":"login unsuccessfull"})
        }
    })

   }

   else{

    res.status(400).send("user not found please register first")
   }
      

      


 })

module.exports={userroute}