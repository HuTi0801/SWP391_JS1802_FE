import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Sale_StaffAccountDetailsContent.css'
const Sale_StaffAccountDetailsContent = () => {
    const [sale_StaffAccountDetails, setSale_StaffDetails] = useState([]);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const authToken = localStorage.getItem('authToken');
    const HandleUnBan = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8080/auth/account/unban-account/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                }
            });
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

        const fetchSale_StaffAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/account/view-account-details/${id}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
                    }
                });
                if (response.data.isSuccess) {
                    setSale_StaffDetails(response.data.result);
                } else {
                    console.error('Failed to fetch Sale_Staff Account Details:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching Sale_Staff Account Details:', error);
            } finally {
                setLoading(false);
            }
        };


        fetchSale_StaffAccount();
    }, [sale_StaffAccountDetails]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!sale_StaffAccountDetails) {
        return <p>Sale Staff Account's Info Details not found</p>;
    }

    return (
        <>
            <div className="Sale_Staff_account-detail-container">
                <h1>Sale STAFF ACCOUNT DETAILS</h1>
                <div className="Sale_Staff_account-detail">
                    <div className="left-section">
                        <div className="account-avatar">
                            <img src="avatar-placeholder.png" alt="Avatar" />
                        </div>
                        <div className="Sale_Staff_account-info">
                            <p>Username: {sale_StaffAccountDetails.username}</p>
                            <p>Account Type: {sale_StaffAccountDetails.role}</p>
                        </div>

                    </div>
                    <div className="right-section">
                        <div className="Sale_Staff_account-actions">
                            <Link to={`/banSaleStaffAccount/${sale_StaffAccountDetails.id}`} className="ban-btn">
                                BAN
                            </Link>
                            <button className="Sale_unban-btn" onClick={() => HandleUnBan(sale_StaffAccountDetails.id)}>
                                <p className="Sale_unban">UNBAN</p></button>
                        </div>
                        <div className="Sale_Staff_account-details-box">

                            <div className="Sale_Staff_account_FullName">
                                <label>Full Name:</label>
                                <p>{sale_StaffAccountDetails.lastName} {sale_StaffAccountDetails.firstName}</p>
                            </div>

                            <div className="Sale_Staff_account_FirstName">
                                <label>First Name:</label>
                                <p>{sale_StaffAccountDetails.firstName}</p>
                            </div>

                            <div className="Sale_Staff_account_LastName">
                                <label>Last Name:</label>
                                <p>{sale_StaffAccountDetails.lastName}</p>
                            </div>

                            {sale_StaffAccountDetails.active === true ? (

                                <p className="account-status">Account Status: <span className="Sale_Staff_active-status_Active"> Active </span></p>

                            ) : (
                                <p className="account-status">Account Status: <span className="Sale_Staff_active-status_InActive"> InActive </span></p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sale_StaffAccountDetailsContent