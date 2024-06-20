import React from 'react'
import './LoginContent.css'
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from 'axios';


const LoginContent = () => {


    /* Start Formik */
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: yup.object({
            username: yup.string().required(" Username is not blank"),
            password: yup.string().required(" Password is not blank"),
        }),
        onSubmit: async (values) => {
            try {
                await axios.post("http://localhost:8080", values)
                console.log(values)
            }
            catch (error) {
                console.error(error)
            }
        }


    })

    /* End Formik */

    return (
        <div className='login-container'>
            <div className='overlay'></div>
            <div className='login-box'>
                <div className='login-title'>
                    LOGIN
                </div>
                <div className='login-form'>
                    <form onSubmit={formik.handleSubmit}>
                        <p>USERNAME</p>
                        <input type="text"
                            name='username'
                            placeholder='Enter User Name'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.username && formik.touched.username && <div>{formik.errors.username}</div>}
                        <p>PASSWORD</p>
                        <input type="text"
                            name='password'
                            placeholder='Enter Password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}
                        <div className='action-button'>
                            <button type='submit' className='login-button'>
                                LOGIN
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default LoginContent