import React, { useState } from 'react'
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleClickHome = () =>{
        navigate('/');
    }

    const handleClickCart = () =>{
        navigate('/cart');
    }



    return (
        <div className='header-container'>
            <div className='header-address'>
                <p>Address: ABC Street, Green Avenue, CED City</p>
                <p>Contact Number: 0902-112-442</p>
            </div>
            <div className='header-logo' >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFeW7Al-OCRSiTrH0EHOILfq4VpnBmWlMkA&usqp=CAU" alt="Diamond Logo" className='logo-image' onClick={handleClickHome} />

            </div>

            <div className='header-right'>
            <div className='header-profile'>
                <img src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="Profile Picture" className='profile-image'/>
                <div className='text'>Profile</div>
            </div>

            <div className='header-cart' onClick={handleClickCart}>
                <img src="https://t3.ftcdn.net/jpg/03/14/85/06/360_F_314850659_2aQLerz30kWj78tqpaGSbzYD6sAUmuDf.jpg" alt="Cart Icon" className='cart-image' />
                <div className='text'>Cart</div>
            </div>
            </div>

        </div>
    )
}

export default Header