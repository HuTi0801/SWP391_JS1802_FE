import React from "react";
import "./ManagerHeader.css"
import { useNavigate } from 'react-router-dom';
const ManagerHeader = () => {
  const navigate = useNavigate();


  const handleClickHome = () => {
    navigate('/');
  }
  return (
    <>
      <div className="Managerheader-container">
        <div className="img">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFeW7Al-OCRSiTrH0EHOILfq4VpnBmWlMkA&usqp=CAU"
            alt="Diamond_App" height={60} width={70} onClick={handleClickHome} />
        </div>
      </div>


    </>
  );
};

export default ManagerHeader;

