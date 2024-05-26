import React, { useEffect, useState } from 'react';
import './ProductList.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [diamondShellList, setDiamondShellList] = useState([]);
    const [diamondList, setDiamondList] = useState([]);
    const navigate = useNavigate();

    const getDiamondShellInfo = async () => {
        try {
            const response = await axios.get("http://localhost:8080/diamond-shell/get-all-diamond-shell");
            return response.data;
        } catch (error) {
            console.error('Error fetching diamond shell info:', error);
            return [];
        }
    };

    const getDiamondInfo = async () => {
        try {
            const response = await axios.get("http://localhost:8080/diamond/get-all-diamond"); 
            return response.data;
        } catch (error) {
            console.error('Error fetching diamond info:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const diamondShellData = await getDiamondShellInfo();
            const diamondData = await getDiamondInfo();

            if (diamondShellData) {
                setDiamondShellList(diamondShellData);
            }
            if (diamondData) {
                setDiamondList(diamondData);
            }
        };
        fetchData();
    }, []);

    const handleClick = (item) => {
        const itemUrl = item.imageDiamondShell ? `/diamondshell/${item.id}` : `/diamond/${item.id}`;
        navigate(itemUrl);
    };

    const productList = [...diamondShellList, ...diamondList];

    return (
        <div className='product-list-container'>
            <ul>
                {productList.map((item) => (
                    <li key={item.id}>
                        <img
                            src={item.imageDiamondShell || item.imageDiamond}
                            alt="image"
                            className='image'
                            onClick={() => handleClick(item)}
                        />
                        <div className='product-list-desc'>
                            <div className='name'>{item.material || item.origin}</div>
                            <div className='price'>{item.price}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
