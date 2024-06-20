import React from 'react'
import "./assign.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
import MemoizedDeliveredcontainer from "./MemoizedDeliveredcontainer.jsx"
const DeliveryStaffDelivered = () => {
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

        const fetchDeliveredAssigned = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/account/get-active-delivery-staff-and-order-counts-list');
                setDeliveredAssigned(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
        fetchDeliveredAssigned();
    }, [deliveredAssigned]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <><ManagerHeader />
            <Functionbar />
            <h1>Delivery Staff List</h1>
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
                                <th>Date of Receipt of Goods</th>
                                <th>Time of Receipt of Goods</th>

                            </tr>
                        </thead>
                        <tbody>

                            {deliveredAssigned.map((delivered) => (
                                <tr key={delivered.accountId}>
                                    <td className='ID'>{delivered.accountId}</td>
                                    <td className='OrderID'>{order?.orderId}</td>
                                    <td className='Username'>{delivered.username}</td>
                                    <td className='OrderCount'>{delivered.orderCount}</td>
                                    {/*    order.dateStatusOrders[2]?.dateStatus : the day updates Delivering Status*/}
                                    <td className='DateofReceiptGoods'>{new Date(order?.dateStatusOrders[3].dateStatus).toLocaleDateString()}</td>
                                    <td className='TimeofReceiptGoods'>{new Date(order?.dateStatusOrders[3].dateStatus).toLocaleTimeString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )

}

export default DeliveryStaffDelivered