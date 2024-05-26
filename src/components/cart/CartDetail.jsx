import React from 'react';
import './CartDetail.css';

const CartDetail = ({ TestData }) => {
    return (
        <div className='cart-detail-container'>
            <div className='cart-table'>
                <table>
                    <tr>
                        <td>
                            CartID
                        </td>
                        <td>
                            Product
                        </td>
                        <td>
                            Quantity
                        </td>
                        <td>
                            Unit Price
                        </td>
                        <td>
                            Amount
                        </td>
                    </tr>
                </table>
            </div>
            <div className='action-button'>
                <button className='choose-other'>CHOOSE OTHER ITEMS</button>
                <button className='payment'>PAYMENT</button>
            </div>

        </div>
    )
}

export default CartDetail