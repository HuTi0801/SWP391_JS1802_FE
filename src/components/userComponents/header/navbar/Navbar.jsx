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

    const handleClickDiamondPrices = () => {
        navigate('/diamondprices');
    };

    return (
        <div className='navbar-container'>
            <div className='navbar-content'>
                <ul>
                    <li className='products' onClick={handleClickProductList}>
                        <div className='navbar-text'>Products</div>
                        <div className='dropdown-box'>
                            <div className='dropdown-content'>
                                <a href="/productlist">Products</a>
                                <a href="/searchdiamond">Diamond Products</a>
                                <a href="/searchshell">Diamond Shell Products</a>
                                <a href="/diamondprices">Diamond Prices</a>
                            </div>
                        </div>
                    </li>
                    <li className='sale-program' onClick={handleClickProductGuide}>
                        <div className='navbar-text'>Product Guide</div>
                    </li>
                    <li className='customer-guide' onClick={handleClickFAQ}>
                        <div className='navbar-text'>Customer Guide</div>
                    </li>
                    <li className='about' onClick={handleClickAbout}>
                        <div className='navbar-text'>About</div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
