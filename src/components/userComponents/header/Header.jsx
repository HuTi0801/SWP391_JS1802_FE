import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Header = () => {
    const navigate = useNavigate();

    const handleClickHome = () => {
        navigate('/');
    }

    const handleClickUserProfile = () => {
        // Check if user is authenticated
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            // Redirect to login page if not authenticated
            navigate('/login');
        } else {
            // Navigate to user profile page if authenticated
            navigate('/userprofile');
        }
    }

    const handleClickCart = () => {
        navigate('/cart');
    }

    return (
        <div className='header-container'>
            <div className='header-left'>
                <p>Address: ABC Street, Green Avenue, CED City</p>
                <p>Contact Number: 0902-112-442</p>
            </div>
            <div className='header-center'>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFeW7Al-OCRSiTrH0EHOILfq4VpnBmWlMkA&usqp=CAU"
                    alt="Diamond Logo"
                    className='logo-image'
                    onClick={handleClickHome}
                />
            </div>
            <div className='header-right'>
                <div className='header-icon' onClick={handleClickUserProfile}>
                    <AccountCircleOutlinedIcon className='profile-image' />
                    <div className='text'>Profile</div>
                </div>
                <div className='header-icon' onClick={handleClickCart}>
                    <ShoppingCartOutlinedIcon className='cart-image' />
                    <div className='text'>Cart</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
