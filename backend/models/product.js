const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    code:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:String,
    stock:Number,
    brand:String
})
const Product=mongoose.models.Product || mongoose.model("Product",productSchema)
module.exports=Product