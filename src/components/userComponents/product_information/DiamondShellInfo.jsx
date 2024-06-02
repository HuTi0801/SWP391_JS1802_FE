import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import './DiamondShellInfo.css'

const DiamondShellInfo = () => {
  const { id } = useParams();
  const [diamondShell, setDiamondShell] = useState(null);
  const [fingerSize, setFingerSize] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/diamond-shell/get-a-diamond-shell-${id}`);
        setDiamondShell(response.data.result);
        const responseFingerSize = await axios.get(`http://localhost:8080/size-diamond-shell/${id}`);
        setFingerSize(responseFingerSize.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const validationSchema = Yup.object().shape({
    size: Yup.string().required(''),
  });

  const formik = useFormik({
    initialValues: {
      size: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleAddToCart();
      // navigate to the cart page or handle buying logic
      navigate('/cart');
    },
  });

  const handleAddToCart = async () => {
    if (!formik.values.size) {
      alert("Please select a finger size");
      return;
    }

    try {
      const cartItem = {
        productID: diamondShell.id,
        productType: "DIAMOND_SHELL",
        customerID: 1,
        size: formik.values.size, // Include the selected size in the cart item
      };

      const response = await axios.post("http://localhost:8080/cart/add-to-cart", null, { params: cartItem });
      alert(response.data.message);
      console.log('Add to cart response:', response.data);

    } catch (error) {
      console.error('Error adding diamond to cart:', error);
    }
  };

  const handleBuyNow = () => {
    if (!formik.values.size) {
      alert("Please select a finger size");
      return;
    }

    formik.handleSubmit();
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
};

  if (!diamondShell) {
    return <div>Loading...</div>;
  }

  return (
    <div className='diamond-product-info-container'>
      <div className='product-image'>
        <img src={diamondShell.imageDiamondShell} alt="image-alt" />
      </div>
      <div className='diamond-product-right'>
        <div className='diamond-product-detail'>
          <div className='text'>
            <p className='name'>{diamondShell.material} {diamondShell.secondaryStoneType}</p>
            <p className='price'>{formatPrice(diamondShell.price)}đ</p>
          </div>
          <div className='parameter'>
            <span>Material:</span>
            <p>{diamondShell.material}</p>

            <span>Gender:</span>
            <p>{diamondShell.gender}</p>

            <span>Secondary Stone:</span>
            <p>{diamondShell.secondaryStoneType}</p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="size">Finger Size: </label>
              <select
                id="size"
                name="size"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.size}
                className={`form-control ${formik.touched.size && formik.errors.size ? 'is-invalid' : ''}`}
              >
                <option value="">Choose A Size</option>
                {fingerSize.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {formik.touched.size && formik.errors.size ? (
                <div className="invalid-feedback">{formik.errors.size}</div>
              ) : null}
            </div>
            <div className='button-payment'>
              <button type="button" className='add-cart' onClick={handleAddToCart}>Add To Cart</button>
              <button type="button" className='buy-now' onClick={handleBuyNow}>BUY NOW</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiamondShellInfo;
