const catModel=require("../models/categoryModel")

const catCtrl={
    getCat:async(req,res)=>{
        try{
            const categories=await catModel.find()
            res.json(categories) 
        }
        catch(e){
            return res.status(500).json({msg:e.message})
        }
    },
    createCat:async(req,res)=>{
        try{
            const {name}=req.body
            const category=await catModel.findOne({name})
            if(category) return res.status(400).json({msg:'category already exist'})
            const newCat= new catModel({name})
            await newCat.save()
            res.json('new category created')
        }
        catch(e){
            return res.status(500).json({msg:e.message})
        }
    },
    delCat:async(req,res)=>{
        try{
            await catModel.findByIdAndDelete(req.params.id)
            res.json('category deleted')
        }
        catch(e){
            return res.status(500).json({msg:e.message})            
        }
    },
    updateCat:async(req,res)=>{
        try{
            const {name}=req.body
            await catModel.findByIdAndUpdate({_id:req.params.id},{name})
            res.json('category updated')
        }
        catch(e){
            return res.status(500).json({msg:e.message})    
        }
    }
}

module.exports=catCtrl