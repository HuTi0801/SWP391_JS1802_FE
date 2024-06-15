import React from 'react'
import { Link } from 'react-router-dom';
import "./assign.css"
import DeliveryStaffDelivered from './DeliveryStaffDelivered';
const DeliveredAssigned = () => {
    return (
        <div>
            <h1>Delivery Staff List</h1>
            <div className="DeliveredAssigned-container">
                <div className='Deliveredcontainer'>
                    <hr className="vertical-line" />
                    <div>
                        <ul className="url_Status">
                            <h3 className='Status'>Status</h3>
                            <Link to="/orderlist" className="All">
                                All
                            </Link>
                            <Link to="/delivered" className="Delivered">
                                Delivered
                            </Link>
                            <h3 className='assigned'>Assigned</h3>
                            <Link to="/saleStaffDelivered" className="SaleStaff">
                                Sale Staff
                            </Link>
                            <Link to="/deliveryStaffDelivered" className="DeliveryStaff">
                                Delivery Staff
                            </Link>

                        </ul>
                    </div>

                </div>
                <div className='DeliveryStaffDelivered'>
                    <DeliveryStaffDelivered />
                </div>

            </div>
        </div>
    )
}

export default DeliveredAssigned