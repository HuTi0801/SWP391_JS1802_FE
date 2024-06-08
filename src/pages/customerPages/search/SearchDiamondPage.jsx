import React from 'react'
import SearchDiamond from '../../../components/userComponents/search/SearchDiamond'
import Header from '../../../components/userComponents/header/Header'
import Navbar from '../../../components/userComponents/header/navbar/Navbar'
import Footer from '../../../components/userComponents/footer/Footer'


const SearchDiamondPage = () => {
    return (
        <div className='search-container'>
            <Header />
            <Navbar />
            <SearchDiamond />
            <Footer />
        </div>
    )
}

export default SearchDiamondPage