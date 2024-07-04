import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

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
import ManagementAccountDetails from './pages/adminPages/accountDetails/ManagementAccountDetails.jsx';
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
import ProtectedRoute from './components/utilityComponents/protectedRoute/ProtectedRoute.jsx';

function App() {

  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  useEffect(() => {
    // Example logic to get user role after login (replace with actual logic)


    // Redirect based on user role
    switch (userRole) {
      case 'ROLE_CUSTOMER':
        navigate('/');
        break;
      case 'ROLE_SALE_STAFF':
        navigate('/salestaff');
        break;
      case 'ROLE_DELIVERY_STAFF':
        navigate('/delivery');
        break;
      case 'ROLE_MANAGER':
        navigate('/manager');
        break;
      case 'ROLE_ADMIN':
        navigate('/adminstaff');
        break;
      default:
        console.log("Default Case")
        break;
    }
  }, [userRole]);


  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/diamondprices' element={<DiamondPrices />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/fingersizeguide' element={<FingerSizeGuide />} />
        <Route path='/productguide' element={<ProductGuide />} />
        <Route path='/register' element={<Register />} />
        <Route path="/diamondshell/:id" element={<DiamondShellInfo />} />
        <Route path="/diamond/:id" element={<DiamondInfo />} />
        <Route path="/searchdiamond" element={<SearchDiamondPage />} />
        <Route path="/searchshell" element={<SearchShellPage />} />
        <Route path="/productlist" element={<ProductList />} />

        {/* Customer Routes */}
        <Route path='/cart' element={<ProtectedRoute element={Cart} allowedRoles={['ROLE_CUSTOMER']} />} />
        <Route path='/payment' element={<ProtectedRoute element={Payment} allowedRoles={['ROLE_CUSTOMER']} />} />
        <Route path='/orderlist' element={<ProtectedRoute element={OrderList} allowedRoles={['ROLE_CUSTOMER']} />} />
        <Route path='/orderdetail/:id' element={<ProtectedRoute element={OrderDetail} allowedRoles={['ROLE_CUSTOMER']} />} />
        <Route path='/ordercreation' element={<ProtectedRoute element={OrderCreation} allowedRoles={['ROLE_CUSTOMER']} />} />
        <Route path='/userprofile' element={<ProtectedRoute element={UserProfile} allowedRoles={['ROLE_CUSTOMER']} />} />
        <Route path="/auth/payment/return" element={<ProtectedRoute element={PaymentReturn} allowedRoles={['ROLE_CUSTOMER']} />} />

        {/* Sale Staff Routes */}
        <Route path='/salestaff' element={<ProtectedRoute element={StaffOrderList} allowedRoles={['ROLE_SALE_STAFF']} />} />
        <Route path='/salestafforderdetail/:id' element={<ProtectedRoute element={StaffOrderDetail} allowedRoles={['ROLE_SALE_STAFF']} />} />
        <Route path='/warrantydetail' element={<ProtectedRoute element={Warranty} allowedRoles={['ROLE_SALE_STAFF']} />} />

        {/* Delivery Staff Routes */}
        <Route path='/delivery' element={<ProtectedRoute element={DeliveryOrderList} allowedRoles={['ROLE_DELIVERY_STAFF']} />} />
        <Route path='/deliveryorderdetail/:id' element={<ProtectedRoute element={DeliveryOrderDetail} allowedRoles={['ROLE_DELIVERY_STAFF']} />} />

        {/* Manager Routes */}
        <Route path='/manager' element={<ProtectedRoute element={ManagerHome} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/diamond' element={<ProtectedRoute element={Diamonds} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/CreateDiamond' element={<ProtectedRoute element={CreateDiamond} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/diamondInfoDetails/:id' element={<ProtectedRoute element={DiamondInfoDetails} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/updateDiamond/:id' element={<ProtectedRoute element={UpdateDiamond} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/diamondshell' element={<ProtectedRoute element={DiamondShells} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/createDiamondShell' element={<ProtectedRoute element={CreateDiamondShell} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/diamondShellInfoDetails/:id' element={<ProtectedRoute element={DiamondShellInfoDetails} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/updateDiamondShell/:id' element={<ProtectedRoute element={UpdateDiamondShell} allowedRoles={['ROLE_MANAGER']} />} />

        {/* Profile Components */}
        <Route path='/profile' element={<ProtectedRoute element={Profile} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/stafflogin' element={<ProtectedRoute element={ManagerLogin} allowedRoles={['ROLE_MANAGER']} />} />

        {/* Promotion Components */}
        <Route path='/promotion' element={<ProtectedRoute element={Promotion} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/createPromotion' element={<ProtectedRoute element={CreatePromotion} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/promotionInfoDetail/:id' element={<ProtectedRoute element={PromotionDetails} allowedRoles={['ROLE_MANAGER']} />} />

        {/* Order List Components */}
        <Route path='/managerorderlist' element={<ProtectedRoute element={ManagerOrderList} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/orderDetails/:id' element={<ProtectedRoute element={OrderDetails} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/pending' element={<ProtectedRoute element={Pending} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/confirm' element={<ProtectedRoute element={Confirm} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/delivering' element={<ProtectedRoute element={Delivering} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/delivered' element={<ProtectedRoute element={Delivered} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/canceled' element={<ProtectedRoute element={Cancel} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/pendingassigned/:id' element={<ProtectedRoute element={PendingAssigned} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/confirmassigned/:id' element={<ProtectedRoute element={ConfirmAssigned} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/deliveringassigned/:id' element={<ProtectedRoute element={DeliveringAssigned} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/deliveredassigned/:id' element={<ProtectedRoute element={DeliveredAssigned} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/saleStaffDelivered/:id' element={<ProtectedRoute element={SaleStaffDelivered} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/saleStaffDelivering/:id' element={<ProtectedRoute element={SaleStaffDelivering} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/deliveryStaffDelivered/:id' element={<ProtectedRoute element={DeliveryStaffDelivered} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/deliveryStaffDelivering/:id' element={<ProtectedRoute element={DeliveryStaffDelivering} allowedRoles={['ROLE_MANAGER']} />} />

        {/* DashBoard Components */}
        <Route path='/dashBoard' element={<ProtectedRoute element={DashBoard} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/cancelRevenue' element={<ProtectedRoute element={CancelRevenue} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/confirmedRevenue' element={<ProtectedRoute element={ConfirmedRevenue} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/deliveredRevenue' element={<ProtectedRoute element={DeliveredRevenue} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/deliveringRevenue' element={<ProtectedRoute element={DeliveringRevenue} allowedRoles={['ROLE_MANAGER']} />} />
        <Route path='/staffPerformance' element={<ProtectedRoute element={Performance} allowedRoles={['ROLE_MANAGER']} />} />

        {/* Admin Routes */}
        <Route path='/ManagementAccountDetails/:id' element={<ProtectedRoute element={ManagementAccountDetails} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path='/adminstaff' element={<ProtectedRoute element={AccountList} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path='/CustomerAccountDetails/:id' element={<ProtectedRoute element={CustomerAccountDetails} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path='/Delivery_StaffAccountDetails/:id' element={<ProtectedRoute element={Delivery_StaffAccountDetails} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path='/Sale_StaffAccountDetails/:id' element={<ProtectedRoute element={Sale_StaffAccountDetails} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path='/banCustomerAccount/:id' element={<ProtectedRoute element={BanCustomerAccount} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path='/banSaleStaffAccount/:id' element={<ProtectedRoute element={BanSaleStaffAccount} allowedRoles={['ROLE_ADMIN']} />} />
        <Route path='/banDeliveryStaffAccount/:id' element={<ProtectedRoute element={BanDeliveryStaffAccount} allowedRoles={['ROLE_ADMIN']} />} />
      </Routes>
    </div>
  );
}

export default App;
