import React from 'react'
import "./PromotionInfoDetails.css";
import { Link } from 'react-router-dom';
const PromotionInfoDetails = () => {
    return (
        <><h1> Promotion Details</h1>
            <div className="promotion-infodetails-container">
                <div>
                    <div className="ProductionName">
                        <span>PRODUCT NAME:</span>
                        <p></p>
                    </div>
                    <div className="DiscountPercent">
                        <span>DISCOUNT PERCENT (%):</span>
                        <p></p>
                    </div>
                    <div className="MemberLevel">
                        <span>MEMBER LEVEL:</span>
                        <p></p>
                    </div>

                    <div className="Startdate">
                        <span>START DATE:</span>
                        <p></p>
                    </div>
                    <div className="Enddate">
                        <span>END DATE:</span>
                        <p></p>
                    </div>
                    <div className="Type">
                        <span>TYPE:</span>
                        <p></p>
                    </div>
                    <div className="Description">
                        <span>DESCRIPTION:</span>
                        <p></p>
                    </div>
                </div>
                <Link to='/updatePromotion' className='PromotionUpdate'>
                    Update
                </Link>
            </div>
        </>
    )
}

export default PromotionInfoDetails