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
import Register from './pages/accountPages/register/Register.jsx'

import ManagerHome from './pages/managerPages/home/ManagerHome.jsx';

import StaffOrderList from './pages/saleStaffPages/orderList/StaffOrderList.jsx';
import StaffOrderDetail from './pages/saleStaffPages/orderDetail/StaffOrderDetail.jsx';
import DeliveryOrderList from './pages/deliveryPages/orderList/DeliveryOrderList.jsx';
import DeliveryOrderDetail from './pages/deliveryPages/orderDetail/DeliveryOrderDetail.jsx';
import Warranty from './pages/saleStaffPages/warranty/Warranty.jsx';
import PaymentReturn from './components/utilityComponents/paymentRedirect/PaymentReturn.jsx';
import ErrorPage from './components/utilityComponents/statusPages/ErrorPage.jsx';
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
import PromotionDetails from './components/managerComponents/promotion/PromotionDetails.jsx';

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

import DashBoard from './pages/managerPages/dashboard/DashBoard.jsx'
import CancelRevenue from './pages/managerPages/dashboard/revenue/CancelRevenue.jsx'
import ConfirmedRevenue from './pages/managerPages/dashboard/revenue/ConfirmedRevenue.jsx'
import DeliveringRevenue from './pages/managerPages/dashboard/revenue/DeliveringRevenue.jsx'
import DeliveredRevenue from './pages/managerPages/dashboard/revenue/DeliveredRevenue.jsx'
import Performance from './pages/managerPages/dashboard/performance/Performance.jsx'


import AccountList from './pages/adminPages/accountList/AccountList.jsx';
import CustomerAccountDetails from './pages/adminPages/accountDetails/CustomerAccountDetails.jsx';
import Delivery_StaffAccountDetails from './pages/adminPages/accountDetails/Delivery_StaffAccountDetails.jsx';
import Sale_StaffAccountDetails from './pages/adminPages/accountDetails/Sale_StaffAccountDetails.jsx';
import BanCustomerAccount from './pages/adminPages/banaccount/BanCustomerAccount.jsx';
import BanSaleStaffAccount from './pages/adminPages/banaccount/BanSaleStaffAccount.jsx';
import BanDeliveryStaffAccount from './pages/adminPages/banaccount/BanDeliveryStaffAccount.jsx';
import About from './pages/customerPages/informationPages/About.jsx';
import DiamondPrices from './pages/customerPages/informationPages/DiamondPrices.jsx';
import FAQ from './pages/customerPages/informationPages/FAQ.jsx';
import FingerSizeGuide from './pages/customerPages/informationPages/FingerSizeGuide.jsx';
import ProductGuide from './pages/customerPages/informationPages/ProductGuide.jsx';
export const Account = () => {

}


function App() {
  return (
    <div>


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
        <Route path='/orderdetail/:id' element={<OrderDetail />} />
        <Route path='/ordercreation' element={<OrderCreation />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='error' element={<ErrorPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/diamondprices' element={<DiamondPrices />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/fingersizeguide' element={<FingerSizeGuide />} />
        <Route path='/productguide' element={<ProductGuide />} />

        {/* Sale Staff Routes */}
        <Route path='/salestaff' element={<StaffOrderList />} />
        <Route path='/salestafforderdetail/:id' element={<StaffOrderDetail />} />
        <Route path='/warrantydetail' element={<Warranty />} />

        {/* Delivery Staff Routes */}
        <Route path='/delivery' element={<DeliveryOrderList />} />
        <Route path='/deliveryorderdetail/:id' element={<DeliveryOrderDetail />} />

        {/* Payment Return Route */}
        <Route path="/auth/payment/return" element={<PaymentReturn />} />
        <Route path='/register' element={<Register />} />

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
        <Route path='/promotionInfoDetail/:id' element={< PromotionDetails />} />

        {/*Order List Components */}
        <Route path='/managerorderlist' element={< ManagerOrderList />} />
        <Route path='/orderDetails/:id' element={< OrderDetails />} />
        <Route path='/pending' element={< Pending />} />
        <Route path='/confirm' element={< Confirm />} />
        <Route path='/delivering' element={< Delivering />} />
        <Route path='/delivered' element={< Delivered />} />
        <Route path='/canceled' element={< Cancel />} />
        <Route path='/pendingassigned/:id' element={< PendingAssigned />} />
        <Route path='/confirmassigned/:id' element={< ConfirmAssigned />} />
        <Route path='/deliveringassigned/:id' element={< DeliveringAssigned />} />
        <Route path='/deliveredassigned/:id' element={< DeliveredAssigned />} />
        <Route path='/saleStaffDelivered/:id' element={< SaleStaffDelivered />} />
        <Route path='/saleStaffDelivering/:id' element={< SaleStaffDelivering />} />
        <Route path='/deliveryStaffDelivered/:id' element={< DeliveryStaffDelivered />} />
        <Route path='/deliveryStaffDelivering/:id' element={< DeliveryStaffDelivering />} />

        {/*DashBoard Components */}
        <Route path='/dashBoard' element={< DashBoard />} />
        <Route path='/cancelRevenue' element={< CancelRevenue />} />
        <Route path='/confirmedRevenue' element={< ConfirmedRevenue />} />
        <Route path='/deliveredRevenue' element={< DeliveredRevenue />} />
        <Route path='/deliveringRevenue' element={< DeliveringRevenue />} />
        <Route path='/staffPerformance' element={< Performance />} />

        {/* Admin Routes */}
        <Route path='/adminstaff' element={<AccountList />} />
        <Route path='/CustomerAccountDetails/:id' element={<CustomerAccountDetails />} />
        <Route path='/Delivery_StaffAccountDetails/:id' element={<Delivery_StaffAccountDetails />} />
        <Route path='/Sale_StaffAccountDetails/:id' element={<Sale_StaffAccountDetails />} />
        <Route path='/banCustomerAccount/:id' element={<BanCustomerAccount />} />
        <Route path='/banSaleStaffAccount/:id' element={<BanSaleStaffAccount />} />
        <Route path='/banDeliveryStaffAccount/:id' element={<BanDeliveryStaffAccount />} />
      </Routes>


    </div>
  );
}

export default App;