import React from 'react';
import './OrderCreationContent.css';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from "moment";

const OrderCreationContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {response} = location.state || {};

  const handleClickOrderList = () => {
    navigate('/orderlist');
  }

  const handleClickHome = () => {
    navigate('/');
  }

  const formatDateTime = (dateTime) => {
    return moment(dateTime, 'YYYYMMDDHHmmss').format('h:mm:ss A - dddd, MMMM Do YYYY');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ'; // assuming the amount is in cents
  };

  return (
    <div className='order-creation-content-container'>
      <div className='order-creation-text'>
        ORDER CREATED!
      </div>

      <div className='order-creation-detail'>
        <div className='detail-content'>
          <p>Order ID: {response.orderId}</p>
          <p>Total Price: {formatPrice(response.totalPrice)}</p>
          <p>Customer Name: {response.cusName}</p>
          <p>Address: {response.address}</p>
          <p>Phone Number: {response.phone}</p>
          <p>Note: {response.description}</p>

        </div>
      </div>

      <div className='action-button'>
        <button className='home-button' onClick={handleClickHome}>HOME</button>
        <button onClick={handleClickOrderList}>ORDER LIST</button>

      </div>
    </div>
  )
}

export default OrderCreationContent;
