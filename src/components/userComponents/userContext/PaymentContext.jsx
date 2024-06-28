import React, { createContext, useState } from 'react';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [customerInfo, setCustomerInfo] = useState({
    cusName: '',
    numberPhone: '',
    address: '',
    description: '',
  });

  return (
    <PaymentContext.Provider value={{ customerInfo, setCustomerInfo }}>
      {children}
    </PaymentContext.Provider>
  );
};
