import React, { useState } from 'react';
import './StaffOrderListContent.css';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../utilityComponents/Pagination';

const StaffOrderListContent = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    // Example orders array
    const orders = [
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 1, status: 'Pending', orderDate: '2024-06-10' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 2, status: 'Confirmed', orderDate: '2024-06-11' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 3, status: 'Pending', orderDate: '2024-06-12' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 4, status: 'Confirmed', orderDate: '2024-06-13' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 5, status: 'Pending', orderDate: '2024-06-14' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 6, status: 'Confirmed', orderDate: '2024-06-15' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 7, status: 'Pending', orderDate: '2024-06-16' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 8, status: 'Confirmed', orderDate: '2024-06-17' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 9, status: 'Pending', orderDate: '2024-06-18' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 10, status: 'Confirmed', orderDate: '2024-06-19' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 11, status: 'Pending', orderDate: '2024-06-20' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 12, status: 'Confirmed', orderDate: '2024-06-21' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 13, status: 'Pending', orderDate: '2024-06-22' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 14, status: 'Confirmed', orderDate: '2024-06-23' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 15, status: 'Pending', orderDate: '2024-06-24' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 16, status: 'Confirmed', orderDate: '2024-06-25' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 17, status: 'Pending', orderDate: '2024-06-26' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 18, status: 'Confirmed', orderDate: '2024-06-27' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 19, status: 'Pending', orderDate: '2024-06-28' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 20, status: 'Confirmed', orderDate: '2024-06-29' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 21, status: 'Pending', orderDate: '2024-06-30' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 22, status: 'Confirmed', orderDate: '2024-07-01' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 23, status: 'Pending', orderDate: '2024-07-02' },
        { image:"https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" ,id: 24, status: 'Confirmed', orderDate: '2024-07-03' },
        
    ];

    const totalPages = Math.ceil(orders.length / itemsPerPage); // Calculate total pages

    const handleClickOrderDetail = () => {
        navigate('/salestafforderdetail')
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Calculate start and end index for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the orders array based on start and end index
    const ordersToShow = orders.slice(startIndex, endIndex);

    return (
        <div className='staff-order-list-content-container'>
            <div className='order-list-content'>
                <div className='order-list-filter'>
                    <span>Filter by: </span>
                    <label htmlFor="status-filter">Status</label>
                    <select name="status-filter" id="status-filter">
                        <option value="">Choose a status</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                    </select>
                </div>
                <ul className='list-order'>
                    {ordersToShow.map(order => (
                        <li key={order.id} className='order-detail-preview'>
                            {/* Replace with your order details */}
                            <img src={order.image} alt="altimage" />
                            <div className='order-info'>
                                <p>OrderID: {order.id}</p>
                                <p>Order Date: {order.orderDate}</p>
                                <p>Customer ID: </p>
                            </div>
                            <div className='status-and-view'>
                                <p>Status: {order.status}</p>
                                <button onClick={handleClickOrderDetail}>View Detail</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default StaffOrderListContent;
