const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    try{
        const token=req.header('Authorization')
        if(!token) return res.status(400).json({msg:"invalid authorization"})
        
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err)return res.status(400).json({msg:"invalid authorization"})
            req.user=decoded
            next()
        })
    }
    catch(e){
        return res.status(500).json({msg:e.message})
    }
}

module.exports=auth