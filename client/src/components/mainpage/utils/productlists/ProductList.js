import React from 'react'
// import { Link } from 'react-router-dom';
import BtnRow from './BtnRow';

const ProductList = ({key,product,isAdmin}) => {
    // console.log(product);
    // const state=useContext(GlobalState)
    // // const [products]=state.ProductApi.products
    // // const[isAdmin]=state.UserApi.isAdmin
    // const wishlist=state.UserApi.wishlist
  return (
    <div key={key}className='product_card'>
      {
        isAdmin && <input type='checkbox' checked={product.checked}/>
      }
      <img src={product.images || product.images.url} alt=''/>
      <div className='product_box'>
        <h2 title={product.title}>{product.title}</h2>
        <span>{product.year}</span>
        <p>{product.description}</p>
      </div>
      <BtnRow product={product}/>
    </div>

  )
}

export default ProductList