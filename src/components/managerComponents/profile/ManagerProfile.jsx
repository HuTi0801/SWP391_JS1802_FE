import React from 'react';
import './ManagerProfile.css';
import { useNavigate } from 'react-router-dom';
import ManagerHeader from "../../managerComponents/header/ManagerHeader"
import Functionbar from "../../managerComponents/functionbar/Functionbar"
import axios from 'axios';
const ManagerProfile = () => {

    const navigate = useNavigate();

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

    return (
        <>  <ManagerHeader />
            <Functionbar />
            <div className='user-profile-content-container'>

                <div className='action-button'>

                    <button onClick={handleLogout}>Log Out</button>
                </div>
                <div className='profile-detail'>
                    <div className='profile-image'>
                        <img
                            src='https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png'
                            alt='profile-image'
                        />
                    </div>
                    <div className='profile-text'>
                        <div className='profile-information'>
                            <p>First Name: Khoa</p>
                            <p>Last Name: Tran</p>
                            <p>Password: *********</p>
                            <p>Phone Number: +1234567890</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}

export default ManagerProfile