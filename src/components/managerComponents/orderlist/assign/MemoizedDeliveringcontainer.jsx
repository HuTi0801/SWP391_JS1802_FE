
import React, { memo, useState } from 'react'
import { Grid, List, ListItem, ListItemIcon, Typography, Divider, Box, Collapse, Link } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
const MemoizedDeliveringcontainer = memo(({ id }) => {
    const [openAssigned, setOpenAssigned] = useState(false);

    const handleClick = () => {
        setOpenAssigned(!openAssigned);
    };
    return (
        <Box sx={{ maxWidth: 240 }} >
            <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'left', marginTop: -10, borderRight: 1, borderColor: "lightgray" }}>
                    <Typography variant="h6">Diamond Shop</Typography>
                    <Typography variant="subtitle2">Workspace</Typography>
                </Box>
                <Divider />
                <List sx={{ borderRight: 1, borderColor: "lightgray", height: 600 }}>
                    <ListItem button s >
                        <ListItemIcon>
                            <HomeIcon sx={{ color: 'blue' }} />
                        </ListItemIcon>
                        <Link href="/managerorderlist" sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h6">Home</Typography>
                        </Link>
                    </ListItem>

                    <ListItem button sx={{ marginTop: 0 }}>
                        <ListItemIcon>
                            <LocalShippingIcon sx={{ color: 'orange' }} />
                        </ListItemIcon>
                        <Link href="/delivering" sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h6">Delivering</Typography>
                        </Link>
                    </ListItem>

                    <ListItem button onClick={handleClick} >
                        <ListItemIcon>
                            <AssignmentTurnedInIcon sx={{ color: 'black' }} />
                        </ListItemIcon>
                        <Typography variant="h6">Assigned</Typography>

                        {openAssigned ? <ExpandLess /> : <ExpandMore />}

                    </ListItem>

                    <Collapse in={openAssigned} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <PeopleIcon sx={{ color: 'purple', marginLeft: -2.2, marginBottom: 2 }} />
                                </ListItemIcon>
                                <Link href={`/deliveringassigned/${id}`}
                                    sx={{ textDecoration: 'none', color: 'inherit', marginLeft: -2, marginBottom: 2 }}>
                                    <Typography variant="body1">All Staff</Typography>
                                </Link>
                            </ListItem>

                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <AttachMoneyIcon sx={{ color: 'darkgreen', marginLeft: -2.2, marginBottom: 2 }} />
                                </ListItemIcon>
                                <Link href={`/saleStaffDelivering/${id}`}
                                    sx={{ textDecoration: 'none', color: 'inherit', marginLeft: -2, marginTop: -2 }}>
                                    <Typography variant="body1">Sale Staff</Typography>
                                </Link>
                            </ListItem>

                            <ListItem button sx={{ pl: 4 }}>
                                <ListItemIcon>
                                    <LocalShippingIcon sx={{ color: 'darkgreen', marginLeft: -2.2, marginBottom: 2 }} />
                                </ListItemIcon>
                                <Link href={`/deliveryStaffDelivering/${id}`}
                                    sx={{ textDecoration: 'none', color: 'inherit', marginLeft: -2.2, marginTop: -2 }}>
                                    <Typography variant="body1">Delivery Staff</Typography>
                                </Link>
                            </ListItem>

                        </List>
                    </Collapse>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon sx={{ color: 'teal' }} />
                        </ListItemIcon>
                        <Link href="/profile" sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h6">Account</Typography>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
            </Grid>
        </Box>
    );
});

export default MemoizedDeliveringcontainer;


