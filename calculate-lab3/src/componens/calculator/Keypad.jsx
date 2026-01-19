import React from 'react';

const Keypad = ({ onDigit, onOp, onEquals, onClear, onClearEntry, onBackspace, onToggleSign, onDot }) => {
  
  // เรียงปุ่มตามแบบ Windows Calculator
  return (
    <div className="calculator-keypad">
      {/* Row 1 */}
      <button className="key-btn action" onClick={() => onOp('%')}>%</button>
      <button className="key-btn action" onClick={onClearEntry}>CE</button>
      <button className="key-btn action" onClick={onClear}>C</button>
      <button className="key-btn action" onClick={onBackspace}>⌫</button>

      {/* Row 2 */}
      <button className="key-btn action" onClick={() => alert("ไม่ได้อยู่ในโจทย์จ้า")}>¹/x</button>
      <button className="key-btn action" onClick={() => alert("ไม่ได้อยู่ในโจทย์จ้า")}>x²</button>
      <button className="key-btn action" onClick={() => alert("ไม่ได้อยู่ในโจทย์จ้า")}>²√x</button>
      <button className="key-btn operator" onClick={() => onOp('/')}>÷</button>

      {/* Row 3 */}
      <button className="key-btn number" onClick={() => onDigit('7')}>7</button>
      <button className="key-btn number" onClick={() => onDigit('8')}>8</button>
      <button className="key-btn number" onClick={() => onDigit('9')}>9</button>
      <button className="key-btn operator" onClick={() => onOp('*')}>×</button>

      {/* Row 4 */}
      <button className="key-btn number" onClick={() => onDigit('4')}>4</button>
      <button className="key-btn number" onClick={() => onDigit('5')}>5</button>
      <button className="key-btn number" onClick={() => onDigit('6')}>6</button>
      <button className="key-btn operator" onClick={() => onOp('-')}>−</button>

      {/* Row 5 */}
      <button className="key-btn number" onClick={() => onDigit('1')}>1</button>
      <button className="key-btn number" onClick={() => onDigit('2')}>2</button>
      <button className="key-btn number" onClick={() => onDigit('3')}>3</button>
      <button className="key-btn operator" onClick={() => onOp('+')}>+</button>

      {/* Row 6 */}
      <button className="key-btn action" onClick={onToggleSign}>±</button>
      <button className="key-btn number" onClick={() => onDigit('0')}>0</button>
      <button className="key-btn action" onClick={onDot}>.</button>
      <button className="key-btn equal" onClick={onEquals}>=</button>
    </div>
  );
};

export default Keypad;