import React, { useEffect, useState } from 'react';
import './StaffOrderDetailContent.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Box, Button, TextField } from '@mui/material'; // Import the necessary MUI components
import moment from "moment";

const StaffOrderDetailContent = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [description, setDescription] = useState(''); // State for the cancel description
  const location = useLocation();
  const { orderId } = location.state || {};
  const [diamonds, setDiamonds] = useState([]);
  const [diamondShells, setDiamondShells] = useState([]);
  const [warrantyStatus, setWarrantyStatus] = useState(false); // Initial state for warranty
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/orders/get-order-${orderId}`, {
          headers: {
            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
          }
        });
        if (response.data.isSuccess) {
          setOrder(response.data.result);
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
        const response = await axios.get('http://localhost:8080/auth/diamond/get-all-diamond', {
          headers: {
            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
          }
        });
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
        const response = await axios.get('http://localhost:8080/auth/diamond-shell/get-all-diamond-shell', {
          headers: {
            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
          }
        });
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
      const confirmResponse = await axios.post(`http://localhost:8080/auth/orders/update-order-status-to-confirmed/${orderId}`, null, {
        headers: {
          Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
        }
      });
      if (confirmResponse.data.isSuccess) {
        const warrantyResponse = await axios.post(`http://localhost:8080/auth/orders/set-warranty-date/${orderId}`, null, {
          headers: {
            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
          }
        });

        if (warrantyResponse.data.isSuccess) {
          alert("Order Confirmed and Warranty Set Successfully!");
          setWarrantyStatus(true); // Update warranty status state on success
          // Update order state immediately after confirmation and setting warranty
          setOrder(prevOrder => ({
            ...prevOrder,
            dateStatusOrders: [
              ...prevOrder.dateStatusOrders,
              { status: "Confirmed", dateStatus: new Date().toISOString() },
              { status: "Warranty Set", dateStatus: new Date().toISOString() }
            ]
          }));
        } else {
          console.error('Failed to set warranty:', warrantyResponse.data.message);
          alert("Order Confirmed, but Failed to Set Warranty");
        }
      } else {
        console.error('Failed to confirm order:', confirmResponse.data.message);
        alert("Order Update Failed");
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      alert("Order Update Failed");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmitCancelOrder = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/auth/orders/cancel-order-${orderId}?description=${description}`, null, {
        headers: {
          Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
        }
      });
      if (response.data.isSuccess) {
        alert('Order Canceled Successfully!');
        setOrder(prevOrder => ({
          ...prevOrder,
          dateStatusOrders: [
            ...prevOrder.dateStatusOrders,
            { status: "Canceled", dateStatus: new Date().toISOString() }
          ]
        }));
        handleCloseModal();
      } else {
        console.error('Failed to cancel order:', response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const handleClickWarranty = () => {
    navigate('/warrantydetail', { state: { orderId: orderId } });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format('h:mm:ss A - dddd, MMMM Do YYYY');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='staff-order-detail-content-container'>
      <div className='title'>
        <p className='title-text'>ORDER DETAIL</p>
        {order.dateStatusOrders[order.dateStatusOrders.length - 1].status !== "Pending" && !warrantyStatus && (
          <button className='warranty-button' onClick={handleClickWarranty}>WARRANTY</button>
        )}
      </div>
      <div className='order-detail-information'>
        <div className='detail-information-container'>
          <p>Order ID: {order.orderId}</p>
          <p>Customer Name: {order.cusName}</p>
          <p>Total Price: {formatPrice(order.totalPrice)}</p>
          <p>Deliver To: {order.address}</p>
          <p>Purchase Date: {order.dateStatusOrders.length > 0 && formatDateTime(order.dateStatusOrders[0].dateStatus)}</p>
          <p>Status: {order.dateStatusOrders[order.dateStatusOrders.length - 1].status}</p>
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
        {order.dateStatusOrders[order.dateStatusOrders.length - 1].status === "Pending" && (
          <>
            <button className='confirm-order' onClick={handleClickConfirmOrder}>CONFIRM ORDER</button>
            <button className='confirm-order' onClick={handleOpenModal}>CANCEL ORDER</button>
          </>
        )}
      </div>

      {/* Modal for entering cancel description */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4
        }}>
          <h2 id="modal-title">Cancel Order</h2>
          <TextField
            id="modal-description"
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
          />
          <Button onClick={handleSubmitCancelOrder} variant="contained" color="primary" sx={{ mt: 2 }}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default StaffOrderDetailContent;
