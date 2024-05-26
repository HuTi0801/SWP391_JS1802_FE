import React from 'react'
import './ProductInformation.css';
import DiamondRingInfo from '../../components/product_information/DiamondRingInfo';
import DiamondInfo from '../../components/product_information/DiamondInfo';
import DiamondShellInfo from '../../components/product_information/DiamondShellInfo';

const ProductInformation = () => {
    return (
        <div className='info-page-container'>
            {/* <DiamondRingInfo />
            <DiamondInfo /> */}
            <DiamondShellInfo />
        </div>
    )
}

export default ProductInformation