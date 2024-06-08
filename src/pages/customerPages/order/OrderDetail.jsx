import React from 'react'
import OrderDetailContent from '../../../components/userComponents/order/OrderDetailContent'
import './OrderDetail.css'
import Footer from '../../../components/userComponents/footer/Footer'
import Navbar from '../../../components/userComponents/header/navbar/Navbar'
import Header from '../../../components/userComponents/header/Header'

const OrderDetail = () => {
    return (
        <div className='order-detail-container'>
            <Header />
            <Navbar />
            <OrderDetailContent />
            <Footer />
        </div>
    )
}

export default OrderDetail