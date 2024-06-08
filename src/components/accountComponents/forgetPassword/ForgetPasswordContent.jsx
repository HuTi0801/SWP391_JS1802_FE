import React from 'react';
import './ForgetPasswordContent.css';
import { useFormik } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

const ForgetPasswordContent = () => {
    const navigate = useNavigate();

    /* Start Formik */
    const formik = useFormik({
        initialValues: {
            newpassword: "",
            confirmpassword: "",
        },
        validationSchema: yup.object({
            newpassword: yup.string().required("Please Enter Password"),
            confirmpassword: yup.string()
                .oneOf([yup.ref('newpassword'), null], "Password does not match")
                .required("Please Confirm Password"),
        }),
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            try {
                await axios.post("http://localhost:8080", values);
                navigate('/login');
                console.log(values);
            }
            catch (error) {
                console.error(error);
            }
        }
    });

    /* End Formik */

    return (
        <div className='forget-password-content-container'>
            <div className='overlay'></div>
            <div className='forget-password-content-box'>
                <div className='forget-password-title'>
                    RESET PASSWORD
                </div>
                <div className='forget-password-form'>
                    <form onSubmit={formik.handleSubmit}>
                        <p>NEW PASSWORD</p>
                        <input type="password"
                            name='newpassword'
                            placeholder='Enter New Password'
                            value={formik.values.newpassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.newpassword && formik.touched.newpassword && <div>{formik.errors.newpassword}</div>}
                        <p>CONFIRM NEW PASSWORD</p>
                        <input type="password"
                            name='confirmpassword'
                            placeholder='Enter Confirm Password'
                            value={formik.values.confirmpassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.confirmpassword && formik.touched.confirmpassword && <div>{formik.errors.confirmpassword}</div>}
                        <div className='action-button'>
                            <button type='submit' className='confirm-button'>
                                CONFIRM
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgetPasswordContent;
