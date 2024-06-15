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
import Register from './pages/accountPages/register/Register'
import Diamond from './pages/managerPages/product/diamond/Diamond'
import DiamondShell from './pages/managerPages/product/diamondshell/DiamondShell.jsx'
import CreateDiamond from './components/managerComponents/product/Diamond/CreateDiamond'
import DiamondInfoDetails from './components/managerComponents/product/Diamond/DiamondInfoDetails'
import UpdateDiamond from './components/managerComponents/product/Diamond/UpdateDiamond'
import CreateDiamondShell from './components/managerComponents/product/diamondShell/CreateDiamondShell'
import DiamondShellInfoDetails from './components/managerComponents/product/diamondShell/DiamondShellInfoDetails'
import UpdateDiamondShell from './components/managerComponents/product/diamondShell/UpdateDiamondShell'
import Profile from './pages/managerPages/profile/Profile'
import ManagerLogin from './pages/managerPages/profile/login/ManagerLogin'
import Promotion from './pages/managerPages/promotion/Promotion';
import CreatePromotion from './components/managerComponents/promotion/CreatePromotion';
import DiamondPromotion from './components/managerComponents/promotion/DiamondPromotion';
import DiamondShellPromotion from './components/managerComponents/promotion/DiamondShellPromotion';
import PromotionInfoDetails from './components/managerComponents/promotion/PromotionInfoDetails';
import PromotionUpdate from './components/managerComponents/promotion/PromotionUpdate'
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
        <Route path='/register' element={<Register />} />
        {/* Sale Staff Routes */}
        <Route path='/salestaff' element={<StaffOrderList />} />
        <Route path='/salestafforderdetail' element={<StaffOrderDetail />} />

        {/* Manager Routes */}
        {/* Product Components  */}
        <Route path='/diamond' element={<Diamond />} />
        <Route path='/CreateDiamond' element={<CreateDiamond />} />
        <Route
          path='/diamondInfoDetails/:id'
          element={<DiamondInfoDetails />} />
        <Route
          path='/updateDiamond/:id'
          element={<UpdateDiamond />} />

        <Route path='/diamondshell' element={<DiamondShell />} />

        <Route path='/createDiamondShell' element={<CreateDiamondShell />} />

        <Route
          path='/diamondShellInfoDetails/:id'
          element={<DiamondShellInfoDetails />} />
        <Route
          path='/updateDiamondShell/:id'
          element={<UpdateDiamondShell />} />

        {/* Profile Components */}
        <Route
          path='/profile'
          element={<Profile />} />
        <Route
          path='/stafflogin'
          element={<ManagerLogin />} />
        {/* Promotion Components */}
        <Route path='/promotion' element={< Promotion />} />
        <Route path='/createPromotion' element={< CreatePromotion />} />
        <Route path='/DiamondPromotion' element={< DiamondPromotion />} />
        <Route path='/DiamondShellPromotion' element={< DiamondShellPromotion />} />
        <Route path='/promotionInfoDetail' element={< PromotionInfoDetails />} />
        <Route path='/updatePromotion' element={< PromotionUpdate />} />
        {/*Order List Components */}
      </Routes>


    </div>
  );
}

export default App;