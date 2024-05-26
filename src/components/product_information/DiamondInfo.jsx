import React, { useEffect, useState } from 'react'
import './DiamondInfo.css'
import axios from 'axios';

const DiamondInfo = () => {
    const [diamondInfo, setDiamondInfo] = useState({
        id: "",
        cut: "",
        clarity: "",
        color: "",
        img: "",
    });

    const getDiamondInfo = async () => {
        try {
            const response = await axios.get("https://664b521735bbda10987c72ad.mockapi.io/searchDiamond/5");
            return response.data;
        } catch (error) {
            console.error('Error fetching diamond info:', error);
            return null;
        }
    }

    useEffect(() => {
        const getDiamondData = async () => {
            const data = await getDiamondInfo();
            if (data) {
                setDiamondInfo(data);
                console.log(data)
            }
        }
        getDiamondData();

    }, []
    )



    const handleAddToCart = async () => {

        const addItem = {
            id: diamondInfo.id,
            type: diamondInfo.type,
        }
        await axios.post(
            "https://664b521735bbda10987c72ad.mockapi.io/searchDiamond",
            addItem
        )
        console.log(diamondInfo);
        console.log(addItem)
    }
    return (
        <div className='diamond-product-info-container'>
            <div className='product-image'>
                <img src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="image-alt" />
            </div>
            <div className='diamond-product-right'>
                <div className='diamond-product-detail'>
                    <div className='text'>
                        <p className='name'>Product Name</p>
                        <p className='price'>{diamondInfo.price}</p>
                    </div>
                    <div className='parameter'>
                        <span>Cut:</span>
                        <p>{diamondInfo.cut}</p>

                        <span >Clarity:</span>
                        <p>{diamondInfo.clarity}</p>

                        <span>Color:</span>
                        <p>{diamondInfo.color}</p>
                    </div>
                </div>
                <div className='button-payment'>
                    <button type="submit" className='add-cart' onClick={handleAddToCart} >Add To Cart</button>
                    <button type="submit" className='buy-now' >BUY NOW</button>
                </div>
            </div>
        </div>
    )
}

export default DiamondInfo