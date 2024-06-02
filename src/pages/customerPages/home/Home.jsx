import React from 'react';
import './Home.css';
import Banner from '../../../components/userComponents/home/Banner';
import ProductPreview from '../../../components/userComponents/home/ProductPreview';
const listBanner = [
  {
    id: 1,
    image: 'https://www.thediamondshop.net/wp-content/uploads/2023/04/f17dd548-d258-4864-a270-f4ce415d46c3.jpg'
  },
  {
    id: 2,
    image: 'https://images.squarespace-cdn.com/content/v1/56d755df859fd045d0346973/40b03345-2063-46fb-be51-a20cb59929f1/diam-studs-banner-2024.jpg'
  },
  {
    id: 3,
    image: 'https://www.alexisrussell.com/cdn/shop/t/84/assets/diamond-sale-header-2024-mobile_1000x374.jpg?v=172917926563973579231715956969'
  },
  {
    id: 4,
    image: 'https://images.squarespace-cdn.com/content/v1/56d755df859fd045d0346973/8d8e0252-6e86-4ac0-88a0-1fd84ef56783/diamond-jewellery-banner--2023.jpg'
  },
  {
    id: 5,
    image: 'https://images-aka.zalesoutlet.com/2024/WMJ-25-002574/new/FY25-0530-ZO-30-50-Off-Bridal-Sale-PCTpromo-WEB-GM-DSK-1400x600.jpg'
  }
]

const Home = () => {
  return (
    <div className='home-container'>
      
      <Banner listBanner={listBanner} />
      <ProductPreview listBanner={listBanner} />
      
    </div>
  )
}

export default Home