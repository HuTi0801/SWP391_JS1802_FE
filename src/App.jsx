import React from 'react';
import { Route, Routes } from 'react-router-dom';


// import Home from './pages/customerPages/home/Home.jsx';
// import DiamondInfo from './components/userComponents/product_information/DiamondInfo.jsx';
// import SearchDiamondPage from './pages/customerPages/search/SearchDiamondPage.jsx';
// import SearchShellPage from './pages/customerPages/search/SearchShellPage.jsx';
// import ProductList from './pages/customerPages/productList/ProductList.jsx';
// import { Cart } from './pages/customerPages/cart/Cart.jsx';
// import Payment from './pages/customerPages/payment/Payment.jsx';
// import OrderList from './pages/customerPages/order/OrderList.jsx';
// import OrderDetail from './pages/customerPages/order/OrderDetail.jsx';
// import OrderCreation from './pages/customerPages/order/OrderCreation.jsx';
// import DiamondShellInfo from './components/userComponents/product_information/DiamondShellInfo.jsx';
// import Login from './pages/accountPages/login/Login.jsx';
// import ForgetPassword from './pages/accountPages/forgetPassword/ForgetPassword.jsx';
// import UserProfile from './pages/customerPages/userprofile/UserProfile.jsx';
// import Register from './pages/accountPages/register/Register.jsx'
import StaffOrderList from './pages/saleStaffPages/orderList/StaffOrderList.jsx';
import StaffOrderDetail from './pages/saleStaffPages/orderDetail/StaffOrderDetail.jsx';
import Diamonds from './pages/managerPages/product/diamond/Diamonds.jsx'
import DiamondShells from './pages/managerPages/product/diamondshell/DiamondShells.jsx'
import CreateDiamond from './components/managerComponents/product/Diamond/CreateDiamond.jsx'
import DiamondInfoDetails from './components/managerComponents/product/Diamond/DiamondInfoDetails.jsx'
import UpdateDiamond from './components/managerComponents/product/Diamond/UpdateDiamond.jsx'
import CreateDiamondShell from './components/managerComponents/product/diamondShell/CreateDiamondShell.jsx'
import DiamondShellInfoDetails from './components/managerComponents/product/diamondShell/DiamondShellInfoDetails.jsx'
import UpdateDiamondShell from './components/managerComponents/product/diamondShell/UpdateDiamondShell.jsx'
import Profile from './pages/managerPages/profile/Profile.jsx'
import ManagerLogin from './pages/managerPages/profile/login/ManagerLogin.jsx'
import Promotion from './pages/managerPages/promotion/Promotion.jsx';
import CreatePromotion from './components/managerComponents/promotion/CreatePromotion.jsx';
import DiamondPromotion from './components/managerComponents/promotion/DiamondPromotion.jsx';
import DiamondShellPromotion from './components/managerComponents/promotion/DiamondShellPromotion.jsx';
import PromotionInfoDetails from './components/managerComponents/promotion/PromotionInfoDetails.jsx';
import ManagerHome from './pages/managerPages/home/ManagerHome.jsx';
import ManagerOrderList from './pages/managerPages/orderlist/ManagerOrderList.jsx';
import OrderDetails from './components/managerComponents/orderlist/OrderDetails.jsx';
import Pending from './components/managerComponents/orderlist/status/Pending.jsx'
import Confirm from './components/managerComponents/orderlist/status/Confirm.jsx'
import Delivered from './components/managerComponents/orderlist/status/Delivered.jsx'
import Delivering from './components/managerComponents/orderlist/status/Delivering.jsx'
import Cancel from './components/managerComponents/orderlist/status/Canceled.jsx'
import PendingAssigned from './components/managerComponents/orderlist/assign/PendingAssigned.jsx'
import ConfirmAssigned from './components/managerComponents/orderlist/assign/ConfirmAssigned.jsx'
import DeliveringAssigned from './components/managerComponents/orderlist/assign/DeliveringAssigned.jsx'
import DeliveredAssigned from './components/managerComponents/orderlist/assign/DeliveredAssigned.jsx'
import SaleStaffDelivering from './components/managerComponents/orderlist/assign/SaleStaffDelivering.jsx'
import SaleStaffDelivered from './components/managerComponents/orderlist/assign/SaleStaffDelivered.jsx'
import DeliveryStaffDelivered from './components/managerComponents/orderlist/assign/DeliveryStaffDelivered.jsx'
import DeliveryStaffDelivering from './components/managerComponents/orderlist/assign/DeliveryStaffDelivering.jsx'

export const Account = () => {

}


function App() {
  return (
    <div className='app-container'>


      <Routes>
        {/* Customer Routes */}
        {/* <Route path="/" element={<Home />} />
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
        <Route path='/register' element={<Register />} /> */}
        {/* Sale Staff Routes */}
        <Route path='/salestaff' element={<StaffOrderList />} />
        <Route path='/salestafforderdetail' element={<StaffOrderDetail />} />

        {/* Manager Routes */}
        {/* Product Components  */}
        <Route path='/' element={<ManagerHome />} />
        <Route path='/diamond' element={<Diamonds />} />
        <Route path='/CreateDiamond' element={<CreateDiamond />} />
        <Route
          path='/diamondInfoDetails/:id'
          element={<DiamondInfoDetails />} />
        <Route
          path='/updateDiamond/:id'
          element={<UpdateDiamond />} />

        <Route path='/diamondshell' element={<DiamondShells />} />

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

        {/*Order List Components */}
        <Route path='/managerorderlist' element={< ManagerOrderList />} />
        <Route path='/orderDetails/:id' element={< OrderDetails />} />
        <Route path='/pending' element={< Pending />} />
        <Route path='/confirm' element={< Confirm />} />
        <Route path='/delivering' element={< Delivering />} />
        <Route path='/delivered' element={< Delivered />} />
        <Route path='/canceled' element={< Cancel />} />
        <Route path='/pendindassigned/:id' element={< PendingAssigned />} />
        <Route path='/confirmassigned/:id' element={< ConfirmAssigned />} />
        <Route path='/deliveringassigned/:id' element={< DeliveringAssigned />} />
        <Route path='/deliveredassigned/:id' element={< DeliveredAssigned />} />
        <Route path='/saleStaffDelivered/:id' element={< SaleStaffDelivered />} />
        <Route path='/saleStaffDelivering/:id' element={< SaleStaffDelivering />} />
        <Route path='/deliveryStaffDelivered/:id' element={< DeliveryStaffDelivered />} />
        <Route path='/deliveryStaffDelivering/:id' element={< DeliveryStaffDelivering />} />
      </Routes>


    </div>
  );
}

export default App;