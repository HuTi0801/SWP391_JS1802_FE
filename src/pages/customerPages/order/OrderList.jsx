import React from 'react'
import OrderListContent from '../../../components/userComponents/order/OrderListContent'
import './OrderList.css';
import Footer from '../../../components/userComponents/footer/Footer';
import Header from '../../../components/userComponents/header/Header';
import Navbar from '../../../components/userComponents/header/navbar/Navbar';

const OrderList = () => {
    return (
        <div className='order-list-container'>
            <Header />
            <Navbar />
            <OrderListContent />
            <Footer />
        </div>
    )
}

export default OrderList