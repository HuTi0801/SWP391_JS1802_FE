import React from 'react';
import './DeliveryOrderList.css';
import DeliveryHeader from '../../../components/deliveryComponents/header/DeliveryHeader';
import DeliverySideBar from '../../../components/deliveryComponents/orderList/DeliverySideBar';
import DeliveryOrderListContent from '../../../components/deliveryComponents/orderList/DeliveryOrderListContent';

const DeliveryOrderList = () => {
  return (
    <div className='staff-order-list-container'>
      <DeliveryHeader />
      <div className='staff-main-content'>
        <DeliverySideBar />
        <DeliveryOrderListContent />
      </div>
    </div>
  );
}

export default DeliveryOrderList;
