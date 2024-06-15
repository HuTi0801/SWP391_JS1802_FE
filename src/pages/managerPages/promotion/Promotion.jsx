import React, { useState } from 'react';
import "./Promotion.css";
import { Link } from 'react-router-dom';
import PromotionList from "../../../components/managerComponents/promotion/PromotionList"
import ManagerHeader from '../../../components/managerComponents/header/ManagerHeader';
import Functionbar from '../../../components/managerComponents/functionbar/Functionbar';
const Promotion = () => {
    const [isListVisible, setIsListVisible] = useState(false);

    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible);
    };
    return (
        <>
            <ManagerHeader />
            <div className='promotion-container'>
                <Functionbar />
                <div className='create-promotion'>
                    <h1>Promotion List</h1>

                    <img src="https://cdn-icons-png.freepik.com/256/1828/1828817.png?semt=ais_hybrid"
                        alt='add icon' height={20} width={20}>
                    </img>



                    <Link to="/createPromotion" className="createPromotion">
                        Create
                    </Link>

                </div>
                <div className='filter-promotion'>
                    <div className='sub-filter-promotion'>
                        <img
                            src="https://t3.ftcdn.net/jpg/03/20/78/84/360_F_320788475_nEiLVViOBewea7taZWqNUR0lJAMTAaSo.jpg"
                            alt='add icon'
                            height={20}
                            width={20}
                        />
                        <p onClick={toggleListVisibility} style={{ cursor: 'pointer' }}>
                            Filter
                        </p>
                    </div>

                    {isListVisible && (
                        <ul className="url">
                            <li>
                                <Link to="/DiamondPromotion" className="Diamond_Promotion">
                                    Diamond
                                </Link>
                            </li>
                            <li>
                                <Link to="/DiamondShellPromotion" className="DiamondShell_Promotion">
                                    DiamondShell
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
                <PromotionList />

            </div>

        </>
    )
}

export default Promotion