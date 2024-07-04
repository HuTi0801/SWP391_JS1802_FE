import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './BanCustomerAccountComponents.css';
const BanCustomerAccountComponents = () => {
    const [customerAccountDetails, setCustomerAccountDetails] = useState([]);
    const { id } = useParams();
    const [note, setNote] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authToken = localStorage.getItem('authToken');
    const HandleUnBan = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8080/auth/account/ban-account/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                }
            });
            if (response.data.isSuccess) {
                alert("Ban id: " + id + " successfully!!");
                navigate("/CustomerAccountDetails/" + id);
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
                const response = await axios.get(`http://localhost:8080/auth/account/view-account-details/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                    }
                });
                if (response.data.isSuccess) {
                    setCustomerAccountDetails(response.data.result);
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

    if (!customerAccountDetails) {
        return <p>Customer Account Info Details not found</p>;
    }


    return (
        <>

            <div className="account-detail-container">
                <h1>CUSTOMER ACCOUNT</h1>
                <div className="account-detail">
                    <div className="left-section">
                        <div className="account-avatar">
                            <img src="avatar-placeholder.png" alt="Avatar" />
                        </div>
                        <div className="account-info">
                            <p>Username: {customerAccountDetails.username}</p>

                            <p>Account Type: {customerAccountDetails.role}</p>
                        </div>

                    </div>
                    <div className="right-section">
                        <div className="account-actions">
                            <button className="Ban-btn" onClick={() => HandleUnBan(customerAccountDetails.id)}>
                                <p className="Ban">CONFIRM</p></button>
                        </div>
                        <div className="account-details-box">
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

export default BanCustomerAccountComponents