const proModel=require('../models/productModel')

class APIfeatures{
    constructor(query,queryString){
        this.query=query;
        this.queryString=queryString;
    }
    filtering(){
        const queryObj={...this.queryString}
        console.log(queryObj);
        const excludedFields=['page','sort','limit']
        excludedFields.forEach(el=>delete(queryObj[el]))
        console.log(queryObj);
        let queryStr=JSON.stringify(queryObj)
        queryStr=queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match=>'$'+match)
        console.log({queryObj,queryStr});
        this.query.find(JSON.parse(queryStr))
        return this
    }
    sorting(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join('')
            console.log(sortBy);
            this.query=this.query.sort(sortBy)
        }
        else{
            this.query=this.query.sort('-createdAt')
        }
        return this;
    }
    // pagination(){
    //     const page=this.queryString.page*1||1;
    //     const limit=this.queryString.limit*1||9
    //     const skip=(page-1)*limit
    //     this.query=this.query.skip(skip).limit(limit)
    //     return this;
    // }
    pagination() {
        const page = this.queryString.page ? parseInt(this.queryString.page) : 1;
        const limit = this.queryString.limit ? parseInt(this.queryString.limit) : 9;
        const skip = (page - 1) * limit;
    
        this.query = this.query.skip(skip).limit(limit);
        return this; // Ensure this is returned for chaining
    }
    
}

// ca6f645de348b59c620519ebe2cccf81

const proCtrl={
    getPros:async(req,res)=>{
        try{
            console.log(req.query);
            const features=new APIfeatures(proModel.find(),req.query).filtering().sorting().pagination()
            const products=await features.query 
            res.json(products)
            // res.json({result:products.length})
        }
        catch(e){
            return res.status(500).json({msg:e.message})
        }
    },
    createPros:async(req,res)=>{
        try{
            const{product_id,title,price,description,content,images,category}=req.body
            if(!images) return res.status(400).json({msg:'no image uploaded'})
            const Pros=await proModel.findOne({product_id})
            if(Pros) return res.status(400).json({msg:'product already exists'})
            const newPros=new proModel({
                product_id,title:title.toLowerCase(),price,description,content,images,category
            })
            await newPros.save()
            res.json({msg:'product created'})
        }
        catch(e){
            return res.status(500).json({msg:e.message})            
        }
    },
    deletePros:async(req,res)=>{
        try{
            await proModel.findByIdAndDelete(req.params.id)
            res.json({msg:'product deleted'})
        }
        catch(e){
            return res.status(500).json({msg:e.message})              
        }
    },
    updatePros:async(req,res)=>{
        try{
            const{title,price,description,content,images,category}=req.body
            if(!images) return res.status(400).json({msg:'no image uploaded'})
            await proModel.findOneAndUpdate({_id:req.params.id},{
                title:title.toLowerCase(),price,description,content,images,category
            })
            res.json({msg:'product updated'})
        }
        catch(e){
            return res.status(500).json({msg:e.message})     
        }
    }
}

module.exports= proCtrl