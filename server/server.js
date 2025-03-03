const express=require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const app=express()
const tmdbApi=require('./controllers/tmdbApi')
require('dotenv').config()
const cookieParser=require('cookie-parser')
app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin: "https://cine-mate-ten.vercel.app/",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,  
}));

const PORT=process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.end('Hi')
})

//Router setup
app.use('/user',require('./routes/useRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./controllers/upload'))
app.use('/api',require('./routes/productRouter'))

const URI=process.env.MONGODB_URL;

mongoose.connect(URI)
.then(async()=>{
    console.log('connected to mongodb');
    await tmdbApi()
    app.listen(PORT,()=>{
        console.log('server is running');
    })
}).catch(err=>{
    console.log(err);
})
