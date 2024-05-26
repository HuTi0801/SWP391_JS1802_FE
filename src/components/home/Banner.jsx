import React, { useEffect, useState } from 'react'
import './Banner.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const Banner = ({ listBanner }) => {

    const [indexImage, setIndexImage] = useState(0);

    const handleLeftClick = () => {
        setIndexImage((currentIndex) => (currentIndex === 0 ? listBanner.length - 1 : currentIndex - 1));
    };

    const handleRightClick = () => {
        setIndexImage((currentIndex) => (currentIndex === listBanner.length - 1 ? 0 : currentIndex + 1));
    };
    return (
        <div className='banner-container'>

            <div className='banner-content'>

                <div className='left-button' onClick={handleLeftClick}>
                    <ArrowBackIcon />
                </div>
                <div className='image-container'>
                    <img src={listBanner[indexImage].image} alt="image" className='image' />
                </div>
                <div className='right-button' onClick={handleRightClick}>
                    <ArrowForwardIcon />
                </div>

            </div>
        </div>
    )
}

export default Banner