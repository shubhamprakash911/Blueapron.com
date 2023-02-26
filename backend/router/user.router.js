const express = require("express");
const {userModel} = require("../model/user.model")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
const {authorization} = require("../middleware/authorization.middleware")
const userRouter= express.Router();

userRouter.get("/",async (req,res)=>{
    try {
        let users=await userModel.find()
        res.send(users)
    } catch (error) {
        res.send({"msg":"something went wrong ","err":error.message})
    }
})

userRouter.post("/register",async (req,res)=>{
    const {name,email,pass,isAdmin}= req.body;
    const user=await userModel.find({email})
    try {
        if(user.length==0){
            bcrypt.hash(pass, 4, async function(err, hash) {
                if(err){
                    res.send({"msg":"something went wrong ","err":err.message})
                }else{
                    const user= new userModel ({name,email,pass:hash,isAdmin})
                    await user.save()
                    res.send({"msg":"new users has been register"})
                }
            })
        }else{
            res.send({"msg":"user already register"})
        }

    } catch (error) {
        res.send({"msg":"something went wrong ","err":error.message})
    }  
})

userRouter.post("/login",async (req,res)=>{
    const {email,pass}= req.body;
    try {
        const user= await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass,(err, result)=> {
                 if(result){
                    let token= jwt.sign({isAdmin:user[0].isAdmin},"masai")
                    res.send({"msg":"login Successful","name":user[0].name,token,"isAdmin":user[0].isAdmin})
                 }else{
                    res.send("Wrong crediatial")
                 }
            });
        }else{
            res.send("Wrong crediatial")
        }
    } catch (error) {
        res.send({"msg":"something went wrong "})
    } 
 })

 userRouter.delete("/delete/:id",authorization,async(req,res)=>{
    try {
        await userModel.findByIdAndDelete({_id:req.params.id})
        let data=await userModel.find()
        res.send({"msg":"user deleted successful","data":data})
    } catch (error) {
        res.send({"msg":"something went wrong"})
    }
 })

 module.exports={userRouter}