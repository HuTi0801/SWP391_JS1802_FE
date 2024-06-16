import React from 'react'
import "./assign.css"
import { Link } from 'react-router-dom';
const SaleStaffDelivering = () => {
    return (
        <>
            <h1>Sale Staff List</h1>
            <div className="DeliveringAssigned-container">
                <div className='Deliveringcontainer'>
                    <hr className="vertical-line" />
                    <div>
                        <ul className="url_Status">
                            <Link to="/orderlist" className="All">
                                All
                            </Link>
                            <Link to="/delivering" className="Delivering">
                                Delivering
                            </Link>
                            <h3 className='assigned'>Assigned</h3>
                            <Link to="/saleStaffDelivering" className="SaleStaff">
                                Sale Staff
                            </Link>
                            <Link to="/deliveryStaffDelivering" className="DeliveryStaff">
                                Delivery Staff
                            </Link>

                        </ul>
                    </div>

                </div>
            </div>

        </>
    )
}

export default SaleStaffDelivering