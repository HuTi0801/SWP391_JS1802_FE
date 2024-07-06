import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Diamond.css"
import { Link } from 'react-router-dom';

const DiamondInfo = () => {
    const [diamonds, setDiamonds] = useState([]);
    const authToken = localStorage.getItem('authToken');
    /* Display Diamond Info  */
    const getDiamondInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/diamond/get-all-diamond');
            return response.data.result;
        } catch (error) {
            console.error('Error fetching diamond info:', error);
            return [];
        }
    };
    /* Delete Diamond */
    const DeleteDiamond = async (id) => {
        const shouldDelete = window.confirm("Do you want to delete diamond id:" + id + "?");
        if (!shouldDelete) return;

        try {
            const response = await axios.post(`http://localhost:8080/auth/diamond/remove-diamond-${id}`, null, {
                headers: {
                    Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                }
            });
            const { status } = response.data.result;

            if (status === false) {
                const element = document.getElementById(id);
                if (element) {
                    element.setAttribute("status", "true");
                }

            }

        } catch (error) {
            console.error('Error deleting diamond:', error);
            return <div>Error: {error}</div>;
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            const diamondData = await getDiamondInfo();
            setDiamonds(diamondData);
        };
        fetchData();
    }, [diamonds]);  // Thêm dependency Diamond vào mảng dependency của useEffect

    /*-------------------------------------------*/
    /*Custom Pagination */
    const [currentPage, setcurrentPage] = useState(1)

    const recordsPerPage = 3;

    const lastIndex = currentPage * recordsPerPage;

    const firstIndex = lastIndex - recordsPerPage;

    /* 1 page has 3 daimonds */
    /* diamonds.slice(0,3)*/
    const records = diamonds.slice(firstIndex, lastIndex);
    /* the number of pages    */
    /* diamonds.length = 5    */
    /* recordsPerPage = 3   */
    /*   npage = 5/3 = 1.677 =  Math.ceil(1,667) = 2*/
    const npage = Math.ceil(diamonds.length / recordsPerPage)

    /* mảng chứa tổng số trang và chia nó thành từng trang 1   */
    /*Array(2 + 1)  = Array(3) => page 1, page 2*/
    const numbers = [...Array(npage + 1).keys()].slice(1)


    return (
        <>

            <div className="diamond-info-container">

                {records.map((diamond) => (
                    <div key={diamond.id} className="diamond-card">
                        <div className="ID">
                            <span>ID:</span>
                            <p>{diamond.id}</p>
                        </div>
                        <div className="text">
                            <p>{diamond.origin} {diamond.cut} {diamond.color} {diamond.clarity}</p>
                        </div>
                        <div className="CutData">
                            <span>Cut:</span>
                            <p>{diamond.cut}</p>
                        </div>
                        <div className="ColorData">
                            <span>Color:</span>
                            <p>{diamond.color}</p>
                        </div>
                        <div className="ClarityData">
                            <span>Clarity:</span>
                            <p>{diamond.clarity}</p>
                        </div>
                        <Link to={`/diamondInfoDetails/${diamond.id}`} className="diamondInfo">
                            View Details
                        </Link>
                        <button className="Delete" onClick={() => DeleteDiamond(diamond.id)}>
                            Delete
                        </button>
                    </div>
                ))}
                <nav>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <a href='#' className='page-link'
                                onClick={prePage}>Prev</a>
                        </li>
                        {
                            numbers.map((n, i) => (
                                <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                    <a href='#' className='page-link'
                                        onClick={() => changePage(n)}>{n}</a>
                                </li>
                            )
                            )
                        }
                        <li className='page-item'>
                            <a href='#' className='page-link'
                                onClick={nextPage}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>


    );
    function prePage() {
        /*Click vào sự kiện prePag */
        /*currentPage = 2 (page 2)*/
        /* 2 > 1 */
        /*  setcurrentPage(2 - 1) => currentPage = 1 (page 1) */
        if (currentPage > 1) {
            setcurrentPage(currentPage - 1)
        }
    }
    function changePage(id) {
        /* Lưu trạng thái của trang hiện tại */
        setcurrentPage(id)
    }
    function nextPage() {
        /*Click vào sự kiện nextPage */
        /*currentPage = 1 (page 1)*/
        /* 1 < 2*/
        /*  setcurrentPage(1 + 1) => currentPage = 2 (page 2) */
        if (currentPage < npage) {
            setcurrentPage(currentPage + 1)
        }
    }
};

export default DiamondInfo;






