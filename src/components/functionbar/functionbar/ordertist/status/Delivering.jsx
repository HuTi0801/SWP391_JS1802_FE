import React from 'react'
import "../OrderListPage.css"
import { Link } from 'react-router-dom';
const Delivering = () => {
    return (
        <>
            <h1>OrderList</h1>
            <div className="OrderList-container">
                <hr className="vertical-line" />
                <div>
                    <ul className="url_Status">
                        <h3 className='Status'>Status</h3>
                        <Link to="/orderlist" className="All">
                            All
                        </Link>
                        <Link to="/pending" className="Pending">
                            Pending
                        </Link>

                        <Link to="/confirm" className="Confirm">
                            Confirm
                        </Link>
                        <Link to="/delivering" className="Delivering">
                            Delivering
                        </Link>
                        <Link to="/delivered" className="Delivered">
                            Delivered
                        </Link>
                        <Link to="/canceled" className="Canceled">
                            Canceled
                        </Link>
                    </ul>
                </div>
            </div>
            <div className='OrderList'>
                <div className="OrderID">
                    <span> Order ID:</span>
                    <p></p>
                </div>
                <div className="TotalPrice">
                    <span>Total Price:</span>
                    <p></p>
                </div>
                <div className="SaleStaffID">
                    <span>Sale Staff ID:</span>
                    <p></p>
                </div>
                <div className="DeliveryStaffID">
                    <span>Delivery Staff ID:</span>
                    <p></p>
                </div>
                <div className="ConfirmStatus">
                    <span>Confirm Status:</span>
                    <p></p>
                </div>
                <div className="Start_Date">
                    <span>Start Date:</span>
                    <p></p>
                </div>
                <div className="End_Date">
                    <span>End Date:</span>
                    <p></p>
                </div>
                <Link to="/deliveringAssigned" className="Assigned">
                    Assigned
                </Link>
                <Link to="/orderDetail" className="ViewDetails">
                    View Details
                </Link>
            </div>
        </>
    )
}

export default Delivering