import React, { useEffect, useState } from 'react';
import './UserProfileContent.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfileContent = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const accountId = localStorage.getItem('accountId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the authentication token from localStorage
        const authToken = localStorage.getItem('authToken');
        console.log(authToken)

        // Make sure there's a token before attempting to fetch user data
        if (!authToken) {
          // If no token found, navigate to login page
          navigate('/login');
          return;
        }

        // API endpoint for fetching user account details
        const accountDetailsUrl = `http://localhost:8080/auth/account/view-account-details/${accountId}`;

        // Fetch user data from the API
        const response = await axios.get(accountDetailsUrl, {
          headers: {
            Authorization: `Bearer ${authToken}` // Include the token as a Bearer token
          }
        });

        // Set the user data in state
        setUserData(response.data.result);
      } catch (error) {
        console.error('Error fetching user data:', error);

        // Handle error if fetching user data fails
      }
    };

    // Call the fetchUserData function when component mounts
    fetchUserData();
  }, [navigate]); // Dependency array with navigate to ensure it's watched for changes

  const handleLogout = async () => {
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
      const response = await axios.post(logoutUrl, null, {
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

  const handleClickOrderList = () => {
    navigate('/orderlist');
  };

  if (!userData) {
    return null; // Render nothing while fetching user data
  }

  return (
    <div className='user-profile-content-container'>
      <div className='action-button'>
        <button onClick={handleClickOrderList}>Orders</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <div className='profile-detail'>
        <div className='profile-image'>
          <img
            src='https://flatonthespot.com/wp-content/uploads/2020/02/platinum2.png'
            alt='UserMembership'
          />
        </div>
        <div className='profile-text'>
          <div className='profile-information'>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.customerResponse.email}</p>
            <p>Password: *********</p>
            <p>Phone Number: {userData.customerResponse.phone}</p>
          </div>
          <div className='membership-detail'>
            <p>Membership Level: {userData.customerResponse.memberLevel}</p>
            <p>Membership Points: {userData.customerResponse.point}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileContent;
