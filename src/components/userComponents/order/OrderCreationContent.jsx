import React from 'react'
import './OrderCreationContent.css'
import { useNavigate } from 'react-router-dom'

const OrderCreationContent = () => {
    const navigate= useNavigate();
const handleClickOrderList = () => {
    navigate('/orderlist');
}

const handleClickHome = () => {
    navigate('/');
}

  return (
    <div className='order-creation-content-container'>
        <div className='order-creation-text'>
            YOUR ORDER HAS BEEN CREATED!
        </div>
        <div className='order-creation-detail'>
            <div className='detail-content'>
            <p>Order ID: </p>
            <p>Total Price: </p>
            <p>Deliver To: </p>
            <p>Order Creation Date: </p>
            </div>
        </div>
        <div className='action-button'>
            <button className='home-button' onClick={handleClickHome}>HOME</button>
            <button className='order-list-button' onClick={handleClickOrderList}>ORDER LIST</button>
        </div>
    </div>
  )
}

export default OrderCreationContent