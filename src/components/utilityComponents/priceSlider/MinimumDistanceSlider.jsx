import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const minDistance = 10000000; 

export default function MinimumDistanceSlider({ value, onChange }) {
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    let adjustedValue = [...value];

    if (activeThumb === 0) {
      adjustedValue[0] = Math.min(newValue[0], value[1] - minDistance);
    } else {
      adjustedValue[1] = Math.max(newValue[1], value[0] + minDistance);
    }

    
    adjustedValue[0] = Math.max(0, adjustedValue[0]); 
    adjustedValue[1] = Math.min(2300000000, adjustedValue[1]); 

    onChange(adjustedValue);
  };


  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  return (
    <Box sx={{ width: 500 }}>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={0}
        max={2300000000}
        step={1000000}
        disableSwap
        getAriaLabel={() => 'Price range slider'}
        getAriaValueText={(value) => `${formatPrice(value[0])} - ${formatPrice(value[1])}`}
        valueLabelFormat={(value) => `${formatPrice(value)} đ`}
      />
    </Box>
  );
}
