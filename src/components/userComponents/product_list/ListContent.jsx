import React, { useEffect, useState } from 'react';
import './ListContent.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Pagination from '../../utilityComponents/pagination/Pagination';

const ListContent = () => {
  const [diamondShellList, setDiamondShellList] = useState([]);
  const [diamondList, setDiamondList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const { results } = location.state || {};
  const navigate = useNavigate();
  const itemsPerPage = 12; 
  const getDiamondShellInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/diamond-shell/get-all-diamond-shell");
      return response.data.result;
    } catch (error) {
      console.error('Error fetching diamond shell info:', error);
      return [];
    }
  };

  const getDiamondInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/diamond/get-all-diamond");
      return response.data.result;
    } catch (error) {
      console.error('Error fetching diamond info:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const diamondShellData = await getDiamondShellInfo();
      const diamondData = await getDiamondInfo();

      if (diamondShellData) {
        setDiamondShellList(diamondShellData);
      }
      if (diamondData) {
        setDiamondList(diamondData);
      }
    };
    fetchData();
  }, []);

  const handleClick = (item) => {
    const itemUrl = item.imageDiamondShell ? `/diamondshell/${item.id}` : `/diamond/${item.id}`;
    navigate(itemUrl);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const productList = results && results.length > 0 ? results : [...diamondShellList, ...diamondList];
  const totalPages = Math.ceil(productList.length / itemsPerPage); 

  const currentPageItems = productList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ); 

  return (
    <div className='product-list-container'>
      <div className='product-list-title'>
        <h2>PRODUCT LIST</h2>
      </div>
      <ul>
        {currentPageItems.map((item) => (
          <li key={item.id}>
            <img
              src={item.imageDiamondShell || item.imageDiamond}
              alt="image"
              className='image'
              onClick={() => handleClick(item)}
            />
            <div className='product-list-desc'>
              <div className='name'>{item.material || item.origin}</div>
              <div className='price'>{formatPrice(item.price)}đ</div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />
    </div>
  );
};

export default ListContent;