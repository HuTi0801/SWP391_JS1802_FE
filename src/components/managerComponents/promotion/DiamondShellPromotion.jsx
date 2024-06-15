import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../../../pages/managerPages/promotion/Promotion.css";
import { Link } from 'react-router-dom';
const DiamondShellPromotion = () => {
    return (
        <div className="promotion-container">
            <div className="promotion-info-container">
                <h1>DiamondShell Promotion List</h1>
                <div className='promotion-card'>
                    <div className="PromotionID">
                        <span>Promotion ID:</span>
                        <p></p>
                    </div>
                    <div className="ProductionName">
                        <span>Product name:</span>
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
        </div>
    );

}

export default DiamondShellPromotion