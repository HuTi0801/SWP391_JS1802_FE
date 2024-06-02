import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ListContent from '../../../components/userComponents/product_list/ListContent';

const ProductList = () => {
    return (
        <div >
            <ListContent />
        </div>
    );
};

export default ProductList;
