import React from 'react';
import { Box, List, Grid, ListItem, ListItemIcon, Divider, Typography, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DoneIcon from '@mui/icons-material/Done';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import "../OrderListPage.css";
const ListofStatus = () => {
    return (

        <Box className='ListofStatusContainer'>
            <hr className="vertical-line" />
            <Box sx={{ maxWidth: 300, textAlign: 'left' }}>
                <Grid item xs={12} md={3}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6">Diamond Shop</Typography>
                        <Typography variant="subtitle2">Workspace</Typography>
                    </Box>
                    <Divider />
                    <List>
                        <ListItem button sx={{ marginBottom: 1 }}>
                            <ListItemIcon>
                                <HomeIcon sx={{ color: 'blue' }} />
                            </ListItemIcon>
                            <Link href="/managerorderlist" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant="h6">All</Typography>
                            </Link>
                        </ListItem>
                        <ListItem button sx={{ marginBottom: 1 }}>
                            <ListItemIcon>
                                <PendingIcon sx={{ color: 'orange' }} />
                            </ListItemIcon>
                            <Link href="/pending" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant="h6">Pending</Typography>
                            </Link>
                        </ListItem>
                        <ListItem button sx={{ marginBottom: 1 }}>
                            <ListItemIcon>
                                <AssignmentTurnedInIcon sx={{ color: 'green' }} />
                            </ListItemIcon>
                            <Link href="/confirm" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant="h6">Confirm</Typography>
                            </Link>
                        </ListItem>
                        <ListItem button sx={{ marginBottom: 1 }}>
                            <ListItemIcon>
                                <LocalShippingIcon sx={{ color: 'purple' }} />
                            </ListItemIcon>
                            <Link href="/delivering" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant="h6">Delivering</Typography>
                            </Link>
                        </ListItem>
                        <ListItem button sx={{ marginBottom: 1 }}>
                            <ListItemIcon>
                                <DoneIcon sx={{ color: 'darkgreen' }} />
                            </ListItemIcon>
                            <Link href="/delivered" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant="h6">Delivered</Typography>
                            </Link>
                        </ListItem>
                        <ListItem button sx={{ marginBottom: 1 }}>
                            <ListItemIcon>
                                <CancelIcon sx={{ color: 'red' }} />
                            </ListItemIcon>
                            <Link href="/canceled" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant="h6">Canceled</Typography>
                            </Link>
                        </ListItem>
                        <Divider />
                    </List>
                </Grid>
            </Box>
        </Box>
    );
};

export default ListofStatus;
