import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hasCalledRef = useRef(false); // Ref to track if createOrder has been called

  useEffect(() => {
    if (hasCalledRef.current) return; // Prevent subsequent calls
    hasCalledRef.current = true;

    const query = new URLSearchParams(location.search);

    // Retrieve payment details from query parameters
    const paymentDetails = {
      vnp_PayDate: query.get('vnp_PayDate'),
      vnp_TransactionNo: query.get('vnp_TransactionNo'),
      vnp_TmnCode: query.get('vnp_TmnCode'),
      vnp_SecureHash: query.get('vnp_SecureHash'),
      vnp_OrderInfo: query.get('vnp_OrderInfo'),
      vnp_TxnRef: query.get('vnp_TxnRef'),
      vnp_Amount: query.get('vnp_Amount'),
      vnp_CardType: query.get('vnp_CardType'),
      vnp_TransactionStatus: query.get('vnp_TransactionStatus'),
      vnp_BankTranNo: query.get('vnp_BankTranNo'),
      vnp_ResponseCode: query.get('vnp_ResponseCode')
    };

    // Retrieve customerInfo from localStorage
    const storedCustomerInfo = JSON.parse(localStorage.getItem('paymentReturnData'));

    if (!storedCustomerInfo) {
      console.error('Customer information not found in localStorage');
      navigate('/error'); // Navigate to error page if customerInfo is not available
      return;
    }

    // Create order using stored customer information and payment details
    const createOrder = async (customerInfo) => {
      try {
        // Construct the URL parameters for the API request
        const urlParams = new URLSearchParams({
          id: 1,
          address: customerInfo.address,
          numberPhone: customerInfo.numberPhone,
          cusName: customerInfo.cusName,
          description: customerInfo.description,
          ...paymentDetails
        });

        const response = await axios.post(`http://localhost:8080/auth/orders/create-order?${urlParams.toString()}`);

        console.log('Order creation response:', response.data);
        console.log('Payment Details:', paymentDetails);
        navigate('/ordercreation', { state: { response: response.data.result } }); 
      } catch (error) {
        console.error('Error creating order:', error);
        navigate('/error'); // Navigate to error page on error
      }
    };

    // Only call createOrder if the payment status is successful (vnp_ResponseCode === '00')
    if (paymentDetails.vnp_ResponseCode === '00') {
      createOrder(storedCustomerInfo);
    } else {
      console.error('Payment failed with response code:', paymentDetails.vnp_ResponseCode);
      navigate('/payment', { state: { status: "FAILED", paymentDetails, storedCustomerInfo } });
    }
  }, [location, navigate]);

  return (
    <div>
      Processing payment...
    </div>
  );
};

export default PaymentReturn;
