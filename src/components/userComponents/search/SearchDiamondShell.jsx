import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MinimumDistanceSlider from '../../utilityComponents/priceSlider/MinimumDistanceSlider';

const SearchDiamondShell = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 2300000000]); // Initial price range
  const [sliderValue, setSliderValue] = useState([0, 2300000000]); // Slider value

  const [diamondShell, setDiamondShell] = useState({
    id: 0,
    quantity: 0,
    secondaryStoneType: '',
    material: '',
    gender: '',
    price: 0,
    imageDiamondShell: '',
  });

  const handleChange = (e) => {
    setDiamondShell({ ...diamondShell, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/diamond-shell/search-diamond-shell',
        {
          ...diamondShell,
          min_price: diamondShell.min_price,
          max_price: diamondShell.max_price,
        }
      );
      console.log(response.data); // Handle the response data as needed
      navigate('/productlist', { state: { results: response.data } });
    } catch (error) {
      console.error('Error searching diamond shell:', error);
    }
  };

  const handlePriceRangeChange = (newValue) => {
    setPriceRange(newValue);
    setDiamondShell({ ...diamondShell, min_price: newValue[0], max_price: newValue[1] });
  };

  return (
    <div className="search-content-container">
      <div className="title">
        <span>SEARCH DIAMOND SHELL</span>
      </div>
      <div className="search-parameter">
        <ul>
          <li className="material">
            <label htmlFor="material">Material:</label>
            <select name="material" id="material" onChange={handleChange}>
              <option value="">Choose Material</option>
              <option value="Platinum 18K">Platinum 18K</option>
              <option value="Platinum 14K">Platinum 14K</option>
              <option value="Gold 14K">Gold 14K</option>
            </select>
          </li>
          <li className="secondary-stone">
            <label htmlFor="secondaryStoneType">Secondary Stone:</label>
            <select name="secondaryStoneType" id="secondaryStoneType" onChange={handleChange}>
              <option value="">Choose Secondary Stone</option>
              <option value="KC DIA WHIRD1.6x2, 1.1x18.09x44">KC DIA WHIRD1.6x2, 1.1x18.09x44</option>
              <option value="KC DIA WHIRD1.3x20">KC DIA WHIRD1.3x20</option>
              <option value="KC DIA WHIRD0.9x44,08x96">KC DIA WHIRD0.9x44,08x96</option>
              <option value="KC DIA WHIRD1.6x2, 1.3x18">KC DIA WHIRD1.6x2, 1.3x18</option>
            </select>
          </li>
          <li className="gender">
            <label htmlFor="gender">Gender:</label>
            <select name="gender" id="gender" onChange={handleChange}>
              <option value="">Choose Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </li>
          <li className="price-range">
            <label htmlFor="price-slider">Price</label>
            <MinimumDistanceSlider
              value={sliderValue}
              onChange={(newValue) => {
                setSliderValue(newValue);
                handlePriceRangeChange(newValue);
              }}
            />
          </li>
          <li className="search-button">
            <button onClick={handleSearch}>SEARCH</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SearchDiamondShell;
