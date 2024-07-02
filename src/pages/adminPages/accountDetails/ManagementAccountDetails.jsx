import React from 'react'
import AdminHeader from '../../../components/adminComponents/header/AdminHeader';
import AdminSideBar from '../../../components/adminComponents/accountList/AdminSideBar';
import ManagementAccountDetailsContent from '../../../components/adminComponents/accountDetails/ManagementAccountDetailsContent'

const CustomerAccountDetails = () => {
    return (
        <div >
            <AdminHeader />
            <div>
                <AdminSideBar />
                <ManagementAccountDetailsContent />
            </div>
        </div>
    )
}

export default CustomerAccountDetails