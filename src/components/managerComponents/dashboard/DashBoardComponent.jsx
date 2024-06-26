import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ManagerHeader from "../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../managerComponents/functionbar/Functionbar.jsx";
import SidebarMenu from './SidebarMenu.jsx';
const barData = [
    { name: 'Jan', uv: 4000 },
    { name: 'Feb', uv: 3000 },
    { name: 'Mar', uv: 2000 },
    { name: 'Apr', uv: 2780 },
    { name: 'May', uv: 1890 },
    { name: 'Jun', uv: 2390 },
    { name: 'Jul', uv: 3490 },
    { name: 'Aug', uv: 2000 },
    { name: 'Sep', uv: 2780 },
    { name: 'Oct', uv: 1890 },
    { name: 'Nov', uv: 3490 },
    { name: 'Dec', uv: 4000 },
];

const pieData = [
    { name: 'Desktop', value: 400 },
    { name: 'Tablet', value: 300 },
    { name: 'Phone', value: 300 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const DashBoardComponent = () => {

    return (

        <>
            <ManagerHeader />
            <Functionbar />
            <Box sx={{ display: 'flex' }}>
                <SidebarMenu />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                    <Grid container spacing={2} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h6">BUDGET</Typography>
                                <Typography variant="h4">$24k</Typography>
                                <Typography variant="body2" color="success.main">↑ 12% Since last month</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h6">TOTAL CUSTOMERS</Typography>
                                <Typography variant="h4">1.6k</Typography>
                                <Typography variant="body2" color="error.main">↓ 16% Since last month</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h6">TASK PROGRESS</Typography>
                                <Typography variant="h4">75.5%</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h6">TOTAL PROFIT</Typography>
                                <Typography variant="h4">$15k</Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h6">Sales</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={barData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="uv" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper sx={{ padding: 2 }}>
                                <Typography variant="h6">Traffic Source</Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </>

    )
}

export default DashBoardComponent