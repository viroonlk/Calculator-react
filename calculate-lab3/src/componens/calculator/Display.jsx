import React from 'react';

// รับ props: value (ค่าปัจจุบัน), history (ค่าที่พักไว้ เช่น "10 +")
const Display = ({ value, history }) => {
  return (
    <div className="calculator-display">
      <div className="history">{history}</div>
      <div className="current-value">{value}</div>
    </div>
  );
};

export default Display;