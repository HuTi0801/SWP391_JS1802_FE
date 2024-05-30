
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DiamondShellInfo.css'

const DiamondShellInfo = () => {
  const { id } = useParams();
  const [diamondShell, setDiamondShell] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/diamond-shell/get-a-diamond-shell-${id}`);
        setDiamondShell(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
        const cartItem = {
            productID: diamondShell.id,
            productType: "DIAMOND_SHELL",
            customerID: 1,
        };

        const response = await axios.post("http://localhost:8080/cart/add-to-cart", cartItem);
        console.log('Add to cart response:', response.data);
        console.log(cartItem)

        alert("Cart added successfully!");

    } catch (error) {
        console.error('Error adding diamond to cart:', error);
    }
};

  if (!diamondShell) {
    return <div>Loading...</div>;
  }

  return (
    /* <div className="product-detail">
            <h2>{product.material}</h2>
            <img src={product.imageDiamondShell} alt="product" />
            <p>Price: {product.price}</p>
            <p>Gender: {product.gender}</p>
            
        </div> */

    < div className='diamond-product-info-container' >
      <div className='product-image'>
        <img src={diamondShell.imageDiamondShell} alt="image-alt" />
      </div>
      <div className='diamond-product-right'>
        <div className='diamond-product-detail'>
          <div className='text'>
            <p className='name'>{diamondShell.material} {diamondShell.secondaryStoneType}</p>
            <p className='price'>{diamondShell.price}đ</p>
          </div>
          <div className='parameter'>
            <span>Material:</span>
            <p>{diamondShell.material}</p>

            <span>Gender:</span>
            <p>{diamondShell.gender}</p>

            <span>Secondary Stone:</span>
            <p>{diamondShell.secondaryStoneType}</p>
            
          </div>
        </div>
        <div className='button-payment'>
          <button type="button" className='add-cart' onClick={addToCart}>Add To Cart</button>
          <button type="button" className='buy-now'>BUY NOW</button>
        </div>
      </div>
    </div >

  );


};

export default DiamondShellInfo;
