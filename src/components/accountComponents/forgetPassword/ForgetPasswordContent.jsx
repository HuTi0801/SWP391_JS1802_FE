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
            phone: "",
            newPassword: "",
            confirmpassword: "",
        },
        validationSchema: yup.object({
            phone: yup.string().required("Please Enter Phone Number"),
            newPassword: yup.string().required("Please Enter Password"),
            confirmpassword: yup.string()
                .oneOf([yup.ref('newPassword'), null], "Password does not match")
                .required("Please Confirm Password"),
        }),
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`http://localhost:8080/auth/account/forgetPassword?phone=${values.phone}&newPassword=${values.newPassword}`);
                if (response.data.isSuccess === true) {
                    navigate('/login');
                    console.log(response.data);
                    alert("Password Changed Successfully!")
                }

            }
            catch (error) {
                console.log(error);
                alert("Password Changed Failed!")
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
                        <p>PHONE</p>
                        <input
                            type="text"
                            name="phone"
                            placeholder='Enter Phone Number'
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.phone && formik.touched.phone && <div>{formik.errors.phone}</div>}
                        <p>NEW PASSWORD</p>
                        <input type="password"
                            name='newPassword'
                            placeholder='Enter New Password'
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.newPassword && formik.touched.newPassword && <div>{formik.errors.newPassword}</div>}
                        <p>CONFIRM NEW PASSWORD</p>
                        <input type="password"
                            name='confirmpassword'
                            placeholder='Confirm New Password'
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
