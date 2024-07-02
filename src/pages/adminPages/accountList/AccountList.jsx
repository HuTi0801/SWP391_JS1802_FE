import React from 'react';
import AdminHeader from '../../../components/adminComponents/header/AdminHeader';
import AdminSideBar from '../../../components/adminComponents/accountList/AdminSideBar';
import AccountListContent from '../../../components/adminComponents/accountList/AccountListContent';
const AccountList = () => {
  return (
    <div>
      <AdminHeader />
      <div>
        <AdminSideBar />
        <AccountListContent />
      </div>
    </div>
  );
}

export default AccountList;
