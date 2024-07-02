import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MinimumDistanceSlider from '../../utilityComponents/priceSlider/MinimumDistanceSlider';

const SearchDiamondShell = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 2300000000]); // Initial price range
  const [sliderValue, setSliderValue] = useState([0, 2300000000]); // Slider value

  const [diamondShellAttributes, setDiamondShellAttributes] = useState({
    materials: [],
    secondaryStoneTypes: [],
  });

  const [diamondShell, setDiamondShell] = useState({
    secondaryStoneType: '',
    material: '',
    gender: '',
    min_price: 0,
    max_price: 0,
  });

  useEffect(() => {
    const fetchDiamondShellAttributes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/diamond-shell/attributes');
        const attributes = response.data.result;
        setDiamondShellAttributes({
          materials: attributes.materials,
          secondaryStoneTypes: attributes.secondaryStoneTypes,
        });
      } catch (error) {
        console.error('Error fetching diamond shell attributes:', error);
      }
    };

    fetchDiamondShellAttributes();
  }, []);

  const handleChange = (e) => {
    setDiamondShell({ ...diamondShell, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/diamond-shell/search-diamond-shell',
        {
          ...diamondShell,
          min_price: priceRange[0],
          max_price: priceRange[1],
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
              {diamondShellAttributes.materials.map((material) => (
                <option key={material} value={material}>
                  {material}
                </option>
              ))}
            </select>
          </li>
          <li className="secondary-stone">
            <label htmlFor="secondaryStoneType">Secondary Stone:</label>
            <select name="secondaryStoneType" id="secondaryStoneType" onChange={handleChange}>
              <option value="">Choose Secondary Stone</option>
              {diamondShellAttributes.secondaryStoneTypes.map((stoneType) => (
                <option key={stoneType} value={stoneType}>
                  {stoneType}
                </option>
              ))}
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
