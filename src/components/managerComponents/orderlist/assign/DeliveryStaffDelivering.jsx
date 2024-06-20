import React, { useEffect, useState } from 'react'
import "./assign.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MemoizedDeliveringcontainer from "./MemoizedDeliveringcontainer.jsx"
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
const DeliveryStaffDelivering = () => {
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
                const response = await axios.get('http://localhost:8080/auth/account/get-active-delivery-staff-and-order-counts-list');
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
            <h1>Delivery Staff List</h1>
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
                                <th>Delivery Date</th>
                                <th>Delivery Time</th>

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
                                    <td className='DeliveryDate'>{new Date(order?.dateStatusOrders[2].dateStatus).toLocaleDateString()}</td>
                                    <td className='DeliveryTime'>{new Date(order?.dateStatusOrders[2].dateStatus).toLocaleTimeString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default DeliveryStaffDelivering