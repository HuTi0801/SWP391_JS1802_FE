import React from 'react'
import WarrantyDetail from '../../../components/saleStaffComponents/warranty/WarrantyDetail'
import './Warranty.css'
import StaffSideBar from '../../../components/saleStaffComponents/orderList/StaffSideBar'
import StaffHeader from '../../../components/saleStaffComponents/header/StaffHeader'

const Warranty = () => {
  return (
    <div className='staff-warranty-container'>
      <StaffHeader />
      <div className='staff-main-content'>
        <StaffSideBar />
        <WarrantyDetail />
      </div>
    </div>
  )
}

export default Warranty