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
    year:{
        type:Number,
        trim:true,
        required:true
    },
    genre:{
        type:[String],
        required:true,       
    },
    platform:{
        type:String,
        // required:true,          
    },
    images:{
        type:Object,
        required:true,              
    },
    description:{
        type:String,
        required:true,  
    },
    // checked:{
    //     type:Boolean,
    //     default:false
    // },
    // sold:{
    //     type:Boolean,
    //     default:false        
    // }
},{
    timestamps:true
})

module.exports=mongoose.model('products',proSchema)