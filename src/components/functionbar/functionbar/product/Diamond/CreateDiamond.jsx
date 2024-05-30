import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../../../redux/actions/productAction";
const CreateDiamond = () => {
    const dispatch = useDispatch();
    const [diamond, setDiamond] = useState({
        caratWeight: "0",
        certificateNumber: "",
        clarity: "",
        color: "",
        cut: "",
        imageDiamond: "",
        origin: "",
        price: "0",
        quantity: "0",
        statusDiamond: ""

    });
    const handleChange = (e) => {
        setDiamond({ ...diamond, [e.target.name]: e.target.value });
    };

    const diamondAdd = () => {
        dispatch(createProduct(diamond));
    };

    return (
        <div className="create-Diamond">
            <h1>Create Diamond</h1>
            <br />
            <div className="sub-create-Diamond">
                <div className="Color">
                    <label htmlFor="color">Color:</label>
                    <select name="color" onChange={handleChange}>
                        <option value="">Color</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                    </select>
                </div>

                <div className="Cut">
                    <label htmlFor="cut">Cut:</label>
                    <select name="cut" onChange={handleChange}>
                        <option value="">Cut</option>
                        <option value="EX">EX</option>
                    </select>
                </div>

                <div className="CaratWeight">
                    <label htmlFor="carat_weight">CaratWeight:</label>
                    <select name="caratWeight" onChange={handleChange}>
                        <option value="">CaratWeight</option>
                        <option value="3.4">3.4</option>
                        <option value="4">4</option>
                    </select>
                </div>

                <div className="Clarity">
                    <label htmlFor="clarity">Clarity:</label>
                    <select name="clarity" onChange={handleChange}>
                        <option value="">Clarity</option>
                        <option value="VS2">VS2</option>
                        <option value="VVS2">VVS2</option>
                    </select>
                </div>

                <div className="Origin">
                    <label htmlFor="origin">Origin:</label>
                    <select name="origin" onChange={handleChange}>
                        <option value="">Origin</option>
                        <option value="Natural diamond">Natural diamond</option>
                        <option value="Artificialdiamond">Artificial diamond</option>
                    </select>
                </div>

                <div className="Price">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        onChange={handleChange}
                    />
                </div>

                <div className="Quantity">
                    <label htmlFor="quantity">Quantity:</label>
                    <select name="quantity" onChange={handleChange}>
                        <option value="">Quantity</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                        <option value="200">200</option>
                    </select>
                </div>

                <div className="CertificateNumber">
                    <label htmlFor="certificate_number">CertificateNumber:</label>
                    <input
                        type="text"
                        placeholder="certificate_number"
                        name="certificateNumber"
                        onChange={handleChange}
                    />
                </div>

                <div className="imgDiamond">
                    <label htmlFor="image">imgDiamond:</label>
                    <input
                        type="text"
                        placeholder="imgDiamond"
                        name="imageDiamond"
                        onChange={handleChange}
                    />
                </div>

                <div className="statusDiamond">
                    <label htmlFor="statusDiamond">statusDiamond:</label>
                    <select name="statusDiamond" onChange={handleChange}>
                        <option value="">statusDiamond</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
                </div>
            </div>

            <button onClick={diamondAdd}>Add</button>
        </div>
    );
}

export default CreateDiamond