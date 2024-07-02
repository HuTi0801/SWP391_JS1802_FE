import React from 'react'
import Header from '../../../components/userComponents/header/Header'
import Navbar from '../../../components/userComponents/header/navbar/Navbar'
import Footer from '../../../components/userComponents/footer/Footer'

const ProductGuide = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className='product-guide-container'>
        <h1>5 CRITERIA FOR BUYING DIAMONDS</h1>

        <h2>Criterion 1: Diamond Certification (Certificate)</h2>
        <p>At DSS, 100% of our diamonds come with full international certifications from the two most prestigious diamond grading organizations in the world: GIA & IGI.</p>
        <div>
          <img src="https://file.hstatic.net/1000381168/file/gia_a2c1c95887564b4d8d22e08b96b5ef57.png" alt="altimg" />
        </div>
        <ul>
          <li>Note:</li>
          <ul>
            <li>GIA and IGI are independent grading organizations that do not buy or sell diamonds, ensuring objective and accurate grading.</li>
            <li>GIA: Gemological Institute of America</li>
            <li>IGI: International Gemological Institute</li>
          </ul>
          <li>Additionally, you can verify Diamond Certificates at the following links:</li>
          <ul>
            <li><a href="https://www.gia.edu" target="_blank" rel="noopener noreferrer">GIA</a></li>
            <li><a href="https://www.igi.org" target="_blank" rel="noopener noreferrer">IGI</a></li>
          </ul>
          <li>DSS's advice:</li>
          <ul>
            <li>We consider Diamond Certificates one of the most important criteria.</li>
            <li>You should choose diamonds that come with GIA or IGI certifications.</li>
          </ul>
        </ul>

        <h2>Criterion 2: Cut</h2>
        <p>The closer the diamond's cut is to Excellent, the higher its value.</p>
        <div><img src="https://www.brilliance.com/front/img/brilliance-diamond-cut-chart.8d628aea.jpg" alt="noimg" /></div>
        <p>DSS's advice: Depending on your budget, you can choose a cut grade from Very Good and up.</p>

        <h2>Criterion 3: Color</h2>
        <p>The closer the diamond's color is to D, the higher its value.</p>
        <div><img src="https://www.brides.com/thmb/GBtDWdJwsYmu17LqrVGm2lR49nU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/diamond-color-chart-5093397_horizontal-b8d3872096fd47c78d244d40cc920099.png" alt="noimg" /></div>
        <p>DSS's advice: Depending on your budget, you can choose a color grade from H and up to D.</p>

        <h2>Criterion 4: Clarity</h2>
        <p>The closer the diamond's clarity is to FL (Flawless), the higher its value.</p>
        <div><img src="https://www.aurum.co.nz/assets/Uploads/diamond-clarity-grading-system.png" alt="noimg" /></div>
        <ul>
          <li>Note: Use a 10X magnifying glass to determine clarity grade.</li>
          <li>Clarity indicates the presence of internal and external flaws in the diamond.</li>
          <li>Diamonds of 1 carat and above will have a diagram using symbols to indicate the location of these flaws.</li>
          <li>The closer the diamond's clarity is to FL, the higher its value.</li>
        </ul>
        <p>DSS's advice: Depending on your budget, you can choose a clarity grade from SI1 and up to FL.</p>

        <h2>Criterion 5: Carat Weight/Measurements</h2>
        <p>The larger the diamond, the higher its value.</p>
        <div><img src="https://cdn.shopify.com/s/files/1/1204/7706/files/diamond-carat-chart-01_1024x1024.jpg?v=1473226064" alt="noimg" /></div>
        <p>DSS's advice: Depending on your budget, you can choose a diamond size that fits your desired jewelry setting.</p>
        <p>In Vietnam, customers often base their selection on the diameter of the diamond. Globally, people usually choose based on the diamond's carat weight.</p>
      </div>
      <Footer />
    </div>
  )
}

export default ProductGuide 