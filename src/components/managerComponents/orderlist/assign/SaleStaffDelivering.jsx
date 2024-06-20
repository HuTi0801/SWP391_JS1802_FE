import React, { useEffect, useState } from 'react'
import "./assign.css"
import axios from 'axios';
import MemoizedDeliveringcontainer from "./MemoizedDeliveringcontainer.jsx"
import { useParams } from 'react-router-dom';
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
const SaleStaffDelivering = () => {
    const [deliveringAssigned, setDeliveringAssigned] = useState([]);
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
                setDeliveringAssigned(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };



        fetchOrder();
        fetchConfirmAssigned();
    }, [deliveringAssigned]);

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
                <MemoizedDeliveringcontainer id={id} />
                <div>
                    <table className='Delivering_table'>
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

                            {deliveringAssigned.map((delivering) => (
                                <tr key={delivering.accountId}>
                                    <td className='ID'>{delivering.accountId}</td>
                                    <td className='OrderID'>{order?.orderId}</td>
                                    <td className='Username'>{delivering.username}</td>
                                    <td className='OrderCount'>{delivering.orderCount}</td>
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

export default SaleStaffDelivering