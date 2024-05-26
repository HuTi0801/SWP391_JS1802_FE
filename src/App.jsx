import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Navbar from './components/header/navbar/Navbar.jsx';
import Home from "./pages/home/Home.jsx";
import SearchPage from './pages/search/SearchDiamondPage.jsx';
import Footer from './components/footer/Footer.jsx';
import ProductList from './pages/productList/ProductList.jsx';
import ProductInformation from './pages/productInformation/ProductInformation.jsx';
import { Cart } from './pages/cart/Cart.jsx';
import SearchDiamondPage from './pages/search/SearchDiamondPage.jsx';
import SearchShellPage from './pages/search/SearchShellPage.jsx';
import ProductPreview from './components/home/ProductPreview.jsx';
import DiamondShellInfo from './components/product_information/DiamondShellInfo.jsx';
import DiamondInfo from './components/product_information/DiamondInfo.jsx';

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diamondshell/:id" element={<DiamondShellInfo />} />
        <Route path="/diamond/:id" element={<DiamondInfo />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/searchdiamond" element={<SearchDiamondPage />} />
        <Route path="/searchshell" element={<SearchShellPage />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/productinfo" element={<ProductInformation />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
