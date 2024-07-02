import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './CustomerAccountDetailsContent.css';
import { Link } from 'react-router-dom';
const CustomerAccountDetailsContent = () => {
  const [customerAccountDetails, setCustomerAccountDetails] = useState([]);
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
    const fetchCustomerAccount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auth/account/view-account-details/${id}`);
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
  }, [customerAccountDetails]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!customerAccountDetails) {
    return <p>Customer Account Info Details not found</p>;
  }


  return (
    <>
      <h1>CUSTOMER ACCOUNT DETAILS</h1>
      <div className="account-detail-container">
        <div className="account-detail">
          <div className="left-section">
            <div className="account-avatar">
              <img src="avatar-placeholder.png" alt="Avatar" />
            </div>
            <div className="account-info">
              <p>Username: {customerAccountDetails.username}</p>
              <p>Membership Points: {customerAccountDetails.customerResponse.point}</p>
              <p>Account Type: {customerAccountDetails.role}</p>
            </div>

          </div>
          <div className="right-section">
            <div className="account-actions">
              <Link to={`/banCustomerAccount/${customerAccountDetails.id}`} className="ban-btn">
                BAN
              </Link>
              <button className="unban-btn" onClick={() => HandleUnBan(customerAccountDetails.id)}>
                <p className="unban">UNBAN</p></button>
            </div>
            <div className="account-details-box">

              <div className="account_FullName">
                <label>Full Name:</label>
                <p>{customerAccountDetails.lastName} {customerAccountDetails.firstName}</p>
              </div>

              <div className="account_FirstName">
                <label>First Name:</label>
                <p>{customerAccountDetails.firstName}</p>
              </div>

              <div className="account_LastName">
                <label>Last Name:</label>
                <p>{customerAccountDetails.lastName}</p>
              </div>

              <div className="account_Email">
                <label>Email:</label>
                <p> {customerAccountDetails.customerResponse.email}</p>
              </div>

              <div className="account_PhoneNumber">
                <label>Phone Number:</label>
                <p>{customerAccountDetails.customerResponse.phone}</p>
              </div>

              <div className="account_MembershipLevel">
                <label>Membership Level: </label>
                <p>{customerAccountDetails.customerResponse.memberLevel}</p>
              </div>

              {customerAccountDetails.active === true ? (

                <p className="account-status">Account Status: <span className="active-status_Active"> Active </span></p>

              ) : (
                <p className="account-status">Account Status: <span className="active-status_InActive"> InActive </span></p>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerAccountDetailsContent;