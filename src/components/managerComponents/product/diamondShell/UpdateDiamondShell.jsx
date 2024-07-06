

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ManagerHeader from "../../header/ManagerHeader";
import Functionbar from "../../functionbar/Functionbar";
import {
    Grid,
    TextField,
    Button,
    Box,
    Typography,
} from "@mui/material";


const UpdateDiamondShell = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const authToken = localStorage.getItem('authToken');
    const [diamondShell, setDiamondShell] = useState({
        gender: "male",
        imageDiamondShell: "",
        material: "",
        price: "0",
        quantity: "0",
        secondaryStoneType: "",
        statusDiamondShell: "true",
        accountId: 0,
    });

    useEffect(() => {
        const fetchDiamondShellDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/diamond-shell/get-a-diamond-shell-${id}`);
                setDiamondShell(response.data.result);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDiamondShellDetails();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiamondShell({ ...diamondShell, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post(`http://localhost:8080/auth/diamond-shell/update-diamond-shell-${id}`, diamondShell, config);
            if (response.data.isSuccess) {
                alert("Update DiamondShell successfully!!!!");
                navigate("/diamondShellInfoDetails/" + id);
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
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Material"
                                    name="material"
                                    value={diamondShell.material}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Secondary Stone Type"
                                    name="secondaryStoneType"
                                    value={diamondShell.secondaryStoneType}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Quantity"
                                    name="quantity"
                                    type="text"
                                    value={diamondShell.quantity}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    type="text"
                                    value={diamondShell.price}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Gender"
                                    name="gender"
                                    value={diamondShell.gender}
                                    onChange={handleChange}
                                />
                            </Grid>



                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="DiamondShell Status"
                                    name="statusDiamondShell"
                                    value={diamondShell.statusDiamondShell}
                                    onChange={handleChange}
                                />
                            </Grid>



                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Account Id"
                                    name="accountId"
                                    value={diamondShell.accountId}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <TextField
                                    fullWidth
                                    label="Image"
                                    name="imageDiamondShell"
                                    value={diamondShell.imageDiamondShell}
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
export default UpdateDiamondShell;

