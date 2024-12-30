const Users=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userCtrl={
    register:async(req,res)=>{
        try{
            const {name,email,password}=req.body
            const user=await Users.findOne({email})
            if(user){
                return res.status(400).json({msg:'email already exist'})
            }
            if(password.length<6){
                return res.status(400).json({msg:'password needs to be atleast 6 characters'})
            }
            //pass encryption
            const passHash=await bcrypt.hash(password,10)
            const newUser=new Users({name,email,password:passHash})
            await newUser.save()
            //creating jwt for authentication 
            const accessToken=createAccessToken({id:newUser._id})
            //RT helps user to be logged in even after AT expires 
            const refreshToken=createRefreshToken({id:newUser._id})
            //cookies provides us a secure way to transmit RT(cookie used it http) & helps managing RT
            //needs a cookie-parser mw to access cookies like expressjson() and can be accessed only by name
            res.cookie('refreshtoken',refreshToken,{
                httpOnly:true,
                path:'user/refresh_token'
            })
            res.json({accessToken})
        }
        catch(e){
            res.status(500).json({msg:`sorry, ${e.message}`})
        }
    },
    refreshToken:async(req,res)=>{
        try{
            const rf_token=req.cookies.refreshtoken
            if(!rf_token)return res.status(400).json({msg:"please login or register"})
            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                if(err) return res.status(400).json({msg:"please login or Register"})
                const accessToken=createAccessToken({id:user.id})
                res.json({user,accessToken})
            })
        }
        catch(e){
            return res.status(500).json({msg:e.message})
        }
        
    },
    login:async(req,res)=>{
        try{
            const{email,password}=req.body;
            const user=await Users.findOne({email})
            if(!user) return res.status(400).json({msg:"user doesnt exist"})
            const isMatch=await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({msg:"incorrect password"}) 
            const accessToken=createAccessToken({id:user._id})
            const refreshToken=createRefreshToken({id:user._id})
            res.cookie('refreshtoken',refreshToken,{
                httpOnly:true,
                path:'/user/refresh_token'
            })
            // res.json({msg:"Login Succesful"})
            res.json({accessToken})
        }
        catch(e){
            return res.status(500).json({msg:e.message})
        }
    },
    logout:async(req,res)=>{
        try{
            res.clearCookie('refreshtoken',{
                path:'/user/refresh_token'
            })
            res.json({msg:"Logged out succesfully"})
        }catch(e){
            return res.status(500).jsom({msg:e.message})
        }
    },
    getUser:async(req,res)=>{
        try{
            const user=await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg:"user not found"})
            res.json(user)
        }
        catch(e){

        }
    }
}

const createAccessToken=(payload)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})
}
const createRefreshToken=(payload)=>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
}
module.exports=userCtrl