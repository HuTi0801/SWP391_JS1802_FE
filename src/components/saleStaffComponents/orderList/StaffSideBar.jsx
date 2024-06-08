import React from 'react'
import './StaffSideBar.css'
import { useNavigate } from 'react-router-dom'

const StaffSideBar = () => {
    const navigate = useNavigate()

    const handleClickLogOut = () => {
        navigate('/login');
    }


  return (
    <div className='staff-side-bar-container'>
        <div className='side-bar-items'>
            <button onClick={handleClickLogOut}>LOG OUT</button>
        </div>
    </div>
  )
}

export default StaffSideBar