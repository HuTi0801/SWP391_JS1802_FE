import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Delivery_StaffAccountDetailsContent.css';
import { Link } from 'react-router-dom';
const Delivery_StaffAccountDetailsContent = () => {
    const [delivery_StaffAccountDetails, setDelivery_StaffDetails] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const HandleUnBan = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8080/auth/account/unban-account/${id}`);
            if (response.data.isSuccess) {
                alert("Unban id: " + id + " successfully!!");
            } else {
                console.error('Failed to unban account:', response.data.message);
            }
        } catch (error) {
            console.error('Failed to unban account:', error);
        }
    }
    useEffect(() => {
        const fetchDelivery_StaffAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/account/view-account-details/${id}`);
                if (response.data.isSuccess) {
                    setDelivery_StaffDetails(response.data.result);
                } else {
                    console.error('Failed to fetch Delivery_Staff Account Details:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching Delivery_Staff Account Details:', error);
            } finally {
                setLoading(false);
            }
        };


        fetchDelivery_StaffAccount();
    }, [delivery_StaffAccountDetails]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!delivery_StaffAccountDetails) {
        return <p>Delivery Staff Account's Info Details not found</p>;
    }

    return (
        <>
            <h1>DELIVERY STAFF ACCOUNT DETAILS</h1>
            <div className="Delivery_Staff_account-detail-container">
                <div className="Delivery_Staff_account-detail">
                    <div className="left-section">
                        <div className="account-avatar">
                            <img src="avatar-placeholder.png" alt="Avatar" />
                        </div>
                        <div className="Delivery_Staff_account-info">
                            <p>Username: {delivery_StaffAccountDetails.username}</p>
                            <p>Account Type: {delivery_StaffAccountDetails.role}</p>
                        </div>

                    </div>
                    <div className="right-section">
                        <div className="Delivery_account-actions">
                            <Link to={`/banDeliveryStaffAccount/${delivery_StaffAccountDetails.id}`} className="ban-btn">
                                BAN
                            </Link>
                            <button className="Delivery_unban-btn" onClick={() => HandleUnBan(delivery_StaffAccountDetails.id)}>
                                <p className="Delivery_unban">UNBAN</p></button>
                        </div>
                        <div className="Delivery_Staff_account-details-box">

                            <div className="Delivery_Staff_account_FullName">
                                <label>Full Name:</label>
                                <p>{delivery_StaffAccountDetails.lastName} {delivery_StaffAccountDetails.firstName}</p>
                            </div>

                            <div className="Delivery_Staff_account_FirstName">
                                <label>First Name:</label>
                                <p>{delivery_StaffAccountDetails.firstName}</p>
                            </div>

                            <div className="Delivery_Staff_account_LastName">
                                <label>Last Name:</label>
                                <p>{delivery_StaffAccountDetails.lastName}</p>
                            </div>

                            {delivery_StaffAccountDetails.active === true ? (

                                <p className="account-status">Account Status: <span className="Delivery_Staff_active-status_Active"> Active </span></p>

                            ) : (
                                <p className="account-status">Account Status: <span className="Delivery_Staff_active-status_InActive"> InActive </span></p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Delivery_StaffAccountDetailsContent