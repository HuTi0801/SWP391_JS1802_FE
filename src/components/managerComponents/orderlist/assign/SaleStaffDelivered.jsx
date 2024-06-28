
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import MemoizedDeliveredcontainer from "./MemoizedDeliveredcontainer.jsx"
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
import "./assign.css";

const SaleStaffDelivered = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [order, setOrder] = useState(null);
    const [deliveringAssigned, setDeliveringAssigned] = useState([]);
    const [staff, setStaff] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const orderResponse = await axios.get(`http://localhost:8080/auth/orders/get-order-${id}`);
                setOrder(orderResponse.data.result);

                const assignedResponse = await axios.get('http://localhost:8080/auth/account/get-active-sale-staff-and-order-counts-list');
                setDeliveringAssigned(assignedResponse.data);

                const staffResponse = await axios.get(`http://localhost:8080/auth/account-order/get-staff-accounts-assigning-by-order?orderId=${id}`);
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
            Header: 'Date of Receipt of Orders',
            accessor: 'receiptDate',
            Cell: ({ row }) => (
                <span>{order && order.dateStatusOrders[0] ? new Date(order.dateStatusOrders[0].dateStatus).toLocaleDateString() : '-'}</span>
            )
        },
        {
            Header: 'Time of Receipt of Orders',
            accessor: 'receiptTime',
            Cell: ({ row }) => (
                <span>{order && order.dateStatusOrders[0] ? new Date(order.dateStatusOrders[0].dateStatus).toLocaleTimeString() : '-'}</span>
            )
        }
    ], [order, deliveringAssigned]);

    const data = useMemo(() => {
        return staff.filter(allstaff => allstaff.role !== "CUSTOMER" && allstaff.role !== "DELIVERY_STAFF").map(allstaff => ({
            accountId: allstaff.id,
            firstName: allstaff.firstName,
            lastName: allstaff.lastName,
            orderCount: deliveringAssigned.find(staff => staff.accountId === allstaff.id)?.orderCount,
            receiptDate: order && order.dateStatusOrders[0] ? new Date(order.dateStatusOrders[0].dateStatus) : null,
            receiptTime: order && order.dateStatusOrders[0] ? new Date(order.dateStatusOrders[0].dateStatus) : null
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
            <h1>Sale Staff List</h1>
            <div className="DeliveringAssigned-container">
                <MemoizedDeliveredcontainer id={id} />
                <div>
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
                </div>
            </div>
        </>
    );
};

export default SaleStaffDelivered;
