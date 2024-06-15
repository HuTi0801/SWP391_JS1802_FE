import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./SearchDiamond.css"
import { useNavigate } from 'react-router-dom';
const SearchDiamondShell = () => {
    const navigate = useNavigate();
    const [diamondShell, setDiamondShell] = useState({
        id: 0,
        quantity: 0,
        secondaryStoneType: "",
        material: "",
        gender: "",
        price: 0,
        imageDiamondShell: "",
        min_price: 0,
        max_price: 0

    });

    const handleChange = (e) => {
        setDiamondShell({ ...diamondShell, [e.target.name]: e.target.value })
    }
    const handleSearch = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/auth/diamond-shell/search-diamond-shell",
                diamondShell
            );
            console.log(response); // Handle the response data as needed
            console.log(diamondShell)
            navigate('/productlist', { state: { results: response.data } })
        } catch (e) {
            console.error(e);
        }
    }
    return (

        <div className='search-content-container'>
            <div className='title'>
                <span>SEARCH DIAMOND SHELL</span>
            </div>
            <div className='search-parameter'>
                <ul>
                    <li className='material' onChange={handleChange}>
                        <label htmlFor="material">Material:</label>
                        <select name="material" id="material">
                            <option value="">Choose Material</option>
                            <option value="Platinum 18K">Platinum 18K </option>
                            <option value="Platinum 14K">Platinum 14K </option>
                            <option value="Gold 14K">Gold 14K </option>
                        </select>
                    </li>
                    <li className='secondary-stone' onChange={handleChange}>
                        <label htmlFor="secondary-stone">Secondary Stone:</label>
                        <select name="secondary-stone" id="secondary-stone">
                            <option value="">Choose Secondary Stone</option>
                            <option value="KC DIA WHIRD1.6x2, 1.1x18.09x44">KC DIA WHIRD1.6x2, 1.1x18.09x44 </option>
                            <option value="KC DIA WHIRD1.3x20">KC DIA WHIRD1.3x20 </option>
                            <option value="KC DIA WHIRD0.9x44,08x96">KC DIA WHIRD0.9x44,08x96 </option>
                            <option value="KC DIA WHIRD1.6x2, 1.3x18">KC DIA WHIRD1.6x2, 1.3x18 </option>

                        </select>
                    </li>
                    <li className='gender' onChange={handleChange}>
                        <label htmlFor="gender">Gender:</label>
                        <select name="gender" id="gender">
                            <option value="">Choose Gender</option>
                            <option value="female">Female </option>
                            <option value="male">Male </option>
                        </select>
                    </li>
                    {/*                     <li className='size' onChange={handleChange}>
                        <label for="size">Size:</label>
                        <select name="size" id="size">
                            <option value="size A">Size A</option>
                            <option value="size B">Size B</option>
                            <option value="size C">Size C</option>
                        </select>
                    </li> */}
                    <li className='search-button'>
                        <button onClick={handleSearch}>SEARCH</button>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default SearchDiamondShell