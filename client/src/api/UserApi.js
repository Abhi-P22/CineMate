import axios from 'axios'
import React, { useEffect, useState } from 'react'

//how to call token
const UserApi = (token) => {
    const[isLogged,SetIsLogged]=useState(false)
    const[isAdmin,SetIsAdmin]=useState(false)
    const [cart,setCart]=useState([])

    useEffect(()=>{
        if(token){
            const getUser=async()=>{
                try{
                    const res=await axios.get('/user/info',{headers:{Authorization:token}})
                    SetIsLogged(true)
                    res.data.role===1 ? SetIsAdmin(true):SetIsAdmin(false)
                    // console.log(res);
                    
                }catch(e){
                    alert(e.response.data.msg)
                }
            }
            getUser()
        }
    },[token])

    const wishlist=async(product)=>{
        console.log(product);
        
        if(!isLogged) return alert('Please Login')

        const check =cart.every(item=>{
            return item.product_id !==product.product_id
        })  
        
        if(check){
            setCart([...cart,{...product}])
            console.log(cart);
            
        }else{
            alert('this movie is already wishlisted')
        }
    }
  return{
    isLogged:[isLogged,SetIsLogged],
    isAdmin:[isAdmin,SetIsAdmin],
    cart:[cart,setCart],
    wishlist:wishlist
  }
}

export default UserApi

