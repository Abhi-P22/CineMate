import React from 'react'
import Product from './products/Product'
import Login from '../login/Login'
import Register from '../login/Register'
import Wishlist from './wishlist/Wishlist'
import { Routes,Route } from 'react-router-dom'
import DetailProduct from './utils/detailProducts/DetailProduct'

const Pages = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Product/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
          <Route path='/details/:id' element={<DetailProduct/>}/>
        </Routes>
    </div>
  )
}

export default Pages
