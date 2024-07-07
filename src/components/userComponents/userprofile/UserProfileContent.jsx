import React, { useEffect, useState } from 'react';
import './UserProfileContent.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UserProfileContent = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0); // State for triggering reload
  const accountId = localStorage.getItem('accountId');
  const customerID = localStorage.getItem('customerId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
          navigate('/login');
          return;
        }

        const accountDetailsUrl = `http://localhost:8080/auth/account/view-account-details/${accountId}`;
        const response = await axios.get(accountDetailsUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        console.log(response.data);

        setUserData(response.data.result);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate, accountId, reloadKey]); // Include reloadKey in dependencies

  const handleLogout = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('No authentication token found');
      return;
    }

    const logoutUrl = 'http://localhost:8080/auth/account/logout';
    try {
      await axios.post(logoutUrl, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('customerId');
      localStorage.removeItem('accountId');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleClickOrderList = () => {
    navigate('/orderlist');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async (values) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.error('No authentication token found');
      return;
    }

    const updateUrl = `http://localhost:8080/auth/customer/update-info-customer/${customerID}`;
    try {
      const response = await axios.post(
        updateUrl,
        {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.isSuccess) {
        setUserData(response.data.result);
        setIsEditing(false);
        setReloadKey((prevKey) => prevKey + 1); // Increment reloadKey to force reload
      } else {
        console.error('Failed to update user data:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error: User data not found</div>;
  }

  return (
    <div className='user-profile-content-container'>
      <div className='action-button'>
        <button onClick={handleClickOrderList}>Orders</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <div className='profile-detail'>
        <div className='profile-image'>
          <img
            src='https://flatonthespot.com/wp-content/uploads/2020/02/platinum2.png'
            alt='UserMembership'
          />
        </div>
        <div className='profile-text'>
          <div className='profile-information'>
            {isEditing ? (
              <Formik
                initialValues={{
                  firstName: userData.firstName || '',
                  lastName: userData.lastName || '',
                  email: userData.customerResponse?.email || '',
                  phone: userData.customerResponse?.phone || '',
                }}
                validationSchema={Yup.object({
                  firstName: Yup.string().required('First Name is required'),
                  lastName: Yup.string().required('Last Name is required'),
                  email: Yup.string().email('Invalid email address').required('Email is required'),
                  phone: Yup.string().required('Phone Number is required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  handleSaveChanges(values);
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <label>
                      First Name:
                      <Field type='text' name='firstName' />
                      <ErrorMessage name='firstName' component='div' className='error' />
                    </label>
                    <label>
                      Last Name:
                      <Field type='text' name='lastName' />
                      <ErrorMessage name='lastName' component='div' className='error' />
                    </label>
                    <label>
                      Email:
                      <Field type='email' name='email' />
                      <ErrorMessage name='email' component='div' className='error' />
                    </label>
                    <label>
                      Phone Number:
                      <Field type='text' name='phone' />
                      <ErrorMessage name='phone' component='div' className='error' />
                    </label>
                    <button type='submit' disabled={isSubmitting}>
                      Save Changes
                    </button>
                    <button type='button' onClick={handleEditToggle}>
                      Cancel
                    </button>
                  </Form>
                )}
              </Formik>
            ) : (
              <>
                <p>First Name: {userData.firstName}</p>
                <p>Last Name: {userData.lastName}</p>
                <p>Username: {userData.username}</p>
                <p>Email: {userData.customerResponse?.email}</p>
                <p>Phone Number: {userData.customerResponse?.phone}</p>
                <button onClick={handleEditToggle}>Edit Profile</button>
              </>
            )}
          </div>
          <div className='membership-detail'>
            <p>Membership Level: {userData.customerResponse?.memberLevel}</p>
            <p>Membership Points: {userData.customerResponse?.point}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileContent;
