import React from 'react'
import './OrderDetailContent.css'

const OrderDetailContent = () => {

  const handleClickCancelOrder = () => {

  }

  return (
    <div className='order-detail-content-container'>
      <div className='title'>
        <p>ORDER DETAIL</p>
      </div>
      <div className='order-detail-information'>
        <div className='detail-information-container'>
        <p>Order ID: </p>
        <p>Total Price: </p>
        <p>Deliver To: </p>
        <p>Order Creation Date: </p>
        <p>Delivered Date: </p>
        </div>
      </div>
      <div className='order-product-list'>
        <ul>
          <li>
            <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="altimage" />
            <span className='product-information'>
              <p>Product Name: </p>
              <p>Quantity: </p>
              <p>Unit Price: </p>
            </span>
          </li>
          <li>
            <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="altimage" />
            <span className='product-information'>
              <p>Product Name: </p>
              <p>Quantity: </p>
              <p>Unit Price: </p>
            </span>
          </li>
          <li>
            <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="altimage" />
            <span className='product-information'>
              <p>Product Name: </p>
              <p>Quantity: </p>
              <p>Unit Price: </p>
            </span>
          </li>
          <li>
            <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="altimage" />
            <span className='product-information'>
              <p>Product Name: </p>
              <p>Quantity: </p>
              <p>Unit Price: </p>
            </span>
          </li>
          
        </ul>
      </div>
      <div className='status-and-button'>
        <span>Status: Pending</span>
        <button onClick={handleClickCancelOrder}>CANCEL ORDER</button>
      </div>
    </div>
  )
}

export default OrderDetailContent