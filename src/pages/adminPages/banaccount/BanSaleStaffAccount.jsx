import React from 'react';
import AdminHeader from '../../../components/adminComponents/header/AdminHeader';
import AdminSideBar from '../../../components/adminComponents/accountList/AdminSideBar';
import BanSaleStaffAccountComponents from '../../../components/adminComponents/banAccount/BanSaleStaffAccountComponents';
const BanCustomerAccount = () => {
    return (
        <div>
            <AdminHeader />
            <div>
                <AdminSideBar />
                <BanSaleStaffAccountComponents />
            </div>
        </div>
    );
}

export default BanCustomerAccount;
