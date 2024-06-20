import React, { useEffect, useState } from 'react'
import "./assign.css"
import MemoizedDeliveringcontainer from "./MemoizedDeliveringcontainer.jsx"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
const DeliveringAssigned = () => {
    const [error] = useState(null);
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(null);
    const { id } = useParams();
    const [SaleStaff, setSaleStaff] = useState([]);
    const [DeliveryStaff, setDeliveryStaff] = useState([]);
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

        const fetchDeliveryStaff = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/account/get-active-delivery-staff-and-order-counts-list');
                setDeliveryStaff(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        const fetchSaleStaff = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/account/get-active-sale-staff-and-order-counts-list');
                setSaleStaff(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSaleStaff();
        fetchDeliveryStaff();
        fetchOrder();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const AllStaff = [...DeliveryStaff, ...SaleStaff]
    return (
        <><ManagerHeader />
            <Functionbar />
            <h1>Staff List</h1>
            <div className="DeliveringAssigned-container">
                <MemoizedDeliveringcontainer id={id} />
                <div>
                    <table className='AllStaff_table'>
                        <thead>
                            <tr>
                                <th>AccountId</th>
                                <th>Role</th>
                                <th>OrderId</th>
                                <th>Username</th>
                                <th>Number of Orders</th>

                            </tr>
                        </thead>
                        <tbody>
                            {AllStaff.map((allstaff, index) => {

                                let role = "";
                                // uses the some() method to check if any of the staff objects 
                                // in  the SaleStaff array have an accountId that matches the allstaff.accountId.
                                if (SaleStaff && SaleStaff.some(staff => staff.accountId === allstaff.accountId)) {

                                    role = "Sale Staff";
                                    // uses the some() method to check if any of the staff objects 
                                    // in  the DeliveryStaff array have an accountId that matches the allstaff.accountId.
                                } else if (DeliveryStaff && DeliveryStaff.some(staff => staff.accountId === allstaff.accountId)) {
                                    role = "Delivery Staff";
                                }
                                return (
                                    <tr key={index}>

                                        <td className='ID'>{allstaff.accountId}</td>
                                        <td className='Role'>{role}</td>
                                        <td className='OrderID'>{order?.orderId || "-"}</td>
                                        <td className='Username'>{allstaff.username}</td>
                                        <td className='OrderCount'>{allstaff.orderCount}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default DeliveringAssigned