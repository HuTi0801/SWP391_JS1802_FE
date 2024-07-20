import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, TextField, CircularProgress, Alert } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import axios from 'axios';
import ManagerHeader from "../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../managerComponents/functionbar/Functionbar.jsx";
import SidebarMenu from './SidebarMenu.jsx';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

const DashBoardComponent = () => {
    const [barData, setBarData] = useState([]);
    const [pieData, setPieData] = useState([]);
    const [year, setYear] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchData = async () => {
            // if (!year || !/^\d{4}$/.test(year)) {
            //     setError('Please enter a valid year.');
            //     return;
            // }

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:8080/auth/dashboard/view-revenue?year=${year}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                const data = response.data;
                const transformedData = [];
                const statusRevenue = {};
                const monthsOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

                let total = 0;
                let ordersCount = 0;

                monthsOrder.forEach((month) => {
                    const monthData = data.filter((entry) => entry.month === month);
                    const monthTotalRevenue = monthData.reduce((sum, entry) => sum + entry.totalRevenue, 0);

                    monthData.forEach((entry) => {
                        ordersCount += entry.orderRevenues.length;

                        entry.orderRevenues.forEach((orderRevenue) => {
                            const status = entry.statusName;
                            const revenue = orderRevenue.orderValue;
                            if (statusRevenue[status]) {
                                statusRevenue[status] += revenue;
                            } else {
                                statusRevenue[status] = revenue;
                            }
                        });
                    });

                    total += monthTotalRevenue;
                    transformedData.push({ month, totalRevenue: monthTotalRevenue });
                });

                const pieChartData = Object.keys(statusRevenue).map(status => ({
                    name: status,
                    value: ((statusRevenue[status] / total) * 100).toFixed(2)
                }));

                setBarData(transformedData);
                setPieData(pieChartData);
                setTotalRevenue(total);
                setTotalOrders(ordersCount);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [year]);

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <Box sx={{ display: 'flex' }}>
                <Grid item xs={12} md={4}>
                    <SidebarMenu />
                </Grid>
                <hr className="vertical-line" />
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: 5 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ padding: 2, textAlign: 'center', width: "80%", height: 100 }}>
                                <Typography variant="h6">Enter Year</Typography>
                                <TextField
                                    label="Year"
                                    variant="outlined"
                                    value={year}
                                    onChange={handleYearChange}
                                    sx={{ marginRight: 2 }}
                                // error={!!error}
                                // helperText={error}
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ padding: 2, textAlign: 'center', width: "80%", height: 100 }}>
                                <Typography variant="h5">Total Revenue</Typography>
                                <Box sx={{ marginTop: 3, color: 'red' }}>
                                    <Typography variant="h5">{totalRevenue.toLocaleString()} VND</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ padding: 2, textAlign: 'center', width: "80%", height: 100 }}>
                                <Typography variant="h5">Total Orders</Typography>
                                <Box sx={{ marginTop: 3, color: 'red' }}>
                                    <Typography variant="h4">{totalOrders}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Paper sx={{ paddingRight: 2, paddingTop: 4, paddingBottom: 2, paddingLeft: 2 }}>
                                <Typography variant="h6">Total Revenue (VND)</Typography>
                                {/* {loading ? (
                                    <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                                        <CircularProgress />
                                    </Box>
                                ) : error ? (
                                    <Alert severity="error">{error}</Alert>
                                ) : ( */}
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={barData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="month"
                                            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                            domain={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                            tick={{ fontSize: 18, angle: 0, dy: 3 }} // Adjust tick properties
                                        />
                                        <YAxis
                                            tickFormatter={(value) => `${value / 1000000}`}
                                            ticks={[0, 500000000, 1000000000, 1500000000, 2000000000, 2500000000]}
                                            domain={[0, 2500000000]}
                                            tick={{ fontSize: 18 }}
                                        />
                                        <Tooltip />
                                        <Bar dataKey="totalRevenue" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                                {/* )} */}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ paddingRight: 2, paddingTop: 2, paddingBottom: 4, paddingLeft: 2, textAlign: 'center' }}>
                                <Typography variant="h6">Order Status Distribution In Year</Typography>
                                {/* {loading ? (
                                    <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                                        <CircularProgress />
                                    </Box>
                                ) : error ? (
                                    <Alert severity="error">{error}</Alert>
                                ) : ( */}
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={pieData.map((entry) => ({ ...entry, value: parseFloat(entry.value) }))}
                                            dataKey="value"
                                            outerRadius={100}
                                            label={({ name, value }) => `${value}%`}
                                        > {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                                {/* )} */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default DashBoardComponent;
