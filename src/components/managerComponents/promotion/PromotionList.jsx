import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../../../pages/managerPages/promotion/Promotion.css";

import { Link } from 'react-router-dom';
const PromotionList = () => {
    const [diamonds, setDiamonds] = useState([]);
    const [diamondShells, setDiamondShells] = useState([]);
    useEffect(() => {
        const fetchDiamonds = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/diamond/get-all-diamond');
                if (response.data.isSuccess) {
                    setDiamonds(response.data.result);
                } else {
                    console.error('Failed to fetch diamonds:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching diamonds:', error);
            }
        };

        const fetchDiamondShells = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/diamond-shell/get-all-diamond-shell');
                if (response.data.isSuccess) {
                    setDiamondShells(response.data.result);
                } else {
                    console.error('Failed to fetch diamond shells:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching diamond shells:', error);
            }
        };
        fetchDiamonds();
        fetchDiamondShells();
    }, []);

    return (
        <div className="promotion-info-container">
            <div className='promotion-card'>
                <div className="PromotionID">
                    <span>Promotion ID:</span>
                    <p></p>
                </div>
                <div className="ProductionName">
                    <span>Production name:</span>
                    <p></p>
                </div>
                <div className="Startdate">
                    <span>Start date:</span>
                    <p></p>
                </div>
                <div className="Enddate">
                    <span>End date:</span>
                    <p></p>
                </div>
                <div className="Type">
                    <span>Type:</span>
                    <p></p>
                </div>

                <Link to="/promotionInfoDetail" className="PromotionInfo">
                    View Details
                </Link>
                <button className="Delete">
                    Delete
                </button>
            </div>


        </div>
    );
}

export default PromotionList