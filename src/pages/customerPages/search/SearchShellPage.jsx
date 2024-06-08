import React from 'react'

import SearchDiamondShell from '../../../components/userComponents/search/SearchDiamondShell';
import Footer from '../../../components/userComponents/footer/Footer';
import Header from '../../../components/userComponents/header/Header';
import Navbar from '../../../components/userComponents/header/navbar/Navbar';

const SearchShellPage = () => {
    return (
        <div className='search-container'>
            <Header />
            <Navbar />
            <SearchDiamondShell />
            <Footer />
        </div>
    )
}

export default SearchShellPage