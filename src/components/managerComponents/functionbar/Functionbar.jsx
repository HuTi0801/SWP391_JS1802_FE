
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Functionbar.css"
const Functionbar = () => {
    const [showLinks, setShowLinks] = useState(false);

    const handleClick = () => {
        setShowLinks(!showLinks);
    };

    return (
        <>
            <div className="function-container">

                <ul className="url">
                    <Link to="/" className="product" onClick={handleClick}>
                        Product
                        {showLinks && (
                            <div className="sub-links">

                                <Link to="/diamond" className="diamond">
                                    Diamond
                                </Link>


                                <Link to="/diamondshell" className="diamondshell">
                                    DiamondShell
                                </Link>

                            </div>
                        )}
                    </Link>



                    <Link to="/managerorderlist" className="OrderListPage">
                        OrderListPage
                    </Link>

                    <Link to="/promotion" className="promotion">
                        Promotion
                    </Link>

                    <Link to="/profile" className="profile">
                        Profile
                    </Link>

                    <Link to="/dashBoard" className="dashBoard">
                        DashBoard
                    </Link>

                </ul>

            </div>
        </>
    );
};

export default Functionbar;