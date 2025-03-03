import React from 'react'
import { useContext } from 'react'
import { GlobalState } from '../../../../GlobalState'

import { Link } from 'react-router-dom'

const BtnRow = ({product}) => {
    const state=useContext(GlobalState)
    const[isAdmin]=state.UserApi.isAdmin
    const wishlist=state.UserApi.wishlist
    // console.log(product);
    
  return (
    <div className='row_btn'>
    {isAdmin ?<>
      <Link id='btn_view' to={`details/${product.product_id}`}>Edit</Link>
      <Link id='btn_list' to={'#!'} >Delete</Link>        
    </>:
    <>
    <Link id='btn_view' to={`details/${product.product_id}`}>View</Link>
    <Link id='btn_list' to={'/'} onClick={()=>wishlist(product)}>Wishlist</Link>
    </>
    }
  </div>
  )
}

export default BtnRow
