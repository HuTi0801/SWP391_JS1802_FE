
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDiamondShell } from "../../../../../redux/actions/diamondShellAction";
const CreateDiamondShell = () => {
    const dispatch = useDispatch();
    const [diamondShell, setDiamondShell] = useState({
        gender: "",
        imageDiamondShell: "",
        metarial: "",
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
    };

    return (
        <div className="create-DiamondShell">
            <h1>Create DiamondShell</h1>
            <br />
            <div className="sub-create-DiamondShell">
                <div className="Gender">
                    <label htmlFor="Gender">Gender:</label>
                    <select name="gender" onChange={handleChange}>
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
                    <select name="material" onChange={handleChange}>
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
                    <select name="quantity" onChange={handleChange}>
                        <option value="">Quantity</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                    </select>
                </div>

                <div className="SecondaryStoneType">
                    <label htmlFor="SecondaryStoneType">Secondary Stone Type:</label>
                    <select name="secondaryStoneType" onChange={handleChange}>
                        <option value="">Secondary Stone Type</option>
                        <option value="KC DIA WHIRD1.6x2, 1.1x18.09x44">KC DIA WHIRD1.6x2, 1.1x18.09x44</option>
                        <option value="KC DIA WHIRD0.9x44,08x96">KC DIA WHIRD0.9x44,08x96</option>
                    </select>
                </div>

                <div className="statusDiamondShell">
                    <label htmlFor="statusDiamondShell">statusDiamond:</label>
                    <select name="statusDiamondShell" onChange={handleChange}>
                        <option value="">statusDiamond</option>
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