const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        unique:true        
    },
    role:{
        type:Number,
        default:0
    },
    cart:{
        type:Array,
        default:[]
    },
},{
    timestamps:true
})
// const userModel= mongoose.model()
module.exports=mongoose.model('users',userSchema)
