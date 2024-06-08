import React from 'react'
import './OrderCreation.css'
import OrderCreationContent from '../../../components/userComponents/order/OrderCreationContent'
import Footer from '../../../components/userComponents/footer/Footer'
import Navbar from '../../../components/userComponents/header/navbar/Navbar'
import Header from '../../../components/userComponents/header/Header'


const OrderCreation = () => {
    return (
        <div className='order-creation-container'>
            <Header />
            <Navbar />
            <OrderCreationContent />
            <Footer />
        </div>
    )
}

export default OrderCreation