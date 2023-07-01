const jwt = require("jsonwebtoken")
const SECRET_TOKEN = "this- is-secret-token"

const generateToken = (userId , userName)=>{
    return jwt.sign({_id:userId , name : userName},SECRET_TOKEN)
}

module.exports= {generateToken}