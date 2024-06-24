import React, { useState } from 'react';
import "./Promotion.css";
import { Link } from 'react-router-dom';
import PromotionList from "../../../components/managerComponents/promotion/PromotionList"
import ManagerHeader from '../../../components/managerComponents/header/ManagerHeader';
import Functionbar from '../../../components/managerComponents/functionbar/Functionbar';
const Promotion = () => {

    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <div className='promotion-container'>

                <div className='create-promotion'>
                    <h1>Promotion List</h1>

                    <img src="https://cdn-icons-png.freepik.com/256/1828/1828817.png?semt=ais_hybrid"
                        alt='add icon' height={20} width={20}>
                    </img>



                    <Link to="/createPromotion" className="createPromotion">
                        Create
                    </Link>

                </div>
                <PromotionList />

            </div>

        </>
    )
}

export default Promotion