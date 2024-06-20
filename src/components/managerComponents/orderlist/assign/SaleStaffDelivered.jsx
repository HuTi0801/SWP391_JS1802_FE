import React, { useEffect, useState } from 'react'
import "./assign.css"
import axios from 'axios';
import MemoizedDeliveredcontainer from "./MemoizedDeliveredcontainer.jsx"
import { useParams } from 'react-router-dom';
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
const SaleStaffDelivered = () => {
    const [deliveredAssigned, setDeliveredAssigned] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/orders/get-order-${id}`);
                setOrder(response.data.result);
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchConfirmAssigned = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/account/get-active-sale-staff-and-order-counts-list');
                setDeliveredAssigned(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
        fetchConfirmAssigned();
    }, [deliveredAssigned]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>  <ManagerHeader />
            <Functionbar />
            <h1>Sale Staff List</h1>
            <div className="DeliveringAssigned-container">
                <MemoizedDeliveredcontainer id={id} />
                <div>
                    <table className='Delivered_table'>
                        <thead>
                            <tr>
                                <th>AccountId</th>
                                <th>OrderId</th>
                                <th>Username</th>
                                <th>Number of Orders</th>
                                <th>Date of Receipt of Orders</th>
                                <th>Time of Receipt of Orders</th>

                            </tr>
                        </thead>
                        <tbody>

                            {deliveredAssigned.map((delivered) => (
                                <tr key={delivering.accountId}>
                                    <td className='ID'>{delivered.accountId}</td>
                                    <td className='OrderID'>{order?.orderId}</td>
                                    <td className='Username'>{delivered.username}</td>
                                    <td className='OrderCount'>{delivered.orderCount}</td>
                                    {/*    order.dateStatusOrders[2]?.dateStatus : the day updates Delivering Status*/}
                                    <td className='DateofReceiptOrders'>{new Date(order?.dateStatusOrders[0].dateStatus).toLocaleDateString()}</td>
                                    <td className='TimeofReceiptOrders'>{new Date(order?.dateStatusOrders[0].dateStatus).toLocaleTimeString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default SaleStaffDelivered