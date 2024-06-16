import React from 'react'
import "./assign.css"
import { Link } from 'react-router-dom';
const ConfirmAssigned = () => {
    return (
        <> <h1>Delivery Staff List</h1>
            <div className="ConfirmAssigned-container">
                <div className='Pendingcontainer'>
                    <hr className="vertical-line" />
                    <div>
                        <ul className="url_Status">
                            <Link to="/orderlist" className="All">
                                All
                            </Link>
                            <Link to="/confirm" className="Confirm">
                                Confirm
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='ID'>3</td>
                                <td className='FirstName'>Nguyễn </td>
                                <td className='LastName'>Văn A</td>
                                <td className='check_Attendence'>Attendence</td>
                                <td>2</td>
                                <td><input className='CheckApp' type='checkbox' /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div></>
    )
}

export default ConfirmAssigned