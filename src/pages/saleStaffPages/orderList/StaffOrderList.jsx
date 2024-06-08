import React from 'react';
import './StaffOrderList.css';
import StaffHeader from '../../../components/saleStaffComponents/header/StaffHeader';
import StaffOrderListContent from '../../../components/saleStaffComponents/orderList/StaffOrderListContent';
import StaffSideBar from '../../../components/saleStaffComponents/orderList/StaffSideBar';

const StaffOrderList = () => {
  return (
    <div className='staff-order-list-container'>
      <StaffHeader />
      <div className='staff-main-content'>
        <StaffSideBar />
        <StaffOrderListContent />
      </div>
    </div>
  );
}

export default StaffOrderList;
