import React from 'react'
import './DeliverySideBar.css'
import { useNavigate } from 'react-router-dom'

const DeliverySideBar = () => {
  const navigate = useNavigate()

  const handleClickLogOut = () => {
    navigate('/login');
  }


  return (
    <div className='staff-side-bar-container'>
      <p>DELIVERY STAFF</p>

      <div className='side-bar-items'>
        <button onClick={handleClickLogOut}>LOG OUT</button>
      </div>
    </div>
  )
}

export default DeliverySideBar