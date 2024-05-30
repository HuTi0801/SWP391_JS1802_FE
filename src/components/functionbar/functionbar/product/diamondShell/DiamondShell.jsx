import React from 'react'
import { Link } from 'react-router-dom';
import DiamondShellInfo from "./DiamondShellInfo";
import "./Diamondshell.css"
const DiamondShell = () => {
    return (
        <>
            <div className='diamondshell-container'>

                <div className='create'>
                    <h1>DiamondShell Product List</h1>

                    <img src="https://cdn-icons-png.freepik.com/256/1828/1828817.png?semt=ais_hybrid"
                        alt='add icon' height={20} width={20}>
                    </img>


                    <Link to="/createDiamondShell" className="createDiamondShell">
                        Create
                    </Link>
                </div>
                <DiamondShellInfo />

            </div>
        </>


    );
}

export default DiamondShell