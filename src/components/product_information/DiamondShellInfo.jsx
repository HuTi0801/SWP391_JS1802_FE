

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DiamondShellInfo.css'

const DiamondShellInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/diamond-shell/get-a-diamond-shell-${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
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
        <img src={product.imageDiamondShell} alt="image-alt" />
      </div>
      <div className='diamond-product-right'>
        <div className='diamond-product-detail'>
          <div className='text'>
            <p className='name'>{product.material} + {product.secondaryStoneType}</p>
            <p className='price'>{product.price}</p>
          </div>
          <div className='parameter'>
            <span>Material:</span>
            <p>{product.material}</p>

            <span>Gender:</span>
            <p>{product.gender}</p>

            <span>Secondary Stone:</span>
            <p>{product.secondaryStoneType}</p>
            
          </div>
        </div>
        <div className='button-payment'>
          <button type="button" className='add-cart'>Add To Cart</button>
          <button type="button" className='buy-now'>BUY NOW</button>
        </div>
      </div>
    </div >

  );


};

export default DiamondShellInfo;
