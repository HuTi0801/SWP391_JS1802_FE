

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from 'formik';
import * as yup from "yup";
import ManagerHeader from "../../header/ManagerHeader";
import Functionbar from "../../functionbar/Functionbar";
import {
    Grid,
    TextField,
    Button,
    Box,
    Typography,
} from "@mui/material";
import DiamondShellSidebarMenu from "./DiamondShellSidebarMenu.jsx"
const UpdateDiamondShell = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const authToken = localStorage.getItem('authToken');
    const [error, setError] = useState(null);

    const validationSchema = yup.object({
        material: yup.string().required("Please enter material"),
        secondaryStoneType: yup.string().required("Please enter secondary stone type"),
        quantity: yup.number().required("Please enter quantity").min(0, "Quantity cannot be negative"),
        price: yup.number().required("Please enter price").min(1000000, "Price cannot be less than 1M(VND)").max(2000000000, "Price cannot be greater than 2B(VND)"),
        gender: yup.string().required("Please enter gender"),
        statusDiamondShell: yup.string().required("Please enter status"),
        imageDiamondShell: yup.string().required("Please enter image URL").url("Please enter a valid URL"),
    });

    const formik = useFormik({
        initialValues: {
            gender: "male",
            imageDiamondShell: "",
            material: "",
            price: "0",
            quantity: "0",
            secondaryStoneType: "",
            statusDiamondShell: "true",
            accountId: 1,
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post(`http://localhost:8080/auth/diamond-shell/update-diamond-shell-${id}`, values, config);
                if (response.data.isSuccess) {
                    alert("Update DiamondShell successfully!!!!");
                    navigate("/diamondShellInfoDetails/" + id);
                }
            } catch (error) {
                setError(error.message);
                console.error('Error updating diamond shell', error);
            }
        }
    });

    useEffect(() => {
        const fetchDiamondShellDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/diamond-shell/get-a-diamond-shell-${id}`);
                formik.setValues(response.data.result);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDiamondShellDetails();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <DiamondShellSidebarMenu />
            <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -95 }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: "red", fontSize: 50, fontWeight: "bold", fontStretch: "expanded" }}
                >
                    Update DiamondShell
                </Typography>
                <Box
                    sx={{
                        width: "60%",
                        backgroundColor: "#f7f7f7",
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Material"
                                    name="material"
                                    value={formik.values.material}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.material && formik.errors.material && <div className="update-validation">{formik.errors.material}</div>}
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
                                {formik.touched.secondaryStoneType && formik.errors.secondaryStoneType && <div className="update-validation">{formik.errors.secondaryStoneType}</div>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Quantity"
                                    name="quantity"
                                    type="number"
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.quantity && formik.errors.quantity && <div className="update-validation">{formik.errors.quantity}</div>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    type="number"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.price && formik.errors.price && <div className="update-validation">{formik.errors.price}</div>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Gender"
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.gender && formik.errors.gender && <div className="update-validation">{formik.errors.gender}</div>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="DiamondShell Status"
                                    name="statusDiamondShell"
                                    value={formik.values.statusDiamondShell}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.statusDiamondShell && formik.errors.statusDiamondShell && <div className="update-validation">{formik.errors.statusDiamondShell}</div>}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    label="Image"
                                    name="imageDiamondShell"
                                    value={formik.values.imageDiamondShell}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.imageDiamondShell && formik.errors.imageDiamondShell && <div className="update-validation">{formik.errors.imageDiamondShell}</div>}
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
                            Update
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default UpdateDiamondShell;
