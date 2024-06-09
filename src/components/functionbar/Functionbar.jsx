import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Diamond from './functionbar/product/Diamond/Diamond';
import DiamondShell from './functionbar/product/diamondShell/DiamondShell'
import OrderListPage from './functionbar/ordertist/OrderListPage'
import CreateDiamond from './functionbar/product/Diamond/CreateDiamond';
import CreateDiamondShell from './functionbar/product/diamondShell/CreateDiamondShell';
import DiamondShellInfoDetails from './functionbar/product/diamondShell/DiamondShellInfoDetails';
import DiamondInfoDetails from './functionbar/product/Diamond/DiamondInfoDetails';
import UpdateDiamondShell from './functionbar/product/diamondShell/UpdateDiamondShell'
import UpdateDiamond from './functionbar/product/Diamond/UpdateDiamond';
import Pending from './functionbar/ordertist/status/Pending';
import Confirm from './functionbar/ordertist/status/Confirm';
import Delivering from './functionbar/ordertist/status/Delivering';
import Delivered from './functionbar/ordertist/status/Delivered';
import Canceled from './functionbar/ordertist/status/Canceled';
import ConfirmAssigned from './functionbar/ordertist/assign/ConfirmAssigned';
import PendingAssigned from './functionbar/ordertist/assign/PendingAssigned';
import DeliveredAssigned from './functionbar/ordertist/assign/DeliveredAssigned';
import DeliveringAssigned from './functionbar/ordertist/assign/DeliveringAssigned';
import SaleStaffDelivering from './functionbar/ordertist/assign/SaleStaffDelivering';
import DeliveryStaffDelivering from './functionbar/ordertist/assign/DeliveryStaffDelivering';
import SaleStaffDelivered from './functionbar/ordertist/assign/SaleStaffDelivered';
import DeliveryStaffDelivered from './functionbar/ordertist/assign/DeliveryStaffDelivered';
import OrderDetails from './functionbar/ordertist/OrderDetails';
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



                    <Link to="/orderlist" className="OrderListPage">
                        OrderListPage
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
                {/* Component: Product */}
                <Route path='/diamond' element={<Diamond />} />
                <Route path='/createDiamondShell' element={<CreateDiamondShell />} />
                <Route path='/CreateDiamond' element={<CreateDiamond />} />
                <Route path='/diamondshell' element={< DiamondShell />} />
                <Route
                    path='/diamondShellInfoDetails/:id'
                    element={<DiamondShellInfoDetails />} />
                <Route
                    path='/diamondInfoDetails/:id'
                    element={<DiamondInfoDetails />} />
                <Route
                    path='/updateDiamondShell/:id'
                    element={<UpdateDiamondShell />} />
                <Route
                    path='/updateDiamond/:id'
                    element={<UpdateDiamond />} />
                {/* Component: OrderList */}
                <Route path='/orderlist' element={< OrderListPage />} />

                <Route path='/pending' element={<Pending />} />
                <Route path='/pendingAssigned' element={<PendingAssigned />} />

                <Route path='/confirm' element={<Confirm />} />
                <Route path='/confirmAssigned' element={<ConfirmAssigned />} />

                <Route path='/delivering' element={<Delivering />} />
                <Route path='/deliveringAssigned' element={<DeliveringAssigned />} />
                <Route path='/saleStaffDelivering' element={<SaleStaffDelivering />} />
                <Route path='/deliveryStaffDelivering' element={<DeliveryStaffDelivering />} />

                <Route path='/delivered' element={< Delivered />} />
                <Route path='/deliveredAssigned' element={<DeliveredAssigned />} />
                <Route path='/saleStaffDelivered' element={<SaleStaffDelivered />} />
                <Route path='/deliveryStaffDelivered' element={<DeliveryStaffDelivered />} />

                <Route path='/canceled' element={< Canceled />} />
                <Route path='/orderDetails/:id' element={< OrderDetails />} />

            </Routes>

        </>
    );
};

export default Functionbar;