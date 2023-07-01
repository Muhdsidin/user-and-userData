const mongoose = require("mongoose")

const userModel = new mongoose.Schema({
    username : {
        type: String,
        require : true
    },
    password:{
        type:String,
        require : true
    },
    email:{
        type: String,
        require: true
    },
    item:[{
        type : mongoose.Schema.Types.ObjectId,
        require : true,
        ref: "Data"
    }]
},{strict: false})

module.exports = mongoose.model("User", userModel)