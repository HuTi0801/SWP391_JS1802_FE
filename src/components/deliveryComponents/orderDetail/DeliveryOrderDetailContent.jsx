import React, { useEffect, useState } from 'react'
import './DeliveryOrderDetailContent.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const DeliveryOrderDetailContent = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { orderId } = location.state || {};
  const [diamonds, setDiamonds] = useState([]);
  const [diamondShells, setDiamondShells] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/orders/get-order-${orderId}`);
        if (response.data.isSuccess) {
          setOrder(response.data.result);
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

  const handleClickTakeOrder = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/auth/orders/update-order-status-from-confirmed/${orderId}?newStatus=Delivering`);
      if (response.data.isSuccess) {
        alert("Order Taken Successfully! ");
      } else {
        console.error('Failed to take order:', response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error taking order:', error);
      alert("Order Update Failed");
    }
  };

  const handleClickConfirmDelivery = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/auth/orders/update-order-status-to-delivered/${orderId}?isCustomer=false&isDelivery=true`);
      if (response.data.isSuccess) {
        alert("Order Delivered Successfully! ");
      } else {
        console.error('Failed to deliver order:', response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error confirming order delivery:', error);
      alert("Order Update Failed");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className='staff-order-detail-content-container'>
      <div className='title'>
        <p>ORDER DETAIL</p>
      </div>
      <div className='order-detail-information'>
        <div className='detail-information-container'>
          <p>Order ID: {order.orderId}</p>
          <p>Customer Name: {order.cusName}</p>
          <p>Total Price: {formatPrice(order.totalPrice)}</p>
          <p>Deliver To: {order.address}</p>
          <p>Purchase Date: {new Date(order.dateStatusOrders[0].dateStatus).toLocaleString()}</p>
          {/* Assuming the delivered date needs to be checked and rendered */}
          <p>Delivered Date:</p>
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
        {order.dateStatusOrders[order.dateStatusOrders.length - 1].status === "Confirmed" && (
          <button onClick={handleClickTakeOrder}>TAKE ORDER</button>
        )}
        {order.dateStatusOrders[order.dateStatusOrders.length - 1].status === "Delivering" && (
          <button onClick={handleClickConfirmDelivery}>CONFIRM DELIVERY</button>
        )}

      </div>
    </div>
  )
}

export default DeliveryOrderDetailContent