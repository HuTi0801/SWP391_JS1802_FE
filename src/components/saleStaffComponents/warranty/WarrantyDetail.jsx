import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './WarrantyDetail.css';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const WarrantyDetail = () => {
  const location = useLocation();
  const order = location.state || {};


  const formik = useFormik({
    initialValues: {
      startDate: order.orderId && order.orderId.warrantyStartDate ? moment(order.orderId.warrantyStartDate).format('DD/MM/YYYY') : '',
      endDate: order.orderId && order.orderId.warrantyEndDate ? moment(order.orderId.warrantyEndDate).format('YYYY-MM-DD') : '',
    },
    validationSchema: Yup.object({
      endDate: Yup.date()
        .required('End date is required')
        .test('not-before-old-end-date', 'End date cannot be earlier than current warranty end date', function (value) {
          const oldEndDate = moment(order.orderId.warrantyEndDate).format('YYYY-MM-DD');
          return moment(value).isSameOrAfter(oldEndDate);
        }),
    }),
    onSubmit: async (values) => {
      const formattedEndDate = encodeURIComponent(moment(values.endDate).format('DD/MM/YYYY'));
      console.log(formattedEndDate)
      try {
        const response = await axios.post(`http://localhost:8080/auth/orders/update-warranty-end-date/{orderId}{endDate}?orderId=${order.orderId.orderId}&newEndDate=${formattedEndDate}`);
        console.log('Form data:', values);
        alert('Update Successfully! ');
      } catch (error) {
        console.error(error);
      }
    },
  });

  const formatDate = (date) => {
    return date ? moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY') : '';
  };

  return (
    <div className='warranty-detail-container'>
      <div className='warranty-title'>
        <p>WARRANTY INFORMATION</p>
      </div>
      <form onSubmit={formik.handleSubmit} className='warranty-information'>
        <div className='info-row'>
          <label htmlFor='startDate'>Start Date:</label>
          <p className='date-display'>{formik.values.startDate}</p>
        </div>
        <div className='info-row'>
          <label htmlFor='endDate'>End Date:</label>
          <input
            id='endDate'
            name='endDate'
            type='date'
            placeholder={order.orderId && formatDate(order.orderId.warrantyEndDate)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.endDate}
            className='date-input'
          />
          {formik.touched.endDate && formik.errors.endDate ? (
            <div className='error'>{formik.errors.endDate}</div>
          ) : null}
        </div>
        <button type='submit' className='submit-button'>UPDATE</button>
      </form>
    </div>
  );
}

export default WarrantyDetail;
