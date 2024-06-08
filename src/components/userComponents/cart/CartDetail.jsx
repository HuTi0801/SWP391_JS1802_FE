import React, { useEffect, useState } from 'react';
import './CartDetail.css';
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CartDetail = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState({ items: [] });
    const [diamondShell, setDiamondShell] = useState([]);
    const [diamond, setDiamond] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true); // Add loading state
    const customerID = 1;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`http://localhost:8080/cart/get-cart-by-customer-id/${customerID}`);
                const cartData = response.data;
                if (!cartData || !cartData.items) {
                    console.error('Cart data or cart items are undefined:', cartData);
                    return;
                }
                setCart(cartData);

                const diamondPromises = cartData.items
                    .filter(item => item.productType === "DIAMOND")
                    .map(item => axios.get(`http://localhost:8080/diamond/get-a-diamond-${item.productId}`));

                const diamondShellPromises = cartData.items
                    .filter(item => item.productType === "DIAMOND_SHELL")
                    .map(item => axios.get(`http://localhost:8080/diamond-shell/get-a-diamond-shell-${item.productId}`));

                const diamondResponses = await Promise.all(diamondPromises);
                const diamondData = diamondResponses.map(response => response.data.result);
                setDiamond(diamondData);

                const diamondShellResponses = await Promise.all(diamondShellPromises);
                const diamondShellData = diamondShellResponses.map(response => response.data.result);
                setDiamondShell(diamondShellData);

                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [customerID]);

    const calculateTotalPrice = () => {
        let total = 0;
        cart.items.forEach(item => {
            total += item.amount;
        });
        setTotalPrice(total);
    };

    useEffect(() => {
        // Calculate total price whenever cart items change
        calculateTotalPrice();
    }, [cart.items]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const handleMinusQuantity = (item) => {
        if (item.quantity > 0) {
            const newQuantity = item.quantity - 1;
            updateCartItemQuantity(item.productId, item.productType, newQuantity);
        }
    };

    const handleAddQuantity = (item) => {
        const newQuantity = item.quantity + 1;
        updateCartItemQuantity(item.productId, item.productType, newQuantity);
    };

    const updateCartItemQuantity = async (productId, productType, newQuantity) => {
        try {
            // Update quantity in the backend
            const response = await axios.post("http://localhost:8080/cart/update-cart", null, {
                params: {
                    customerID: customerID,
                    productType: productType,
                    productID: productId,
                    quantity: newQuantity
                }
            });
    
            // Update local state
            setCart(prevCart => {
                const updatedItems = prevCart.items.map(item => {
                    if (item.productId === productId && item.productType === productType) {
                        const updatedAmount = item.unitPrice * newQuantity;
                        return { ...item, quantity: newQuantity, amount: updatedAmount };
                    }
                    return item;
                });
    
                return {
                    ...prevCart,
                    items: updatedItems
                };
            });
    
            // Update total price
            calculateTotalPrice();
    
        } catch (error) {
            console.error("Error updating cart item quantity:", error);
        }
    };
    

    useEffect(() => {
        // Calculate total price whenever cart items change
        let total = 0;
        cart.items.forEach(item => {
            total += item.unitPrice * item.quantity;
        });
        setTotalPrice(total);
    }, [cart.items]);



    const handleDeleteCart = async (productId, productType,size) => {
        try {
            // Send delete request to server
            const response = await axios.post("http://localhost:8080/cart/delete-cart-item", null, {
                params: {
                    customerID: customerID,
                    productID: productId,
                    productType: productType,
                    size: size,
                }
            });

            // If successful, update local state
            setCart(prevCart => ({
                ...prevCart,
                items: prevCart.items.filter(item => item.productId !== productId || item.productType !== productType || item.size !== size)
            }));
        } catch (error) {
            console.error("Error deleting cart item:", error);
        }
    };

    const handleClickChooseOther = () => {
        navigate('/productlist');
    };

    const handleClickPayment = () => {
        navigate('/payment');
    };

    return (
        <div className='cart-detail-container'>
            <div className='cart-table'>
                <table>
                    <thead>
                        <tr>
                            <th className='cart-id'>ID</th>
                            <th className='product'>Product</th>
                            <th className='quantity'>Quantity</th>
                            <th className='unit-price'>Unit Price</th>
                            <th className='amount'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.items.map((item, index) => {
                            const isDiamond = item.productType === 'DIAMOND';
                            const productDetails = isDiamond ? diamond.find(d => d.id === item.productId) : diamondShell.find(ds => ds.id === item.productId);
                            const imageUrl = isDiamond ? (productDetails?.imageDiamond || '') : (productDetails?.imageDiamondShell || '');
                            const productDescription = isDiamond
                                ? `${productDetails?.origin || ''} ${productDetails?.cut || ''} ${productDetails?.clarity || ''}`
                                : `${productDetails?.material || ''} ${productDetails?.secondaryStoneType || ''} Size ${item?.size || ''}`;

                            return (
                                <tr key={`${item.productId}-${item.productType}-${item.size}`}>
                                    <td className='product-cart-id'>{index + 1}</td>
                                    <td className='product-info'>
                                        <img src={imageUrl} alt="product" className='product-image' />
                                        <p>{productDescription}</p>
                                        <DeleteOutlineTwoToneIcon className='remove-cart' onClick={() => { handleDeleteCart(item.productId, item.productType,item.size) }} />
                                    </td>
                                    <td className='product-quantity'>
                                        <div className='quantity-container'>
                                            <RemoveIcon className='minus-quantity' onClick={() => handleMinusQuantity(item)} />
                                            <p>{item.quantity}</p>
                                            <AddIcon className='add-quantity' onClick={() => handleAddQuantity(item)} />
                                        </div>
                                    </td>
                                    <td className='product-unit-price'>{formatPrice(item.unitPrice)}</td>
                                    <td className='product-amount'>{formatPrice(item.amount)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className='total-price'>
                <h2>Total: {formatPrice(totalPrice)}đ</h2>
            </div>
            <div className='action-button'>
                <button className='choose-other' onClick={handleClickChooseOther}>CHOOSE OTHER ITEMS</button>
                <button className='payment' onClick={handleClickPayment}>PAYMENT</button>
            </div>
        </div>
    );
};

export default CartDetail;
