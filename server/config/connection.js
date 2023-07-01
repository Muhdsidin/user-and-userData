const mongoose = require('mongoose')

const connection = mongoose.connect(process.env.MONGO_LINk)
console.log("server is connected in mongodb")

module.exports = connection