
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import axios from 'axios';
import ManagerHeader from "../../header/ManagerHeader";
import Functionbar from "../../functionbar/Functionbar";
import {
    Grid, TextField, Select as MuiSelect, MenuItem,
    FormControl, InputLabel, Button, Box, Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import "./Diamondshell.css"
import DiamondShellSidebarMenu from "./DiamondShellSidebarMenu.jsx"
const CreateDiamondShell = () => {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');
    const [diamondShellSize, setDiamondShellSize] = useState([]);

    const fetchDiamondShellSize = async () => {
        try {
            const response = await axios.get('http://localhost:8080/auth/size/get-all-size', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
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

    const options = diamondShellSize.map((size) => ({
        value: size.id,
        label: size.size,
    }));



    const formik = useFormik({
        initialValues: {
            gender: "",
            imageDiamondShell: "",
            material: "",
            price: "",
            quantity: "",
            secondaryStoneType: "",
            statusDiamondShell: "",
            accountId: 1,
            sizeIds: [],
        },
        validationSchema: yup.object({
            gender: yup.string().required("Please select gender"),
            material: yup.string().required("Please select material"),
            price: yup.number().required("Please enter price").min(0),
            quantity: yup.number().required("Please enter quantity").min(0),
            secondaryStoneType: yup.string().required("Please enter secondary stone type"),
            statusDiamondShell: yup.string().required("Please select status"),
            accountId: yup.number().required("Please enter account ID").min(0),
            sizeIds: yup.array().of(yup.number().required()).min(1, "Please select at least one size"),
            imageDiamondShell: yup.string().required("Please enter image URL").url("Please enter a valid URL"),
        }),
        onSubmit: async (values) => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post(`http://localhost:8080/auth/diamond-shell/create-diamond-shell`, values, config);
                if (response.data.isSuccess) {
                    alert("Add DiamondShell successfully!!!!");
                    navigate("/diamondshell");
                }
            } catch (error) {
                console.error('Error creating diamond shell', error);
                alert("Error creating diamond shell");
            }
        },
    });

    const handleSizeChange = (selectedOptions) => {
        const sizeIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
        formik.setFieldValue('sizeIds', sizeIds);
    };

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <DiamondShellSidebarMenu />
            <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -95 }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: 'red', fontSize: 50, fontWeight: 'bold', fontStretch: 'expanded' }}
                >
                    Create DiamondShell
                </Typography>
                <Box sx={{ width: '60%', backgroundColor: '#f7f7f7', padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                    <InputLabel>Gender</InputLabel>
                                    <MuiSelect
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <MenuItem value="">Gender</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="male">Male</MenuItem>
                                    </MuiSelect>
                                    {formik.touched.gender && formik.errors.gender && <div className="create-validation-gender">{formik.errors.gender}</div>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                    <InputLabel>Material</InputLabel>
                                    <MuiSelect
                                        name="material"
                                        value={formik.values.material}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <MenuItem value="">Material</MenuItem>
                                        <MenuItem value="Platinum 14K">Platinum 14K</MenuItem>
                                        <MenuItem value="Platinum 18K">Platinum 18K</MenuItem>
                                        <MenuItem value="Gold 14K">Gold 14K</MenuItem>
                                        <MenuItem value="Gold 18K">Gold 18K</MenuItem>
                                    </MuiSelect>
                                    {formik.touched.material && formik.errors.material && <div className="create-validation-material">{formik.errors.material}</div>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.price && formik.errors.price && <div className="create-validation-price">{formik.errors.price}</div>}
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Secondary Stone Type"
                                    name="secondaryStoneType"
                                    value={formik.values.secondaryStoneType}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.secondaryStoneType && formik.errors.secondaryStoneType && <div className="create-validation-secondaryStoneType">{formik.errors.secondaryStoneType}</div>}
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

                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                    <InputLabel>Status DiamondShell</InputLabel>
                                    <MuiSelect
                                        name="statusDiamondShell"
                                        value={formik.values.statusDiamondShell}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <MenuItem value="">Status DiamondShell</MenuItem>
                                        <MenuItem value="True">True</MenuItem>
                                        <MenuItem value="False">False</MenuItem>
                                    </MuiSelect>
                                    {formik.touched.statusDiamondShell && formik.errors.statusDiamondShell && <div className="create-validation-statusDiamondShell">{formik.errors.statusDiamondShell}</div>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Account ID"
                                    name="accountId"
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    value={formik.values.accountId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.accountId && formik.errors.accountId && <div className="create-validation-accountId">{formik.errors.accountId}</div>}
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                    <Select
                                        isMulti
                                        name="sizeIds"
                                        options={options}
                                        onChange={handleSizeChange}
                                        onBlur={() => formik.setFieldTouched('sizeIds', true)}
                                        placeholder="Size"
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                width: '100%',
                                                height: '56px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                            }),
                                        }}
                                    />
                                    {formik.touched.sizeIds && formik.errors.sizeIds && (
                                        <div className="create-validation-size">{formik.errors.sizeIds}</div>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} md={9}>
                                <TextField
                                    fullWidth
                                    label="Image"
                                    name="imageDiamondShell"
                                    value={formik.values.imageDiamondShell}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.imageDiamondShell && formik.errors.imageDiamondShell && <div className="create-validation-imageDiamondShell">{formik.errors.imageDiamondShell}</div>}
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

export default CreateDiamondShell;
