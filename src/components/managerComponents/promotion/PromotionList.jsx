import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../pages/managerPages/promotion/Promotion.css";
import { Link } from 'react-router-dom';
const PromotionList = () => {
    const [Promotion, setPromotion] = useState([]);
    const authToken = localStorage.getItem('authToken');

    /* Display Promotion Info  */
    const getPromotionInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/promotion/get-promotions-list',
                {
                    headers: {
                        Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                    }
                });
            return response.data.result;
        } catch (error) {
            console.error('Error fetching diamond info:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const PromotionListData = await getPromotionInfo();
            setPromotion(PromotionListData);
        };
        fetchData();
    }, [Promotion]);
    const DeletePromotion = async (id, promotionCode) => {
        const shouldDelete = window.confirm(`Do you want to delete promotion ID: ${promotionCode}`);
        if (!shouldDelete) return;

        try {
            const response = await axios.post(`http://localhost:8080/auth/promotion/delete/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                }
            });
            if (response.data.isSuccess) {
                alert("Delete Promotion successfully!!!");
            } else {
                console.error('Failed to delete promotion:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting promotion:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB'); // 'en-GB' formats the date as DD/MM/YYYY
    };

    const [currentPage, setcurrentPage] = useState(1);
    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = Promotion.slice(firstIndex, lastIndex);
    const npage = Math.ceil(Promotion.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    return (
        <div className="promotion-info-container">
            {records.map((promotion) => (
                <div key={promotion.id} className='promotion-card'>
                    <div className="PromotionID">
                        <span>Promotion ID:</span>
                        <p>{promotion.promotionCode}</p>
                    </div>
                    <div className="promotionName">
                        <span>Promotion name:</span>
                        <p>{promotion.promotionName}</p>
                    </div>
                    <div className="Startdate">
                        <span>Start date:</span>
                        <p>{formatDate(promotion.startDate)}</p>
                    </div>
                    <div className="Enddate">
                        <span>End date:</span>
                        <p>{formatDate(promotion.endDate)}</p>
                    </div>
                    <div className="Type">
                        <span>Type:</span>
                        <p>{promotion.type}</p>
                    </div>

                    <Link to={`/promotionInfoDetail/${promotion.id}`} className="PromotionInfo">
                        View Details
                    </Link>
                    <div className='action-Delete'>
                        <button className="Delete" onClick={() => { DeletePromotion(promotion.id, promotion.promotionCode) }}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={prePage}>Prev</a>
                    </li>
                    {
                        numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <a href='#' className='page-link' onClick={() => changePage(n)}>{n}</a>
                            </li>
                        ))
                    }
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>

    );

    function prePage() {
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1);
        }
    }

    function changePage(id) {
        setcurrentPage(id);
    }

    function nextPage() {
        if (currentPage < npage) {
            setcurrentPage(currentPage + 1);
        }
    }
}

export default PromotionList;
