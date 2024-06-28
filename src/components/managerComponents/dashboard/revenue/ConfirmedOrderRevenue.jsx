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

const ConfirmedOrderRevenue = () => {
    const [barData, setBarData] = useState([]);
    const [year, setYear] = useState('');

    useEffect(() => {
        const fetchData = async () => {


            try {
                const response = await axios.get(`http://localhost:8080/auth/dashboard/view-revenue?year=${year}`);
                const data = response.data;
                const transformedData = [];
                const monthsOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Define the desired order of months
                monthsOrder.forEach((month) => {
                    const monthData = data.filter((entry) => entry.statusName === 'Confirmed').find((entry) => entry.month === month);
                    const monthRevenue = monthData ? monthData.totalRevenue : 0;
                    transformedData.push({ month: month, totalRevenue: monthRevenue });
                });

                setBarData(transformedData);
            } catch (error) {
                console.log('Error fetching data:', error);
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
                    <Grid container spacing={2} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 4, marginRight: 30 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={10}>
                            <Paper sx={{ paddingRight: 38 }}>
                                <Typography variant="h6">Revenue(VND)</Typography>
                                <ResponsiveContainer width="156%" height={320}>
                                    <BarChart data={barData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month"
                                            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                            domain={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                        />
                                        <YAxis
                                            tickFormatter={(value) => `${value / 1000000}M`}
                                            ticks={[0, 20000000, 40000000, 60000000, 80000000, 100000000]}
                                            domain={[20000000, 100000000]}
                                        />
                                        <Tooltip />
                                        <Bar dataKey="totalRevenue" fill="#8884d8"></Bar>
                                    </BarChart>
                                </ResponsiveContainer>
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

export default ConfirmedOrderRevenue;
