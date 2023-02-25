const express= require("express");
const {productModel} = require("../model/product.model")
const {authorization}=require("../middleware/authorization.middleware")
const productRouter=express.Router();

productRouter.get("/",async (req,res)=>{
    const query={};
    const filter={};
    const {search,brand,cuisine,min,max,type,rating,sort}=req.query

    if(search) query.name = {$regex:search,$options:"i"};
    if(brand)query.brand = brand;
    if(cuisine) query.cuisine= cuisine;
    if(type) query.type= type;

    if(rating) filter.rating = -1;
    if(sort) filter.price= +sort;
 
     query.price={$gte:min?+min:0,$lte:max?+max:Infinity}
    console.log(query,min,max)
    console.log(req.query)

    try {
        const productData=await productModel.find(query).sort(filter)
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
