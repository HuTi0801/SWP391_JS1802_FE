import React, { useEffect, useState } from 'react'
import "./assign.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
import MemoizedDeliveredcontainer from "./MemoizedDeliveredcontainer.jsx"
const DeliveredAssigned = () => {
    const [error] = useState(null);
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState(null);
    const { id } = useParams();
    const [SaleStaff, setSaleStaff] = useState([]);
    const [Staff, setStaff] = useState([]);
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
        const fetchStaff = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/account-order/get-staff-accounts-assigning-by-order?orderId=${id}`);
                setStaff(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStaff();
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
        <>
            <ManagerHeader />
            <Functionbar />
            <h1>Staff List</h1>
            <Box sx={{ display: 'flex' }}>
                <MemoizedDeliveredcontainer id={id} />
                <Grid container spacing={20} />
                <Box sx={{ marginTop: 20, marginRight: 500 }}>

                    <table className='AllStaff_table'>
                        <thead>
                            <tr>
                                <th>AccountId</th>
                                <th>OrderId</th>
                                <th>Role</th>
                                <th>Username</th>
                                <th>Number of Orders</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Staff.filter(allstaff => allstaff.role !== "CUSTOMER").map((allstaff) => {
                                const numOrder = AllStaff.find(staff => staff.accountId === allstaff.id);
                                console.log(`Processing staff ID: ${allstaff.id}, Found order count: ${numOrder ? numOrder.orderCount : 'Not Found'}`);
                                return (
                                    <tr key={allstaff.id}>
                                        <td className='ID'>{allstaff.id}</td>
                                        <td className='OrderID'>{order?.orderId || "-"}</td>
                                        <td className='Role'>{allstaff.role}</td>
                                        <td className='Username'>{allstaff.username}</td>
                                        <td className='OrderCount'>{numOrder?.orderCount || "-"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Box>
            </Box>
        </>
    )
}

export default DeliveredAssigned