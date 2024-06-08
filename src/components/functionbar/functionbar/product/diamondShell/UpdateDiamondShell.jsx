import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDiamondShell } from "../../../../../redux/actions/diamondShellAction";
import { useParams } from "react-router-dom";

import axios from "axios";
import "./DiamondShellInfoDetails.css"

const UpdateDiamondShell = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [error, setError] = useState(null);
    const [diamondShell, setDiamondShell] = useState({

        gender: "male",
        imageDiamondShell: "",
        material: "",
        price: "0",
        quantity: "0",
        secondaryStoneType: "",
        statusDiamondShell: "true"

    });
    useEffect(() => {
        const fetchDiamondShellsDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/diamond-shell/get-a-diamond-shell-${id}`);
                setDiamondShell(response.data.result);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDiamondShellsDetails();
    }, [id]);
    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleChange = (e) => {
        setDiamondShell({
            ...diamondShell,
            [e.target.name]: e.target.value,
        });
    };



    const handleUpdate = async () => {
        dispatch(updateDiamondShell(id, diamondShell));
        alert("Update DiamondShell successfully!!!!");

    };

    return (
        <div className="update-DiamondShell">
            <h1>Update DiamondShell</h1>
            <form>
                <div className="sub-update-DiamondShell">
                    <div className="Material">
                        <label htmlFor="material">Material:</label>
                        <input type="text" name="material"
                            value={diamondShell.material}
                            onChange={handleChange} />
                    </div>

                    <div className="SecondaryStoneType">
                        <label htmlFor="secondaryStoneType">Secondary Stone Type:</label>
                        <input
                            type="text"
                            name="secondaryStoneType"
                            value={diamondShell.secondaryStoneType}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="Quantity">
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="text" name="quantity"
                            value={diamondShell.quantity}
                            onChange={handleChange} />
                    </div>

                    <div className="Price">

                        <label htmlFor="price">Price:</label>
                        <input type="text" id="price" name="price"
                            value={diamondShell.price}
                            onChange={handleChange} />
                    </div>

                    <div className="Gender">
                        <label htmlFor="gender">Gender:</label>
                        <input type="text" id="gender" name="gender"
                            value={diamondShell.gender}
                            onChange={handleChange} />
                    </div>

                    <div className="imageDiamondShell">
                        <label htmlFor="imageDiamondShell"> Image:</label>
                        <input type="text" id="imageDiamondShell"
                            name="imageDiamondShell"
                            value={diamondShell.imageDiamondShell}
                            onChange={handleChange} />
                    </div>

                    <div className="statusDiamondShell">
                        <label htmlFor="statusDiamondShell">DiamondShell Status:</label>
                        <input
                            type="text"
                            id="statusDiamondShell"
                            name="statusDiamondShell"
                            value={diamondShell.statusDiamondShell}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Add additional input fields for other properties as needed */}

                    <button type="button" onClick={handleUpdate}>
                        Update
                    </button>
                </div>
            </form>

        </div>
    );
};

export default UpdateDiamondShell;