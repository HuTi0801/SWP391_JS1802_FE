import React from 'react'
import './UserProfile.css'
import Footer from '../../../components/userComponents/footer/Footer'
import UserProfileContent from '../../../components/userComponents/userprofile/UserProfileContent'
import Header from '../../../components/userComponents/header/Header'
import Navbar from '../../../components/userComponents/header/navbar/Navbar'

const UserProfile = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <UserProfileContent />
            <Footer />
        </div>
    )
}

export default UserProfile