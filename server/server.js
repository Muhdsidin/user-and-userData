const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()
const db = require("./config/connection")
const user = require("./routes/user")

app.use(cors())
app.use(express.json())

app.use("/user",user)
//app.use("/data")

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})