import React from 'react';
import './Home.css';
import Banner from '../../components/home/Banner';
import ProductPreview from '../../components/home/ProductPreview';
const listBanner = [
  {
    id: 1,
    image: 'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'
  },
  {
    id: 2,
    image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg'
  },
  {
    id: 3,
    image: 'https://t4.ftcdn.net/jpg/02/56/10/07/360_F_256100731_qNLp6MQ3FjYtA3Freu9epjhsAj2cwU9c.jpg'
  },
  {
    id: 4,
    image: 'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg'
  },
  {
    id: 5,
    image: 'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630'
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