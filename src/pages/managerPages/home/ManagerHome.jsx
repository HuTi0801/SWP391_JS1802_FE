import React from 'react'
import ManagerHeader from '../../../components/managerComponents/header/ManagerHeader';
import Functionbar from '../../../components/managerComponents/functionbar/Functionbar';
import HomeCoponents from '../../../components/managerComponents/home/HomeCoponents';
const ManagerHome = () => {
    return (
        <> <ManagerHeader />
            <Functionbar />
            <div className='ManagerHome-content'>
                <HomeCoponents />

            </div>
        </>
    )
}

export default ManagerHome