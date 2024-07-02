import React from 'react';
import AdminHeader from '../../../components/adminComponents/header/AdminHeader';
import AdminSideBar from '../../../components/adminComponents/accountList/AdminSideBar';
import BanDeliveryStaffAccountComponents from '../../../components/adminComponents/banAccount/BanDeliveryStaffAccountComponents';
const BanCustomerAccount = () => {
    return (
        <div>
            <AdminHeader />
            <div>
                <AdminSideBar />
                <BanDeliveryStaffAccountComponents />
            </div>
        </div>
    );
}

export default BanCustomerAccount;
