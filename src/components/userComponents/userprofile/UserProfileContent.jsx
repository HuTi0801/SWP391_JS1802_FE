import React from 'react';
import './UserProfileContent.css';
import { useNavigate } from 'react-router-dom';

const UserProfileContent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleClickOrderList = () => {
    navigate('/orderlist');
  };

  return (
    <div className='user-profile-content-container'>
      <div className='action-button'>
        <button onClick={handleClickOrderList}>Orders </button>
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
            <p>First Name: Khoa</p>
            <p>Last Name: Tran</p>
            <p>Username: ktn12</p>
            <p>Email: acbc@gmail.com</p>
            <p>Password: *********</p>
            <p>Phone Number: +1234567890</p>
          </div>
          <div className='membership-detail'>
            <p>Membership Level: Platinum</p>
            <p>Membership Points: 1000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileContent;
