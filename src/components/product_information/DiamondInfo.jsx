import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DiamondInfo.css';

const DiamondInfo = () => {
    const { id } = useParams();
    const [diamond, setDiamond] = useState(null);
    const [cartID, setCartID] = useState("");

    useEffect(() => {
        const fetchDiamond = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/diamond/get-a-diamond-${id}`);
                setDiamond(response.data);
            } catch (error) {
                console.error('Error fetching diamond:', error);
            }
        };

        fetchDiamond();
    }, [id]);


    const addToCart = async () => {
        try {
            const cartItem = {
                productID: diamond.id,
                productType: "DIAMOND",
                customerID: 1,
                cartID: 1
            };

            const response = await axios.post("http://localhost:8080/cart/add-to-cart", cartItem);
            console.log('Add to cart response:', response.data);
            console.log(cartItem)



        } catch (error) {
            console.error('Error adding diamond to cart:', error);
        }
    };


    if (!diamond) {
        return <div>Loading...</div>;
    }

    return (
        <div className='diamond-product-info-container'>
            <div className='product-image'>
                <img src={diamond.imageDiamond} alt="Diamond" />
            </div>
            <div className='diamond-product-right'>
                <div className='diamond-product-detail'>
                    <div className='text'>
                        <p className='name'>{diamond.origin} + {diamond.cut} + {diamond.color} + {diamond.clarity}</p>
                        <p className='price'>{diamond.price}</p>
                    </div>
                    <div className='parameter'>
                        <span>Cut:</span>
                        <p>{diamond.cut}</p>

                        <span>Color:</span>
                        <p>{diamond.color}</p>

                        <span>Clarity:</span>
                        <p>{diamond.clarity}</p>
                    </div>
                </div>
                <div className='button-payment'>
                    <button type="button" className='add-cart' onClick={addToCart}>Add To Cart</button>
                    <button type="button" className='buy-now'>BUY NOW</button>
                </div>
            </div>
        </div>
    );
};

export default DiamondInfo;
