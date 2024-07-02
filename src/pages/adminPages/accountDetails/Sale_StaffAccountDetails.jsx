import React from 'react'
import AdminHeader from '../../../components/adminComponents/header/AdminHeader';
import AdminSideBar from '../../../components/adminComponents/accountList/AdminSideBar';
import Sale_StaffAccountDetailsContent from '../../../components/adminComponents/accountDetails/Sale_StaffAccountDetailsContent'

const Sale_StaffAccountDetails = () => {
    return (
        <div >
            <AdminHeader />
            <div >
                <AdminSideBar />
                <Sale_StaffAccountDetailsContent />
            </div>
        </div>
    )
}

export default Sale_StaffAccountDetails