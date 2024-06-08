import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { updateDiamond } from "../../../../../redux/actions/productAction";
import { useParams } from "react-router-dom";
import "./DiamondInfoDetails.css"


const UpdateDiamond = () => {
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const { id } = useParams();
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
                const response = await axios.get(`http://localhost:8080/diamond/get-a-diamond-${id}`);
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
        dispatch(updateDiamond(id, diamond));
        alert("Update Diamond successfully!!!!");

    };

    return (
        <div className="update-Diamond">

            <h1>Update Diamond</h1>
            <form>

                <div className="sub-update-Diamond">

                    <div className="Cut">
                        <label htmlFor="cut">Cut:</label>
                        <input type="text" name="cut"
                            value={diamond.cut} onChange={handleChange} />
                    </div>

                    <div className="Origin">
                        <label htmlFor="origin">Origin:</label>
                        <input type="text" name="origin"
                            value={diamond.origin}
                            onChange={handleChange} /></div>

                    <div className="CaratWeight">
                        <label htmlFor="caratWeight">CaratWeight:</label>
                        <input type="text" name="caratWeight"
                            value={diamond.caratWeight}
                            onChange={handleChange} /></div>

                    <div className="Color">
                        <label htmlFor="color">Color:</label>
                        <input type="text" name="color"
                            value={diamond.color}
                            onChange={handleChange} /></div>

                    <div className="CertificateNumber" >
                        <label htmlFor="certificateNumber">CertificateNumber:</label>
                        <input type="text" name="certificateNumber"
                            value={diamond.certificateNumber}
                            onChange={handleChange} />
                    </div>

                    <div className="Clarity">

                        <label htmlFor="clarity">Clarity:</label>
                        <input type="text" name="clarity"
                            value={diamond.clarity}
                            onChange={handleChange} />
                    </div>

                    <div className="Quantity">
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="number" name="quantity"
                            value={diamond.quantity}
                            onChange={handleChange} />
                    </div>

                    <div className="Price">
                        <label htmlFor="price">Price:</label>
                        <input type="text" id="price" name="price"
                            value={diamond.price}
                            onChange={handleChange} /></div>

                    <div className="imgDiamond">
                        <label htmlFor="imageDiamond">Diamond Image:</label>
                        <input
                            type="text"
                            id="imageDiamond"
                            name="imageDiamond"
                            value={diamond.imageDiamond}

                            onChange={handleChange}
                        />
                    </div>

                    <div className="statusDiamond">
                        <label htmlFor="statusDiamond">Diamond Status:</label>
                        <input
                            type="text"
                            id="statusDiamond"
                            name="statusDiamond"
                            value={diamond.statusDiamond}

                            onChange={handleChange}
                        />
                    </div>

                    <button type="button" onClick={handleUpdate}>
                        Update
                    </button>

                </div>
            </form>
        </div>
    );
};

export default UpdateDiamond;