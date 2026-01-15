import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

const Wishlist = () => {
  const state=useContext(GlobalState)
  const [cart,setCart]=state.UserApi.cart

  if(cart.length===0) 
  return <h2 style={{textAlign:'center',fontSize:'5rem', marginTop:'20px'}}>Wishlist is empty</h2>
  return (
    <div>
      {cart.map(movie=>(
        <div className='detail'>
          <img src={movie.images ||movie.images.url} alt='pic' />
          <div className='box-detail'>
            <div className='row'>
              <h2>{movie.title}</h2>
              <h6>{movie.product_id}</h6>
            </div>
            <span>Year:{movie.year||movie.price}</span>
            <p>Genre:{movie.description}</p>
            <p>Platform:{movie.content}</p>
            <p>Category:{movie.category}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Wishlist
