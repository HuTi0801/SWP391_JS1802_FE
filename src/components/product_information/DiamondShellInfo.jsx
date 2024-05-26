import React, { useState } from 'react'
import './DiamondShellInfo.css';

const DiamondShellInfo = () => {
  const [goToCart, setGoToCart] = useState(false);

  const handleClick = () => {
    setGoToCart(true);
  }
  if (goToCart) {
    window.location.href = '/cart';
  }
  return (
    <div className='shell-product-info-container'>
      <div className='product-image'>
        <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="image-alt" />
      </div>
      <div className='shell-product-right'>
        <div className='shell-product-detail'>

          <div className='text'>
            <p className='name'>Product Name</p>
            <p className='price'>Price</p>
          </div>
          <div className='parameter'>
            <label for="material">Material:</label>
            <select name="material" id="material">
              <option value="A">A value</option>
              <option value="B">B value</option>
              <option value="C">C value</option>
            </select>

            <label for="secondary-stone">Secondary Stone:</label>
            <select name="secondary-stone" id="secondary-stone">
              <option value="A">A value</option>
              <option value="B">B value</option>
              <option value="C">C value</option>
            </select>


            <label for="gender">Gender:</label>
            <select name="gender" id="gender">
              <option value="A">A value</option>
              <option value="B">B value</option>
              <option value="C">C value</option>
            </select>
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

export default DiamondShellInfo