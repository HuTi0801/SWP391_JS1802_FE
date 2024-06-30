import React from 'react'
import './AdminSideBar.css'
import { useNavigate } from 'react-router-dom'

const AdminSideBar = () => {
  const navigate = useNavigate()

  const handleClickLogOut = () => {
    navigate('/stafflogin');
  }


  return (
    <div className='staff-side-bar-container'>
      <div className='side-bar-items'>
        <button onClick={handleClickLogOut}>LOG OUT</button>
      </div>
    </div>
  )
}

export default AdminSideBar