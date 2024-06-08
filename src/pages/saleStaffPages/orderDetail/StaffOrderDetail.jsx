import React from 'react'
import './StaffOrderDetail.css'
import StaffOrderDetailContent from '../../../components/saleStaffComponents/orderDetail/StaffOrderDetailContent'
import StaffSideBar from '../../../components/saleStaffComponents/orderList/StaffSideBar'
import StaffHeader from '../../../components/saleStaffComponents/header/StaffHeader'

const StaffOrderDetail = () => {
  return (
    <div className='staff-order-detail-container'>
      <StaffHeader />
      <div className='staff-main-content'>
        <StaffSideBar />
        <StaffOrderDetailContent />
      </div>
    </div>
  )
}

export default StaffOrderDetail