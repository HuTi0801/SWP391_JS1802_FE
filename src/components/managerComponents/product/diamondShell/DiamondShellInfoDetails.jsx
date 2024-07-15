import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./DiamondShellInfoDetails.css"
import ManagerHeader from "../../header/ManagerHeader"
import Functionbar from "../../functionbar/Functionbar"
import DiamondShellSidebarMenu from "./DiamondShellSidebarMenu.jsx"
const DiamondShellInfoDetails = () => {
    const [diamondShells, setDiamondShells] = useState([1]);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchDiamondShellsDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/diamond-shell/get-a-diamond-shell-${id}`);
                setDiamondShells(response.data.result);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDiamondShellsDetails();
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
            <DiamondShellSidebarMenu />
            <div className="diamond-shell-infodetails-container">

                <div>

                    <div className="text">
                        <span>Name:</span>
                        <p>{diamondShells.material}  {diamondShells.secondaryStoneType}</p>
                    </div>

                    <div className="MaterialDetails">
                        <span>Material:</span>
                        <p>{diamondShells.material}</p>
                    </div>

                    <div className="GenderDetails">
                        <span>Gender:</span>
                        <p>{diamondShells.gender}</p>
                    </div>

                    <div className="SecondaryStoneTypeDetails">
                        <span>Secondary Stone:</span>
                        <p>{diamondShells.secondaryStoneType}</p>
                    </div>

                    <div className="QuantityDetails">
                        <span>Quantity:</span>
                        <p>{diamondShells.quantity}</p>
                    </div>

                    <div className="PriceDetails">
                        <span>Price:</span>
                        <p>{formatCurrency(diamondShells.price)}</p>
                    </div>
                </div>
                <Link to={`/updateDiamondShell/${diamondShells.id}`} className='diamondShellUpdate'>
                    Update
                </Link>

            </div>


            <div className="ImageDiamondShellDetails">
                <img src={diamondShells.imageDiamondShell} />
            </div>

        </>

    );
}

export default DiamondShellInfoDetails