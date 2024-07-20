
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, Grid, ListItem, ListItemIcon, Typography, Divider, Box } from '@mui/material';
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
import "./assign.css"; // Ensure correct path to your CSS file
import { useParams } from 'react-router-dom';
import { useTable } from 'react-table';
import PendingIcon from '@mui/icons-material/Pending';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const PendingAssigned = () => {
    const [pendingAssigned, setPendingAssigned] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedStaff, setSelectedStaff] = useState(new Set());
    const [warning, setWarning] = useState('');
    const [order, setOrder] = useState(null);
    const { id } = useParams();
    const authToken = localStorage.getItem('authToken');
    useEffect(() => {
        const fetchPendingAssigned = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/account/get-active-sale-staff-and-order-counts-list',
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                        }
                    });
                setPendingAssigned(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/orders/get-order-${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                        }
                    });
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
    }, [pendingAssigned]);

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
                    , null, {
                    headers: {
                        Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                    }
                }
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
            <Box className="PendingAssigned-container" >
                <Box className='Pendingcontainer' sx={{ marginTop: -12 }}>
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
                                    <Link to="/managerorderlist" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography variant="h6">Home</Typography>
                                    </Link>
                                </ListItem>
                                <ListItem button sx={{ pl: 4 }}>
                                    <ListItemIcon >
                                        <PendingIcon sx={{ color: 'green' }} />
                                    </ListItemIcon>
                                    <Link to="/pending" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Typography variant="h6">Pending</Typography>
                                    </Link>
                                </ListItem>
                            </List>
                            <Divider />
                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <AccountCircleIcon sx={{ color: 'teal' }} />
                                </ListItemIcon>
                                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="h6">Account</Typography>
                                </Link>
                            </ListItem>
                        </Grid>
                    </Box>
                </Box>
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
            </Box>
        </>
    );
};

export default PendingAssigned;
