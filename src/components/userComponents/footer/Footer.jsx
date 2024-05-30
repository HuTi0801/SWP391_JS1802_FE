import React from 'react'
import "./Footer.css";

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-content'>
                <div className='footer-address'>
                    <p>Address: ABC Street, Green Avenue, CED City</p>
                    <p>Contact Number: 0902-112-442</p>
                </div>
                <div className='footer-logo'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFeW7Al-OCRSiTrH0EHOILfq4VpnBmWlMkA&usqp=CAU"
                        alt="footer logo" className='logo-image' />
                </div>
            </div>
        </div>
    )
}

export default Footer