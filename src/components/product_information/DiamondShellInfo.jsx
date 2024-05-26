import React, { useEffect, useState } from 'react'
import './DiamondShellInfo.css';
import axios from 'axios';

const DiamondShellInfo = () => {
  const [shellInfo, setShellInfo] = useState({
    id: "",
    material: "",
    secondaryStone: "",
    gender: "",
    size: "",
    img: "",
  });

  const getShellInfo = async () => {
    try {
      const response = await axios.get("https://664b521735bbda10987c72ad.mockapi.io/searchDiamond/5");
      return response.data;
    } catch (error) {
      console.error('Error fetching diamond info:', error);
      return null;
    }
  }
  useEffect(() => {
    const getShellData = async () => {
      const data = await getShellInfo();
      if (data) {
        setShellInfo(data);
        console.log(data)
      }
    }
    getShellData();

  }, []
  )


  const handleAddToCart = async () => {

    const addItem = {
      id: shellInfo.id,
      type: shellInfo.type,
    }
    await axios.post(
      "https://664b521735bbda10987c72ad.mockapi.io/searchDiamond",
      addItem
    )
    console.log(shellInfo);
    console.log(addItem);
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
            <p className='price'>{shellInfo.price}</p>
          </div>
          <div className='parameter'>
            <span>Material:</span>
            <p>{shellInfo.material}</p>

            <span >Secondary Stone:</span>
            <p>{shellInfo.secondaryStone}</p>

            <span>Gender:</span>
            <p>{shellInfo.gender}</p>
          </div>
          <div className='finger-size'>
            <span>Size:</span>
            <p>{shellInfo.size}</p>
          </div>
        </div>
        <div className='button-payment'>
          <button type="submit" className='add-cart' >Add To Cart</button>
          <button type="submit" className='buy-now' onClick={handleAddToCart}>BUY NOW</button>
        </div>
      </div>
    </div>
  )
}

export default DiamondShellInfo