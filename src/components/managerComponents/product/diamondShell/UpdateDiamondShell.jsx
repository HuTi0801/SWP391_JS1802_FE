import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDiamondShell } from "../../../../redux/actions/diamondShellAction";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import axios from "axios";
import "./DiamondShellInfoDetails.css";
import ManagerHeader from "../../header/ManagerHeader";
import Functionbar from "../../functionbar/Functionbar";

const UpdateDiamondShell = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [diamondShell, setDiamondShell] = useState({
        gender: "male",
        imageDiamondShell: "",
        material: "",
        price: "0",
        quantity: "0",
        secondaryStoneType: "",
        statusDiamondShell: "true",
        accountId: 0,
        sizeIds: [0]
    });

    const [diamondShellSize, setDiamondShellSize] = useState([]);

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
        dispatch(updateDiamondShell(id, diamondShell));
        alert("Update DiamondShell successfully!!!!");
        navigate("/diamondshell");
    };



    return (
        <>
            <ManagerHeader />
            <div className="update-DiamondShell">
                <Functionbar />
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
                        <div className="Manager_accountId">
                            <label htmlFor="accountId">AccountId:</label>
                            <input
                                type="text"
                                id="accountId"
                                name="accountId"
                                value={diamondShell.accountId}
                                onChange={handleChange}
                            />
                        </div>



                        <button type="button" onClick={handleUpdate}>
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default UpdateDiamondShell;
