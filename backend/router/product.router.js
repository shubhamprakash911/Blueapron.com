const express= require("express");
const {productModel} = require("../model/product.model")
const {authorization}=require("../middleware/authorization.middleware")
const productRouter=express.Router();

productRouter.get("/",async (req,res)=>{
    const query={};
    if(req.query.search) query.name = {$regex:req.query.search,$options:"i"};
    if(req.query.rating) query.rating = req.query.rating;
    if(req.query.cuisine) query.cuisine= req.query.cuisine;
    if(req.query.price) query.price=req.query.price;
    if(req.query.type) query.cuisine= req.query.type;

    try {
        const productData=await productModel.find(query)
        res.send(productData)
    } catch (error) {
        res.send({"msg":error.message})
    }
})

productRouter.use(authorization)

productRouter.post("/create",async (req,res)=>{
    try {
        await new productModel(req.body).save()
        res.send({"msg":"product created"})
    } catch (error) {
        res.send({"msg":error.message})
    }
})

productRouter.patch("/update/:id",async(req,res)=>{
    // const product=await productModel.findOne({_id:req.params.id})
    try {
        await productModel.findByIdAndUpdate({_id:req.params.id},req.body)
    } catch (error) {
        res.send({"msg":error.message})
    }
})

productRouter.delete("/delete/:id",async(req,res)=>{
    try {
        await productModel.findByIdAndDelete({_id:req.params.id},req.body)
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports={productRouter}
