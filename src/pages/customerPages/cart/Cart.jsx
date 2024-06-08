import React from 'react'
import CartDetail from '../../../components/userComponents/cart/CartDetail'
import './Cart.css';
import Header from '../../../components/userComponents/header/Header';
import Navbar from '../../../components/userComponents/header/navbar/Navbar';
import Footer from '../../../components/userComponents/footer/Footer';

export const Cart = () => {
  return (
    <div className='cart-container'>
      <Header />
      <Navbar />
      <CartDetail />
      <Footer />
    </div>
  )
}
