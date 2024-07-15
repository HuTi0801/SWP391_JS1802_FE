import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./DiamondInfoDetails.css"
import ManagerHeader from "../../header/ManagerHeader"
import Functionbar from "../../functionbar/Functionbar"
import DiamondSidebarMenu from "./DiamondSidebarMenu.jsx"
const DiamondInfoDetails = () => {
    const [diamond, setDiamond] = useState([1]);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const authToken = localStorage.getItem('authToken');
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

    function formatCurrency(amount) {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        return formatter.format(amount);
    }



    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <DiamondSidebarMenu />

            <div className="diamond-infodetails-container">

                <div className="text">
                    <span>Name:</span>
                    <p>{diamond.origin}  {diamond.cut}  {diamond.color}  {diamond.clarity}</p>
                </div>

                <div className="OriginDetails">
                    <span>Origin:</span>
                    <p>{diamond.origin}</p>
                </div>

                <div className="ClarityDetails">
                    <span>Clarity:</span>
                    <p>{diamond.clarity}</p>
                </div>

                <div className="CutDetails">
                    <span>Cut:</span>
                    <p>{diamond.cut}</p>
                </div>
                <div className="CaratWeightDetails">
                    <span>CaratWeight:</span>
                    <p>{diamond.caratWeight}(ly)</p>
                </div>
                <div className="ColorDetails">
                    <span>Color:</span>
                    <p>{diamond.color}</p>
                </div>
                <div className="CertificateNumberDetails">
                    <span>CertificateNumber:</span>
                    <p>{diamond.certificateNumber}</p>
                </div>
                <div className="QuantityDetails">
                    <span>Quantity:</span>
                    <p>{diamond.quantity}</p>
                </div>
                <div className="PriceDetails">
                    <span>Price:</span>
                    <p>{formatCurrency(diamond.price)}</p>
                </div>

                <Link to={`/updateDiamond/${diamond.id}`} className='DiamondUpdate'>
                    Update
                </Link>
            </div>

            <div className="ImageDiamondDetails">
                <img src={diamond.imageDiamond} />
            </div>

        </>

    );
}

export default DiamondInfoDetails