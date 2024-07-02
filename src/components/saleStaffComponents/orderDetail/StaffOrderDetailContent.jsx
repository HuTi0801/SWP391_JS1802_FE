import React, { useEffect, useState } from 'react';
import './StaffOrderDetailContent.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const StaffOrderDetailContent = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { orderId } = location.state || {};
  const [diamonds, setDiamonds] = useState([]);
  const [diamondShells, setDiamondShells] = useState([]);
  const [warrantyStatus, setWarrantyStatus] = useState(false); // Initial state for warranty
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/orders/get-order-${orderId}`);
        if (response.data.isSuccess) {
          setOrder(response.data.result);
          // Assume you have a way to determine warranty status from order data
          setWarrantyStatus(response.data.result.hasWarranty); // Example: Check if order has warranty set
        } else {
          console.error('Failed to fetch order:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDiamonds = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/diamond/get-all-diamond');
        if (response.data.isSuccess) {
          setDiamonds(response.data.result);
        } else {
          console.error('Failed to fetch diamonds:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching diamonds:', error);
      }
    };

    const fetchDiamondShells = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/diamond-shell/get-all-diamond-shell');
        if (response.data.isSuccess) {
          setDiamondShells(response.data.result);
        } else {
          console.error('Failed to fetch diamond shells:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching diamond shells:', error);
      }
    };

    fetchOrder();
    fetchDiamonds();
    fetchDiamondShells();
  }, [orderId]);

  const handleClickConfirmOrder = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/auth/orders/update-order-status-to-confirmed/${orderId}`);
      if (response.data.isSuccess) {
        alert("Order Confirmed Successfully! ");
        // Update order state immediately after confirmation
        setOrder(prevOrder => ({
          ...prevOrder,
          dateStatusOrders: [
            ...prevOrder.dateStatusOrders,
            { status: "Confirmed", dateStatus: new Date().toISOString() }
          ]
        }));
      } else {
        console.error('Failed to confirm order:', response.data.message);
        alert("Order Update Failed");
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      alert("Order Update Failed");
    }
  };

  const handleClickWarranty = () => {
    navigate('/warrantydetail', { state: { orderId: order } });
  };

  const handleClickSetWarranty = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/auth/orders/set-warranty-date/${orderId}`);
      if (response.data.isSuccess) {
        alert("Warranty Added Successfully! ");
        setWarrantyStatus(true); // Update warranty status state on success
      } else {
        console.error('Failed to set warranty:', response.data.message);
        alert("Failed to set warranty");
      }
    } catch (error) {
      console.error('Error setting warranty:', error);
      alert("Error setting warranty");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='staff-order-detail-content-container'>
      <div className='title'>
        <p className='title-text'>ORDER DETAIL</p>
        <button className='warranty-button' onClick={handleClickWarranty}>WARRANTY</button>
      </div>
      <div className='order-detail-information'>
        <div className='detail-information-container'>
          <p>Order ID: {order.orderId}</p>
          <p>Customer Name: {order.cusName}</p>
          <p>Total Price: {formatPrice(order.totalPrice)}</p>
          <p>Deliver To: {order.address}</p>
          <p>Purchase Date: {new Date(order.dateStatusOrders[0].dateStatus).toLocaleDateString('en-GB')}</p>
        </div>
      </div>
      <div className='order-product-list'>
        <ul>
          {order.orderDetails.map((orderDetail, index) => {
            let productDetails = null;
            let productName = '';
            let productImage = '';

            if (orderDetail.diamondId && !orderDetail.diamondShellId) {
              productDetails = diamonds.find(diamond => diamond.id === orderDetail.productId);
              productName = `${productDetails?.origin || ''} ${productDetails?.cut || ''} ${productDetails?.color || ''} ${productDetails?.clarity || ''}`;
              productImage = productDetails?.imageDiamond || '';
            } else if (orderDetail.diamondShellId && !orderDetail.diamondId) {
              productDetails = diamondShells.find(shell => shell.id === orderDetail.productId);
              productName = `${productDetails?.material || ''} ${productDetails?.secondaryStoneType || ''}`;
              productImage = productDetails?.imageDiamondShell || '';
            }

            return (
              <li key={index}>
                <img src={productImage} alt="Product" />
                <span className='product-information'>
                  <p>Product Name: {productName}</p>
                  <p>Quantity: {orderDetail.quantity}</p>
                  <p>Price: {formatPrice(orderDetail.price)}</p>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='status-and-button'>
        <span>Status: {order.dateStatusOrders[order.dateStatusOrders.length - 1].status}</span>
        {order.dateStatusOrders[order.dateStatusOrders.length - 1].status === "Pending" && (
          <button onClick={handleClickConfirmOrder}>CONFIRM ORDER</button>
        )}
        {order.dateStatusOrders[order.dateStatusOrders.length - 1].status === "Confirmed" && !warrantyStatus && (
          <button onClick={handleClickSetWarranty}>SET WARRANTY</button>
        )}
      </div>
    </div>
  );
};

export default StaffOrderDetailContent;
