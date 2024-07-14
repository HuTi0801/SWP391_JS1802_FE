import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, Grid, ListItem, ListItemIcon, Divider, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./PromotionInfoDetails.css"
const PromotionSidebarMenu = () => {

    return (
        <Box className='PromotionSidebarMenu'>
            <hr className="Promotion-vertical-line" />
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
                            <Link to="/promotion" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant="h6">Home</Typography>
                            </Link>
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <AccountCircleIcon sx={{ color: 'teal' }} />
                            </ListItemIcon>
                            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Typography variant="h6">Account</Typography>
                            </Link>
                        </ListItem>
                        <Divider />

                    </List>
                </Grid>
            </Box>
        </Box>
    );

}

export default PromotionSidebarMenu