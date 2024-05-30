import React from 'react';
import './CartDetail.css';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const CartDetail = ({ TestData }) => {
    const navigate = useNavigate();


    const handleRemoveCart = () => {
    }

    const handleMinusQuantity = () => {

    }

    const handleAddQuantity = () => {

    }
    const handleClickChooseOther = () => {
        navigate('/productlist');
    }

    const handleClickPayment = () => {
        navigate('/payment');
    }

    

    return (
        <div className='cart-detail-container'>

            <div className='cart-table'>
                <table>
                    <thead>
                        <tr>
                            <th className='cart-id'>
                                CartID
                            </th>
                            <th className='product'>
                                Product
                            </th>
                            <th className='quantity'>
                                Quantity
                            </th>
                            <th className='unit-price'>
                                Unit Price
                            </th>
                            <th className='amount'>
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='product-cart-id'>
                                01
                            </td>
                            <td className='product-info'>
                                <img src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp" alt="altimage" className='product-image' />
                                <p>Diamond Whir2, adas5CZ2134</p>
                                <DeleteOutlineTwoToneIcon className='remove-cart' onClick={handleRemoveCart} />
                            </td>
                            <td className='product-quantity'>
                                <RemoveIcon className='minus-quantity' onClick={handleMinusQuantity} />
                                1
                                <AddIcon className='add-quantity' onClick={handleAddQuantity} />
                            </td>
                            <td className='product-unit-price'>
                                29999
                            </td>
                            <td className='product-amount'>
                                2652414
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='total-price'>
                <h2>Total: 4000000đ</h2>
            </div>
            <div className='action-button'>
                <button className='choose-other' onClick={handleClickChooseOther}>CHOOSE OTHER ITEMS</button>
                <button className='payment' onClick={handleClickPayment}>PAYMENT</button>
            </div>

        </div>
    )
}

export default CartDetail