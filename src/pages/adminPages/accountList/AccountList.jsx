import React from 'react';
import './AccountList.css';
import AdminHeader from '../../../components/adminComponents/header/AdminHeader';
import AdminSideBar from '../../../components/adminComponents/accountList/AdminSideBar';

const AccountList = () => {
  return (
    <div className='staff-order-list-container'>
      <AdminHeader />
      <div className='staff-main-content'>
        <AdminSideBar />
      </div>
    </div>
  );
}

export default AccountList;
