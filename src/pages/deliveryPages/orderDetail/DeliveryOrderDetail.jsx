import React from 'react'
import './DeliveryOrderDetail.css';
import DeliveryHeader from '../../../components/deliveryComponents/header/DeliveryHeader'
import DeliverySideBar from '../../../components/deliveryComponents/orderList/DeliverySideBar'
import DeliveryOrderDetailContent from '../../../components/deliveryComponents/orderDetail/DeliveryOrderDetailContent';

const DeliveryOrderDetail = () => {
  return (
    <div className='staff-order-detail-container'>
      <DeliveryHeader />
      <div className='staff-main-content'>
        <DeliverySideBar />
        <DeliveryOrderDetailContent />
      </div>
    </div>
  )
}

export default DeliveryOrderDetail