import React, { useEffect, useState } from 'react';
import './OrderDetailContent.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Stepper, Step, StepLabel, Box, Typography, Popover } from '@mui/material';

const steps = ['Order Created', 'Order Confirmed', 'Order Delivering', 'Order Delivered'];

const OrderDetailContent = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { orderId } = location.state || {};
  const [diamonds, setDiamonds] = useState([]);
  const [diamondShells, setDiamondShells] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/orders/get-order-${orderId}`);
        if (response.data.isSuccess) {
          setOrder(response.data.result);
          updateActiveStep(response.data.result.dateStatusOrders);
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
  }, [orderId, refresh]); // Add refresh to the dependency array

  const updateActiveStep = (dateStatusOrders) => {
    if (!dateStatusOrders || dateStatusOrders.length === 0) {
      setActiveStep(-1);
      return;
    }

    const status = dateStatusOrders[dateStatusOrders.length - 1].status;
    switch (status) {
      case 'Pending':
        setActiveStep(0);
        break;
      case 'Confirmed':
        setActiveStep(1);
        break;
      case 'Delivering':
        setActiveStep(2);
        break;
      case 'Delivered':
        setActiveStep(3);
        break;
      default:
        setActiveStep(-1);
    }
  };

  const handleClickCancelOrder = async () => {
    const userConfirm = window.confirm('Are you sure you want to cancel order?');
    if (userConfirm) {
      try {
        const response = await axios.post(`http://localhost:8080/auth/orders/cancel-order-${orderId}`);
        if (response.data.isSuccess) {
          alert('Order Canceled Successfully!');
          setRefresh((prev) => !prev); // Toggle refresh state to re-fetch the data
        } else {
          console.error('Failed to cancel order:', response.data.message);
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error cancelling order:', error);
      }
    }
  };

  const handleClickConfirmDelivery = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/auth/orders/update-order-status-to-delivered/${orderId}?isCustomer=true&isDelivery=false`);
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

  const handleStepMouseEnter = (event, step) => {
    setAnchorEl(event.currentTarget);
    setHoveredStep(step);
  };

  const handleStepMouseLeave = () => {
    setAnchorEl(null);
    setHoveredStep(null);
  };

  const open = Boolean(anchorEl);

  // Messages corresponding to each step
  const stepMessages = {
    'Order Created': order && order.dateStatusOrders && order.dateStatusOrders.length > 0
      ? `Purchase Date: ${new Date(order.dateStatusOrders[0].dateStatus).toLocaleString('en-GB')}`
      : '',
    'Order Confirmed': order && order.dateStatusOrders && order.dateStatusOrders.length > 1
      ? `Order Confirmation Date: ${new Date(order.dateStatusOrders[0].dateStatus).toLocaleString('en-GB')}`
      : 'Processing...',
    'Order Delivering': order && order.dateStatusOrders && order.dateStatusOrders.length > 2
      ? `Order is assigned to delivery unit on ${new Date(order.dateStatusOrders[2].dateStatus).toLocaleString('en-GB')}`
      : 'Processing...',
    'Order Delivered': order && order.dateStatusOrders && order.dateStatusOrders.length > 3
      ? `Your order has been delivered successfully on ${new Date(order.dateStatusOrders[3].dateStatus).toLocaleString('en-GB')}`
      : 'Processing...',
  };

  return (
    <div className="order-detail-content-container">
      <div className="title">
        <p>ORDER DETAIL</p>
      </div>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className="step-progress"
        sx={{
          margin: '20px 0',
          '& .MuiStep-root': {
            '& .MuiStepLabel-label': {
              fontSize: '1.2rem',
            },
            '& .MuiStepIcon-root': {
              color: 'grey',
              '&.Mui-completed': {
                color: '#06AC09',
              },
              '&.Mui-active': {
                color: 'primary.main',
              },
            },
          },
        }}
      >
        {steps.map((label, index) => (
          <Step
            key={label}
            onMouseEnter={(event) => handleStepMouseEnter(event, label)}
            onMouseLeave={handleStepMouseLeave}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="order-detail-information"> 
        <div className="detail-information-container">
          <p>Order ID: {order.orderId}</p>
          <p>Customer Name: {order.cusName}</p>
          <p>Adress : {order.address}</p>
          <p>Phone Number: {order.phone}</p>
          <p>Total Price: {formatPrice(order.totalPrice)}</p>
        </div>
      </div>
      <div className="order-product-list">
        <ul>
          {order.orderDetails.map((orderDetail, index) => {
            let productDetails = null;
            let productName = '';
            let productImage = '';

            if (orderDetail.diamondId && !orderDetail.diamondShellId) {
              productDetails = diamonds.find((diamond) => diamond.id === orderDetail.productId);
              productName = `${productDetails?.origin || ''} ${productDetails?.cut || ''} ${productDetails?.color || ''} ${productDetails?.clarity || ''}`;
              productImage = productDetails?.imageDiamond || '';
            } else if (orderDetail.diamondShellId && !orderDetail.diamondId) {
              productDetails = diamondShells.find((shell) => shell.id === orderDetail.productId);
              productName = `${productDetails?.material || ''} ${productDetails?.secondaryStoneType || ''}`;
              productImage = productDetails?.imageDiamondShell || '';
            }

            return (
              <li key={index}>
                <img src={productImage} alt="Product" />
                <span className="product-information">
                  <p>Product Name: {productName}</p>
                  <p>Quantity: {orderDetail.quantity}</p>
                  <p>Price: {formatPrice(orderDetail.price)}</p>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="status-and-button">
        <span>Status: {order.dateStatusOrders[order.dateStatusOrders.length - 1].status}</span>
        {order.dateStatusOrders[order.dateStatusOrders.length - 1].status === 'Pending' && (
          <button onClick={handleClickCancelOrder} className="cancel-button">
            CANCEL ORDER
          </button>
        )}
        {order.dateStatusOrders[order.dateStatusOrders.length - 1].status === 'Delivering' && (
          <button onClick={handleClickConfirmDelivery} className="confirm-delivery-button">
            CONFIRM DELIVERY
          </button>
        )}
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={handleStepMouseLeave}
        disableRestoreFocus
      >
        {hoveredStep && (
          <Box sx={{ mt: 1, p: 2, bgcolor: 'background.paper', border: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {stepMessages[hoveredStep]}
            </Typography>
          </Box>
        )}
      </Popover>
    </div>
  );
};

export default OrderDetailContent;
