import React from 'react';
import './PaymentDetail.css';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from 'axios';

const PaymentDetail = () => {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      address: "",
      paymentmethod: "",
    },
    validationSchema: yup.object({
      firstname: yup.string().required("Please Enter First Name"),
      lastname: yup.string().required("Please Enter Last Name"),
      phonenumber: yup.string().required("Please Enter Phone Number"),
      address: yup.string().required("Please Enter Address"),
      paymentmethod: yup.string().required("Please Specify Payment Method"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:8080", values);
      }
      catch (error) {
        console.error(error);
      }
    }
  });

  return (
    <div className='payment-detail-container'>
      <div className='title'>
        PAYMENT DETAIL
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className='payment-info'>
          <div className='personal-information'>
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              name="firstname"
              placeholder='Enter First Name'
              value={formik.values.firstname}
              onChange={formik.handleChange}
            />
            {formik.errors.firstname && <div className="error">{formik.errors.firstname}</div>}

            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              name="lastname"
              placeholder='Enter Last Name'
              value={formik.values.lastname}
              onChange={formik.handleChange}
            />
            {formik.errors.lastname && <div className="error">{formik.errors.lastname}</div>}

            <label htmlFor="phonenumber">Phone Number:</label>
            <input
              type="text"
              name="phonenumber"
              placeholder='Enter Phone Number'
              inputMode="numeric"
              pattern="[0-9]*"
              value={formik.values.phonenumber}
              onChange={formik.handleChange}
            />
            {formik.errors.phonenumber && <div className="error">{formik.errors.phonenumber}</div>}

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              name="address"
              placeholder='Enter Address'
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.errors.address && <div className="error">{formik.errors.address}</div>}
          </div>

          <div className='payment-method'>
            <div className='order-detail'>
              <p className='order-detail-title'>YOUR CART</p>
              <ul className='list-order'>
                <li className='order-detail-preview'>
                  <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="altimage" className='order-image' />
                  <div className='order-info'>
                    <p>Product:</p>
                    <p>Quantity</p>
                    <p>Amount:</p>
                  </div>
                </li>
                <li className='order-detail-preview'>
                  <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="altimage" className='order-image' />
                  <div className='order-info'>
                    <p>Product:</p>
                    <p>Quantity</p>
                    <p>Amount:</p>
                  </div>
                </li>
                <li className='order-detail-preview'>
                  <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="altimage" className='order-image' />
                  <div className='order-info'>
                    <p>Product:</p>
                    <p>Quantity</p>
                    <p>Amount:</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className='payment-information'>
              <label className='checkbox-container'>Payment Method
                <div>
                  <input
                    type="radio"
                    name="paymentmethod"
                    value="Online Bank"
                    onChange={formik.handleChange}
                  /> Online Bank
                </div>
                <div>
                  <input
                    type="radio"
                    name="paymentmethod"
                    value="VNPay"
                    onChange={formik.handleChange}
                  /> VNPay
                </div>
                <div>
                  <input
                    type="radio"
                    name="paymentmethod"
                    value="PayPal"
                    onChange={formik.handleChange}
                  /> PayPal
                </div>
              </label>
              {formik.errors.paymentmethod && <div className="error">{formik.errors.paymentmethod}</div>}
              <div className='promotion-code'>
                <input type="text" placeholder='Promotion Code' />
                <button>APPLY</button>
              </div>
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
