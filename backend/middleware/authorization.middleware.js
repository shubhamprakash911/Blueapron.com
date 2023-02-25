const jwt = require("jsonwebtoken")

const authorization = (req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded && decoded.isAdmin){
              next()
            }else{
                res.send({"msg":"You are not a Admin"})
            }
        })
    }else{
        res.send({"msg":"You are not a Admin"})
    }
}

module.exports={authorization}