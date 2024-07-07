import React, { useEffect, useState } from 'react';
import './StaffHeader.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StaffHeader = () => {
    const navigate = useNavigate();
    const accountId = localStorage.getItem('accountId');
    const [staffDetail, setStaffDetail] = useState(null);

    useEffect(() => {
        const getStaffDetail = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    navigate('/login');
                    return;
                }

                const accountDetailsUrl = `http://localhost:8080/auth/account/view-account-details/${accountId}`;
                const response = await axios.get(accountDetailsUrl, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                setStaffDetail(response.data.result);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login');
            }
        };

        getStaffDetail();
    }, [navigate, accountId]);

    const handleClickHome = () => {
        navigate('/salestaff');
    };

    return (
        <div className='sale-staff-header-container'>
            <div className='header-address'>
                <p>Address: ABC Street, Green Avenue, CED City</p>
                <p>Contact Number: 0902-112-442</p>
            </div>
            <div className='header-logo'>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFeW7Al-OCRSiTrH0EHOILfq4VpnBmWlMkA&usqp=CAU"
                    alt="Diamond Logo"
                    className='logo-image'
                    onClick={handleClickHome}
                />
            </div>
            <div className='header-right'>
                {staffDetail ? (
                    <div className='staff-information'>
                        <p>Full Name: {staffDetail.firstName + " " + staffDetail.lastName}</p>
                        <p>Username: {staffDetail.username}</p>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default StaffHeader;
