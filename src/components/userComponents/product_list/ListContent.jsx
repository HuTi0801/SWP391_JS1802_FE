import React, { useEffect, useState } from 'react';
import './ListContent.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ListContent = () => {
    const [diamondShellList, setDiamondShellList] = useState([]);
    const [diamondList, setDiamondList] = useState([]);
    const location = useLocation();
    const { results } = location.state || {};
    const navigate = useNavigate();

    const getDiamondShellInfo = async () => {
        try {
            const response = await axios.get("http://localhost:8080/auth/diamond-shell/get-all-diamond-shell");
            return response.data.result;
        } catch (error) {
            console.error('Error fetching diamond shell info:', error);
            return [];
        }
    };

    const getDiamondInfo = async () => {
        try {
            const response = await axios.get("http://localhost:8080/auth/diamond/get-all-diamond");
            return response.data.result;
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

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const productList = results && results.length > 0 ? results : [...diamondShellList, ...diamondList];
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
                            <div className='price'>{formatPrice(item.price)}đ</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListContent;
