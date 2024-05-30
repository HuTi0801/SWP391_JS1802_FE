import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./DiamondShellInfoDetails.css"
const DiamondShellInfoDetails = () => {
    const [diamondShells, setDiamondShells] = useState([1]);
    const [error, setError] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchDiamondShellsDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/diamond-shell/get-a-diamond-shell-${id}`);
                setDiamondShells(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDiamondShellsDetails();
    }, [id]);
    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <>   <h1>DiamondShell Products Details</h1>
            <div className="diamond-shell-infodetails-container ">
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
                    <p>{diamondShells.price}(VND)</p>
                </div>
            </div>



            <div className="ImageDiamondShellDetails">
                <img src={diamondShells.imageDiamondShell} />
            </div>

        </>

    );
}

export default DiamondShellInfoDetails