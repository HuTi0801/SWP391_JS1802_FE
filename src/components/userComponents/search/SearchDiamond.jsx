import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SearchDiamond.css';
import MinimumDistanceSlider from '../../utilityComponents/priceSlider/MinimumDistanceSlider';

const SearchDiamond = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 2300000000]); // Initial price range
  const [sliderValue, setSliderValue] = useState([0, 2300000000]); // Slider value

  const [diamondAttributes, setDiamondAttributes] = useState({
    caratWeights: [],
    origins: [],
    clarities: [],
    colors: [],
    cuts: [],
  });

  const [diamond, setDiamond] = useState({
    cut: '',
    clarity: '',
    color: '',
    origin: '',
    min_price: 0,
    max_price: 0,
  });

  useEffect(() => {
    const fetchDiamondAttributes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/auth/diamond/attributes');
        const attributes = response.data.result;
        setDiamondAttributes({
          caratWeights: attributes.caratWeights,
          origins: attributes.origins,
          clarities: attributes.clarities,
          colors: attributes.colors,
          cuts: attributes.cuts,
        });
      } catch (error) {
        console.error('Error fetching diamond attributes:', error);
      }
    };

    fetchDiamondAttributes();
  }, []);

  const handleChange = (e) => {
    setDiamond({ ...diamond, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/diamond/search',
        {
          ...diamond,
          min_price: priceRange[0],
          max_price: priceRange[1],
        }
      );
      console.log(response.data); // Handle the response data as needed
      navigate('/productlist', { state: { results: response.data } });
    } catch (error) {
      console.error('Error searching diamond:', error.data);
    }
  };

  const handlePriceRangeChange = (newValue) => {
    setPriceRange(newValue);
    setDiamond({ ...diamond, min_price: newValue[0], max_price: newValue[1] });
  };

  return (
    <div className="search-content-container">
      <div className="title">
        <span>SEARCH DIAMOND</span>
      </div>
      <div className="search-parameter">
        <ul>
          <li className="cut">
            <label htmlFor="cut">Cut</label>
            <select name="cut" id="cut" onChange={handleChange}>
              <option value="">Choose Cut</option>
              {diamondAttributes.cuts.map((cut) => (
                <option key={cut} value={cut}>
                  {cut}
                </option>
              ))}
            </select>
          </li>
          <li className="clarity">
            <label htmlFor="clarity">Clarity</label>
            <select name="clarity" id="clarity" onChange={handleChange}>
              <option value="">Choose Clarity</option>
              {diamondAttributes.clarities.map((clarity) => (
                <option key={clarity} value={clarity}>
                  {clarity}
                </option>
              ))}
            </select>
          </li>
          <li className="color">
            <label htmlFor="color">Color</label>
            <select name="color" id="color" onChange={handleChange}>
              <option value="">Choose Color</option>
              {diamondAttributes.colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </li>
          <li className="origin">
            <label htmlFor="origin">Origin</label>
            <select name="origin" id="origin" onChange={handleChange}>
              <option value="">Choose Origin</option>
              {diamondAttributes.origins.map((origin) => (
                <option key={origin} value={origin}>
                  {origin}
                </option>
              ))}
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

export default SearchDiamond;
