import React from 'react';
import './InfoPages.css';
import Header from '../../../components/userComponents/header/Header';
import Navbar from '../../../components/userComponents/header/navbar/Navbar';
import Footer from '../../../components/userComponents/footer/Footer';

const FAQ = () => {
    return (
        <div>
            <Header />
            <Navbar />
            <div className='faq-container'>
                <h1>FREQUENTLY ASKED QUESTIONS</h1>
                <br />
                <h2>What payment methods does Diamond Shop System support?</h2>
                <p>When customers purchase diamond jewelry from Diamond Shop System, they can choose to pay using the following methods:</p>

                <ul>
                    <li>Payment through VNPay</li>
                </ul>

                <h2>How can customers from afar buy diamond jewelry from Diamond Shop System?</h2>
                <p>Customers who cannot visit Diamond Shop System's showroom in person can access the website <a href="/" target="_blank" rel="noopener noreferrer">Diamond Shop System</a> to browse product models and prices, and place orders online.</p>

                <h2>Does Diamond Shop System charge for diamond jewelry shipping?</h2>
                <p>No. When customers purchase diamond jewelry from Diamond Shop System and request delivery to their provided address, they will receive free nationwide shipping.</p>

                <h2>How does Diamond Shop System deliver diamond jewelry to customers outside of Ho Chi Minh City?</h2>
                <p>When delivering diamond jewelry to customers outside of Ho Chi Minh City, Diamond Shop System carefully packages and insures the product 100%. Depending on the delivery address, they will use suitable shipping services to ensure safety. For more details or any inquiries, customers can contact our Customer Service Department for consultation and clarification.</p>

                <h2>How can customers verify that the diamond jewelry delivered by Diamond Shop System is the product they selected on the website?</h2>
                <p>Every diamond jewelry product from Diamond Shop System comes with a GIA or IGI certification. Both the jewelry and the certification include a unique serial number for easy verification and comparison by customers.</p>

                <h2>How can customers distinguish between real and fake diamond jewelry?</h2>
                <p>When customers purchase diamond jewelry from Diamond Shop System, they receive assistance in quality verification using specialized machinery and equipment. Additionally, each product comes with a quality certification issued by GIA or IGI – two independent and reputable diamond grading organizations worldwide.</p>
                <p>For online purchases, we also provide support for quality verification at home along with the product certification.</p>
            </div>
            <Footer />
        </div>
    );
}

export default FAQ;
