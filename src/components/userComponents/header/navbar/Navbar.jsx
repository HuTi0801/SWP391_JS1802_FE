import React, { useState } from 'react'
import "./Navbar.css";

const Navbar = () => {
    const [goToProductList,setGoToProductList] = useState(false);

    const handleClickProductList = () =>{
        setGoToProductList(true);
    }


      if (goToProductList) {
        window.location.href = '/productlist';  
      }


    return (
        <div className='navbar-container'>
            <div className='navbar-content'>
                <ul >
                    <li className='products'>
                        <div className='text' onClick={handleClickProductList}>Products</div>
                        <div className='dropdown-box'>
                            <div className='dropdown-content'>
                                <a href="/productlist" className='product-list'>Product List</a>
                                <a href="/searchdiamond">Diamond</a>
                                <a href="/searchshell">Diamond Shell</a>
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