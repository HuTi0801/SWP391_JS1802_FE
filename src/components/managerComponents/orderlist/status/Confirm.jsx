import React, { useEffect, useState } from 'react';
import "../OrderListPage.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
const Confirm = () => {
    const [Confirmoders, setConfirmOrders] = useState([]);
    /* Display Confirm Order Info  */
    const getConfirmOrderInfo = async () => {
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
            const orderData = await getConfirmOrderInfo();
            setConfirmOrders(orderData);
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

    const recordsPerPage = 4;

    const lastIndex = currentPage * recordsPerPage;

    const firstIndex = lastIndex - recordsPerPage;


    const records = Confirmoders.slice(firstIndex, lastIndex);

    const npage = Math.ceil(Confirmoders.length / recordsPerPage)

    const numbers = [...Array(npage + 1).keys()].slice(1)
    return (

        <>
            <h1>Confirm Order List</h1>
            <div className="OrderList-container">
                <hr className="vertical-line" />
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
            <div className='list'>
                {records.filter(order => order.dateStatusOrders[order.dateStatusOrders.length - 1].status === "Confirm")
                    .map((order) => (
                        <div key={order.id} className='OrderList'>
                            <div className="OrderID">
                                <span> Order ID:</span>
                                <p>{order.id}</p>
                            </div>
                            <div className="CustomerID">
                                <span>Customer ID:</span>
                                <p>{order.customerId}</p>
                            </div>
                            <div className="CustomerName">
                                <span>Customer Name:</span>
                                <p>{order.cusName}</p>
                            </div>
                            <div className="TotalPrice">
                                <span>Total Price:</span>
                                <p>{formatCurrency(order.totalPrice)}</p>
                            </div>
                            <div className="Address">
                                <span> Address:</span>
                                <p>{order.address}</p>
                            </div>
                            <div className="OrderStatus">
                                <span>Phone:</span>
                                <p>{order.phone}</p>
                            </div>
                            <div className='status'>
                                <span>Status:</span>
                                <p>{order.dateStatusOrders[order.dateStatusOrders.length - 1].status}</p>
                            </div>
                            <Link to="/assigned" className="Assigned">
                                Assign
                            </Link>
                            <Link to={`/orderDetails/${order.id}`} className="ViewDetails">
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

export default Confirm