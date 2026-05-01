const mongoose=require("mongoose")
const { eventNames } = require("../models/user")

const connectDb=()=>{
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("db connected")
    }catch(error){
        console.log("db not connected")
    }
}
module.exports=connectDb