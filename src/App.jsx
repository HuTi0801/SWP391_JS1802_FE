import React from 'react';
import { Route, Routes } from 'react-router-dom';


import Home from './pages/customerPages/home/Home.jsx';
import DiamondInfo from './components/userComponents/product_information/DiamondInfo.jsx';
import SearchDiamondPage from './pages/customerPages/search/SearchDiamondPage.jsx';
import SearchShellPage from './pages/customerPages/search/SearchShellPage.jsx';
import ProductList from './pages/customerPages/productList/ProductList.jsx';
import { Cart } from './pages/customerPages/cart/Cart.jsx';
import Payment from './pages/customerPages/payment/Payment.jsx';
import OrderList from './pages/customerPages/order/OrderList.jsx';
import OrderDetail from './pages/customerPages/order/OrderDetail.jsx';
import OrderCreation from './pages/customerPages/order/OrderCreation.jsx';
import DiamondShellInfo from './components/userComponents/product_information/DiamondShellInfo.jsx';
import Login from './pages/accountPages/login/Login.jsx';
import ForgetPassword from './pages/accountPages/forgetPassword/ForgetPassword.jsx';
import UserProfile from './pages/customerPages/userprofile/UserProfile.jsx';
import StaffOrderList from './pages/saleStaffPages/orderList/StaffOrderList.jsx';
import StaffOrderDetail from './pages/saleStaffPages/orderDetail/StaffOrderDetail.jsx';

export const Account = () => {

}


function App() {
  return (
    <div className='app-container'>


      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/diamondshell/:id" element={<DiamondShellInfo />} />
        <Route path="/diamond/:id" element={<DiamondInfo />} />
        <Route path="/searchdiamond" element={<SearchDiamondPage />} />
        <Route path="/searchshell" element={<SearchShellPage />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/orderlist' element={<OrderList />} />
        <Route path='/orderdetail' element={<OrderDetail />} />
        <Route path='/ordercreation' element={<OrderCreation />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />

        {/* Sale Staff Routes */}
        <Route path='/salestaff' element={<StaffOrderList />} />
        <Route path='/salestafforderdetail' element={<StaffOrderDetail />} />
      </Routes>


    </div>
  );
}

export default App;
