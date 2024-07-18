
import React, { useState } from "react";
import ManagerHeader from "../../header/ManagerHeader";
import Functionbar from "../../functionbar/Functionbar";
import axios from 'axios';
import { Grid, TextField, Select, MenuItem, FormControl, InputLabel, Button, Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from "yup";
import "./Diamond.css"
import DiamondSidebarMenu from "./DiamondSidebarMenu.jsx"
const CreateDiamond = () => {

    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');

    const formik = useFormik({
        initialValues: {
            caratWeight: '',
            certificateNumber: "",
            clarity: "",
            color: "",
            cut: "",
            imageDiamond: "",
            origin: "",
            price: '',
            quantity: '',
            statusDiamond: "",
            accountId: 1,
        },
        validationSchema: yup.object({
            caratWeight: yup.number().required("Please enter carat weight").min(0, "Carat weight cannot be negative"),
            certificateNumber: yup.string().required("Please enter certificate number")
                .matches(/^GIA\d{10}$/, "Please enter a valid Certificate Number (GIA followed by 10 digits)"),
            clarity: yup.string().required("Please select clarity"),
            color: yup.string().required("Please select color"),
            cut: yup.string().required("Please select cut"),
            imageDiamond: yup.string().required("Please enter image URL").url("Please enter a valid URL"),
            origin: yup.string().required("Please select origin"),
            price: yup.number().required("Please enter price").min(1000000, "Price cannot be less than 1M(VND)").max(2000000000, "Price cannot be greater than 2B(VND)"),
            quantity: yup.number().required("Please enter quantity").min(1, "Quantity cannot be less than 1"),
            statusDiamond: yup.string().required("Please select status"),
            accountId: yup.number().required("Please enter account ID").min(1, "Account ID cannot be less than 1"),
        }),
        onSubmit: async (values) => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post(`http://localhost:8080/auth/diamond/create-diamond`, values, config);
                if (response.data.isSuccess) {
                    alert("Add Diamond successfully!!!!");
                    navigate("/diamond");
                }
            } catch (error) {
                console.error('Error creating diamond', error);
                alert("Error creating diamond");
            }
        }
    });

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <DiamondSidebarMenu />
            <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -95 }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: 'red', fontSize: 50, fontWeight: 'bold', fontStretch: 'expanded' }}
                >
                    Create Diamond
                </Typography>
                <Box sx={{ width: '60%', backgroundColor: '#f7f7f7', padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                    <InputLabel>Color</InputLabel>
                                    <Select
                                        name="color"
                                        value={formik.values.color}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <MenuItem value="">Color</MenuItem>
                                        <MenuItem value="D">D</MenuItem>
                                        <MenuItem value="E">E</MenuItem>
                                        <MenuItem value="F">F</MenuItem>
                                        <MenuItem value="G">G</MenuItem>
                                        <MenuItem value="H">H</MenuItem>
                                    </Select>
                                    {formik.touched.color && formik.errors.color && <div className="create-validation-color">{formik.errors.color}</div>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                    <InputLabel>Cut</InputLabel>
                                    <Select
                                        name="cut"
                                        value={formik.values.cut}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <MenuItem value="">Cut</MenuItem>
                                        <MenuItem value="EX">EX</MenuItem>
                                    </Select>
                                    {formik.touched.cut && formik.errors.cut && <div className="create-validation-cut">{formik.errors.cut}</div>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Carat Weight"
                                    name="caratWeight"
                                    value={formik.values.caratWeight}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.caratWeight && formik.errors.caratWeight && <div className="create-validation-caratWeight">{formik.errors.caratWeight}</div>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                    <InputLabel>Clarity</InputLabel>
                                    <Select
                                        name="clarity"
                                        value={formik.values.clarity}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <MenuItem value="">Clarity</MenuItem>
                                        <MenuItem value="IF">IF</MenuItem>
                                        <MenuItem value="VS1">VS1</MenuItem>
                                        <MenuItem value="VSS1">VSS1</MenuItem>
                                        <MenuItem value="VS2">VS2</MenuItem>
                                        <MenuItem value="VVS2">VVS2</MenuItem>
                                    </Select>
                                    {formik.touched.clarity && formik.errors.clarity && <div className="create-validation-clarity">{formik.errors.clarity}</div>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                    <InputLabel>Origin</InputLabel>
                                    <Select
                                        name="origin"
                                        value={formik.values.origin}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <MenuItem value="">Origin</MenuItem>
                                        <MenuItem value="Natural diamond">Natural diamond</MenuItem>
                                        <MenuItem value="Artificial diamond (HPHT)">Artificial diamond (HPHT)</MenuItem>
                                        <MenuItem value="Artificial diamond (CVD)">Artificial diamond (CVD)</MenuItem>
                                    </Select>
                                    {formik.touched.origin && formik.errors.origin && <div className="create-validation-origin">{formik.errors.origin}</div>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.price && formik.errors.price && <div className="create-validation-price ">{formik.errors.price}</div>}
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Account ID"
                                    name="accountId"
                                    value={formik.values.accountId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.accountId && formik.errors.accountId && <div className="create-validation-accountId ">{formik.errors.accountId}</div>}
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                    <InputLabel>Status Diamond</InputLabel>
                                    <Select
                                        name="statusDiamond"
                                        value={formik.values.statusDiamond}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <MenuItem value="">Status Diamond</MenuItem>
                                        <MenuItem value="True">True</MenuItem>
                                        <MenuItem value="False">False</MenuItem>
                                    </Select>
                                    {formik.touched.statusDiamond && formik.errors.statusDiamond && <div className="create-validation-statusDiamond">{formik.errors.statusDiamond}</div>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Certificate Number"
                                    name="certificateNumber"
                                    value={formik.values.certificateNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.certificateNumber && formik.errors.certificateNumber && <div className="create-validation-certificateNumber ">{formik.errors.certificateNumber}</div>}
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Quantity"
                                    name="quantity"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.quantity && formik.errors.quantity && <div className="create-validation-quantity">{formik.errors.quantity}</div>}
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <TextField
                                    fullWidth
                                    label="Image Diamond"
                                    name="imageDiamond"
                                    value={formik.values.imageDiamond}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.imageDiamond && formik.errors.imageDiamond && <div className="create-validation-imageDiamond">{formik.errors.imageDiamond}</div>}
                            </Grid>
                        </Grid>
                        <Button
                            sx={{
                                marginTop: 2, paddingBottom: 1, paddingTop: 1, paddingLeft: 5,
                                paddingRight: 5, marginLeft: 50, backgroundColor: 'white',
                                color: "black", fontWeight: "bold", borderColor: "black", borderStyle: "solid",
                                border: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 106, 255, 0.934)',
                                    color: 'red',
                                    borderColor: "black",
                                    borderStyle: "solid",
                                    border: "1"
                                }
                            }}
                            variant="contained"
                            type="submit"
                        >
                            Add
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default CreateDiamond;
