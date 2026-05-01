const express=require("express")
const Product = require("../models/product")
const router=express.Router()
router.post("/create",async(req,res)=>{
    try{
        const {code,name,address,price,category,stock,brand}=req.body
        const product=new Product({code,name,address,price,category,stock,brand})
        await product.save();
        res.status(201).json({message:"data inserted",status:true})
    }catch(error){
        res.status(200).json({error:error,message:"data not inserted",status:false})
    }
})

router.get("/data",async(req,res)=>{
    try{
        const data=await Product.find()
        const count=await Product.countDocuments()
        res.status(201).json({data:data,count:count,message:"success"})
    }catch(error){
        res.status(200).json({error:error,message:"data not found"})
    }
})

router.delete("/delete/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const response=await Product.findOneAndDelete({_id:id})
        res.status(201).json({message:"data is deleted",status:true})
    }catch(error){
        res.status(200).json({error:error,message:"data not deleted",status:false})
    }
})

router.post("/select",async(req,res)=>{
    try{
        const {id}=req.body
        const response=await Product.find({_id:id})
        res.status(201).json({message:"data selected",data:response})
    }catch(error){
        res.status(200).json({error:error,message:"data not deleted",status:false})
    }
})

router.put("/edit",async(req,res)=>{
    try{
        const {_id,code,name,address,price,category,stock,brand}=req.body
        const response=await Product.findByIdAndUpdate({_id:_id},{code,name,address,price,category,stock,brand})
        res.status(201).json({message:"data edited",status:true})
    }catch(error){
        res.status(200).json({error:error,message:"data not edited",status:false})
    }
})
module.exports=router