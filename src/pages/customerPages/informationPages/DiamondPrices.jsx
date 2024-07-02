import React from 'react';
import Header from '../../../components/userComponents/header/Header';
import Navbar from '../../../components/userComponents/header/navbar/Navbar';
import Footer from '../../../components/userComponents/footer/Footer';
import './InfoPages.css'; // Assuming you have a CSS file for styling

const diamondData = [
  {
    size: '4.1mm',
    certification: 'GIA Certification',
    cut: 'Excellent Cut',
    data: [
      { color: 'D', IF: 28576000, VVS1: 24111000, VVS2: 23218000, VS1: 20116000, VS2: 19411000 },
      { color: 'E', IF: 27683000, VVS1: 23218000, VVS2: 22325000, VS1: 19411000, VS2: 18659000 },
      { color: 'F', IF: 26790000, VVS1: 22325000, VVS2: 21432000, VS1: 18659000, VS2: 17907000 }
    ]
  },
  {
    size: '5.4mm',
    certification: 'GIA Certification',
    cut: 'Excellent Cut',
    data: [
      { color: 'D', IF: 37880000, VVS1: 32730000, VVS2: 29515000, VS1: 25978000, VS2: 24617000 },
      { color: 'E', IF: 33680000, VVS1: 30030000, VVS2: 28950000, VS1: 24170000, VS2: 22878000 },
      { color: 'F', IF: 29690000, VVS1: 28890000, VVS2: 27889000, VS1: 22438000, VS2: 21582000 }
    ]
  },
  {
    size: '6.3mm (<1CT)',
    certification: 'GIA Certification',
    cut: 'Excellent Cut',
    data: [
      { color: 'D', IF: 116038000, VVS1: 103519000, VVS2: 95521000, VS1: 79470000, VS2: 74757000 },
      { color: 'E', IF: 107037000, VVS1: 95545000, VVS2: 92350000, VS1: 76272000, VS2: 68568000 },
      { color: 'F', IF: 98333000, VVS1: 89352000, VVS2: 87560000, VS1: 73674000, VS2: 67166000 }
    ]
  },
  {
    size: '6.3mm (>=1CT)',
    certification: 'GIA Certification',
    cut: 'Excellent Cut',
    data: [
      { color: 'D', IF: 407870000, VVS1: 369074000, VVS2: 298204000, VS1: 253185000, VS2: 251672000 },
      { color: 'E', IF: 344815000, VVS1: 322633000, VVS2: 288686000, VS1: 243404000, VS2: 234716000 },
      { color: 'F', IF: 323519000, VVS1: 305377000, VVS2: 264990000, VS1: 228149000, VS2: 218686000 }
    ]
  },
  {
    size: '6.8mm',
    certification: 'GIA Certification',
    cut: 'Excellent Cut',
    data: [
      { color: 'D', IF: 533014000, VVS1: 463056000, VVS2: 390493000, VS1: 334396000, VS2: 314590000 },
      { color: 'E', IF: 458902000, VVS1: 387358000, VVS2: 383932000, VS1: 318472000, VS2: 307105000 },
      { color: 'F', IF: 388302000, VVS1: 373649000, VVS2: 363546000, VS1: 294725000, VS2: 288831000 }
    ]
  },
  {
    size: '7.2mm',
    certification: 'GIA Certification',
    cut: 'Excellent Cut',
    data: [
      { color: 'D', IF: 669619000, VVS1: 591509000, VVS2: 479801000, VS1: 440249000, VS2: 426090000 },
      { color: 'E', IF: 537048000, VVS1: 531698000, VVS2: 425304000, VS1: 398473000, VS2: 343965000 },
      { color: 'F', IF: 491604000, VVS1: 478113000, VVS2: 414326000, VS1: 379642000, VS2: 340647000 }
    ]
  },
  {
    size: '8.1mm',
    certification: 'GIA Certification',
    cut: 'Excellent Cut',
    data: [
      { color: 'D', IF: 858491000, VVS1: 806883000, VVS2: 661380000, VS1: 628577000, VS2: 561392000 },
      { color: 'E', IF: 745283000, VVS1: 702392000, VVS2: 652560000, VS1: 560557000, VS2: 550034000 },
      { color: 'F', IF: 680670000, VVS1: 624155000, VVS2: 609079000, VS1: 543996000, VS2: 499493000 }
    ]
  },
  {
    size: '9mm',
    certification: 'GIA Certification',
    cut: 'Excellent Cut',
    data: [
      { color: 'D', IF: 2314706000, VVS1: 2084434000, VVS2: 1704701000, VS1: 1435429000, VS2: 1259055000 },
      { color: 'E', IF: 1860762000, VVS1: 1625714000, VVS2: 1468621000, VS1: 1293724000, VS2: 1216149000 },
      { color: 'F', IF: 1580000000, VVS1: 1525714000, VVS2: 1382224000, VS1: 1248293000, VS2: 1183830000 }
    ]
  }
];

const DiamondPrices = () => {

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div>
      <Header />
      <Navbar />
      <div className='diamond-prices-container'>
        <div className='header-image'>
          <img src="https://bremerjewelry.com/cdn/shop/articles/11_22_-_The_Fascinating_Facets_of_Diamonds_1_4704x.jpg?v=1676387504" alt="noimg" />
        </div>
        <div className='header-text'>
          <br />
          <ul>
            <li>Unit: VND (Vietnamese Dong)</li>

            <li>Effective from 01/07/2024</li>

            <li>Prices are subject to change without prior notice. Please check the latest prices at the store or website.</li>
          </ul>
        </div>
        {diamondData.map((diamond, index) => (
          <div key={index} className='diamond-price-table'>
            <h2>Diamond Price {diamond.size}</h2>
            <table>
              <thead>
                <tr>
                  <th>Color / Clarity</th>
                  <th>IF</th>
                  <th>VVS1</th>
                  <th>VVS2</th>
                  <th>VS1</th>
                  <th>VS2</th>
                </tr>
              </thead>
              <tbody>
                {diamond.data.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.color}</td>
                    <td>{formatPrice(row.IF)}</td>
                    <td>{formatPrice(row.VVS1)}</td>
                    <td>{formatPrice(row.VVS2)}</td>
                    <td>{formatPrice(row.VS1)}</td>
                    <td>{formatPrice(row.VS2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default DiamondPrices;
