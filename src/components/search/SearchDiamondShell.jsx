import axios from 'axios';
import React, { useEffect, useState } from 'react'

const SearchDiamondShell = () => {
    const [diamondShell, setDiamondShell] = useState({
        material: "",
        secondaryStone: "",
        gender: "",
        size: "",
    });

    const handleChange = (e) => {
        setDiamondShell({ ...diamondShell, [e.target.name]: e.target.value })
    }
    const handleSearch = async () => {
        console.log(diamondShell);

        const newDiamondShell = diamondShell;
        await axios.post(
            "https://664b521735bbda10987c72ad.mockapi.io/searchDiamond",
            newDiamondShell
        )
    }
    return (

        <div className='search-content-container'>
            <div className='title'>
                <span>SEARCH DIAMOND SHELL</span>
            </div>
            <div className='search-parameter'>
                <ul>
                    <li className='material' onChange={handleChange}>
                        <label for="material">Material:</label>
                        <select name="material" id="material">
                            <option value="material A">Material A </option>
                            <option value="material B">Material B </option>
                            <option value="material C">Material C </option>
                        </select>
                    </li>
                    <li className='secondary-stone' onChange={handleChange}>
                        <label for="secondary-stone">Secondary Stone:</label>
                        <select name="secondary-stone" id="secondary-stone">
                            <option value="secondary stone A">Secondary Stone A </option>
                            <option value="secondary stone B">Secondary Stone B </option>
                            <option value="secondary stone C">Secondary Stone C </option>
                        </select>
                    </li>
                    <li className='gender' onChange={handleChange}>
                        <label for="gender">Gender:</label>
                        <select name="gender" id="gender">
                            <option value="gender A">Gender A </option>
                            <option value="gender B">Gender B </option>
                        </select>
                    </li>
                    <li className='size' onChange={handleChange}>
                        <label for="size">Size:</label>
                        <select name="size" id="size">
                            <option value="size A">Size A</option>
                            <option value="size B">Size B</option>
                            <option value="size C">Size C</option>
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

export default SearchDiamondShell