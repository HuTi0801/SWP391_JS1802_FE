import React from 'react'
import "./assign.css"
import { Link } from 'react-router-dom';
const PendingAssigned = () => {
    return (
        <>

            <h1>Sale Staff List</h1>
            <div className="PendingAssigned-container">
                <div className='Pendingcontainer'>
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
                        </ul>
                    </div>
                </div>

                <div>
                    <button className='Assigned'>
                        Assigned
                    </button>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Status</th>
                                <th>Number of Orders</th>
                                <th>Start_Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='ID'>1</td>
                                <td className='FirstName'>Ngô</td>
                                <td className='LastName'>Doãn Đạt</td>
                                <td className='check_Attendence'>Attendence</td>
                                <td>1</td>
                                <td className='Start_Date'>05/07/2024</td>
                                <td><input className='CheckApp' type='checkbox' /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default PendingAssigned