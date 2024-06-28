import React, { useState } from 'react'
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleClickProductList = () => {
        navigate('/productlist')
    }




    return (
        <div className='navbar-container'>
            <div className='navbar-content'>
                <ul >
                    <li className='products' onClick={handleClickProductList}>
                        <div className='text' >Products</div>
                        <div className='dropdown-box'>
                            <div className='dropdown-content'>
                                <a href="/searchdiamond">Search Diamond</a>
                                <a href="/searchshell">Search Diamond Shell</a>
                            </div>
                        </div>
                    </li>
                    <li className='customer-guide'>
                        <div className='text'>Customer Guide</div>
                    </li>
                    <li className='sale-program'>
                        <div className='text'>Sale Program</div>
                    </li>
                    <li className='about'>
                        <div className='text'>About</div>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Navbar