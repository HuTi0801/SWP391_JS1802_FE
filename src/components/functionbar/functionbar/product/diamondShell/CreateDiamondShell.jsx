
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDiamondShell } from "../../../../../redux/actions/diamondShellAction";

const CreateDiamondShell = () => {
    const dispatch = useDispatch();

    const [diamondShell, setDiamondShell] = useState({
        gender: "",
        imageDiamondShell: "",
        material: "",
        price: "0",
        quantity: "0",
        secondaryStoneType: "",
        statusDiamondShell: ""
    });
    const handleChange = (e) => {
        setDiamondShell({ ...diamondShell, [e.target.name]: e.target.value });
    };

    const diamondShellAdd = async () => {
        dispatch(createDiamondShell(diamondShell));
        alert("Add Diamond successfully!!!!");

    };

    return (
        <div className="create-DiamondShell">
            <h1>Create DiamondShell</h1>
            <br />
            <div className="sub-create-DiamondShell">
                <div className="Gender">
                    <label htmlFor="Gender">Gender:</label>
                    <select name="gender" placeholder="Gender" onChange={handleChange}>
                        <option value="">Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                </div>

                <div className="imgDiamondShell">
                    <label htmlFor="imgDiamondShell">Image:</label>
                    <input
                        type="text"
                        placeholder="Image"
                        name="imageDiamondShell"
                        onChange={handleChange}
                    />
                </div>

                <div className="Material">
                    <label htmlFor="Material">Material:</label>
                    <select name="material" placeholder="Material" onChange={handleChange}>
                        <option value="">Material</option>
                        <option value="Platinum 18K">Platinum 18K</option>
                        <option value="Gold 14K">Gold 14K</option>
                    </select>
                </div>

                <div className="Price">
                    <label htmlFor="Price">Price:</label>
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        onChange={handleChange}
                    />
                </div>

                <div className="Quantity">
                    <label htmlFor="Quantity">Quantity:</label>
                    <input
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        onChange={handleChange}
                    />
                </div>

                <div className="SecondaryStoneType">
                    <label htmlFor="SecondaryStoneType">Secondary Stone Type:</label>
                    <input
                        type="text"
                        placeholder="SecondaryStoneType"
                        name="secondaryStoneType"
                        onChange={handleChange}
                    />
                </div>

                <div className="statusDiamondShell">
                    <label htmlFor="statusDiamondShell">StatusDiamond:</label>
                    <select name="statusDiamondShell" placeholder="StatusDiamondShell" onChange={handleChange}>
                        <option value="">StatusDiamondShell</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
                </div>
            </div>

            <button onClick={diamondShellAdd}>Add</button>
        </div>
    );

}

export default CreateDiamondShell