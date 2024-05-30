import React from 'react'
import './OrderListContent.css'
import { useNavigate } from 'react-router-dom'

const OrderListContent = () => {
    const navigate = useNavigate();

    const handleClickOrderDetail = () => {
        navigate('/orderdetail')
    }

    return (
        <div className='order-list-content-container'>
            <div className='order-list-content'>
                <div className='order-list-filter'>
                    This is Filter for Order List <br />
                    Page will filter by: Order Create Date <br />
                    Or can filter by search OrderID
                </div>
                <ul className='list-order'>
                    <li className='order-detail-preview'>
                        <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="altimage" className='order-image' />
                        <div className='order-info'>
                            <p>OrderID:</p>
                            <p>Product:</p>
                            <p>Order Creation Date:</p>
                        </div>
                        <div className='status-and-view'>
                            <span>Status: Pending</span>
                            <button onClick={handleClickOrderDetail}>View Detail</button>
                        </div>
                    </li>
                    <li className='order-detail-preview'>
                        <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="altimage" className='order-image' />
                        <div className='order-info'>
                            <p>OrderID:</p>
                            <p>Product:</p>
                            <p>Order Creation Date:</p>
                        </div>
                        <div className='status-and-view'>
                            <span>Status:  Pending</span>
                            <button onClick={handleClickOrderDetail}>View Detail</button>
                        </div>
                    </li>
                    <li className='order-detail-preview'>
                        <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="altimage" className='order-image' />
                        <div className='order-info'>
                            <p>OrderID:</p>
                            <p>Product:</p>
                            <p>Order Creation Date:</p>
                        </div>
                        <div className='status-and-view'>
                            <span>Status:  Pending</span>
                            <button onClick={handleClickOrderDetail}>View Detail</button>
                        </div>
                    </li>
                    <li className='order-detail-preview'>
                        <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="altimage" className='order-image' />
                        <div className='order-info'>
                            <p>OrderID:</p>
                            <p>Product:</p>
                            <p>Order Creation Date:</p>
                        </div>
                        <div className='status-and-view'>
                            <span>Status:  Pending</span>
                            <button onClick={handleClickOrderDetail}>View Detail</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default OrderListContent