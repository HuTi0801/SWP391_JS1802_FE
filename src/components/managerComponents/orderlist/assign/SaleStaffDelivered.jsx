import React from 'react'
import "./assign.css"
import { Link } from 'react-router-dom';
const SaleStaffDelivered = () => {
    return (
        <div><h1>Sale Staff List</h1>
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
            </div>


        </div>
    )
}

export default SaleStaffDelivered