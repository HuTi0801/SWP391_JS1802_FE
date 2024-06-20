import "./assign.css";
import { Link } from 'react-router-dom';
import React, { memo } from 'react';

const MemoizedDeliveredcontainer = memo(({ id }) => {
    return (
        <div className='Deliveringcontainer'>
            <hr className="vertical-line" />
            <div>
                <ul className="url_Status">
                    <Link to="/managerorderlist" className="All">
                        All
                    </Link>
                    <Link to="/delivered" className="Delivered">
                        Delivered
                    </Link>
                    <h3 className='assigned'>Assigned</h3>
                    <Link to={`/deliveredassigned/${id}`} className=" AllStaff">
                        All Staff
                    </Link>
                    <Link to={`/saleStaffDelivered/${id}`} className="SaleStaff">
                        Sale Staff
                    </Link>
                    <Link to={`/deliveryStaffDelivered/${id}`} className="DeliveryStaff">
                        Delivery Staff
                    </Link>
                </ul>
            </div>
        </div>
    );
});

export default MemoizedDeliveredcontainer;