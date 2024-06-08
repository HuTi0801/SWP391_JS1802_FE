import React, { useState } from 'react'
import './ProductInformation.css';
import DiamondInfo from '../../../components/userComponents/product_information/DiamondInfo';
import DiamondShellInfo from '../../../components/userComponents/product_information/DiamondShellInfo';


const ProductInformation = () => {
    const [productType, setProductType] = useState({
        cut: "",
        clarity: "",
        color: "",
    });

    const handleChange = (e) => {
        setDiamond({ ...diamond, [e.target.name]: e.target.value })
    }
    const handleSearch = async () => {
        console.log(diamond);

        const newDiamond = diamond;
        await axios.post(
            "https://664b521735bbda10987c72ad.mockapi.io/searchDiamond",
            newDiamond
        )

    }

    return (
        <div className='info-page-container'>
            
            <DiamondInfo />
            {/* <DiamondShellInfo /> */}
        </div>
    )
}

export default ProductInformation