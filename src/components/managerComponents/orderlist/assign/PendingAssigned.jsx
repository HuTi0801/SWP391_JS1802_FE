
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
import "./assign.css"; // Ensure correct path to your CSS file
import { useParams } from 'react-router-dom';
const PendingAssigned = () => {
    const [pendingAssigned, setPendingAssigned] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Track loading state
    const [selectedStaff, setSelectedStaff] = useState(new Set()); // Track selected checkboxes
    const [warning, setWarning] = useState(''); // Warning message state
    const [order, setOrder] = useState([]);
    const { orderId } = useParams();


    useEffect(() => {
        const fetchPendingAssigned = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/account/get-active-sale-staff-and-order-counts-list');

                setPendingAssigned(response.data);
                console.log(response.data);

            } catch (error) {
                setError(error.message); // Catch network errors or other exceptions
            } finally {
                setLoading(false); // Update loading state regardless of success or failure
            }
        };

        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/orders/get-order-${orderId}`);
                if (response.data.isSuccess) {
                    setOrder(response.data.result);
                } else {
                    console.error('Failed to fetch order:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
        fetchPendingAssigned();

    }, [pendingAssigned]);


    const handleCheckboxChange = (accountId) => {
        setSelectedStaff(prev => {
            const updated = new Set(prev);
            if (updated.has(accountId)) {
                updated.delete(accountId);
            } else {
                updated.add(accountId);
            }
            return updated;
        });
    };
    if (loading) {
        return <div>Loading...</div>; // Optional: Show a loading indicator
    }

    if (error) {
        return <div>Error: {error}</div>; // Display error message if fetch failed
    }
    const handleAssignClick = async () => {
        if (selectedStaff.size === 0) {
            setWarning('Please choose sale staff before assign');
        } else if (selectedStaff.size > 1) {
            setWarning('Please select only one sale staff');
        } else {
            try {
                const response = await axios.post
                    (`http://localhost:8080/auth/account-order/assign-staff-to-order?accountId=${Array.from(selectedStaff)[0]}&orderId=${order?.orderId}`);
                if (response.data.isSuccess) {
                    alert("Assign Sale Staff Successfully! ");
                }
            } catch (error) {
                console.error('Error assigning staff:', error);
                setWarning('Failed to assign sale staff. Please try again.');
            }
        }
    };
    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <div className="PendingAssigned-container">
                <h1>Sale Staff List</h1>
                <div className='Pendingcontainer'>
                    <hr className="vertical-line" />
                    <div>
                        <ul className="url_Status">
                            <Link to="/managerorderlist" className="All">
                                All
                            </Link>

                            <Link to="/pending" className="Pending">
                                Pending
                            </Link>

                        </ul>
                    </div>
                </div>
                <div>
                    <button className='PendingAssigned' onClick={handleAssignClick}>
                        Assign
                    </button>
                    {warning && <div className="Pendingwarning">{warning}</div>}
                    <table>
                        <thead>
                            <tr>
                                <th>AccountId</th>
                                <th>Username</th>
                                <th>Number of Orders</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingAssigned.map((pending) => (


                                <tr key={pending.accountId}>
                                    <td className='ID'>{pending.accountId}</td>
                                    <td className='Username'>{pending.username}</td>
                                    <td className='OrderCount'>{pending.orderCount}</td>
                                    <td><input className='CheckApp' type='checkbox'
                                        checked={selectedStaff.has(pending.accountId)}
                                        onClick={() => handleCheckboxChange(pending.accountId)}
                                    /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PendingAssigned;
