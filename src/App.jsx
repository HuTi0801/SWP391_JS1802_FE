import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/Header.jsx';
import Navbar from './components/header/navbar/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';

import Home from "./pages/home/Home.jsx";
import SearchPage from './pages/search/SearchDiamondPage.jsx';

import Footer from './components/footer/Footer.jsx';
import ProductList from './pages/productList/ProductList.jsx';
import ProductInformation from './pages/productInformation/ProductInformation.jsx';
import { Cart } from './pages/cart/Cart.jsx';
import SearchDiamondPage from './pages/search/SearchDiamondPage.jsx';
import SearchShellPage from './pages/search/SearchShellPage.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/searchdiamond" element={<SearchDiamondPage />} />
        <Route path="/searchshell" element={<SearchShellPage />} />
        <Route path="/productlist" element={<ProductList />} />
        <Route path="/productinfo" element={<ProductInformation />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App
