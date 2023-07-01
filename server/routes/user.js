const express = require("express")
const router = express.Router()
const User = require("../models/userShema")
const dataSchema = require("../models/dataSchema")
const bcrypt = require("bcrypt")
const userShema = require("../models/userShema")
const { generateToken } = require("../utils/jwt")
const jwt = require("jsonwebtoken")
const SECRET_TOKEN = "this- is-secret-token"

router.get("/get-all-data",async(req,res)=>{
    const header = req.headers.authorization
   // console.log(header)
    const verifyToken = jwt.verify(header , SECRET_TOKEN)
    //console.log(verifyToken._id)
    const userID = verifyToken._id
    const userDetails = await userShema.findById(userID).select("-password -data -title").populate("item")

   // const test = await dataSchema.find({userId: userID})
    //console.log(test)
   // console.log(userDetails)
    res.status(200).json(userDetails)
}) 

router.post("/upload",async(req,res)=>{
    console.log(req.body)
    const {title , des} = req.body
    //console.log(req.headers.authorization)
    const userId = jwt.verify(req.headers.authorization,SECRET_TOKEN)
   // console.log(userId._id , userId.name)
   const userid = userId._id
   const username = userId.name

   const upload = await dataSchema.create({
    title: title ,
    des:des ,
    username:username, 
    userId: userid
 })

 const Push = await userShema.findByIdAndUpdate(userid,{$push:{item: upload._id}})
//console.log(Push)
 console.log(upload._id)
 console.log(upload)

    res.status(200).json({
        message:"succesfully uploaded"
    })
})

router.post("/login",async(req,res)=>{
    const {email , password} = req.body
    //console.log(req.body)
    const user = await userShema.findOne({email: email})
   // console.log(user)

    if(!user){
        return res.status(402).json({
            message:"email/password was wrong"
        })
    }

    const bcryptCampare = await bcrypt.compare(password,user.password)
   // console.log(bcryptCampare)

    if(!bcryptCampare){
        return res.status(402).json({
            message:"email/password was wrong"
        })
    }
    const accessToken = generateToken(user._id , user.username)
    //console.log(accessToken)
    res.status(200).json(accessToken)
})


router.post("/signup",async(req,res)=>{
    const {username , password , email} = req.body
    //console.log(req.body)
    const passwordData = await bcrypt.hash(password, 10)
    const response = await User.create({username,password: passwordData, email})
   // console.log(response1,response)
    res.json({
        message:"data hasbeen backuped"
    })
})

router.get("/get-all-home-data",async(req,res)=>{
    const HomeData = await dataSchema.find().select("-userId")
    //console.log(HomeData)
    res.status(200).json(HomeData)
})

router.post('/delete',async(req,res)=>{
    const {itemId} = req.body
   // console.log(req.headers.authorization)
    const userId = jwt.verify(req.headers.authorization,SECRET_TOKEN)
   // console.log(itemId)
    const response = await dataSchema.findByIdAndDelete(itemId,{new:true})
    const response1 = await userShema.findById(userId)
    console.log(response1, "userDetails")
    //console.log(response , "===response ")
    res.status(200).json(response1)
})
module.exports = router
