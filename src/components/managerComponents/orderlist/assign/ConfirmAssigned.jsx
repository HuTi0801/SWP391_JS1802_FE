
import React, { useEffect, useState, useMemo } from 'react';
import "./assign.css";
import axios from 'axios';
import { List, Grid, ListItem, ListItemIcon, Typography, Divider, Box, Link } from '@mui/material';
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
import { useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
const ConfirmAssigned = () => {
    const [confirmAssigned, setConfirmAssigned] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedStaff, setSelectedStaff] = useState(new Set());
    const [warning, setWarning] = useState('');
    const [order, setOrder] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/orders/get-order-${id}`);
                setOrder(response.data.result);
            } catch (error) {
                console.error('Error fetching order:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchConfirmAssigned = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/account/get-active-delivery-staff-and-order-counts-list');
                setConfirmAssigned(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
        fetchConfirmAssigned();
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
            setWarning('Please choose delivery staff before assign');
        } else if (selectedStaff.size > 1) {
            setWarning('Please select only one delivery staff');
        } else {
            try {
                const response = await axios.post(`http://localhost:8080/auth/account-order/assign-staff-to-order?accountId=${Array.from(selectedStaff)[0]}&orderId=${order?.orderId}`);
                if (response.data.isSuccess) {
                    alert("Assign Delivery Staff Successfully!");
                }
            } catch (error) {
                console.error('Error assigning staff:', error);
                setWarning('Failed to assign delivery staff. Please try again.');
            }
        }
    };

    const data = useMemo(() => confirmAssigned.map(confirmed => ({
        ...confirmed,
        orderId: order?.orderId
    })), [confirmAssigned, order]);

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
            <h1>Delivery Staff List</h1>
            <Box className="ConfirmAssigned-container">
                <Box className='Confirmcontainer'>
                    <hr className="vertical-line" />

                    <Box sx={{ maxWidth: 300, textAlign: 'left', marginTop: -5 }}>
                        <Grid item xs={12} md={3}>
                            <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="h6">Diamond Shop</Typography>
                                <Typography variant="subtitle2">Workspace</Typography>
                            </Box>
                            <Divider />
                            <List>

                                <ListItem button sx={{ pl: 4 }}>
                                    <ListItemIcon >
                                        <HomeIcon sx={{ color: 'blue' }} />
                                    </ListItemIcon>
                                    <Link href="/managerorderlist" sx={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography variant="h6">Home</Typography>
                                    </Link>
                                </ListItem>
                                <ListItem button sx={{ pl: 4 }}>
                                    <ListItemIcon >
                                        <CheckCircleIcon sx={{ color: 'green' }} />
                                    </ListItemIcon>
                                    <Link href="/confirm" sx={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography variant="h6">Confirm</Typography>
                                    </Link>
                                </ListItem>
                            </List>
                            <Divider />
                        </Grid>
                    </Box>
                </Box>
                <div>
                    <button className='ConfirmAssigned' onClick={handleAssignClick}>Assign</button>
                    {warning && <div className="Confirmwarning">{warning}</div>}
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
            </Box>
        </>
    );
};

export default ConfirmAssigned;
