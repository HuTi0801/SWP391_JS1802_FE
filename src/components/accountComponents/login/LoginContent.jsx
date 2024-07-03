import React from 'react';
import './LoginContent.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginContent = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object({
      username: yup.string().required('Please Enter Username'),
      password: yup.string().required('Please Enter Password'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`http://localhost:8080/auth/account/login?username=${values.username}&password=${values.password}`);
        const { token, role, accountId, customerId } = response.data.result;

        // Extract the last element in the role array
        const roleArray = role.match(/\b\w+:\w+|\bROLE_\w+/g);
        const userRole = roleArray[roleArray.length - 1];

        // Store the token and role in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('customerId', customerId);
        localStorage.setItem('accountId', accountId)
        console.log(token)
        console.log(userRole)
        console.log(customerId)
        console.log(accountId)
        // Navigate to the homepage or any protected route
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleClickRegister = () => {
    navigate('/register');
  };

  const handleClickForgetPassword = () => {
    navigate('/forgetpassword');
  };

  return (
    <div className="login-content-container">
      <div className="overlay"></div>
      <div className="login-content-box">
        <div className="login-title">LOGIN</div>
        <div className="login-form">
          <form onSubmit={formik.handleSubmit}>
            <p>USERNAME</p>
            <input
              type="text"
              name="username"
              placeholder="Enter User Name"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.username && formik.touched.username && <div>{formik.errors.username}</div>}
            <p>PASSWORD</p>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}
            <div className="forget-password">
              <span onClick={handleClickForgetPassword}>Forgot Password?</span>
            </div>
            <div className="action-button">
              <button type="submit" className="login-button">
                LOGIN
              </button>
              <button type="button" onClick={handleClickRegister} className="register-button">
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
