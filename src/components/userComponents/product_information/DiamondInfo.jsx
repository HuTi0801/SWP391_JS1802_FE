import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './DiamondInfo.css';
import Header from '../header/Header';
import Navbar from '../header/navbar/Navbar';
import Footer from '../footer/Footer';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const DiamondInfo = () => {
    const { id } = useParams();
    const [diamond, setDiamond] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiamond = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/auth/diamond/get-a-diamond-${id}`);
                setDiamond(response.data.result);
            } catch (error) {
                console.error('Error fetching diamond:', error);
            }
        };

        fetchDiamond();
    }, [id]);

    const handleAddToCart = async () => {
        if (!diamond) {
            console.error('Diamond data is not available');
            return;
        }

        const cartItem = {
            productID: diamond.id,
            productType: "DIAMOND",
            customerID: 1,
        };

        try {
            const response = await axios.post("http://localhost:8080/auth/cart/add-to-cart", null, { params: cartItem });
            setAlertMessage('Cart Added Successfully!');
            setOpen(true);
        } catch (error) {
            setAlertMessage('Failed To Add To Cart');
            setOpen(true);
            console.error('Error adding diamond to cart:', error);
        }
    };

    const handleBuyNow = async () => {
        await handleAddToCart();
        navigate('/cart');
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    if (!diamond) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)} >
                <Alert onClose={() => setOpen(false)} severity={alertMessage === 'Cart Added Successfully!' ? 'success' : 'error'}>
                    {alertMessage}
                </Alert>
            </Snackbar>
            <Header />
            <Navbar />
            <div className='diamond-product-info-container'>
                <div className='product-image'>
                    <img src={diamond.imageDiamond} alt="Diamond" />
                </div>
                <div className='diamond-product-right'>
                    <div className='diamond-product-detail'>
                        <div className='text'>
                            <p className='name'>{diamond.origin} {diamond.cut} {diamond.color} {diamond.clarity}</p>
                            <p className='price'>{formatPrice(diamond.price)}đ</p>
                        </div>
                        <div className='parameter'>
                            <span>Cut:</span>
                            <p>{diamond.cut}</p>
                            <span>Color:</span>
                            <p>{diamond.color}</p>
                            <span>Clarity:</span>
                            <p>{diamond.clarity}</p>
                        </div>
                    </div>
                    <div className='button-payment'>
                        <button type="button" className='add-cart' onClick={handleAddToCart}>Add To Cart</button>
                        <button type="button" className='buy-now' onClick={handleBuyNow}>BUY NOW</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DiamondInfo;
