import React, { useEffect, useState } from 'react';
import "./assign.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import ManagerHeader from "../../../managerComponents/header/ManagerHeader.jsx";
import Functionbar from "../../../managerComponents/functionbar/Functionbar.jsx";
import { useParams } from 'react-router-dom';
const ConfirmAssigned = () => {
    const [confirmAssigned, setConfirmAssigned] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedStaff, setSelectedStaff] = useState(new Set());
    const [warning, setWarning] = useState('');
    const [order, setOrder] = useState(null);
    const { id } = useParams();


    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/orders/get-order-${id}`);
                setOrder(response.data.result);
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchConfirmAssigned = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/account/get-active-delivery-staff-and-order-counts-list');
                setConfirmAssigned(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
        fetchConfirmAssigned();
    }, [confirmAssigned]);

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


    const handleAssignClick = async () => {
        if (selectedStaff.size === 0) {
            setWarning('Please choose delivery staff before assign');
        } else if (selectedStaff.size > 1) {
            setWarning('Please select only one delivery staff');
        } else {
            try {
                const response = await axios.post
                    (`http://localhost:8080/auth/account-order/assign-staff-to-order?accountId=${Array.from(selectedStaff)[0]}&orderId=${order?.orderId}`);
                if (response.data.isSuccess) {
                    alert("Assign Delivery Staff Successfully! ");
                }
            } catch (error) {
                console.error('Error assigning staff:', error);
                setWarning('Failed to assign delivery staff. Please try again.');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <h1>Delivery Staff List</h1>
            <div className="ConfirmAssigned-container">
                <div className='Pendingcontainer'>
                    <hr className="vertical-line" />
                    <div>
                        <ul className="url_Status">
                            <Link to="/managerorderlist" className="All">
                                All
                            </Link>
                            <Link to="/confirm" className="Confirm">
                                Confirm
                            </Link>
                        </ul>
                    </div>
                </div>
                <div>
                    <button className='ConfirmAssigned' onClick={handleAssignClick}>
                        Assign
                    </button>
                    {warning && <div className="Confirmwarning">{warning}</div>}
                    <table>
                        <thead>
                            <tr>
                                <th>AccountId</th>
                                <th>OrderId</th>
                                <th>Username</th>
                                <th>Number of Orders</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {confirmAssigned.map((confirmed) => (
                                <tr key={confirmed.accountId}>
                                    <td className='ID'>{confirmed.accountId}</td>
                                    <td className='OrderID'>{order?.orderId}</td>
                                    <td className='Username'>{confirmed.username}</td>
                                    <td className='OrderCount'>{confirmed.orderCount}</td>
                                    <td>
                                        <input
                                            className='CheckApp'
                                            type='checkbox'
                                            checked={selectedStaff.has(confirmed.accountId)}
                                            onChange={() => handleCheckboxChange(confirmed.accountId)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ConfirmAssigned;