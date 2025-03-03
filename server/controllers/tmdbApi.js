const axios=require('axios')
const proModel=require('../models/productModel')

const tmdbApi=async()=>{
    try{

        const genRes=await axios.get('https://api.themoviedb.org/3/genre/movie/list',{
            headers:{
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                accept: 'application/json',
            }
        })

        const genreMap={}
        for(const genre of genRes.data.genres){
            genreMap[genre.id]=genre.name;
        }
        
        const res=await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',{
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
                accept: 'application/json',
              },
            })
        // console.log(res.data.results);
        
        const movies=res.data.results
        
        const movieDocs=movies.map(movie=>({
            product_id:movie.id,
            title:movie.title,
            year:new Date(movie.release_date).getFullYear(),
            genre:movie.genre_ids.map((id) => genreMap[id]).filter(Boolean),
            //.join(', ')
            images: movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : "https://www.google.com/imgres?q=no%20image%20images&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F1%2F14%2FNo_Image_Available.jpg&imgrefurl=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo_Image_Available.jpg&docid=r1K2HZMoU-bYgM&tbnid=adRgxP47ko1kpM&vet=12ahUKEwiW_auP0OaKAxVBs1YBHY2oBlEQM3oECGQQAA..i&w=547&h=547&hcb=2&ved=2ahUKEwiW_auP0OaKAxVBs1YBHY2oBlEQM3oECGQQAA",
            description:movie.overview
        }))
        await proModel.insertMany(movieDocs)
        // for(const movie of movies){
        //     const newMovie=new proModel({
        //         product_id:movie.id,
        //         title:movie.title,
        //         year:movie.release_date,
        //         genre:movie.genre,
        //         images:`https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        //         description:movie.overview
        //     })
        //     await newMovie.save()
        // }
    }
    catch(e){
        console.log('Error populating database:', e);
    } 
}

module.exports=tmdbApi
