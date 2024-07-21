import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import ManagerHeader from "../../header/ManagerHeader";
import Functionbar from "../../functionbar/Functionbar";
import { useFormik } from 'formik';
import * as yup from "yup";
import "./DiamondInfoDetails.css"
import DiamondSidebarMenu from "./DiamondSidebarMenu.jsx"
import {
    Grid,
    TextField,
    Button,
    Box,
    Typography,
} from "@mui/material";

const UpdateDiamond = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const authToken = localStorage.getItem('authToken');
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            cut: "",
            origin: "",
            caratWeight: '',
            color: "",
            clarity: "",
            price: '',
            quantity: '',
            certificateNumber: "",
            imageDiamond: "",
            statusDiamond: "",
            accountId: 1
        },
        validationSchema: yup.object({
            caratWeight: yup.number().required("Please enter carat weight").min(0, "Carat weight cannot be negative"),
            // certificateNumber: yup.string()
            //     .required("Please enter certificate number")
            //     .matches(/^GIA\d{10}$/, "Please enter a valid Certificate Number (GIA followed by 10 digits)"),
            clarity: yup.string().required("Please enter clarity"),
            color: yup.string().required("Please enter color"),
            cut: yup.string().required("Please enter cut"),
            imageDiamond: yup.string().required("Please enter image URL").url("Please enter a valid URL"),
            origin: yup.string().required("Please enter origin"),
            price: yup.number().required("Please enter price").min(0, "Price cannot be negative"),
            quantity: yup.number().required("Please enter quantity").min(0, "Quantity cannot be negative"),
            statusDiamond: yup.string().required("Please select status"),
        }),
        onSubmit: async (values) => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post(`http://localhost:8080/auth/diamond/update-diamond-${id}`, values, config);
                if (response.data.isSuccess) {
                    alert("Update Diamond successfully!!!!");
                    navigate("/diamondInfoDetails/" + id);
                }
            } catch (error) {
                setError(error.message);
                console.error('Error updating diamond', error);
            }
        }
    });

    useEffect(() => {
        const fetchDiamondDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/diamond/get-a-diamond-${id}`);
                formik.setValues(response.data.result);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDiamondDetails();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <DiamondSidebarMenu />
            <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -95 }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ color: "red", fontSize: 50, fontWeight: "bold", fontStretch: "expanded" }}
                >
                    Update Diamond
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
                                    label="Color"
                                    name="color"
                                    value={formik.values.color}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.color && formik.errors.color && <div className="update-validation">{formik.errors.color}</div>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Cut"
                                    name="cut"
                                    value={formik.values.cut}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.cut && formik.errors.cut && <div className="update-validation">{formik.errors.cut}</div>}
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
                                {formik.touched.caratWeight && formik.errors.caratWeight && <div className="update-validation">{formik.errors.caratWeight}</div>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Clarity"
                                    name="clarity"
                                    value={formik.values.clarity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.clarity && formik.errors.clarity && <div className="update-validation">{formik.errors.clarity}</div>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Origin"
                                    name="origin"
                                    value={formik.values.origin}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.origin && formik.errors.origin && <div className="update-validation">{formik.errors.origin}</div>}
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
                                {formik.touched.price && formik.errors.price && <div className="update-validation">{formik.errors.price}</div>}
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Diamond Status"
                                    name="statusDiamond"
                                    value={formik.values.statusDiamond}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.statusDiamond && formik.errors.statusDiamond && <div className="update-validation">{formik.errors.statusDiamond}</div>}
                            </Grid>
                            <Grid item xs={12} md={3}>
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
                            {/* <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Certificate Number"
                                    name="certificateNumber"
                                    value={formik.values.certificateNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.certificateNumber && formik.errors.certificateNumber && <div className="update-validation">{formik.errors.certificateNumber}</div>}
                            </Grid> */}

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Image Diamond"
                                    name="imageDiamond"
                                    value={formik.values.imageDiamond}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.imageDiamond && formik.errors.imageDiamond && <div className="update-validation">{formik.errors.imageDiamond}</div>}
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

export default UpdateDiamond;
