import React, { useEffect, useState } from 'react';
import "./OrderListPage.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import ManagerHeader from "../../managerComponents/header/ManagerHeader.jsx"
import Functionbar from "../../managerComponents/functionbar/Functionbar.jsx"
const OrderListPage = () => {

    const [oders, setOrders] = useState([]);

    /* Display Order Info  */
    const getOrderInfo = async () => {
        try {
            const response = await axios.get("http://localhost:8080/auth/orders/get-all-orders");
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

    const npage = Math.ceil(oders.length / recordsPerPage)


    const numbers = [...Array(npage + 1).keys()].slice(1)
    return (

        <>
            <ManagerHeader />
            <Functionbar />
            <h1>Order List</h1>
            <div className="OrderList-container">
                <hr className="vertical-line" />
                <div>
                    <ul className="url_Status">

                        <Link to="/managerorderlist" className="All">
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
                        {order.dateStatusOrders[order.dateStatusOrders.length - 1].status === 'Pending' ? (
                            <Link to={`/pendingassigned/${order.orderId}`} className="Assigned">
                                Assign
                            </Link>
                        ) : order.dateStatusOrders[order.dateStatusOrders.length - 1].status === 'Confirmed' ? (
                            <Link to={`/confirmassigned/${order.orderId}`} className="Assigned">
                                Assign
                            </Link>
                        ) : order.dateStatusOrders[order.dateStatusOrders.length - 1].status === 'Delivering' ? (
                            <Link to={`/deliveringassigned/${order.orderId}`} className="Assigned">
                                Assigned
                            </Link>
                        ) : order.dateStatusOrders[order.dateStatusOrders.length - 1].status === 'Delivered' ? (
                            <Link to={`/deliveredassigned/${order.orderId}`} className="Assigned">
                                Assigned
                            </Link>
                        ) : (
                            <Link to={`/canceledorder/${order.orderId}`} className="Assigned">
                                Drop
                            </Link>
                        )}
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
        if (currentPage !== firstIndex && currentPage !== 1) {
            setcurrentPage(currentPage - 1)
        }
    }
    function changePage(id) {

        setcurrentPage(id)
    }
    function nextPage() {

        if (currentPage !== lastIndex) {
            setcurrentPage(currentPage + 1)
        }
    }
}

export default OrderListPage