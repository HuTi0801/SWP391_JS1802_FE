import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleClickProductList = () => {
        navigate('/productlist');
    };

    const handleClickAbout = () => {
        navigate('/about');
    };

    const handleClickFAQ = () => {
        navigate('/faq');
    };

    const handleClickProductGuide = () => {
        navigate('/productguide');
    };

    return (
        <div className='navbar-container'>
            <div className='navbar-content'>
                <ul>
                    <li className='products'>
                        <div className='navbar-text' onClick={handleClickProductList}>Products</div>
                        <div className='dropdown-box'>
                            <div className='dropdown-content'>
                                <p onClick={() => navigate('/productlist')}>Products</p>
                                <p onClick={() => navigate('/searchdiamond')}>Diamond Products</p>
                                <p onClick={() => navigate('/searchshell')}>Diamond Shell Products</p>
                                <p onClick={() => navigate('/diamondprices')}>Diamond Prices</p>
                            </div>
                        </div>
                    </li>
                    <li className='sale-program'>
                        <div className='navbar-text' onClick={handleClickProductGuide}>Product Guide</div>
                    </li>
                    <li className='customer-guide'>
                        <div className='navbar-text' onClick={handleClickFAQ}>Customer Guide</div>
                    </li>
                    <li className='about'>
                        <div className='navbar-text' onClick={handleClickAbout}>About</div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
