import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { Grid, TextField, FormControl, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import ManagerHeader from "../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../managerComponents/functionbar/Functionbar.jsx";
import "../../../pages/managerPages/promotion/Promotion.css"
import PromotionSidebarMenu from "./PromotionSidebarMenu.jsx"
import { useFormik } from 'formik';
import * as yup from 'yup';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const CreatePromotion = () => {
    const navigate = useNavigate();
    const [diamonds, setDiamonds] = useState([]);
    const [diamondShells, setDiamondShells] = useState([]);
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchDiamonds = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/diamond/get-diamond-names', {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                setDiamonds(response.data);
            } catch (error) {
                console.error('Error fetching diamond names:', error);
            }
        };

        const fetchDiamondShells = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/diamond-shell/get-diamond-shell-names', {
                    headers: { Authorization: `Bearer ${authToken}` }
                });
                setDiamondShells(response.data);
            } catch (error) {
                console.error('Error fetching diamond shell names:', error);
            }
        };

        fetchDiamonds();
        fetchDiamondShells();
    }, [authToken]);

    const options_Type = [
        { value: "DIAMOND", label: "DIAMOND" },
        { value: "DIAMOND_SHELL", label: "DIAMOND_SHELL" }
    ];

    const options_MemberLevel = [
        { value: "Silver", label: "SILVER" },
        { value: "Gold", label: "GOLD" },
        { value: "Platinum", label: "PLATINUM" },
        { value: "Diamond", label: "DIAMOND" },
        { value: "Private", label: "PRIVATE" }
    ];

    const diamondOptions = diamonds.map((diamond) => ({ value: diamond, label: diamond }));
    const diamondShellOptions = diamondShells.map((shell) => ({ value: shell, label: shell }));
    const productOptions = [...diamondOptions, ...diamondShellOptions];

    const formik = useFormik({
        initialValues: {
            promotionName: '',
            description: '',
            discountPercent: '',
            startDate: null,
            endDate: null,
            memberLevels: [],
            types: [],
            productNames: []
        },
        validationSchema: yup.object({
            promotionName: yup.string().required("Promotion Name is required"),
            description: yup.string().required("Description is required"),
            discountPercent: yup.number().required("Discount Percent is required").min(0).max(100),
            startDate: yup.date().nullable().required("Start Date is required"),
            endDate: yup.date().nullable().required("End Date is required").min(yup.ref('startDate'), "End Date can't be before Start Date"),
            memberLevels: yup.array().of(yup.string().required()).min(1, "Please select at least one Type is required"),
            types: yup.array().of(yup.string().required()).min(1, "Please select at least one Member Level is required"),
            productNames: yup.array().of(yup.string().required()).min(1, "Please select at least one Product Name is required")
        }),
        onSubmit: async (values) => {
            try {
                const promotionName = `promotionName=${encodeURIComponent(values.promotionName.trim())}`;
                const description = `description=${encodeURIComponent(values.description.trim())}`;
                const discountPercent = `discountPercent=${encodeURIComponent(values.discountPercent.trim())}`;
                const startDate = `startDate=${encodeURIComponent(formatDate(values.startDate))}`;
                const endDate = `endDate=${encodeURIComponent(formatDate(values.endDate))}`;

                const memberLevels = values.memberLevels.map(level => `memberLevels=${encodeURIComponent(level.trim())}`).join('&');
                const types = values.types.map(type => `types=${encodeURIComponent(type.trim())}`).join('&');
                const productNames = values.productNames.map(name => `productNames=${encodeURIComponent(name.trim())}`).join('&');

                const response = await axios.post(`http://localhost:8080/auth/promotion/add?${promotionName}&${description}&${discountPercent}&${startDate}&${endDate}&${memberLevels}&${types}&${productNames}`, null, {
                    headers: { Authorization: `Bearer ${authToken}` }
                });

                if (response.data.isSuccess) {
                    alert("Add Promotion successfully!!!");
                    navigate("/promotion");
                } else {
                    console.error('Failed to add promotion:', response.data.message);
                }
            } catch (error) {
                console.error('Error adding promotion:', error);
                alert("Error adding promotion");
            }
        }
    });

    const formatDate = (date) => {
        if (!date) return null;
        const day = (`0${date.getDate()}`).slice(-2);
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <PromotionSidebarMenu />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -95 }}>
                <Typography variant="h4" gutterBottom sx={{ color: 'red', fontSize: 50, fontWeight: 'bold' }}>Create Promotion</Typography>
                <Box sx={{ width: '60%', backgroundColor: '#f7f7f7', padding: 3, borderRadius: 2, boxShadow: 3 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Promotion Name"
                                    name="promotionName"
                                    value={formik.values.promotionName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.promotionName && formik.errors.promotionName && <div className="create-validation-promotionName">{formik.errors.promotionName}</div>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.description && formik.errors.description && <div className="create-validation-description">{formik.errors.description}</div>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Discount Percent"
                                    name="discountPercent"
                                    value={formik.values.discountPercent}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.discountPercent && formik.errors.discountPercent && <div className="create-validation-discountPercent">{formik.errors.discountPercent}</div>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                    <Select
                                        isMulti
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                width: '100%',
                                                height: '56px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                padding: '0 5px',
                                            }),
                                            multiValue: (base) => ({
                                                ...base,
                                                backgroundColor: '#e0e0e0',
                                                borderRadius: '2px',
                                            }),
                                            multiValueLabel: (base) => ({
                                                ...base,
                                                color: '#333',
                                            }),
                                            multiValueRemove: (base) => ({
                                                ...base,
                                                color: '#333',
                                                ':hover': {
                                                    backgroundColor: '#ccc',
                                                    color: '#000',
                                                },
                                            }),
                                        }}
                                        options={options_MemberLevel}
                                        onChange={selectedOptions => formik.setFieldValue('memberLevels', selectedOptions.map(option => option.value))}
                                        onBlur={() => formik.setFieldTouched('memberLevels', true)}
                                        name="memberLevels"
                                        placeholder="Member Level"
                                        value={options_MemberLevel.filter(option => formik.values.memberLevels.includes(option.value))}
                                    />
                                    {formik.touched.memberLevels && formik.errors.memberLevels && <div className="create-validation-memberLevels">{formik.errors.memberLevels}</div>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <DatePicker
                                    selected={formik.values.startDate}
                                    wrapperClassName="STARTDATE"
                                    onChange={date => formik.setFieldValue('startDate', date)}
                                    onBlur={() => formik.setFieldTouched('startDate', true)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="DD/MM/YYYY"
                                    customInput={
                                        <TextField
                                            label="Started Date"
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton>
                                                            <CalendarMonthIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    }
                                />
                                {formik.touched.startDate && formik.errors.startDate && <div className="create-validation-startDate">{formik.errors.startDate}</div>}
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <DatePicker
                                    selected={formik.values.endDate}
                                    wrapperClassName="ENDDATE"
                                    onChange={date => formik.setFieldValue('endDate', date)}
                                    onBlur={() => formik.setFieldTouched('endDate', true)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="DD/MM/YYYY"
                                    customInput={
                                        <TextField
                                            label="Ended Date"
                                            fullWidth
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton>
                                                            <CalendarMonthIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    }
                                />
                                {formik.touched.endDate && formik.errors.endDate && <div className="create-validation-endDate">{formik.errors.endDate}</div>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                    <Select
                                        isMulti
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                width: '100%',
                                                height: '56px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                padding: '0 5px',
                                            }),
                                            multiValue: (base) => ({
                                                ...base,
                                                backgroundColor: '#e0e0e0',
                                                borderRadius: '2px',
                                            }),
                                            multiValueLabel: (base) => ({
                                                ...base,
                                                color: '#333',
                                            }),
                                            multiValueRemove: (base) => ({
                                                ...base,
                                                color: '#333',
                                                ':hover': {
                                                    backgroundColor: '#ccc',
                                                    color: '#000',
                                                },
                                            }),
                                        }}
                                        options={options_Type}
                                        onChange={selectedOptions => formik.setFieldValue('types', selectedOptions.map(option => option.value))}
                                        onBlur={() => formik.setFieldTouched('types', true)}
                                        name="types"
                                        placeholder="Type"
                                        value={options_Type.filter(option => formik.values.types.includes(option.value))}
                                    />
                                    {formik.touched.types && formik.errors.types && <div className="create-validation-types">{formik.errors.types}</div>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                    <Select
                                        isMulti
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                width: '100%',
                                                height: '56px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                padding: '0 5px',
                                            }),
                                            multiValue: (base) => ({
                                                ...base,
                                                backgroundColor: '#e0e0e0',
                                                borderRadius: '2px',
                                            }),
                                            multiValueLabel: (base) => ({
                                                ...base,
                                                color: '#333',
                                            }),
                                            multiValueRemove: (base) => ({
                                                ...base,
                                                color: '#333',
                                                ':hover': {
                                                    backgroundColor: '#ccc',
                                                    color: '#000',
                                                },
                                            }),
                                        }}
                                        options={productOptions}
                                        onChange={selectedOptions => formik.setFieldValue('productNames', selectedOptions.map(option => option.value))}
                                        onBlur={() => formik.setFieldTouched('productNames', true)}
                                        name="productNames"
                                        placeholder="Product Name"
                                        value={productOptions.filter(option => formik.values.productNames.includes(option.value))}

                                    />
                                    {formik.touched.productNames && formik.errors.productNames && <div className="create-validation-productNames">{formik.errors.productNames}</div>}
                                </FormControl>
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

export default CreatePromotion;
