

 const express = require("express")
const { PostModel } = require("../Model/postmodel")

const jwt = require("jsonwebtoken")
 const postroute = express.Router()

  postroute.post("/add",async(req,res)=>{

    // {
    //     "title" : "fourth joining",
    //     "body" : "first",
    //     "device":"Mobile",
    //     "no_of_comments":20
    //   }
     const payload = req.body
   const post = new PostModel(payload)
       await post.save()

       res.status(200).send({"msg":"new post has been added"})

  })


  postroute.get("/",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded= jwt.verify(token,"batman")

    if(decoded){
      
        const posts = await PostModel.find({UserID:decoded.userID})
        res.status(200).send(posts)
        
     }

     else{
        res.status(400).send({"msg":"No Posts"})
     }

  })


  postroute.patch("/update/:id",async(req,res)=>{

   const id = req.params.id

     const payload = req.body
   
     const post = await PostModel.findByIdAndUpdate({_id:id},payload)

       res.status(200).send({"msg":"post has been updated"})

  })

  postroute.delete("/delete/:id",async(req,res)=>{

    const id = req.params.id
 
      
    
      const post = await PostModel.findByIdAndDelete({_id:id})
 
        res.status(200).send({"msg":"post has been deleted"})
 
   })


 module.exports={postroute}