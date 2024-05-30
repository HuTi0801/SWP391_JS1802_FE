import React from 'react';
import './Filter.css';

const Filter = () => {
    return (
        <div className='filter-container'>
            <div className='filter-parameter'>
                <span>Filter</span>
                <div className='filter-product'>
                    <select name="product" id="product">
                        <option value="" >Product</option>
                        <option value="diamond-ring">Diamond Ring</option>
                        <option value="diamond">Diamond </option>
                        <option value="diamond-shell">Diamond Shell</option>
                    </select>
                </div>
                <div className='filter-price'>
                    <input type="number" placeholder='Price' min="0" />
                </div>
                <button className='confirm-filter'>CONFIRM</button>
            </div>
        </div>
    )
}

export default Filter