import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import { Grid, TextField, FormControl, InputLabel, Button, Box, Typography } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import ManagerHeader from "../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../managerComponents/functionbar/Functionbar.jsx";
import "../../../pages/managerPages/promotion/Promotion.css"

const CreatePromotion = () => {
    const navigate = useNavigate();
    const [diamonds, setDiamonds] = useState([]);
    const [diamondShells, setDiamondShells] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [promotionData, setPromotionData] = useState({
        promotionName: "",
        description: "",
        discountPercent: "",
        startDate: null,
        endDate: null,
        memberLevels: [],
        types: [],
        productNames: []
    });

    useEffect(() => {
        const fetchDiamonds = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/diamond/get-diamond-names');
                setDiamonds(response.data);
            } catch (error) {
                console.error('Error fetching diamond names:', error);
            }
        };

        const fetchDiamondShells = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/diamond-shell/get-diamond-shell-names');
                setDiamondShells(response.data);
            } catch (error) {
                console.error('Error fetching diamond shell names:', error);
            }
        };

        fetchDiamonds();
        fetchDiamondShells();
    }, []);

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

    const diamondOptions = diamonds.map((diamond) => ({
        value: diamond,
        label: diamond
    }));

    const diamondShellOptions = diamondShells.map((shell) => ({
        value: shell,
        label: shell
    }));

    const productOptions = [...diamondOptions, ...diamondShellOptions];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromotionData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (selectedOptions, actionMeta) => {
        const { name } = actionMeta;
        setPromotionData(prevState => ({
            ...prevState,
            [name]: selectedOptions.map(option => option.value)
        }));
    };

    const handleProductSelectChange = (selectedOptions) => {
        setSelectedProducts(selectedOptions);
        setPromotionData(prevState => ({
            ...prevState,
            productNames: selectedOptions.map(option => option.value)
        }));
    };

    const handleStartDateChange = (date) => {
        setPromotionData(prevState => ({
            ...prevState,
            startDate: date
        }));
    };

    const handleEndDateChange = (date) => {
        setPromotionData(prevState => ({
            ...prevState,
            endDate: date
        }));
    };

    const formatDate = (date) => {
        if (!date) return null;
        const day = (`0${date.getDate()}`).slice(-2);
        const month = (`0${date.getMonth() + 1}`).slice(-2); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const PromotionAdd = async () => {
        try {
            const promotionName = `promotionName=${encodeURIComponent(promotionData.promotionName.trim())}`;
            const description = `description=${encodeURIComponent(promotionData.description.trim())}`;
            const discountPercent = `discountPercent=${encodeURIComponent(promotionData.discountPercent.trim())}`;
            const startDate = `startDate=${encodeURIComponent(formatDate(promotionData.startDate))}`;
            const endDate = `endDate=${encodeURIComponent(formatDate(promotionData.endDate))}`;

            const memberLevels = promotionData.memberLevels.map(level => `memberLevels=${encodeURIComponent(level.trim())}`).join('&');
            const types = promotionData.types.map(type => `types=${encodeURIComponent(type.trim())}`).join('&');
            const productNames = promotionData.productNames.map(name => `productNames=${encodeURIComponent(name.trim())}`).join('&');

            const url = `http://localhost:8080/auth/promotion/add?${promotionName}&${description}&${discountPercent}&${startDate}&${endDate}&${memberLevels}&${types}&${productNames}`;

            const response = await axios.post(url);

            if (response.data.isSuccess) {
                alert("Add Promotion successfully!!!");
                navigate("/promotion");
            } else {
                console.error('Failed to add promotion:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding promotion:', error);
        }
    };

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
                <Typography variant="h4" gutterBottom
                    sx={{ color: 'red', fontSize: 50, fontWeight: 'bold', fontStretch: 'expanded' }}>Create Promotion</Typography>
                <Box sx={{ width: '60%', backgroundColor: '#f7f7f7', padding: 3, borderRadius: 2, boxShadow: 3, height: 320 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Promotion Name"
                                name="promotionName"
                                value={promotionData.promotionName}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={promotionData.description}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Discount Percent"
                                name="discountPercent"
                                value={promotionData.discountPercent}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth sx={{ textAlign: 'center' }}>
                                <Select
                                    isMulti
                                    options={options_MemberLevel}
                                    onChange={handleSelectChange}
                                    name="memberLevels"
                                    placeholder="Member Level"
                                    value={options_MemberLevel.filter(option =>
                                        promotionData.memberLevels.includes(option.value)
                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={3} sx={{ marginTop: -1 }}>
                            <InputLabel sx={{ marginLeft: 8 }}>START DATE</InputLabel>
                            <Box sx={{ marginLeft: -1 }}>
                                <DatePicker
                                    selected={promotionData.startDate}
                                    onChange={handleStartDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    wrapperClassName="STARTDATE"
                                    placeholderText="dd/mm/yyyy"
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={3} sx={{ marginTop: -1 }}>
                            <InputLabel sx={{ marginLeft: 10 }}>END DATE</InputLabel>
                            <Box >
                                <DatePicker
                                    selected={promotionData.endDate}
                                    wrapperClassName="ENDDATE"
                                    onChange={handleEndDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="dd/mm/yyyy"

                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidt sx={{ textAlign: 'center', minWidth: 454 }}>
                                <Select
                                    isMulti
                                    options={options_Type}
                                    onChange={handleSelectChange}
                                    name="types"
                                    placeholder="Select type"
                                    value={options_Type.filter(option =>
                                        promotionData.types.includes(option.value)
                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12} >
                            <FormControl fullWidt sx={{ textAlign: 'center', minWidth: 926 }}>
                                <Select
                                    isMulti
                                    options={productOptions}
                                    onChange={handleProductSelectChange}
                                    name="productNames"
                                    placeholder=" Product Name"
                                    value={productOptions.filter(option =>
                                        promotionData.productNames.includes(option.value)
                                    )}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Button
                        sx={{ marginTop: 2, paddingBottom: 1, paddingTop: 1, paddingLeft: 5, paddingRight: 5, marginLeft: 50, backgroundColor: 'lightgray' }}
                        variant="contained"
                        className='PromotionAdd'
                        onClick={PromotionAdd}
                    >
                        Add
                    </Button>
                </Box>
            </Box >
        </>
    );
};

export default CreatePromotion;


