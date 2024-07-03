import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import './PaymentDetail.css';
import axios from 'axios';

const PaymentDetail = () => {
  const location = useLocation(); // Use useLocation to get the state
  const [customerInfo, setCustomerInfo] = useState({
    cusName: '',
    numberPhone: '',
    address: '',
    description: '',
  });
  const [cart, setCart] = useState({ items: [] });
  const [diamondShell, setDiamondShell] = useState([]);
  const [diamond, setDiamond] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const customerID = localStorage.getItem('customerId');
  const [errors, setErrors] = useState({});
  const alertShown = useRef(false); // Add useRef to track if the alert has been shown
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (location.state && location.state.status === 'FAILED' && !alertShown.current) {
      alert('Payment failed. Please try again.');
      alertShown.current = true; // Set the alertShown to true after showing the alert
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/auth/cart/get-cart-by-customer-id/${customerID}`, null, {
          headers: {
            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
          }
        });
        const cartData = response.data;
        if (!cartData || !cartData.items) {
          console.error('Cart data or cart items are undefined:', cartData);
          return;
        }
        setCart(cartData);

        const diamondPromises = cartData.items
          .filter(item => item.productType === "DIAMOND")
          .map(item => axios.get(`http://localhost:8080/auth/diamond/get-a-diamond-${item.productId}`));

        const diamondShellPromises = cartData.items
          .filter(item => item.productType === "DIAMOND_SHELL")
          .map(item => axios.get(`http://localhost:8080/auth/diamond-shell/get-a-diamond-shell-${item.productId}`));

        const diamondResponses = await Promise.all(diamondPromises);
        const diamondData = diamondResponses.map(response => response.data.result);
        setDiamond(diamondData);

        const diamondShellResponses = await Promise.all(diamondShellPromises);
        const diamondShellData = diamondShellResponses.map(response => response.data.result);
        setDiamondShell(diamondShellData);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [customerID]);

  const validateForm = () => {
    let errors = {};
    if (!customerInfo.cusName) {
      errors.cusName = "Please Enter Your Name";
    }
    if (!customerInfo.numberPhone) {
      errors.numberPhone = "Please Enter Phone Number";
    }
    if (!customerInfo.address) {
      errors.address = "Please Enter Address";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      localStorage.setItem('paymentReturnData', JSON.stringify(customerInfo)); // Store customerInfo in localStorage
      const response = await axios.post(`http://localhost:8080/auth/payment/create-payment?cusId=${customerID}&amount=${cart.totalPrice}&language=vn`, null, {
        headers: {
          Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
        }
      });

      window.open(response.data.url, '_blank');
    } catch (error) {
      console.error(error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className='payment-detail-container'>
      <div className='title'>
        PAYMENT DETAIL
      </div>
      <form onSubmit={handleSubmit}>
        <div className='payment-info'>
          <div className='personal-information'>
            <label htmlFor="cusName">Customer Name:</label>
            <input
              type="text"
              name="cusName"
              placeholder='Enter Your Name'
              value={customerInfo.cusName}
              onChange={handleInputChange}
            />
            {errors.cusName && <div className="error">{errors.cusName}</div>}

            <label htmlFor="numberPhone">Phone Number:</label>
            <input
              type="text"
              name="numberPhone"
              placeholder='Enter Phone Number'
              inputMode="numeric"
              pattern="[0-9]*"
              value={customerInfo.numberPhone}
              onChange={handleInputChange}
            />
            {errors.numberPhone && <div className="error">{errors.numberPhone}</div>}

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              placeholder='Enter Address'
              value={customerInfo.address}
              onChange={handleInputChange}
            />
            {errors.address && <div className="error">{errors.address}</div>}

            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              placeholder='Enter Description'
              value={customerInfo.description}
              onChange={handleInputChange}
            />
          </div>

          <div className='payment-method'>
            <div className='order-detail'>
              <p className='order-detail-title'>YOUR CART</p>
              <ul className='list-order'>
                {cart.items.map((item, index) => {
                  let productDetails = null;
                  let productName = '';
                  let productImage = '';
                  let productPrice = 0;

                  if (item.productType === 'DIAMOND') {
                    productDetails = diamond.find(d => d.id === item.productId);
                    productName = `${productDetails?.origin || ''} ${productDetails?.cut || ''} ${productDetails?.color || ''} ${productDetails?.clarity || ''}`;
                    productImage = productDetails?.imageDiamond || '';
                    productPrice = productDetails?.price || 0;
                  } else if (item.productType === 'DIAMOND_SHELL') {
                    productDetails = diamondShell.find(d => d.id === item.productId);
                    productName = `${productDetails?.material || ''} ${productDetails?.secondaryStoneType || ''}`;
                    productImage = productDetails?.imageDiamondShell || '';
                    productPrice = productDetails?.price || 0;
                  }

                  return (
                    <li key={index}>
                      <div className="cart-item">
                        <img src={productImage} alt="Product" />
                        <div className='product-information'>
                          <p>Product Name: {productName}</p>
                          <p>Quantity: {item.quantity}</p>
                          <p>Price: {formatPrice(productPrice)}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className='action-button'>
          <button type="submit" className='confirm-payment'>CONFIRM PAYMENT</button>
        </div>
      </form>
    </div>
  );
}

export default PaymentDetail;
