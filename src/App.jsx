import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/userComponents/header/Header.jsx';
import Navbar from './components/userComponents/header/navbar/Navbar.jsx';
import Footer from './components/userComponents/footer/Footer.jsx';
import Home from './pages/customerPages/home/Home.jsx';
import DiamondInfo from './components/userComponents/product_information/DiamondInfo.jsx';
import SearchDiamondPage from './pages/customerPages/search/SearchDiamondPage.jsx';
import SearchShellPage from './pages/customerPages/search/SearchShellPage.jsx';
import ProductList from './pages/customerPages/productList/ProductList.jsx';
import ProductInformation from './pages/customerPages/productInformation/ProductInformation.jsx';
import { Cart } from './pages/customerPages/cart/Cart.jsx';
import Payment from './pages/customerPages/payment/Payment.jsx';
import OrderList from './pages/customerPages/order/OrderList.jsx';
import OrderDetail from './pages/customerPages/order/OrderDetail.jsx';
import OrderCreation from './pages/customerPages/order/OrderCreation.jsx';
import DiamondShellInfo from './components/userComponents/product_information/DiamondShellInfo.jsx';




function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diamondshell/:id" element={<DiamondShellInfo/>} />
        <Route path="/diamond/:id" element={<DiamondInfo />} />
        <Route path="/searchdiamond" element={<SearchDiamondPage />} />
        <Route path="/searchshell" element={<SearchShellPage />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/productinfo" element={<ProductInformation />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/orderlist' element={<OrderList />} />
        <Route path='/orderdetail' element={<OrderDetail />} />
        <Route path='/ordercreation' element={<OrderCreation />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
