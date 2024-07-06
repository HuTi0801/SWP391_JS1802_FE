import React, { useEffect, useState } from 'react';
import "../OrderListPage.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListofStatus from "./ListofStatus.jsx"
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx"
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx"
const Pending = () => {

    const [Pendingoders, setPendingOrders] = useState([]);
    const [Status, setStatus] = useState(null);
    const [currentPage, setcurrentPage] = useState(1)
    const authToken = localStorage.getItem('authToken');
    const recordsPerPage = 3;
    /* Display Pending Order Info  */
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/status-order/get-a-status-order-1',
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                        }
                    });
                setStatus(response.data.result);
            } catch (error) {
                console.error('Error fetching status info:', error);
            }
        };

        fetchStatus();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (Status) {
                try {
                    const response = await axios.get(`http://localhost:8080/auth/orders/get-order-statusName?statusName=${Status.statusName}`,
                        {
                            headers: {
                                Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                            }
                        });
                    setPendingOrders(response.data.result);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            }
        };

        fetchData();
    }, [Status]);


    function formatCurrency(amount) {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        return formatter.format(amount);
    }


    const lastIndex = currentPage * recordsPerPage;

    const firstIndex = lastIndex - recordsPerPage;


    const records = Pendingoders.slice(firstIndex, lastIndex);

    const npage = Math.ceil(Pendingoders.length / recordsPerPage)

    const numbers = [...Array(npage + 1).keys()].slice(1)
    return (

        <>
            <ManagerHeader />
            <Functionbar />
            <h1>Pending Order List</h1>
            <div className="OrderList-container">
                <ListofStatus />
            </div>
            <div className='list'>
                {records.map((order) => (
                    <div key={order.orderId} className='OrderList'>
                        <div className="CustomerID">
                            <span>OrderID:</span>
                            <p>{order.orderId}</p>
                        </div>
                        <div className="CustomerName">
                            <span>Customer Name:</span>
                            <p>{order.cusName}</p>
                        </div>
                        <div className="TotalPrice">
                            <span>Total Price:</span>
                            <p>{formatCurrency(order.totalPrice)}</p>
                        </div>
                        <div className="OrderStatus">
                            <span>Phone:</span>
                            <p>{order.phone}</p>
                        </div>
                        <div className='status'>
                            <span>Status:</span>
                            <p>{order.dateStatusOrders[order.dateStatusOrders.length - 1].status}</p>
                        </div>
                        <Link to={`/pendingassigned/${order.orderId}`} className="Assigned">
                            Assign
                        </Link>
                        <Link to={`/orderDetails/${order.orderId}`} className="ViewDetails">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>


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

        if (currentPage > 1) {
            setcurrentPage(currentPage - 1)
        }
    }
    function changePage(id) {

        setcurrentPage(id)
    }
    function nextPage() {

        if (currentPage < npage) {
            setcurrentPage(currentPage + 1)
        }
    }
}

export default Pending