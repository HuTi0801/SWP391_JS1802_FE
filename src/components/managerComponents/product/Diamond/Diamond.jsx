import React from 'react'
import { Link } from 'react-router-dom';
import "./Diamond.css";
import ManagerHeader from '../../../../components/managerComponents/header/ManagerHeader';
import Functionbar from '../../../../components/managerComponents/functionbar/Functionbar';
import DiamondInfo from '../../../../components/managerComponents/product/Diamond/DiamondInfo';
const Diamond = () => {
    return (
        <>
            <ManagerHeader />
            <Functionbar />
            <div className='diamond-container'>

                <div className='create'>

                    <h1>Diamond Product List</h1>

                    <img src="https://cdn-icons-png.freepik.com/256/1828/1828817.png?semt=ais_hybrid"
                        alt='add icon' height={20} width={20}>
                    </img>



                    <Link to="/CreateDiamond" className="createDiamond">
                        Create
                    </Link>

                </div>
                <DiamondInfo />

            </div>

        </>
    )
}

export default Diamond