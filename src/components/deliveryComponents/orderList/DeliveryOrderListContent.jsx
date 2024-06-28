import React, { useEffect, useState } from 'react';
import './DeliveryOrderListContent.css';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../utilityComponents/pagination/Pagination';
import axios from 'axios';
import moment from 'moment';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const DeliveryOrderListContent = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('All');
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/orders/get-all-orders');
                const data = response.data.result;
                if (Array.isArray(data)) {
                    setOrders(data);
                    setFilteredOrders(data);
                } else {
                    console.error('Unexpected response format:', data);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleClickOrderDetail = (orderId) => {
        navigate(`/deliveryorderdetail/${orderId}`, { state: { orderId: orderId } });
    };

    const formatDateTime = (dateTime) => {
        return moment(dateTime).format('h:mm:ss A - dddd, MMMM Do YYYY');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleStatusFilterChange = (event) => {
        const status = event.target.value;
        setFilterStatus(status);

        if (status === 'All') {
            setFilteredOrders(orders);
        } else {
            const filtered = orders.filter((order) =>
                order.dateStatusOrders[order.dateStatusOrders.length - 1].status === status
            );
            setFilteredOrders(filtered);
        }

        setCurrentPage(1);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const ordersToShow = filteredOrders.slice(startIndex, endIndex);

    return (
        <div className='delivery-order-list-content-container'>
            <div className='order-list-content'>
                <div className='order-list-title'>
                    ORDER LIST
                </div>  
                <ul className='list-order'>
                    {filteredOrders.length > 0 ? (
                        ordersToShow.map((order) => (
                            <li key={order.orderId} className='order-detail-preview' onClick={() => handleClickOrderDetail(order.orderId)}>
                                <div className='order-info'>
                                    <p>ORDER ID: {order.orderId}</p>
                                    <p>PURCHASE DATE: {order.dateStatusOrders.length > 0 && formatDateTime(order.dateStatusOrders[0].dateStatus)}</p>
                                    <p>TOTAL PRICE: {formatPrice(order.totalPrice)}</p>
                                </div>
                                <div className='status-and-view'>
                                    <p>Status: {order.dateStatusOrders.length > 0 && order.dateStatusOrders[order.dateStatusOrders.length - 1].status}</p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No orders found.</li>
                    )}
                </ul>
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredOrders.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default DeliveryOrderListContent;
