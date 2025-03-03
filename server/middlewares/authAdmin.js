const jwt=require('jsonwebtoken')
const Users=require('../models/userModel')
const authAdmin=async(req,res,next)=>{
    try{
        const user=await Users.findOne({
            _id:req.user.id
        })
        if(user.role===0) return res.status(400).json({msg:"admin resources acsess denied"})
        next()
    }
    catch(e){
        return res.status(500).json({msg:e.message})
    }
    // const token=req.header('Authorization')
    // if(!token) return
}

module.exports=authAdmin