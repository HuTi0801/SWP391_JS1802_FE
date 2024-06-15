import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import "../../../pages/managerPages/promotion/Promotion.css";
const CreatePromotion = () => {
    const options_Type = [
        { value: "DIAMOND", label: "DIAMOND" },
        { value: "DIAMOND_SHELL", label: "DIAMOND_SHELL" }
    ]

    const handleChange = (e) => {
    };
    const [diamonds, setDiamonds] = useState([]);
    const [diamondShells, setDiamondShells] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    useEffect(() => {


        const fetchDiamonds = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/diamond/get-all-diamond');
                if (response.data.isSuccess) {
                    setDiamonds(response.data.result);
                } else {
                    console.error('Failed to fetch diamonds:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching diamonds:', error);
            }
        };

        const fetchDiamondShells = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/diamond-shell/get-all-diamond-shell');
                if (response.data.isSuccess) {
                    setDiamondShells(response.data.result);
                } else {
                    console.error('Failed to fetch diamond shells:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching diamond shells:', error);
            }
        };
        fetchDiamonds();
        fetchDiamondShells();
    }, []);

    const diamondOptions = diamonds.map(diamond => ({
        value: diamond.id,
        label: `${diamond.origin} ${diamond.cut} ${diamond.color} ${diamond.clarity}`,
    }));

    const diamondShellOptions = diamondShells.map(shell => ({
        value: shell.id,
        label: `${shell.material} ${shell.secondaryStoneType}`,
    }));

    const productOptions = [...diamondOptions, ...diamondShellOptions]

    return (
        <div className="create-Promotion">
            <h1>Create Promotion </h1>


            <div className="sub-create-Promotion">

                <div className="DESCRIPTION">
                    <label htmlFor="DESCRIPTION">DESCRIPTION:</label>
                    <input
                        type="text"
                        placeholder="Description"
                        name="Description"
                        onChange={handleChange}
                    />
                </div>
                <div className="DISCOUNTPERCENT">
                    <label htmlFor="DISCOUNTPERCENT">DISCOUNT PERCENT (%):</label>
                    <input
                        type="text"
                        placeholder="Discount Percent"
                        name="Discountpercent"
                        onChange={handleChange}
                    />
                </div>

                <div className="STARTDATE">
                    <label htmlFor="STARTDATE">START DATE:</label>
                    <input
                        type="date"
                        name="StartDate"
                        onChange={handleChange}
                    />
                </div>

                <div className="ENDDATE">
                    <label htmlFor="ENDDATE">END DATE:</label>
                    <input
                        type="date"
                        name="EndDate"
                        onChange={handleChange}
                    />
                </div>

                <div className="MEMBERLEVEL">
                    <label htmlFor="MEMBERLEVEL">MEMBER LEVEL:</label>
                    <select name="statusDiamondShell" placeholder="MEMBER LEVEL" onChange={handleChange}>
                        <option value="">MEMBER LEVEL</option>
                        <option value="SILVER">SILVER</option>
                        <option value="GOLD">GOLD</option>
                        <option value="PLATINUM">PLATINUM</option>
                        <option value="DIAMOND">DIAMOND</option>
                        <option value="PRIVATE">PRIVATE</option>

                    </select>
                </div>

                <div className="TYPE">
                    <label htmlFor="TYPE">TYPE:</label>
                    <div className="TYPE_Select">
                        <Select
                            isMulti
                            options={options_Type}
                            onChange={(selectedOptions) => {
                                console.log(selectedOptions);
                            }}
                            placeholder="Select type"
                            className="custom-TYPE_Select"

                        />
                    </div>
                </div>

                <div className="PRODUCTIONNAME">
                    <label htmlFor="PRODUCTIONNAME">PRODUCT NAME:</label>
                    <div className="TYPE_PRODUCTIONNAME">
                        <Select
                            isMulti
                            options={productOptions}
                            onChange={setSelectedProducts}
                            placeholder="Select products"
                            className="custom-TYPE_PRODUCTIONNAME"

                        />
                    </div>
                </div>

            </div>

            <button>Add</button>
        </div>
    );

}

export default CreatePromotion