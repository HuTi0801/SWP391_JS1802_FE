import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, ListItem, ListItemIcon, Typography, Divider, Box, Collapse } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const SidebarMenu = () => {
    const [openStatus, setOpenStatus] = useState(false);
    const [openStaff, setOpenStaff] = useState(false);

    const handleStatusClick = () => {
        setOpenStatus(!openStatus);
    };

    const handleStaffClick = () => {
        setOpenStaff(!openStaff);
    };

    return (
        <Box sx={{ width: 200 }}>
            <Grid item xs={12} md={3}>
                <Box sx={{ overflow: 'auto', textAlign: 'center', padding: 3 }}>
                    <Typography variant="h6">Diamond Shop</Typography>
                    <Typography variant="subtitle2">Workspace</Typography>
                </Box>
                <Divider />
                <List>
                    <ListItem button onClick={handleStatusClick}>
                        <ListItemIcon>
                            <HomeIcon sx={{ color: 'blue' }} />
                        </ListItemIcon>
                        <Typography variant="h6">Status</Typography>
                        {openStatus ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openStatus} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <PendingIcon sx={{ color: 'lightgrey' }} />
                                </ListItemIcon>
                                <Link to="/pendingRevenue" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="body2">Pending</Typography>
                                </Link>
                            </ListItem>

                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <CheckCircleIcon sx={{ color: 'green' }} />
                                </ListItemIcon>
                                <Link to="/confirmedRevenue" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="body2">Confirmed</Typography>
                                </Link>
                            </ListItem>

                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <LocalShippingIcon sx={{ color: 'orange' }} />
                                </ListItemIcon>
                                <Link to="/deliveringRevenue" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="body2">Delivering</Typography>
                                </Link>
                            </ListItem>

                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <DoneIcon sx={{ color: 'blue' }} />
                                </ListItemIcon>
                                <Link to="/deliveredRevenue" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="body2">Delivered</Typography>
                                </Link>
                            </ListItem>

                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <CancelIcon sx={{ color: 'red' }} />
                                </ListItemIcon>
                                <Link to="/cancelRevenue" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="body2">Cancel</Typography>
                                </Link>
                            </ListItem>

                        </List>
                    </Collapse>
                    <Divider />
                    <ListItem button onClick={handleStaffClick}>
                        <ListItemIcon>
                            <PeopleIcon sx={{ color: 'purple' }} />
                        </ListItemIcon>
                        <Typography variant="h6">Staff</Typography>
                        {openStaff ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>

                    <Collapse in={openStaff} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <AttachMoneyIcon sx={{ color: 'darkgreen' }} />
                                </ListItemIcon>
                                <Link to="/salestaffPerformance" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="body2">Sale Staff</Typography>
                                </Link>
                            </ListItem>
                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <LocalShippingIcon sx={{ color: 'darkgreen' }} />
                                </ListItemIcon>
                                <Link to="/deliverystaffPerformance" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="body2">Delivery Staff</Typography>
                                </Link>
                            </ListItem>
                        </List>
                    </Collapse>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon sx={{ color: 'teal' }} />
                        </ListItemIcon>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h6">Account</Typography>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
            </Grid>
        </Box>
    );
};

export default SidebarMenu;