const mongoose= require("mongoose")
const userSchema= mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    pass:{type:String,required:true},
    isAdmin:{type:Number,default:false}
},{versionKey:false});

const userModel= mongoose.model("user",userSchema)

module.exports={userModel}

