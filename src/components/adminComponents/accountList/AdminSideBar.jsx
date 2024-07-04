import React from 'react'
import './AdminSideBar.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const AdminSideBar = () => {
  const navigate = useNavigate()

  const handleClickLogOut = async () => {
    // Retrieve the authentication token from localStorage
    const authToken = localStorage.getItem('authToken');

    // Make sure there's a token before attempting to log out
    if (!authToken) {
      // Handle case where token is not found
      console.error('No authentication token found');
      return;
    }

    // API endpoint for logging out (adjust URL as per your backend)
    const logoutUrl = 'http://localhost:8080/auth/account/logout';

    try {
      // Send a POST request to logout endpoint with token as a header
      const response = await axios.post(logoutUrl, {}, {
        headers: {
          Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
        }
      });

      // Upon successful logout from the server, clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('customerId');
      localStorage.removeItem('accountId');

      // Navigate to the login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle error if logout request fails
    }
  };


  return (
    <div className='staff-side-bar-container'>
      <div className='side-bar-items'>
        <button onClick={handleClickLogOut}>LOG OUT</button>
      </div>
    </div>
  )
}

export default AdminSideBar