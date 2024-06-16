import React from 'react'
import { Link } from 'react-router-dom';
import "./assign.css"
import DeliveryStaffDelivering from './DeliveryStaffDelivering';
const DeliveringAssigned = () => {
    return (
        <><h1>Delivery Staff List</h1>
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
                <div className='DeliveryStaffDelivering'>
                    <DeliveryStaffDelivering />
                </div>

            </div>

        </>
    )
}

export default DeliveringAssigned