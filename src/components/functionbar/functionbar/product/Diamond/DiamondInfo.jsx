import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Diamond.css"
import { Link } from 'react-router-dom';
const DiamondInfo = () => {
    const [diamonds, setDiamonds] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDiamonds = async () => {
            try {
                const response = await axios.get("http://localhost:8080/diamond/get-all-diamond");
                setDiamonds(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDiamonds();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!diamonds.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="diamond-product-info-container">
            {diamonds.map((diamond) => (
                <div>
                    <div key={diamond.id} className="diamond-card">
                        <div className="ID">
                            <span>ID:</span>
                            <p>{diamond.id}</p>
                        </div>

                        <div className="text">
                            <p>{diamond.origin}  {diamond.cut}  {diamond.color}  {diamond.clarity}</p>
                        </div>
                        <div className="CutData">
                            <span>Cut:</span>
                            <p>{diamond.cut}</p>
                        </div>
                        <div className="ColorData">
                            <span>Color:</span>
                            <p>{diamond.color}</p>
                        </div>
                        <div className="ClarityData">
                            <span>Clarity:</span>
                            <p>{diamond.clarity}</p>
                        </div>
                        <Link to={`/diamondInfoDetails/${diamond.id}`} className='diamondInfo'>
                            View Details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

};

export default DiamondInfo;