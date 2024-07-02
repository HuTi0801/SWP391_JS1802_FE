import React from 'react'
import AdminHeader from '../../../components/adminComponents/header/AdminHeader';
import AdminSideBar from '../../../components/adminComponents/accountList/AdminSideBar';
import Delivery_StaffAccountDetailsContent from '../../../components/adminComponents/accountDetails/Delivery_StaffAccountDetailsContent'

const Delivery_StaffAccountDetails = () => {
    return (
        <div>
            <AdminHeader />
            <div>
                <AdminSideBar />
                <Delivery_StaffAccountDetailsContent />
            </div>
        </div>
    )
}

export default Delivery_StaffAccountDetails