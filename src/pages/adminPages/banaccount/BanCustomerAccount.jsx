import React from 'react';
import AdminHeader from '../../../components/adminComponents/header/AdminHeader';
import AdminSideBar from '../../../components/adminComponents/accountList/AdminSideBar';
import BanCustomerAccountComponents from '../../../components/adminComponents/banAccount/BanCustomerAccountComponents';
const BanCustomerAccount = () => {
    return (
        <div>
            <AdminHeader />
            <div>
                <AdminSideBar />
                <BanCustomerAccountComponents />
            </div>
        </div>
    );
}

export default BanCustomerAccount;
