import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import './WarrantyDetail.css';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const WarrantyDetail = () => {
  const location = useLocation();
  const order = location.state || {};
  const authToken = localStorage.getItem('authToken');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endDateError, setEndDateError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/orders/get-order-${order.orderId}`, {
          headers: {
            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
          }
        });
        if (response.data.isSuccess) {
          const orderData = response.data.result; // Assuming order details are under result
          setStartDate(orderData.warrantyStartDate ? moment(orderData.warrantyStartDate).format('DD/MM/YYYY') : '');
          setEndDate(orderData.warrantyEndDate ? moment(orderData.warrantyEndDate).format('YYYY-MM-DD') : '');
        } else {
          console.error('Failed to fetch order:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    if (order.orderId) {
      fetchOrder();
    }
  }, [order.orderId, authToken]);

  const handleEndDateChange = (event) => {
    const { value } = event.target;
    setEndDate(value);

    const oldEndDate = moment(order.orderId.warrantyEndDate).format('YYYY-MM-DD');
    const isValid = moment(value).isSameOrAfter(oldEndDate);
    setEndDateError(isValid ? '' : 'End date cannot be earlier than current warranty end date');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedEndDate = encodeURIComponent(moment(endDate).format('DD/MM/YYYY'));
    try {
      const response = await axios.post(`http://localhost:8080/auth/orders/update-warranty-end-date/{orderId}{endDate}?orderId=${order.orderId}&newEndDate=${formattedEndDate}`, null, {
        headers: {
          Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
        }
      });
      console.log('Form data:', { startDate, endDate });
      if (response.data.isSuccess) {
        alert('Update Successfully! ');
      }
      else{
        alert('Update Failed! Order must be delivered to update warranty! ')
      }

    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (date) => {
    return date ? moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY') : '';
  };

  return (
    <div className='warranty-detail-container'>
      <div className='warranty-title'>
        <p>WARRANTY INFORMATION</p>
      </div>
      <form onSubmit={handleSubmit} className='warranty-information'>
        <div className='info-row'>
          <label htmlFor='startDate'>Start Date:</label>
          <p className='date-display'>{startDate}</p>
        </div>
        <div className='info-row'>
          <label htmlFor='endDate'>End Date:</label>
          <input
            id='endDate'
            name='endDate'
            type='date'
            placeholder={order.orderId && formatDate(order.orderId.warrantyEndDate)}
            onChange={handleEndDateChange}
            value={endDate}
            className='date-input'
          />
          {endDateError && <div className='error'>{endDateError}</div>}
        </div>
        <button type='submit' className='submit-button'>UPDATE</button>
      </form>
    </div>
  );
}

export default WarrantyDetail;
