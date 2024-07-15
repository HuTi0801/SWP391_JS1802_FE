import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Diamondshell.css"
import { Link } from 'react-router-dom';
const DiamondShellInfo = () => {
    const [diamondShells, setDiamondShells] = useState([]);
    const authToken = localStorage.getItem('authToken');
    const fetchDiamondShells = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/diamond-shell/get-all-diamond-shell');
            return response.data.result;
        } catch (error) {
            console.error('Error fetching diamond shell info:', error);
            return [];
        }
    };

    const DeleteDiamondShell = async (id) => {
        const shouldDelete = window.confirm("Do you want to delete diamondshell id:" + id + "?");
        if (!shouldDelete) return;

        try {
            const response = await axios.post(`http://localhost:8080/auth/diamond-shell/remove-diamond-shell-${id}`, null, {
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
            console.error('Error deleting diamondshell:', error);

            return <div>Error: {error}</div>;
        }
    };




    useEffect(() => {
        const fetchData = async () => {
            const diamondShellData = await fetchDiamondShells();

            if (diamondShellData) {
                setDiamondShells(diamondShellData);
            }

        };
        fetchData();


    }, [diamondShells]  // Thêm dependency diamondShells vào mảng dependency của useEffect

    );


    /*-------------------------------------------*/
    /*Custom Pagination */
    const [currentPage, setcurrentPage] = useState(1)

    const recordsPerPage = 3;

    const lastIndex = currentPage * recordsPerPage;

    const firstIndex = lastIndex - recordsPerPage;
    /* 1 page has 3 daimondshells */
    /* diamondShells.slice(0,3)*/
    const records = diamondShells.slice(firstIndex, lastIndex);
    /* the number of pages    */
    /* diamonds.length = 5    */
    /* recordsPerPage = 3   */
    /*   npage = 5/3 = 1.677 =  Math.ceil(1,667) = 2*/
    const npage = Math.ceil(diamondShells.length / recordsPerPage)

    /* mảng chứa tổng số trang và chia nó thành từng trang 1   */
    /*Array(2 + 1)  = Array(3) => page 1, page 2*/

    const numbers = [...Array(npage + 1).keys()].slice(1)



    return (
        <>
            <div className="diamond-shell-info-container">
                {records.map((diamondShell) => (
                    <div key={diamondShell.id} className="diamond-shell-card">
                        <div>
                            <div className="ID">
                                <span>ID:</span>
                                <p>{diamondShell.id}</p>
                            </div>

                            <div className="text">
                                <p>{diamondShell.gender} {diamondShell.material}  {diamondShell.secondaryStoneType}</p>
                            </div>

                            <div className="MaterialData">
                                <span>Material:</span>
                                <p>{diamondShell.material}</p>
                            </div>


                            <div className="GenderData">
                                <span>Gender:</span>
                                <p>{diamondShell.gender}</p>
                            </div>


                            <div className="SecondaryStoneTypeData">
                                <span>Secondary Stone:</span>
                                <p>{diamondShell.secondaryStoneType}</p>
                            </div>


                            <Link to={`/diamondShellInfoDetails/${diamondShell.id}`} className='diamondShellInfo'>
                                View Details
                            </Link>
                            <div className='action-Delete'>
                                <button className='Delete' onClick={() => DeleteDiamondShell(diamondShell.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
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

export default DiamondShellInfo;