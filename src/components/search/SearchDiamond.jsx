import axios from 'axios';
import React, { useState } from 'react'

const SearchDiamond = () => {
    const [goToProductList, setGoToProductList] = useState(false);
    const [diamond, setDiamond] = useState({
        cut: "",
        clarity: "",
        color: "",
    });

    const handleChange = (e) => {
        setDiamond({ ...diamond, [e.target.name]: e.target.value })
    }
    const handleSearch = async () => {
        console.log(diamond);

        const newUser = diamond;
        await axios.post(
            "https://664b521735bbda10987c72ad.mockapi.io/searchDiamond",
            newUser
        )
       
    }

    const handleClickRedirect = () => {
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
                    <li className='cut'>
                        <label for="cut">Cut:</label>
                        <select name="cut" id="cut" onChange={handleChange}>
                            <option value="Cut A">Cut A</option>
                            <option value="Cut B">Cut B</option>
                            <option value="Cut C">Cut C</option>
                        </select>
                    </li>
                    <li className='clarity'>
                        <label for="clarity">Clarity:</label>
                        <select name="clarity" id="clarity" onChange={handleChange}>
                            <option value="Clarity A">Clarity A</option>
                            <option value="Clarity B">Clarity B</option>
                            <option value="Clarity C">Clarity C</option>
                        </select>
                    </li>
                    <li className='color'>
                        <label for="color">Color:</label>
                        <select name="color" id="color" onChange={handleChange}>
                            <option value="Color A">Color A</option>
                            <option value="Color B">Color B</option>
                            <option value="Color C">Color C</option>
                        </select>
                    </li>
                    <li className='search-button'>
                        <button onClick={handleSearch}>SEARCH</button>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default SearchDiamond