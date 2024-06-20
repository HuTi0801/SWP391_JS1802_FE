import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../../redux/actions/productAction";
import ManagerHeader from "../../header/ManagerHeader"
import Functionbar from "../../functionbar/Functionbar"
import './Diamond.css'
import { useNavigate } from "react-router-dom";
const CreateDiamond = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        statusDiamond: "",
        accountId: "0",

    });
    const handleChange = (e) => {
        setDiamond({ ...diamond, [e.target.name]: e.target.value });
    };

    const diamondAdd = () => {
        dispatch(createProduct(diamond));
        alert("Add Diamond successfully!!!!");
        navigate("/diamond");
    };

    return (<>
        <ManagerHeader />

        <div className="create-Diamond">
            <Functionbar />
            <h1>Create Diamond</h1>
            <br />
            <div className="sub-create-Diamond">
                <div className="createColor">
                    <label htmlFor="color">Color:</label>
                    <select name="color" placeholder="Color" onChange={handleChange}>
                        <option value="">Color</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                    </select>
                </div>

                <div className="createCut">
                    <label htmlFor="cut">Cut:</label>
                    <select name="cut" placeholder="Cut" onChange={handleChange}>
                        <option value="">Cut</option>
                        <option value="EX">EX</option>
                    </select>
                </div>

                <div className="createCaratWeight">
                    <label htmlFor="carat_weight">CaratWeight:</label>
                    <input
                        type="text"
                        placeholder="CaratWeight"
                        name="caratWeight"
                        onChange={handleChange}
                    />
                </div>

                <div className="createClarity">
                    <label htmlFor="clarity">Clarity:</label>
                    <select name="clarity" placeholder="Clarity" onChange={handleChange}>
                        <option value="">Clarity</option>
                        <option value="VS2">VS2</option>
                        <option value="VVS2">VVS2</option>
                    </select>
                </div>

                <div className="createOrigin">
                    <label htmlFor="origin">Origin:</label>
                    <select name="origin" placeholder="Origin" onChange={handleChange}>
                        <option value="">Origin</option>
                        <option value="Natural diamond">Natural diamond</option>
                        <option value="Artificial diamond">Artificial diamond</option>
                    </select>
                </div>

                <div className="createPrice">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        onChange={handleChange}
                    />
                </div>

                <div className="createQuantity">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        placeholder="Quantity"
                        name="quantity"
                        onChange={handleChange}
                    />
                </div>

                <div className="createCertificateNumber">
                    <label htmlFor="certificate_number">CertificateNumber:</label>
                    <input
                        type="text"
                        placeholder="certificate_number"
                        name="certificateNumber"
                        onChange={handleChange}
                    />
                </div>

                <div className="createimgDiamond">
                    <label htmlFor="image">imgDiamond:</label>
                    <input
                        type="text"
                        placeholder="imgDiamond"
                        name="imageDiamond"
                        onChange={handleChange}
                    />
                </div>

                <div className="AccountId">
                    <label htmlFor="AccountId">AccountId:</label>
                    <input
                        type="text"
                        placeholder="accountId"
                        name="accountId"
                        onChange={handleChange}
                    />
                </div>

                <div className="createstatusDiamond">
                    <label htmlFor="statusDiamond">StatusDiamond:</label>
                    <select name="statusDiamond" placeholder="StatusDiamond" onChange={handleChange}>
                        <option value="">StatusDiamond</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
                </div>

            </div>

            <button onClick={diamondAdd}>Add</button>
        </div>

    </>

    );
}

export default CreateDiamond