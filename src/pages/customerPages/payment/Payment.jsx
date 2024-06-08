import React from 'react'
import './Payment.css'
import PaymentDetail from '../../../components/userComponents/payment/PaymentDetail'
import Header from '../../../components/userComponents/header/Header'
import Navbar from '../../../components/userComponents/header/navbar/Navbar'
import Footer from '../../../components/userComponents/footer/Footer'
const Payment = () => {
  return (
    <div className='payment-container'>
      <Header />
      <Navbar />
      <PaymentDetail />
      <Footer />
    </div>
  )
}

export default Payment