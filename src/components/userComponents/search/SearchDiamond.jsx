import axios from 'axios';
import React, { useState } from 'react';

const SearchDiamond = () => {
    const [diamond, setDiamond] = useState({
        id: 0,
        origin: "",
        clarity: "",
        caratWeight: 0,
        price: 0,
        color: "",
        cut: "",
        certificateNumber: "",
        quantity: 0,
        imageDiamond: "",
        min_price: 0,
        max_price: 0
    });

    const handleChange = (e) => {
        setDiamond({ ...diamond, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/diamond/searchDiamond",
                diamond
            );
            console.log(response); // Handle the response data as needed
            console.log(diamond)
        } catch (error) {
            console.error('Error searching diamond:', error);
        }
    };

    return (
        <div className='search-content-container'>
            <div className='title'>
                <span>SEARCH DIAMOND</span>
            </div>
            <div className='search-parameter'>
                <ul>
                    <li className='cut'>
                        <label htmlFor="cut">Cut:</label>
                        <select name="cut" id="cut" onChange={handleChange} >
                            <option value="">Choose Cut</option>
                            <option value="EX">EX</option>
                        </select>
                    </li>
                    <li className='clarity'>
                        <label htmlFor="clarity">Clarity:</label>
                        <select name="clarity" id="clarity" onChange={handleChange} >
                            <option value="">Choose Clarity</option>
                            <option value="VS2">VS2</option>
                            <option value="VVS2">VVS2</option>
                        </select>
                    </li>
                    <li className='color'>
                        <label htmlFor="color">Color:</label>
                        <select name="color" id="color" onChange={handleChange} >
                            <option value="">Choose Color</option>
                            <option value="D">D</option>
                            <option value="F">F</option>
                        </select>
                    </li>
                    <li className='origin'>
                        <label htmlFor="origin">Origin:</label>
                        <select name="origin" id="origin" onChange={handleChange}>
                            <option value="">Choose Origin</option>
                            <option value="Natural diamond">Natural Diamond</option>
                            <option value="Artificialdiamond">Artificial Diamond</option>
                        </select>
                    </li>
                    <li className='search-button'>
                        <button onClick={handleSearch}>SEARCH</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SearchDiamond;
