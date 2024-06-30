import React, { useState } from 'react'
import './AdminHeader.css';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const navigate = useNavigate();


    const handleClickHome = () => {
        navigate('/adminstaff');
    }




    return (
        <div className='admin_header-container'>
            <div className='admin_header-address'>
                <p>Address: ABC Street, Green Avenue, CED City</p>
                <p>Contact Number: 0902-112-442</p>
            </div>
            <div className='admin_header-logo' >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFeW7Al-OCRSiTrH0EHOILfq4VpnBmWlMkA&usqp=CAU" alt="Diamond Logo" className='admin_logo-image' onClick={handleClickHome} />

            </div>

            <div className='admin_header-right'>
                <div className='admin_staff-information'>
                    <p className='admin_staff-FullName'>Full Name: </p>
                    <p className='admin_staff-ID'>ID: </p>
                </div>
            </div>

        </div>
    )
}

export default AdminHeader