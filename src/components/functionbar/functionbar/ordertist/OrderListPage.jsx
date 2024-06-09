import React, { useEffect, useState } from 'react';
import "./OrderListPage.css"
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderListPage = () => {

    const [oders, setOrders] = useState([]);

    /* Display Order Info  */
    const getOrderInfo = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/orders/get-all-orders');
            return response.data.result;
        } catch (error) {
            console.error('Error fetching diamond info:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const orderData = await getOrderInfo();
            setOrders(orderData);
        };
        fetchData();
    }, []);

    function formatCurrency(amount) {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        return formatter.format(amount);
    }

    const [currentPage, setcurrentPage] = useState(1)

    const recordsPerPage = 3;

    const lastIndex = currentPage * recordsPerPage;

    const firstIndex = lastIndex - recordsPerPage;


    const records = oders.slice(firstIndex, lastIndex);
    /* the number of pages    */
    /* oders.length = 5    */
    /* recordsPerPage = 3   */
    /*   npage = 5/3 = 1.677 =  Math.ceil(1,667) = 2*/
    const npage = Math.ceil(oders.length / recordsPerPage)

    /* mảng chứa tổng số trang và chia nó thành từng trang 1   */
    /*Array(2 + 1)  = Array(3) => page 1, page 2*/
    const numbers = [...Array(npage + 1).keys()].slice(1)
    return (
        <>

            <h1>OrderList</h1>
            <div className="OrderList-container">
                <hr className="vertical-line"></hr>
                <div>
                    <ul className="url_Status">
                        <h3 className='Status'>Status</h3>

                        <Link to="/orderlist" className="All">
                            All
                        </Link>

                        <Link to="/pending" className="Pending">
                            Pending
                        </Link>

                        <Link to="/confirm" className="Confirm">
                            Confirm
                        </Link>
                        <Link to="/delivering" className="Delivering">
                            Delivering
                        </Link>
                        <Link to="/delivered" className="Delivered">
                            Delivered
                        </Link>
                        <Link to="/canceled" className="Canceled">
                            Canceled
                        </Link>
                    </ul>
                </div>
            </div>
            {records.map((oder) => (
                <div key={oder.id} className='OrderList'>

                    <div className="OrderID">
                        <span> Order ID:</span>
                        <p>{oder.id}</p>
                    </div>
                    <div className="CustomerID">
                        <span>Customer ID:</span>
                        <p>{oder.customerId}</p>
                    </div>
                    <div className="CustomerName">
                        <span>Customer Name:</span>
                        <p>{oder.cusName}</p>
                    </div>
                    <div className="TotalPrice">
                        <span>Total Price:</span>
                        <p>{formatCurrency(oder.totalPrice)}</p>
                    </div>
                    <div className="Address">
                        <span> Address:</span>
                        <p>{oder.address}</p>
                    </div>
                    <div className="OrderStatus">
                        <span>Phone:</span>
                        <p>{oder.phone}</p>
                    </div>

                    <Link to="/assigned" className="Assigned">
                        Assigned
                    </Link>
                    <Link to={`/orderDetails/${oder.id}`} className="ViewDetails">
                        View Details
                    </Link>
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

        </>


    )

    function prePage() {
        /*Click vào sự kiện prePag */
        /*currentPage = 2 (page 2)=> firstIndex = 3 */
        /* 2 !== 3 */
        /*  setcurrentPage(2 - 1) => currentPage = 1 (page 1) */
        if (currentPage !== firstIndex && currentPage !== 1) {
            setcurrentPage(currentPage - 1)
        }
    }
    function changePage(id) {
        /* Lưu trạng thái của trang hiện tại */
        setcurrentPage(id)
    }
    function nextPage() {
        /*Click vào sự kiện nextPage */
        /*currentPage = 1 (page 1)=> lastIndex = 3 */
        /* 1 !== 3 */
        /*  setcurrentPage(1 + 1) => currentPage = 2 (page 2) */
        if (currentPage !== lastIndex) {
            setcurrentPage(currentPage + 1)
        }
    }
}

export default OrderListPage