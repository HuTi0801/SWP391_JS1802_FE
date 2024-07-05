
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import { Box, Grid } from '@mui/material';
import MemoizedDeliveredcontainer from "./MemoizedDeliveredcontainer.jsx";
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
import "./assign.css";

const DeliveringAssigned = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState(null);
    const [deliveringAssigned, setDeliveringAssigned] = useState([]);
    const [staff, setStaff] = useState([]);
    const authToken = localStorage.getItem('authToken');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderResponse = await axios.get(`http://localhost:8080/auth/orders/get-order-${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                    }
                });
                setOrder(orderResponse.data.result);

                const assignedResponse = await axios.get('http://localhost:8080/auth/account/get-active-delivery-staff-and-order-counts-list', {
                    headers: {
                        Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                    }
                });
                setDeliveringAssigned(assignedResponse.data);

                const staffResponse = await axios.get(`http://localhost:8080/auth/account-order/get-staff-accounts-assigning-by-order?orderId=${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                    }
                });
                setStaff(staffResponse.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const columns = useMemo(() => [
        {
            Header: 'AccountId',
            accessor: 'accountId'
        },
        {
            Header: 'OrderId',
            accessor: 'orderId',
            Cell: ({ row }) => (
                <span>{order ? order.orderId : '-'}</span>
            )
        },
        {
            Header: 'First Name',
            accessor: 'firstName'
        },
        {
            Header: 'Last Name',
            accessor: 'lastName'
        },
        {
            Header: 'Number of Orders',
            accessor: 'orderCount',
            Cell: ({ row }) => {
                const numOrder = deliveringAssigned.find(staff => staff.accountId === row.original.accountId);
                return <span>{numOrder ? numOrder.orderCount : '-'}</span>;
            }
        },
        {
            Header: 'Date of Receipt of Goods',
            accessor: 'dateofReceiptofGoods',
            Cell: ({ row }) => (
                <span>{order && order.dateStatusOrders[3] ? new Date(order.dateStatusOrders[3].dateStatus).toLocaleDateString() : '-'}</span>
            )
        },
        {
            Header: 'Time of Receipt of Goods',
            accessor: 'timeofReceiptofGoods',
            Cell: ({ row }) => (
                <span>{order && order.dateStatusOrders[3] ? new Date(order.dateStatusOrders[3].dateStatus).toLocaleTimeString() : '-'}</span>
            )
        }
    ], [order, deliveringAssigned]);

    const data = useMemo(() => {
        return staff.filter(allstaff => allstaff.role !== "CUSTOMER" && allstaff.role !== "SALE_STAFF").map(allstaff => ({
            accountId: allstaff.id,
            firstName: allstaff.firstName,
            lastName: allstaff.lastName,
            orderCount: deliveringAssigned.find(staff => staff.accountId === allstaff.id)?.orderCount,
            deliveryDate: order && order.dateStatusOrders[3] ? new Date(order.dateStatusOrders[3].dateStatus) : null,
            deliveryTime: order && order.dateStatusOrders[3] ? new Date(order.dateStatusOrders[3].dateStatus) : null
        }));
    }, [staff, deliveringAssigned, order]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <h1>Delivery Staff List</h1>
            <Box sx={{ display: 'flex' }}>
                <MemoizedDeliveredcontainer id={id} />
                <Grid container spacing={20} />
                <Box sx={{ marginTop: 20, marginRight: 500 }}>
                    <table {...getTableProps()} className='Delivered_table'>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Box>
            </Box >
        </>
    );
};

export default DeliveringAssigned;


