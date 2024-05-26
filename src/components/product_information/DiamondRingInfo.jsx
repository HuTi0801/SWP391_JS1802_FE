import React, { useState } from 'react'
import "./DiamondRingInfo.css";

const DiamondRingInfo = () => {
    const [goToCart, setGoToCart] = useState(false);

    const handleClick = () =>{
        setGoToCart(true);
    }
    if (goToCart) {
        window.location.href = '/cart';  
      }
    return (
    
        <div className='ring-product-info-container'>
            <div className='product-image'>
                <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="image-alt" />
            </div>
            <div className='ring-product-right'>
                <div className='ring-product-detail'>
                    <div className='text'>
                        <p className='name'>Product Name</p>
                        <p className='price'>Price</p>
                    </div>
                    <div className='parameter'>
                        <div className='shell-content'>
                        <label for="ring-shell">Shell Material:</label>
                        <select name="ring-shell" id="ring-shell">
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                        </select>
                        </div>

                        <div className='center-stone-content'>
                        <label for="ring-center-stone">Center Stone:</label>
                        <select name="ring-center-stone" id="ring-center-stone">
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                        </select>
                        </div>

                        <div className='secondary-stone-content'>
                        <label for="ring-secondary-stone">Secondary Stone:</label>
                        <select name="ring-secondary-stone" id="ring-secondary-stone">
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                        </select>
                        </div>

                    </div>
                    <div className='finger-size'>
                        <label for="finger-size">Finger Size</label>
                        <select name="finger-size" id="finger-size">
                            <option value="1">Size 1</option>
                            <option value="2">Size 2</option>
                            <option value="3">Size 3</option>
                            <option value="4">Size 4</option>
                            <option value="5">Size 5</option>
                            <option value="6">Size 6</option>
                        </select>
                        <a href="">Finger Size Guide</a>
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

export default DiamondRingInfo