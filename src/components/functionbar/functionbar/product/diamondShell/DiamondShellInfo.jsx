import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Diamondshell.css"
import { Link } from 'react-router-dom';

const DiamondShellInfo = () => {
    const [diamondShells, setDiamondShells] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDiamondShells = async () => {
            try {
                const response = await axios.get("http://localhost:8080/diamond-shell/get-all-diamond-shell");
                setDiamondShells(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchDiamondShells();
    }, []);
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!diamondShells.length) {
        return <div>Loading...</div>;
    }





    return (
        <div className="diamond-shell-info-container">
            {diamondShells.map((diamondShell) => (
                <div key={diamondShell.id} className="diamond-shell-card">
                    <div>
                        <div className="ID">
                            <span>ID:</span>
                            <p>{diamondShell.id}</p>
                        </div>

                        <div className="text">
                            <p>{diamondShell.material}  {diamondShell.secondaryStoneType}</p>
                        </div>

                        <div className="MaterialData">
                            <span>Material:</span>
                            <p>{diamondShell.material}</p>
                        </div>


                        <div className="GenderData">
                            <span>Gender:</span>
                            <p>{diamondShell.gender}</p>
                        </div>


                        <div className="SecondaryStoneTypeData">
                            <span>Secondary Stone:</span>
                            <p>{diamondShell.secondaryStoneType}</p>
                        </div>


                        <Link to={`/diamondShellInfoDetails/${diamondShell.id}`} className='diamondShellInfo'>
                            View Details
                        </Link>

                    </div>
                </div>
            ))}

        </div>
    );
};

export default DiamondShellInfo;