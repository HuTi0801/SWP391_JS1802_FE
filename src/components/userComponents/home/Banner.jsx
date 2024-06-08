import React, { useEffect, useState } from 'react';
import './Banner.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Banner = ({ listBanner }) => {
    const [indexImage, setIndexImage] = useState(0);
    const [autoSlide, setAutoSlide] = useState(true);

    // Function to handle the right click
    const handleRightClick = () => {
        setIndexImage((currentIndex) => (currentIndex === listBanner.length - 1 ? 0 : currentIndex + 1));
        setAutoSlide(false); // Disable auto slide
    };

    // Function to handle the left click
    const handleLeftClick = () => {
        setIndexImage((currentIndex) => (currentIndex === 0 ? listBanner.length - 1 : currentIndex - 1));
        setAutoSlide(false); // Disable auto slide
    };

    // Effect to automatically transition every 4 seconds
    useEffect(() => {
        setAutoSlide(true);
        let interval;
        if (autoSlide) {
            interval = setInterval(() => {
                setIndexImage((currentIndex) => (currentIndex === listBanner.length - 1 ? 0 : currentIndex + 1));
            }, 4000);
        }

        return () => clearInterval(interval);
    }, [autoSlide, listBanner.length]);

    return (
        <div className='banner-container'>
            <div className='banner-content'>
                <div className='left-button' onClick={handleLeftClick} style={{ outline: 'none' }}>
                    <ArrowBackIcon />
                </div>
                <div className='image-container'>
                    <img
                        src={listBanner[indexImage].image}
                        alt="image"
                        className='image'
                    />
                </div>
                <div className='right-button' onClick={handleRightClick} style={{ outline: 'none' }}>
                    <ArrowForwardIcon />
                </div>
            </div>
        </div>
    );
};

export default Banner;
