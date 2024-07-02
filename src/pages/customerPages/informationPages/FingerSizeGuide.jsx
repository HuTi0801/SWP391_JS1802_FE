import React from 'react';
import './InfoPages.css';
import Header from '../../../components/userComponents/header/Header';
import Navbar from '../../../components/userComponents/header/navbar/Navbar';
import Footer from '../../../components/userComponents/footer/Footer';

const FingerSizeGuide = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <div className='finger-size-guide-container'>
        <h1>GUIDE TO MEASURING RING SIZE</h1>
        <p className='paragraph'>
          To choose the most suitable ring, you need to know the circumference of your finger. Compare the information in the table below to determine the ring size relative to your finger. Here is a common ring size chart (inner diameter in mm) for your easy reference.
        </p>
        <div><img src="https://i.pinimg.com/originals/bc/01/98/bc0198375b76bb6c7933f6d5a243afcb.jpg" alt="Ring Size Chart" /></div>
        <p className='paragraph'>
          Currently, there are two popular ring size charts: one used in Vietnam and one used in the United States. Depending on the country you are residing in, choose the appropriate size chart. Many jewelry brands also design their own ring size charts. Therefore, when buying a ring, you should ask the staff for specific advice to select the correct ring size for your finger.
        </p>
        <h2 className='section-title'>Guide to Measuring Ring Size</h2>
        <p className='paragraph'>
          <strong className='paragraph'>Measuring Ring Size with Paper and Ruler</strong>
        </p>
        <div><img src="https://images.ctfassets.net/7m8i36sp5l90/4JRK5VOh7QHBdp9oNd1Vch/3be80d84f9562c6143b14590bb25362a/Method-2-Ring-Size_2x.jpg" alt="Measuring Ring Size with Paper and Ruler" /></div>
        <p className='paragraph'>
          <strong>Materials Needed:</strong><br />
          Strip of Paper: Use a strip of paper about 1/2 inch (1.3 cm) wide and 4 inches (10 cm) long.<br />
          Ruler: A standard ruler with millimeter measurements.
          <strong>Steps to Measure Ring Size:</strong><br />
          <ul>

            <li>

              <strong>Cut the Paper Strip:</strong><br />
              Cut a straight strip of paper about 1/2 inch wide and 4 inches long. The width should be enough to comfortably wrap around your finger.
            </li>
            <li>
              <strong>Wrap the Paper Around Your Finger:</strong><br />
              Wrap the paper strip around the base of the finger you want to measure. Make sure the paper is snug but not too tight. It should slide over your knuckle easily.
            </li>
            <li>
              <strong>Mark the Paper:</strong><br />
              Use a pen or pencil to mark where the end of the paper strip overlaps. Ensure the mark is clear and straight.
            </li>
            <li>
              <strong>Measure the Length:</strong><br />
              Carefully remove the paper strip from your finger and lay it flat on a surface.<br />
              Use a ruler to measure the length from the end of the paper to the marked spot. Measure in millimeters for accuracy.
            </li>
          </ul>
        </p>
        <strong>Measuring Ring Size with an Existing Ring</strong>
        <div><img src="https://images.ctfassets.net/7m8i36sp5l90/3IGO4XBiD88X0HZysKlU7p/a4f221ec4f7902ff47bd76302b47006a/Method-1-Ring-Size_2x.jpg" alt="Measuring Ring Size with an Existing Ring" /></div>
        <p className='paragraph'>
          You need to prepare a polymer banknote of any denomination and an existing ring that fits your finger. Then, place the banknote on a flat surface and place the ring so that it aligns with the edge of the number 0 on the banknote. Finally, take a photo and send it to the jewelry store. From this, they can determine your ring size and help you make an accurate choice.
        </p>
        <h2 className='section-title'>Tips for Measuring Ring Size at Home</h2>
        <ul>
          <li>Consider Weather and Temperature: Measure in normal conditions, as they can be affected by temperature.</li>
          <li>Consider the Thickness of the Ring</li>
          <li>Consider Finger Joints: Ensure that the ring is still comfortable and easy to wear.</li>
          <li>Measure Ring Size Multiple Times: To get accurate results, measure your ring size several times throughout the day in a normal finger state.</li>
          <li>Difference Between Male and Female Ring Sizes</li>
        </ul>
        <p className='paragraph'>
          It is important to note that these tips are general. For accurate results, you should seek advice from an experienced professional or measure at a reputable jewelry store, <strong>or you could contact our experts for advice on finger size tips using the hotline: 0902-112-442</strong>
        </p>
        <p className='paragraph'>
          This is all the information to guide you on measuring your ring size to fit your finger most accurately. Hopefully, this article provides you with useful information.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default FingerSizeGuide;
