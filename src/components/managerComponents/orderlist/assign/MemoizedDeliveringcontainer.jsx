import "./assign.css"
import { Link } from 'react-router-dom';
import React, { memo } from 'react'
const MemoizedDeliveringcontainer = memo(({ id }) => {
    return (
        <div className='Deliveringcontainer'>
            <hr className="vertical-line" />
            <div>
                <ul className="url_Status">
                    <Link to="/managerorderlist" className="All">
                        All
                    </Link>
                    <Link to="/delivering" className="Delivering">
                        Delivering
                    </Link>
                    <h3 className='assigned'>Assigned</h3>
                    <Link to={`/deliveringassigned/${id}`} className=" AllStaff">
                        All Staff
                    </Link>
                    <Link to={`/saleStaffDelivering/${id}`} className="SaleStaff">
                        Sale Staff
                    </Link>
                    <Link to={`/deliveryStaffDelivering/${id}`} className="DeliveryStaff">
                        Delivery Staff
                    </Link>
                </ul>
            </div>
        </div>
    );
});
export default MemoizedDeliveringcontainer
