import React, { useEffect, useState } from 'react';
import './OrderDetailContent.css';
import axios from 'axios';
import ManagerHeader from "../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../managerComponents/functionbar/Functionbar.jsx";
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const [diamonds, setDiamonds] = useState([]);
    const [diamondShells, setDiamondShells] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/orders/get-order-${id}`);
                if (response.data.isSuccess) {
                    setOrder(response.data.result);
                } else {
                    console.error('Failed to fetch order:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchDiamonds = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/diamond/get-all-diamond');
                if (response.data.isSuccess) {
                    setDiamonds(response.data.result);
                } else {
                    console.error('Failed to fetch diamonds:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching diamonds:', error);
            }
        };

        const fetchDiamondShells = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/diamond-shell/get-all-diamond-shell');
                if (response.data.isSuccess) {
                    setDiamondShells(response.data.result);
                } else {
                    console.error('Failed to fetch diamond shells:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching diamond shells:', error);
            }
        };

        fetchOrder();
        fetchDiamonds();
        fetchDiamondShells();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!order) {
        return <p>Order not found</p>;
    }

    function formatCurrency(amount) {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        return formatter.format(amount);
    }

    return (
        <div className='order-detail-content-container'>
            <ManagerHeader />
            <Functionbar />
            <div className='title'>
                <p>ORDER DETAIL</p>
            </div>
            <div className='order-detail-information'>
                <div className='detail-information-container'>
                    <p>Customer ID: {order.customerId}</p>
                    <p>Total Price: {formatCurrency(order.totalPrice)}</p>
                    <p>Deliver To: {order.address}</p>
                    <p>Purchase Date: {new Date(order.dateStatusOrders[0].dateStatus).toLocaleString()}</p>
                </div>
            </div>
            <div className='order-product-list'>
                <ul>
                    {order.orderDetails && order.orderDetails.map((orderDetail, index) => {
                        let productDetails = null;
                        let productName = '';
                        let productImage = '';

                        if (orderDetail.diamondId && !orderDetail.diamondShellId) {
                            productDetails = diamonds.find(diamond => diamond.id === orderDetail.productId);
                            productName = `${productDetails?.origin || ''} ${productDetails?.cut || ''} ${productDetails?.color || ''} ${productDetails?.clarity || ''}`;
                            productImage = productDetails?.imageDiamond || '';
                        } else if (orderDetail.diamondShellId && !orderDetail.diamondId) {
                            productDetails = diamondShells.find(shell => shell.id === orderDetail.productId);
                            productName = `${productDetails?.material || ''} ${productDetails?.secondaryStoneType || ''}`;
                            productImage = productDetails?.imageDiamondShell || '';
                        }

                        return (
                            <li key={index}>
                                <img src={productImage} alt="Product" />
                                <span className='product-information'>
                                    <p>Product Name: {productName}</p>
                                    <p>Quantity: {orderDetail.quantity}</p>
                                    <p>Price: {formatCurrency(orderDetail.price)}</p>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default OrderDetails;
