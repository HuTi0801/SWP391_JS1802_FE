
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../../redux/actions/productAction";
import ManagerHeader from "../../header/ManagerHeader";
import Functionbar from "../../functionbar/Functionbar";
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel, Button, Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const CreateDiamond = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [diamond, setDiamond] = useState({
        caratWeight: '0',
        certificateNumber: "",
        clarity: "",
        color: "",
        cut: "",
        imageDiamond: "",
        origin: "",
        price: '0',
        quantity: '0',
        statusDiamond: "",
        accountId: '0',
    });


    const handleChange = (e) => {
        setDiamond({ ...diamond, [e.target.name]: e.target.value });
    };

    const diamondAdd = () => {
        dispatch(createProduct(diamond));
        alert("Add Diamond successfully!!!!");
        navigate("/diamond");
    };

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>

                <Typography variant="h4" gutterBottom
                    sx={{ color: 'red', fontSize: 50, fontWeight: 'bold', fontStretch: 'expanded' }}>Create Diamond</Typography>
                <Box sx={{ width: '60%', backgroundColor: '#f7f7f7', padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                <InputLabel >Color</InputLabel>
                                <Select
                                    name="color"
                                    value={diamond.color}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Color</MenuItem>
                                    <MenuItem value="D">D</MenuItem>
                                    <MenuItem value="E">E</MenuItem>
                                    <MenuItem value="F">F</MenuItem>
                                    <MenuItem value="G">G</MenuItem>
                                    <MenuItem value="H">H</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                <InputLabel>Cut</InputLabel>
                                <Select
                                    name="cut"
                                    value={diamond.cut}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Cut</MenuItem>
                                    <MenuItem value="EX">EX</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Carat Weight"
                                name="caratWeight"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                <InputLabel>Clarity</InputLabel>
                                <Select
                                    name="clarity"
                                    value={diamond.clarity}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Clarity</MenuItem>
                                    <MenuItem value="VS2">VS2</MenuItem>
                                    <MenuItem value="VVS2">VVS2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                <InputLabel>Origin</InputLabel>
                                <Select
                                    name="origin"
                                    value={diamond.origin}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Origin</MenuItem>
                                    <MenuItem value="Natural diamond">Natural diamond</MenuItem>
                                    <MenuItem value="Artificial diamond (HPHT)">Artificial diamonds (HPHT)</MenuItem>
                                    <MenuItem value="Artificial diamond (CVD)">Artificial diamonds (CVD)</MenuItem>
                                </Select>
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


                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Account ID"
                                name="accountId"
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                <InputLabel>Status Diamond</InputLabel>
                                <Select
                                    name="statusDiamond"
                                    onChange={handleChange}
                                    value={diamond.statusDiamond}
                                >
                                    <MenuItem value="">Status Diamond</MenuItem>
                                    <MenuItem value="True">True</MenuItem>
                                    <MenuItem value="False">False</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Certificate Number"
                                name="certificateNumber"
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

                        <Grid item xs={12} md={9}>
                            <TextField
                                fullWidth
                                label="Image Diamond"
                                name="imageDiamond"
                                onChange={handleChange}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        sx={{ marginTop: 2, paddingBottom: 1, paddingTop: 1, paddingLeft: 5, paddingRight: 5, marginLeft: 50, backgroundColor: 'lightgray' }}
                        variant="contained"
                        onClick={diamondAdd}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default CreateDiamond;
