import React, { useState } from 'react'
import './DiamondInfo.css'

const DiamondInfo = () => {
    const [goToCart, setGoToCart] = useState(false);

    const handleClick = () =>{
        setGoToCart(true);
    }
    if (goToCart) {
        window.location.href = '/cart';  
      }
    return (
        <div className='diamond-product-info-container'>
            <div className='product-image'>
                <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="image-alt" />
            </div>
            <div className='diamond-product-right'>
                <div className='diamond-product-detail'>
                    <div className='text'>
                        <p className='name'>Product Name</p>
                        <p className='price'>Price</p>
                    </div>
                    <div className='parameter'>
                        <label for="cut">Cut:</label>
                        <select name="cut" id="cut">
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                        </select>
                        <label for="clarity">Clarity:</label>
                        <select name="clarity" id="clarity">
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                        </select>
                        <label for="color">Color:</label>
                        <select name="color" id="color">
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                        </select>
                        <label for="carat-weight">Carat Weight:</label>
                        <select name="carat-weight" id="carat-weight">
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                        </select>
                    </div>
                </div>
                <div className='button-payment'>
                    <button type="submit" className='add-cart' >Add To Cart</button>
                    <button type="submit" className='buy-now' onClick={handleClick}>BUY NOW</button>
                </div>
            </div>
        </div>
    )
}

export default DiamondInfo