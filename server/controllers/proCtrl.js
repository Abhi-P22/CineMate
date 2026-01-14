const proModel=require('../models/productModel')
const axios=require('axios')
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
            // const tmdbApi=require('./controllers/tmdbApi')
            // await tmdbApi()
            // // console.log(req.query);
            // console.log(tmdbApi);
            
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
            const{product_id,title,year,genre,images,description}=req.body
            if(!images) return res.status(400).json({msg:'no image uploaded'})
            const Pros=await proModel.findOne({product_id})
            if(Pros) return res.status(400).json({msg:'product already exists'})
            const newPros=new proModel({
                product_id,title:title.toLowerCase(),year,genre,images,description
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
            const{title,year,genre,platform,images,description}=req.body
            if(!images) return res.status(400).json({msg:'no image uploaded'})
            await proModel.findOneAndUpdate({_id:req.params.id},{
                title:title.toLowerCase(),year,genre,platform,images,description
            })
            res.json({msg:'product updated'})
        }
        catch(e){
            return res.status(500).json({msg:e.message})     
        }
    },
    chatBot:async(req,res)=>{
        try{
            const{message,movie,year}=req.body
            // const apiKey=process.env.GEMINI_API_KEY
            const apiKey = process.env.OPENROUTER_API_KEY;
            // const response = await axios.post(
            //     `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
            //     {
            //         contents: [{ parts: [{ text: ` Answer very shortly this about ${movie,year}: ${message}` }] }]

            //     },
            //     { headers: { "Content-Type": "application/json" } }
            // )
            const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
            model: "mistralai/mistral-7b-instruct",
            messages: [
                {
                role: "user",
                content: `Answer very shortly about the movie "${movie}" (${year}): ${message}`
                }
            ]
            },
            {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
            }
        );

        // ---- VALIDATION BLOCK ----
        if (!response.data) {
            return res.json({ aiResponse: "AI connection failed." });
        }

        if (!response.data.choices) {
            return res.json({ aiResponse: "AI connection failed." });
        }

        if (!Array.isArray(response.data.choices)) {
            return res.json({ aiResponse: "AI connection failed." });
        }

        if (response.data.choices.length === 0) {
            return res.json({ aiResponse: "AI connection failed." });
        }

        if (!response.data.choices[0].message) {
            return res.json({ aiResponse: "AI connection failed." });
        }

        if (!response.data.choices[0].message.content) {
            return res.json({ aiResponse: "AI connection failed." });
        }

        // ---- SAFE SUCCESS ----
        const aiResponse = response.data.choices[0].message.content.trim();
        res.json({ aiResponse });

            // if(response.data?.candidates?.length>0){
            //     const aiResponse = response.data.candidates[0].content.parts[0].text;
            //     res.json({aiResponse})
            // }
            // else {
            //     throw new Error("No valid response from Gemini.")
            //     console.log('errrrrrr');
            //     ;
            // }

            // if (Array.isArray(response.data) && response.data.length > 0) {
            //     const aiResponse = response.data[0].generated_text;
            //     res.json({ aiResponse });
            // } else {
            //     throw new Error("No valid response from HuggingFace.");
            // }
        }
        catch(e){
            return res.status(500).json({msg:e.message})
        }
    }
}

module.exports= proCtrl