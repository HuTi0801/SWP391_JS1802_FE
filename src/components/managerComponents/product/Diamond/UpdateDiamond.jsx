import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import ManagerHeader from "../../header/ManagerHeader";
import Functionbar from "../../functionbar/Functionbar";
import {
    Grid,
    TextField,
    Button,
    Box,
    Typography,
} from "@mui/material";

const UpdateDiamond = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { id } = useParams();
    const authToken = localStorage.getItem('authToken');
    const [diamond, setDiamond] = useState({
        cut: "",
        origin: "xumYCwQHz",
        caratWeight: 0,
        color: "",
        clarity: "",
        price: 0,
        quantity: 0,
        certificateNumber: "",
        imageDiamond: "",
        statusDiamond: true,
        accountId: 0
    });

    const handleChange = (e) => {
        setDiamond({
            ...diamond,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        const fetchDiamondDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/diamond/get-a-diamond-${id}`);
                setDiamond(response.data.result);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDiamondDetails();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleUpdate = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post(`http://localhost:8080/auth/diamond/update-diamond-${id}`, diamond, config);
            if (response.data.isSuccess) {
                alert("Update Diamond successfully!!!!");
                navigate("/diamondInfoDetails/" + id);
            }
        } catch (error) {
            setError(error.message);
            console.error('Error updating diamond', error);
        }
    };

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 4 }}
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
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Color"
                                    name="color"
                                    value={diamond.color}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Cut"
                                    name="cut"
                                    value={diamond.cut}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Carat Weight"
                                    name="caratWeight"
                                    value={diamond.caratWeight}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Clarity"
                                    name="clarity"
                                    value={diamond.clarity}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Origin"
                                    name="origin"
                                    value={diamond.origin}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    value={diamond.price}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField

                                    fullWidth
                                    label="Account ID"
                                    name="accountId"
                                    value={diamond.accountId}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField

                                    fullWidth
                                    label="Diamond Status"
                                    name="statusDiamond"
                                    value={diamond.statusDiamond}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Certificate Number"
                                    name="certificateNumber"
                                    value={diamond.certificateNumber}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Quantity"
                                    name="quantity"
                                    type="number"
                                    value={diamond.quantity}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={9}>
                                <TextField

                                    fullWidth
                                    label="Diamond Image"
                                    name="imageDiamond"
                                    value={diamond.imageDiamond}
                                    onChange={handleChange}
                                />
                            </Grid>

                        </Grid>
                    </form>

                    <Button
                        sx={{ marginTop: 2, paddingBottom: 1, paddingTop: 1, paddingLeft: 5, paddingRight: 5, marginLeft: 50, backgroundColor: 'lightgray' }}
                        variant="contained"
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                </Box>
            </Box >
        </>
    );
};
export default UpdateDiamond;
