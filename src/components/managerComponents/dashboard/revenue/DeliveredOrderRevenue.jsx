import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, TextField } from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,

} from 'recharts';
import axios from 'axios';
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
import SidebarMenu from '../../dashboard/SidebarMenu.jsx';
const DeliveredOrderRevenue = () => {
    const [barData, setBarData] = useState([]);
    const [year, setYear] = useState("");
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/dashboard/view-revenue?year=${year}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                        }
                    });
                const data = response.data;
                const transformedData = [];
                const monthsOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Define the desired order of months
                let totalConfirmedRevenue = 0;
                let totalConfirmedOrders = 0;

                monthsOrder.forEach((month) => {
                    const monthData = data.filter((entry) => entry.statusName === 'Delivered').find((entry) => entry.month === month);
                    const monthRevenue = monthData ? monthData.totalRevenue : 0;
                    transformedData.push({ month: month, totalRevenue: monthRevenue });
                    totalConfirmedRevenue += monthRevenue;
                    totalConfirmedOrders += monthData ? monthData.orderRevenues.length : 0;
                });

                setBarData(transformedData);
                setTotalRevenue(totalConfirmedRevenue);
                setTotalOrders(totalConfirmedOrders);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        if (year) {
            fetchData();
        }
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
                    <Grid container spacing={2} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 4, marginRight: 30 }}>
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
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ padding: 2, textAlign: 'center', width: "80%", height: 100 }}>
                                <Typography variant="h6">Total Revenue</Typography>
                                <Box sx={{ marginTop: 3, color: 'red' }}>
                                    <Typography variant="h5">{totalRevenue.toLocaleString()} VND</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ padding: 2, textAlign: 'center', width: "80%", height: 100 }}>
                                <Typography variant="h5">Total Orders</Typography>
                                <Box sx={{ marginTop: 3, color: 'red' }}>
                                    <Typography variant="h5">{totalOrders}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Paper sx={{ paddingRight: 38, paddingTop: 2, paddingBottom: 2, paddingLeft: 2 }}>
                                <Typography variant="h6">Revenue(VND)</Typography>
                                <ResponsiveContainer width="148%" height={350}>
                                    <BarChart data={barData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month"
                                            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                            domain={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                            tick={{ fontSize: 18, angle: 0, dy: 3 }} // Adjust tick properties
                                        />
                                        <YAxis
                                            tickFormatter={(value) => `${value / 1000000}`}
                                            ticks={[0, 200000000, 400000000, 600000000, 800000000, 1000000000]}
                                            domain={[200000000, 1000000000]}
                                            tick={{ fontSize: 18 }}
                                        />
                                        <Tooltip />
                                        <Bar dataKey="totalRevenue" fill="#8884d8"></Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default DeliveredOrderRevenue