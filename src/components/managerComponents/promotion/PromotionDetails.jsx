import React, { useEffect, useState } from 'react';
import "./PromotionInfoDetails.css";
import axios from 'axios';
import ManagerHeader from "../header/ManagerHeader.jsx";
import Functionbar from "../functionbar/Functionbar.jsx";
import { useParams } from 'react-router-dom';

const PromotionDetails = () => {
    const [promotionDetails, setPromotionDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { id } = useParams();
    const itemsPerPage = 2;
    const authToken = localStorage.getItem('authToken');
    const getPromotionInfoDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/auth/promotion/view-promotion/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                    }
                });
            return response.data.result;
        } catch (error) {
            console.error('Error fetching promotion info:', error);
            return {};
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const promotionData = await getPromotionInfoDetails();
            setPromotionDetails(promotionData);

            const { promotionDiamondNameList = [], promotionDiamondShellNameList = [] } = promotionData;
            const totalItems = Math.ceil((promotionDiamondNameList.length + promotionDiamondShellNameList.length) / itemsPerPage);
            setTotalPages(totalItems);
        };
        fetchData();
    }, [id]);

    const {
        type = '',
        promotionDiamondShellNameList = [],
        promotionDiamondNameList = [],
        promotionName,
        description,
        memberLevelPromotion,
        discountPercent,
        startDate,
        endDate
    } = promotionDetails;

    const types = type.split(',');

    const allItems = [];

    if (types.includes('DIAMOND')) {
        promotionDiamondNameList.forEach((name, index) => {
            allItems.push({
                type: 'DIAMOND',
                name,
                index
            });
        });
    }

    if (types.includes('DIAMOND_SHELL')) {
        promotionDiamondShellNameList.forEach((name, index) => {
            allItems.push({
                type: 'DIAMOND_SHELL',
                name,
                index
            });
        });
    }

    const paginatedItems = allItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <h1>Promotion Details</h1>
            <div className="promotion-infoDetail-container">
                {paginatedItems.map((item) => (
                    <div className='promotion-card' key={`${item.type}-${item.index}`}>
                        <div className="promotionName">
                            <span>Promotion name:</span>
                            <p>{promotionName}</p>
                        </div>
                        <div className="Description">
                            <span>Description:</span>
                            <p>{description}</p>
                        </div>
                        <div className="memberLevelPromotion">
                            <span>Member Level:</span>
                            <p>{memberLevelPromotion}</p>
                        </div>
                        <div className="discountPercent">
                            <span>Discount Percent:</span>
                            <p>{discountPercent}</p>
                        </div>

                        <div className="Type">
                            <span>Type:</span>
                            <p>{item.type}</p>
                        </div>
                        <div className={item.type === 'DIAMOND' ? "promotionDiamondNameList" : "promotionDiamondShellNameList"}>
                            <span>{item.type === 'DIAMOND' ? 'Diamond Name:' : 'Diamond Shell Name:'}</span>
                            <p>{item.name}</p>
                        </div>
                        <div className="Startdate">
                            <span>Start date:</span>
                            <p>{new Date(startDate).toLocaleDateString()}</p>
                        </div>
                        <div className="Enddate">
                            <span>End date:</span>
                            <p>{new Date(endDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} className='PrevPage' disabled={currentPage === 1}>
                    Prev
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} className='NextPage' disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </>
    );
}

export default PromotionDetails;
