import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ManagementAccountDetailsContent.css';
const ManagementAccountDetailsContent = () => {
    const [managementAccountDetails, setManagementDetails] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const authToken = localStorage.getItem('authToken');
    useEffect(() => {
        const fetchManagementAccountAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/account/view-account-details/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                    }
                });
                if (response.data.isSuccess) {
                    setManagementDetails(response.data.result);
                } else {
                    console.error('Failed to fetch Management Account Details:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching Management  Account Details:', error);
            } finally {
                setLoading(false);
            }
        };


        fetchManagementAccountAccount();
    }, [managementAccountDetails]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!managementAccountDetails) {
        return <p> Management Account's Info Details not found</p>;
    }

    return (
        <>

            <div className="Management_account-detail-container">
                <h1>MANAGEMENT  ACCOUNT DETAILS</h1>
                <div className="Management_account-detail">
                    <div className="left-section">
                        <div className="account-avatar">
                            <img src="avatar-placeholder.png" alt="Avatar" />
                        </div>
                        <div className="Management_account-info">
                            <p>Username: {managementAccountDetails.username}</p>
                            <p>Account Type: {managementAccountDetails.role}</p>
                        </div>

                    </div>
                    <div className="right-section">

                        <div className="Management_account-details-box">

                            <div className="Management_account_FullName">
                                <label>Full Name:</label>
                                <p>{managementAccountDetails.lastName} {managementAccountDetails.firstName}</p>
                            </div>

                            <div className="Management_account_FirstName">
                                <label>First Name:</label>
                                <p>{managementAccountDetails.firstName}</p>
                            </div>

                            <div className="Management_account_LastName">
                                <label>Last Name:</label>
                                <p>{managementAccountDetails.lastName}</p>
                            </div>

                            {managementAccountDetails.active === true ? (

                                <p className="account-status">Account Status: <span className="Management-status"> Active </span></p>

                            ) : (
                                <p>Wrong status account</p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ManagementAccountDetailsContent