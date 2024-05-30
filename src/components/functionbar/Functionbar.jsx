import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Diamond from './functionbar/product/Diamond/Diamond';
import DiamondShell from './functionbar/product/diamondShell/DiamondShell'
import Warranty from './functionbar/warranty/Warranty'
import CreateDiamond from './functionbar/product/Diamond/CreateDiamond';
import CreateDiamondShell from './functionbar/product/diamondShell/CreateDiamondShell';
import DiamondShellInfoDetails from './functionbar/product/diamondShell/DiamondShellInfoDetails';
import DiamondInfoDetails from './functionbar/product/Diamond/DiamondInfoDetails';
const Functionbar = () => {
    const [showLinks, setShowLinks] = useState(false);

    const handleClick = () => {
        setShowLinks(!showLinks);
    };

    return (
        <>
            <div className="function-container">
                <ul className="url">

                    <Link to="/product" className="product" onClick={handleClick}>
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



                    <Link to="/warranty" className="warranty">
                        Warranty
                    </Link>

                    <Link to="/promotion" className="promotion">
                        Promotion
                    </Link>

                    <Link to="/profile" className="profile">
                        Profile
                    </Link>

                    <Link to="/logout" className="logout">
                        Logout
                    </Link>
                </ul>
            </div>
            <Routes>
                <Route path='/diamond' element={<Diamond />} />
                <Route path='/createDiamondShell' element={<CreateDiamondShell />} />
                <Route path='/CreateDiamond' element={<CreateDiamond />} />
                <Route path='/diamondshell' element={< DiamondShell />} />
                <Route path='/warranty' element={< Warranty />} />
                <Route
                    path='/diamondShellInfoDetails/:id'
                    element={<DiamondShellInfoDetails />} />
                <Route
                    path='/diamondInfoDetails/:id'
                    element={<DiamondInfoDetails />} />
            </Routes>

        </>
    );
};

export default Functionbar;