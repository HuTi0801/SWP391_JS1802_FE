import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ListContent from '../../../components/userComponents/product_list/ListContent';
import Header from '../../../components/userComponents/header/Header';
import Navbar from '../../../components/userComponents/header/navbar/Navbar';
import Footer from '../../../components/userComponents/footer/Footer';

const ProductList = () => {
    return (
        <div >
            <Header />
            <Navbar />
            <ListContent />
            <Footer />
        </div>
    );
};

export default ProductList;
