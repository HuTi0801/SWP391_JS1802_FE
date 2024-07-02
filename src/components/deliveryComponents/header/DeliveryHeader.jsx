import React, { useState } from 'react'
import './DeliveryHeader.css';
import { useNavigate } from 'react-router-dom';

const DeliveryHeader = () => {
    const navigate = useNavigate();


    const handleClickHome = () => {
        navigate('/delivery');
    }




    return (
        <div className='delivery-header-container'>
            <div className='header-address'>
                <p>Address: ABC Street, Green Avenue, CED City</p>
                <p>Contact Number: 0902-112-442</p>
            </div>
            <div className='header-logo' >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFeW7Al-OCRSiTrH0EHOILfq4VpnBmWlMkA&usqp=CAU" alt="Diamond Logo" className='logo-image' onClick={handleClickHome} />

            </div>

            <div className='header-right'>
                <div className='staff-information'>
                    <p>Full Name: </p>
                    <p>ID: </p>
                </div>
            </div>

        </div>
    )
}

export default DeliveryHeader