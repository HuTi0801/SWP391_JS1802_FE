import React from 'react'
import CartDetail from '../../components/userComponents/cart/CartDetail'
import TestData from '../../data/TestData.json'
import './Cart.css';

export const Cart = () => {
  return (
    <div className='cart-container'>
        <CartDetail TestData={TestData}/>
    </div>
  )
}
