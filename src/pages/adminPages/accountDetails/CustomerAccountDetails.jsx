import React from 'react'
import AdminHeader from '../../../components/adminComponents/header/AdminHeader';
import AdminSideBar from '../../../components/adminComponents/accountList/AdminSideBar';
import CustomerAccountDetailsContent from '../../../components/adminComponents/accountDetails/CustomerAccountDetailsContent'

const CustomerAccountDetails = () => {
  return (
    <div >
      <AdminHeader />
      <div>
        <AdminSideBar />
        <CustomerAccountDetailsContent />
      </div>
    </div>
  )
}

export default CustomerAccountDetails