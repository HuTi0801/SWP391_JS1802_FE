import React, { useState } from 'react'
import './RegisterContent.css'
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegisterContent = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            password: "",
            phone_number: "",
            email: "",
        },
        validationSchema: yup.object({
            first_name: yup.string().required("Please Enter First_Name"),
            last_name: yup.string().required("Please Enter Last_Name"),
            password: yup.string().required("Please Enter Password").max(8, " Do not enter more than 8 characters "),
            phone_number: yup.string().required("Please Enter Phone number").max(10, " Do not enter more than 10 digits "),
            email: yup.string().required("Please Enter Email").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"),
        }),
        // validateOnBlur: false,
        // validateOnChange: false,
        onSubmit: async (values) => {
            try {
                const response = await
                    axios.post(`http://localhost:8080/auth/account/register?email=${values.email}&phone_number=${values.phone_number}&first_name=${values.first_name}&last_name=${values.last_name}&password=${values.password}`);
                if (response.data.isSuccess === true) {
                    navigate('/login');
                    console.log(response.data);
                    alert("Register successfully!")
                } else if (response.data.isSuccess === false) {
                    alert(response.data.message)
                }
            }
            catch (error) {
                console.log(error);
                alert("Error Register")
            }
        }
    })

    return (
        <div className='register-content-container'>
            <div className='overlay'></div>
            <div className='register-content-box'>
                <div className='register-title'>
                    Register
                </div>
                <div className='register-form'>
                    <form onSubmit={formik.handleSubmit}>
                        <p>First_Name</p>
                        <input type="text"
                            name='first_name'
                            placeholder='Enter First_Name'
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.first_name && formik.touched.first_name && <div>{formik.errors.first_name}</div>}

                        <p>Last_Name</p>
                        <input type="text"
                            name='last_name'
                            placeholder='Enter Last_Name'
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.last_name && formik.touched.last_name && <div>{formik.errors.last_name}</div>}

                        <p>PassWord</p>
                        <input type="text"
                            name='password'
                            placeholder='Enter PassWord'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}

                        <p>Phone number</p>
                        <input type="text"
                            name='phone_number'
                            placeholder='Enter Phone number'
                            value={formik.values.phone_number}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.phone_number && formik.touched.phone_number && <div>{formik.errors.phone_number}</div>}

                        <p>Email</p>
                        <input type="text"
                            name='email'
                            placeholder='Enter Email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}

                        <div className='action-button'>
                            <button type='submit' className='register-button'>
                                REGISTER
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default RegisterContent