const mongoose = require("mongoose")
const userShema = require("./userShema")

const DataModel = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    des:{
        type:String,
        require:true
    },
    username : {
        type: String,
        require : true
    },
    userId:{
        type: String,
        require: true
    } 
})

module.exports = mongoose.model("Data", DataModel)