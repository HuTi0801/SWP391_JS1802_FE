import React, { useEffect, useState } from 'react';
import './ProductPreview.css';
import axios from 'axios';

const ProductPreview = () => {
    const [productList, setproductList] = useState([]);

    const getDiamondInfo = async () => {
        try {
            const response = await axios.get("https://664b521735bbda10987c72ad.mockapi.io/searchDiamond/");
            return response.data;
        } catch (error) {
            console.error('Error fetching diamond info:', error);
            return [];
        }
    }

    useEffect(() => {
        const getDiamondData = async () => {
            const data = await getDiamondInfo();
            if (data) {
                setproductList(data);
                console.log(data)
            }
        }
        getDiamondData();
    }, []);

    const handleClick = async (itemId) => {
        // Add your click handler logic here
        const productId = itemId;
        await axios.post("https://664b521735bbda10987c72ad.mockapi.io/searchDiamond/", productId);
        console.log(productId);
    }

    const previewList = productList.slice(0, 4); // Get first 4 items

    return (
        <div className='preview-container'>
            <ul>
                {previewList.map((item) => (
                    <li key={item.id}>
                        <img
                            src={item.img} alt="image"
                            className='image'
                            onClick={() => handleClick(item.id)}
                        />
                        <div className='preview-desc'>
                            <div className='name'>{item.name}</div> {/* Display the actual cut */}
                            <div className='price'>{item.price}</div> {/* Display the actual clarity */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductPreview;
