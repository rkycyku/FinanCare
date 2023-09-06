import React from 'react'
import { Helmet } from "react-helmet";
import NavBar from "../Components/layout/NavBar";
import CartPage from '../Components/produktet/cart/CartPage';

const Cart = () => {
  return (
    <div className="cart">
      <Helmet>
        <title>Cart | Tech Store</title>
      </Helmet>
      <NavBar />
      <CartPage />


    </div>
  )
}

export default Cart