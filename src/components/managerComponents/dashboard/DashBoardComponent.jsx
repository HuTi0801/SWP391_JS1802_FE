import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, TextField, CircularProgress, Alert } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import ManagerHeader from "../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../managerComponents/functionbar/Functionbar.jsx";
import SidebarMenu from './SidebarMenu.jsx';

const DashBoardComponent = () => {
    const [barData, setBarData] = useState([]);
    const [year, setYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const authToken = localStorage.getItem('authToken');
    useEffect(() => {
        const fetchData = async () => {
            if (!year) return;

            setLoading(true);
            setError(null);

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

                monthsOrder.forEach((month) => {
                    const monthData = data.filter((entry) => entry.month === month);
                    const totalRevenue = monthData.reduce((sum, entry) => sum + entry.totalRevenue, 0);
                    transformedData.push({ month, totalRevenue });
                });

                setBarData(transformedData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data');
                console.log('Error fetching data:', error);
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
                <SidebarMenu />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                            <Paper sx={{ paddingRight: 2 }}>
                                <Typography variant="h6">Total Revenue (VND)</Typography>
                                {loading ? (
                                    <Box display="flex" justifyContent="center" alignItems="center" height={300}>
                                        <CircularProgress />
                                    </Box>
                                ) : error ? (
                                    <Alert severity="error">{error}</Alert>
                                ) : (
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={barData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="month"
                                                ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                                domain={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                            />
                                            <YAxis
                                                tickFormatter={(value) => `${value / 1000000}M`}
                                                ticks={[0, 100000000, 200000000, 300000000, 400000000, 500000000]}
                                                domain={[0, 500000000]}
                                            />
                                            <Tooltip />
                                            <Bar dataKey="totalRevenue" fill="#8884d8" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <Paper sx={{ padding: 2, textAlign: 'center' }}>
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
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default DashBoardComponent;
