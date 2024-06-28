
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
import "./assign.css"; // Ensure correct path to your CSS file
import { useParams } from 'react-router-dom';
import { useTable } from 'react-table';

const PendingAssigned = () => {
    const [pendingAssigned, setPendingAssigned] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedStaff, setSelectedStaff] = useState(new Set());
    const [warning, setWarning] = useState('');
    const [order, setOrder] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPendingAssigned = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/account/get-active-sale-staff-and-order-counts-list');
                setPendingAssigned(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

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
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
        fetchPendingAssigned();
    }, [id]);

    const handleCheckboxChange = (accountId) => {
        setSelectedStaff(prev => {
            const updated = new Set(prev);
            if (updated.has(accountId)) {
                updated.delete(accountId);
            } else {
                updated.add(accountId);
            }
            return updated;
        });
    };

    const handleAssignClick = async () => {
        if (selectedStaff.size === 0) {
            setWarning('Please choose sale staff before assign');
        } else if (selectedStaff.size > 1) {
            setWarning('Please select only one sale staff');
        } else {
            try {
                const response = await axios.post(
                    `http://localhost:8080/auth/account-order/assign-staff-to-order?accountId=${Array.from(selectedStaff)[0]}&orderId=${order?.orderId}`
                );
                if (response.data.isSuccess) {
                    alert("Assign Sale Staff Successfully!");
                }
            } catch (error) {
                console.error('Error assigning staff:', error);
                setWarning('Failed to assign sale staff. Please try again.');
            }
        }
    };

    const data = useMemo(() => pendingAssigned.map(pending => ({
        ...pending,
        orderId: order?.orderId
    })), [pendingAssigned, order]);

    const columns = useMemo(() => [
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <input
                    className='CheckApp'
                    type='checkbox'
                    checked={selectedStaff.has(row.original.accountId)}
                    onChange={() => handleCheckboxChange(row.original.accountId)}
                />
            )
        },
        {
            Header: 'AccountId',
            accessor: 'accountId'
        },
        {
            Header: 'OrderId',
            accessor: 'orderId'
        },
        {
            Header: 'Username',
            accessor: 'username'
        },
        {
            Header: 'Number of Orders',
            accessor: 'orderCount'
        }
    ], [selectedStaff]);

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
            <div className="PendingAssigned-container">
                <div className='Pendingcontainer'>
                    <hr className="vertical-line" />
                    <div>
                        <ul className="url_Status">
                            <Link to="/managerorderlist" className="All">All</Link>
                            <Link to="/pending" className="Pending">Pending</Link>
                        </ul>
                    </div>
                </div>
                <div>
                    <button className='PendingAssigned' onClick={handleAssignClick}>Assign</button>
                    {warning && <div className="Pendingwarning">{warning}</div>}
                    <table {...getTableProps()} className='ReactTable'>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th key={column.id} {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map(row => {
                                prepareRow(row);
                                return (
                                    <tr key={row.id} {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td key={cell.column.id} {...cell.getCellProps()}>{cell.render('Cell')}</td>
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

export default PendingAssigned;
