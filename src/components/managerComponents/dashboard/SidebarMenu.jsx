import React, { useState } from 'react';
import { Grid, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Box, Collapse, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';

const SidebarMenu = () => {
    const [openOverview, setOpenOverview] = useState(false);

    const handleClick = () => {
        setOpenOverview(!openOverview);
    };

    return (
        <Box>
            <Grid item xs={12} md={3}>
                <Box sx={{ overflow: 'auto', textAlign: 'center', p: 2 }}>
                    <Typography variant="h6">Diamond Shop</Typography>
                    <Typography variant="subtitle2">Workspace</Typography>
                </Box>
                <Divider />
                <List>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Overview" />
                        {openOverview ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openOverview} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <CheckCircleIcon />
                                </ListItemIcon>
                                <Link href="/confirmedRevenue" sx={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="body2">Confirmed</Typography>
                                </Link>
                            </ListItem>
                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <LocalShippingIcon />
                                </ListItemIcon>
                                <Link href="/deliveringRevenue" sx={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="body2">Delivering</Typography>
                                </Link>
                            </ListItem>
                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <DoneIcon />
                                </ListItemIcon>
                                <Link href="/deliveredRevenue" sx={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="body2">Delivered</Typography>
                                </Link>
                            </ListItem>
                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <CancelIcon />
                                </ListItemIcon>
                                <Link href="/cancelRevenue" sx={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography variant="body2">Cancel</Typography>
                                </Link>
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <Link href="/staffPerformance" sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="body2">Staff</Typography>
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <Link href="/profile" sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="body2">Account</Typography>
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ErrorIcon />
                        </ListItemIcon>
                        <ListItemText primary="Error" />
                    </ListItem>
                </List>
                <Divider />
            </Grid>
        </Box>
    );
};

export default SidebarMenu;