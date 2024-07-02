import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './BanDeliveryStaffAccountComponents.css';
const BanDeliveryStaffAccountComponents = () => {
    const [delivery_StaffAccountDetails, setDelivery_StaffDetails] = useState([]);
    const { id } = useParams();
    const [note, setNote] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const HandleUnBan = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8080/auth/account/ban-account/${id}`);
            if (response.data.isSuccess) {
                alert("Ban id: " + id + " successfully!!");
                navigate("/Delivery_StaffAccountDetails/" + id);
            } else {
                console.error('Failed to unban account:', response.data.message);
            }
        } catch (error) {
            console.error('Failed to unban account:', error);
        }
    }

    useEffect(() => {
        const fetchCustomerAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/account/view-account-details/${id}`);
                if (response.data.isSuccess) {
                    setDelivery_StaffDetails(response.data.result);
                } else {
                    console.error('Failed to fetch Customer Account Details:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching Customer Account Details:', error);
            } finally {
                setLoading(false);
            }
        };


        fetchCustomerAccount();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!delivery_StaffAccountDetails) {
        return <p>Sale Staff Account Info Details not found</p>;
    }


    return (
        <>
            <h1>Delivery STAFF ACCOUNT</h1>
            <div className="Delivery_Staff-container">
                <div className="Delivery_Staff-detail">
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
                        <div className="Delivery_Staff_account-actions">
                            <button className="Delivery_Staff_Ban-btn" onClick={() => HandleUnBan(delivery_StaffAccountDetails.id)}>
                                <p className="Delivery_Staff_Ban">CONFIRM</p></button>
                        </div>
                        <div className="Delivery_Staff_account-details-box">
                            <textarea
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Enter text here"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BanDeliveryStaffAccountComponents