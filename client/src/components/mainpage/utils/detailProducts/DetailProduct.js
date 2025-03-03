import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import Chatbot from './Chatbot'

const DetailProduct = () => {
    const params=useParams()
    const state=useContext(GlobalState)
    const [products]=state.ProductApi.products
    const[detailProduct,setDetailproduct]=useState([])
    const wishlist=state.UserApi.wishlist
    useEffect(()=>{
        if(params){
            products.forEach(product=>{
                if(product.product_id===params.id) setDetailproduct(product)
            })
        }
    },[params,products])
    console.log(params);
    if(detailProduct.length===0) return null
    
  return (
    <div className='detail'>
      <img src={detailProduct.images ||detailProduct.images.url} alt=''/>
      <div className='box-detail'>
        <div className='row'>
            <h2>{detailProduct.title}</h2>
            {/* <h1>{detailProduct.product_id}</h1> */}
        </div>
        <span>Year:{detailProduct.year}</span>
        <p>Description:{detailProduct.description}</p>
        <p>Genre:{detailProduct.genre.join(', ')}</p>
        <p>Platform:{detailProduct.content}</p>
        <button type='button' onClick={()=>wishlist(detailProduct)} className='wishlist'>Add to Wishlist</button>
        <Chatbot 
        movieDetails={{ 
        movie: detailProduct.title, 
        year: detailProduct.year 
        }}
        />
        {/* <Link to={`details/${detailProduct.product_id}`}onClick={()=>wishlist(detailProduct)} className='wishlist'>Add to Wishlist</Link>  */}
      </div>
    </div>
  )
}

export default DetailProduct
