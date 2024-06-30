
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createDiamondShell } from "../../../../redux/actions/diamondShellAction";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';
import ManagerHeader from "../../header/ManagerHeader";
import Functionbar from "../../functionbar/Functionbar";
import { Grid, TextField, Select as MuiSelect, MenuItem, FormControl, InputLabel, Button, Box, Typography } from '@mui/material'; // Importing MUI components

const CreateDiamondShell = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [diamondShell, setDiamondShell] = useState({
        gender: "",
        imageDiamondShell: "",
        material: "",
        price: "0",
        quantity: "0",
        secondaryStoneType: "",
        statusDiamondShell: "",
        accountId: "0",
        sizeIds: [0]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiamondShell({ ...diamondShell, [name]: value });
    };

    const handleSizeChange = (selectedOptions) => {
        const sizeIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setDiamondShell({ ...diamondShell, sizeIds });
    };

    const diamondShellAdd = async () => {
        dispatch(createDiamondShell(diamondShell));
        alert("Add DiamondShell successfully!!!!");
        navigate("/diamondshell");
    };

    const [diamondShellSize, setDiamondShellSize] = useState([]);

    const fetchDiamondShellSize = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/size/get-all-size');
            return response.data.result;
        } catch (error) {
            console.error('Error fetching diamond shell Size info:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const diamondShellData = await fetchDiamondShellSize();
            if (diamondShellData) {
                setDiamondShellSize(diamondShellData);
            }
        };
        fetchData();
    }, []);

    const options = diamondShellSize.map((diamondShell_sizeid) => ({
        value: diamondShell_sizeid.id,
        label: diamondShell_sizeid.size,
    }));

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
                <Typography variant="h4" gutterBottom
                    sx={{ color: 'red', fontSize: 50, fontWeight: 'bold', fontStretch: 'expanded' }}>Create DiamondShell</Typography>
                <Box sx={{ width: '60%', backgroundColor: '#f7f7f7', padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                <InputLabel>Gender</InputLabel>
                                <MuiSelect
                                    name="gender"
                                    value={diamondShell.gender}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Gender</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                </MuiSelect>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                <InputLabel>Material</InputLabel>
                                <MuiSelect
                                    name="material"
                                    value={diamondShell.material}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Material</MenuItem>
                                    <MenuItem value="Platinum 18K">Platinum 18K</MenuItem>
                                    <MenuItem value="Gold 14K">Gold 14K</MenuItem>
                                </MuiSelect>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Price"
                                name="price"
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Secondary Stone Type"
                                name="secondaryStoneType"
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Quantity"
                                name="quantity"
                                type="number"
                                inputProps={{ min: 0 }}
                                onChange={handleChange}
                            />
                        </Grid>



                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                <InputLabel>Status DiamondShell</InputLabel>
                                <MuiSelect
                                    name="statusDiamondShell"
                                    value={diamondShell.statusDiamondShell}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Status DiamondShell</MenuItem>
                                    <MenuItem value="True">True</MenuItem>
                                    <MenuItem value="False">False</MenuItem>
                                </MuiSelect>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Account ID"
                                name="accountId"
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth sx={{ textAlign: 'center' }} >
                                <Select
                                    isMulti
                                    name="sizeIds"
                                    options={options}
                                    onChange={handleSizeChange}
                                    placeholder="Size"
                                />

                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={9}>
                            <TextField
                                fullWidth
                                label="Image"
                                name="imageDiamondShell"
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        sx={{ marginTop: 2, paddingBottom: 1, paddingTop: 1, paddingLeft: 5, paddingRight: 5, marginLeft: 50, backgroundColor: 'lightgray' }}
                        variant="contained"
                        onClick={diamondShellAdd}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default CreateDiamondShell;
