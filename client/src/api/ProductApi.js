import { useEffect, useState } from 'react'
import axios from 'axios'

const ProductApi = () => {
    const[products,setProducts]=useState([])
    const getProducts=async()=>{
        const res=await axios.get('/api/products')
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
