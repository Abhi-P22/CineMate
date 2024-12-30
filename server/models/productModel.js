const mongoose =require('mongoose')

const proSchema=new mongoose.Schema({
    product_id:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        trim:true,
        required:true
    },
    description:{
        type:String,
        required:true,       
    },
    content:{
        type:String,
        required:true,          
    },
    images:{
        type:Object,
        required:true,              
    },
    category:{
        type:String,
        required:true,  
    },
    checked:{
        type:Boolean,
        default:false
    },
    sold:{
        type:Boolean,
        default:false        
    }
},{
    timestamps:true
})

module.exports=mongoose.model('products',proSchema)