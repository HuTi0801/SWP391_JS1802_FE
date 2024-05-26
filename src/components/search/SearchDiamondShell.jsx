import React, { useState } from 'react'

const SearchDiamondShell = () => {
    const [goToProductList, setGoToProductList] = useState(false);
    const handleClick = () => {
        setGoToProductList(true);
    }

    if (goToProductList) {
        window.location.href = '/productlist';
    }
    return (

        <div className='search-content-container'>
            <div className='title'>
                <span>SEARCH PRODUCT</span>
            </div>
            <div className='search-parameter'>
                <ul>
                    <li className='material'>
                        <label for="material">Material:</label>
                        <select name="material" id="material">
                            <option value="A">A value</option>
                            <option value="B">B value</option>
                            <option value="C">C value</option>
                        </select>
                    </li>
                    <li className='secondary-stone'>
                        <label for="secondary-stone">Secondary Stone:</label>
                        <select name="secondary-stone" id="secondary-stone">
                            <option value="A">A value</option>
                            <option value="B">B value</option>
                            <option value="C">C value</option>
                        </select>
                    </li>
                    <li className='gender'>
                        <label for="gender">Gender:</label>
                        <select name="gender" id="gender">
                            <option value="A">A value</option>
                            <option value="B">B value</option>
                            <option value="C">C value</option>
                        </select>
                    </li>
                    <li className='search-button'>
                        <button onClick={handleClick}>SEARCH</button>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default SearchDiamondShell