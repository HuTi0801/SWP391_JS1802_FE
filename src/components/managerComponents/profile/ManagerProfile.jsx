import React from 'react';
import './ManagerProfile.css';
import { useNavigate } from 'react-router-dom';
import ManagerHeader from "../../managerComponents/header/ManagerHeader"
import Functionbar from "../../managerComponents/functionbar/Functionbar"
const ManagerProfile = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/stafflogin');
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