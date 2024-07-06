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

const StaffPerformance = () => {
    const [barData, setBarData] = useState([]);
    const [year, setYear] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [staffUsername, setStaffUsername] = useState([]);
    const authToken = localStorage.getItem('authToken');
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/dashboard/view-staff-performance?year=${year}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                        }
                    });
                const data = response.data;
                const transformedData = [];
                const monthsOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; // Define the desired order of months
                Object.values(data).forEach((entry) => {
                    if (entry.role === 'SALE_STAFF') {
                        monthsOrder.forEach((month) => {
                            const monthOrderCount = entry.monthlyOrderCount[month] || 0;
                            transformedData.push({ month: month, username: entry.username, monthlyOrderCount: monthOrderCount });
                        });
                    }
                });

                setBarData(transformedData);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };
        const fetchstaffUsername = async () => {
            if (year === '') {
                setStaffUsername([]);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8080/auth/dashboard/view-staff-performance?year=${year}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                        }
                    });
                setStaffUsername(response.data);
            } catch (error) {
                console.error('Error fetching order:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchstaffUsername();
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
                        <Grid item xs={15} md={9}>
                            <Paper sx={{ paddingRight: 35 }}>
                                <Typography variant="h6">Number of Orders</Typography>
                                <ResponsiveContainer width="156%" height={320}>
                                    <BarChart data={barData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month"
                                            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                            domain={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                                        />
                                        <YAxis
                                            tickFormatter={(value) => `${value}`}
                                            ticks={[0, 5, 10, 15, 20, 25]}
                                            domain={[0, 25]}
                                        />
                                        <Tooltip />
                                        <Bar dataKey="monthlyOrderCount" fill="#8884d8">

                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>


                        <Grid item xs={10} md={5} >
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
                        <Grid item xs={10} md={2}>
                            <Paper sx={{ paddingBottom: 8.6, textAlign: 'center', marginTop: -1 }}>
                                <Typography variant="h6" fontWeight="300" color="red" sx={{ marginTop: 1 }}>Notes</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={4} md={2}>
                                        <Box sx={{ marginLeft: 4, padding: 1, backgroundColor: '#8884d8', borderRadius: 1 }}></Box>
                                    </Grid>
                                    <Grid item xs={4} md={2} sx={{ marginLeft: 6 }}>
                                        {Object.values(staffUsername).filter(staff => staff.role === "SALE_STAFF").map((staff) => (
                                            <Box key={staff.username} sx={{ textAlign: 'right' }}>
                                                {staff.username}
                                            </Box>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}

export default StaffPerformance;
