import React from 'react'
import ManagerHeader from '../../../components/managerComponents/header/ManagerHeader';
import Functionbar from '../../../components/managerComponents/functionbar/Functionbar';
const ManagerHome = () => {
    return (
        <> <ManagerHeader />
            <div className='ManagerHome-content'>

                <Functionbar />
            </div>
        </>
    )
}

export default ManagerHome