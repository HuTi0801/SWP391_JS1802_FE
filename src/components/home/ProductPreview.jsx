import React, { useState } from 'react';
import './ProductPreview.css';



const ProductPreview = ({ listBanner }) => {
    const previewList = listBanner.slice(0, 4);
    const [goToProductList, setGoToProductList] = useState(false);


    const handleClick = () =>{
        setGoToProductList(true);
    }
    if (goToProductList) {
        window.location.href = '/productinfo';  
      }
    return (
        <div className='preview-container'>
            <ul>
                {previewList.map((item) => (
                    <li key={item.id}>
                        <img 
                        src={item.image} alt="image" 
                        className='image' 
                        onClick={handleClick}
                        />
                        <div className='preview-desc'>
                            <div className='name'>NAME</div>
                            <div className='price'>PRICE</div>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductPreview