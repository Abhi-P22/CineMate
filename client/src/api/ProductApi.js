import { useEffect, useState } from 'react'
import axios from 'axios'

const ProductApi = () => {
    const[products,setProducts]=useState([])
    const getProducts=async()=>{
        // const res=await axios.get('https://cinemate-g8ix.onrender.com/api/products') //for render deployment
        const res=await axios.get('/api/products') //for docker deployment
        console.log(res.data);
        setProducts(res.data);
    }

    useEffect(()=>{
      getProducts()
    },[])
    return {
      products:[products,setProducts]
    }
}

export default ProductApi
