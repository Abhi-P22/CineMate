import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

const DetailProduct = () => {
    const params=useParams()
    const state=useContext(GlobalState)
    const [products]=state.ProductApi.products
    const[detailProduct,setDetailproduct]=useState([])

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
      <img src={detailProduct.images.url} alt=''/>
      <div className='box-detail'>
        <div className='row'>
            <h2>{detailProduct.title}</h2>
            <h6>{detailProduct.product_id}</h6>
        </div>
        <span>Year:{detailProduct.price}</span>
        <p>Genre:{detailProduct.description}</p>
        <p>Platform:{detailProduct.content}</p>
        <p>Category:{detailProduct.category}</p>
        <Link to='/wishlist' className='wishlist'>Add to Wishlist</Link> 
      </div>
    </div>
  )
}

export default DetailProduct
