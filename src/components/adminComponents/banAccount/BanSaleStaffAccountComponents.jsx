import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './BanSaleStaffAccountComponents.css';
const BanSaleStaffAccountComponents = () => {
    const [sale_StaffAccountDetails, setSale_StaffDetails] = useState([]);
    const { id } = useParams();
    const [note, setNote] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const HandleUnBan = async (id) => {
        try {
            const response = await axios.post(`http://localhost:8080/auth/account/ban-account/${id}`);
            if (response.data.isSuccess) {
                alert("Ban id: " + id + " successfully!!");
                navigate("/Sale_StaffAccountDetails/" + id);
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
                    setSale_StaffDetails(response.data.result);
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

    if (!sale_StaffAccountDetails) {
        return <p>Sale Staff Account Info Details not found</p>;
    }


    return (
        <>
            <h1>SALE STAFF ACCOUNT</h1>
            <div className="Sale_Staff-container">
                <div className="Sale_Staff-detail">
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
                            <button className="Sale_Staff_Ban-btn" onClick={() => HandleUnBan(sale_StaffAccountDetails.id)}>
                                <p className="Sale_Staff_Ban">CONFIRM</p></button>
                        </div>
                        <div className="Sale_Staff_account-details-box">
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

export default BanSaleStaffAccountComponents