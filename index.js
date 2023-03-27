
const express = require("express")
const { connection } = require("./db")
const {userroute} = require("./Routes/userroutes")
const {postroute} = require("./Routes/postroute")
const {auth} = require("./Middleware/auth")
const cors = require ("cors")
require("dotenv").config()
const app = express()
app.use(cors())

app.use(express.json())
app.use("/users",userroute)

app.use(auth)
app.use("/posts",postroute)

app.listen(4300,async()=>{
    try {
        
    await connection
    console.log("connected to mongo")

    } catch (error) {
        console.log(error)
    }

    console.log("port 4300")
})