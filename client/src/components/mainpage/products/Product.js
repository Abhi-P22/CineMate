import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/productlists/ProductList'

const Product = () => {
  const state=useContext(GlobalState)
  const [products]=state.ProductApi.products
  // console.log(products);
  const[isAdmin]=state.UserApi.isAdmin
  return (
    <div className='products'>
      {
        products.map(product=>{
          return <ProductList key={product.id} product={product} isAdmin={isAdmin}/>
        })
      }
    </div>
  )
}

export default Product
