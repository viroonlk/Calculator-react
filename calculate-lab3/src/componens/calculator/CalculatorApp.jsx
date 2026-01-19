import { useState, useEffect } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import './calculator.css';

export default function CalculatorApp() {
  // --- State Machine ---
  const [display, setDisplay] = useState("0");      // ค่าที่โชว์บนจอ (string)
  const [acc, setAcc] = useState(null);             // ตัวตั้ง (number | null)
  const [pendingOp, setPendingOp] = useState(null); // เครื่องหมายที่รอคำนวณ (+ - * /)
  const [waitingForOperand, setWaitingForOperand] = useState(false); // สถานะ: รอพิมพ์เลขชุดใหม่หรือไม่?

  // --- Logic Helper ---
  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': 
        if (b === 0) return "Error"; // ห้ามหาร 0
        return a / b;
      default: return b;
    }
  };

  // --- Handlers ---

  // 1. กดตัวเลข (0-9)
  const handleDigit = (digit) => {
    if (waitingForOperand) {
      // ถ้ารอเลขใหม่ (เช่น เพิ่งกด + ไป) ให้แทนที่เลขเดิมเลย
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      // ถ้าพิมพ์ต่อจากเลขเดิม (จัดการเรื่องเลข 0 ด้านหน้า)
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  // 2. กดจุดทศนิยม (.)
  const handleDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  // 3. กด Operator (+ - * /)
  const handleOp = (op) => {
    const inputValue = parseFloat(display);

    if (acc === null) {
      // ถ้ายังไม่มีตัวตั้ง ให้เอาค่าปัจจุบันเป็นตัวตั้ง
      setAcc(inputValue);
    } else if (pendingOp && !waitingForOperand) {
      // ถ้ามีตัวตั้งแล้ว และไม่ได้กด Op ซ้ำ ให้คำนวณรอบก่อนหน้าก่อน (Chaining)
      // เช่น 10 + 20 (กด +) --> ต้องได้ 30 รอไว้
      const result = calculate(acc, inputValue, pendingOp);
      setDisplay(String(result));
      setAcc(result === "Error" ? null : result);
    }

    setPendingOp(op);
    setWaitingForOperand(true); // บอกระบบว่า ต่อไปต้องเป็นการพิมพ์เลขตัวใหม่นะ
  };

  // 4. กดเท่ากับ (=)
  const handleEquals = () => {
    if (pendingOp && acc !== null) {
      const inputValue = parseFloat(display);
      const result = calculate(acc, inputValue, pendingOp);
      
      setDisplay(String(result));
      setAcc(null);       // เคลียร์ตัวตั้ง
      setPendingOp(null); // เคลียร์เครื่องหมาย
      setWaitingForOperand(true); // เผื่อจะกดเลขใหม่เลย
    }
  };

  // 5. ล้างทั้งหมด (C)
  const handleClear = () => {
    setDisplay("0");
    setAcc(null);
    setPendingOp(null);
    setWaitingForOperand(false);
  };

  // 6. ล้างเฉพาะที่พิมพ์ (CE)
  const handleClearEntry = () => {
    setDisplay("0");
  };

  // 7. ลบทีละตัว (Backspace)
  const handleBackspace = () => {
    if (waitingForOperand) return; // ถ้าเป็นผลลัพธ์จากการคำนวณ ห้ามลบ
    
    if (display.length === 1 || display === "Error") {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  // 8. สลับเครื่องหมาย (±)
  const handleToggleSign = () => {
    if (display === "0") return;
    setDisplay(String(parseFloat(display) * -1));
  };

  // --- useEffect: Keyboard Support (ตามโจทย์ข้อ 7.3) ---
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      
      if (/\d/.test(key)) handleDigit(key); // 0-9
      if (key === '.') handleDot();
      if (key === '+' || key === '-' || key === '*' || key === '/') handleOp(key);
      if (key === 'Enter' || key === '=') { event.preventDefault(); handleEquals(); }
      if (key === 'Backspace') handleBackspace();
      if (key === 'Escape') handleClear();
    };

    // Attach listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function (สำคัญมากสำหรับ React)
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, acc, pendingOp, waitingForOperand]); // Dependency array: อัปเดตเมื่อค่าพวกนี้เปลี่ยน เพื่อให้ logic ใน handler เป็นปัจจุบัน

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
      <div className="calculator-card">
        {/* ส่ง Props ไปให้ลูกๆ */}
        <Display 
          value={display} 
          history={acc !== null ? `${acc} ${pendingOp || ''}` : ''}
        />
        <Keypad 
          onDigit={handleDigit}
          onOp={handleOp}
          onEquals={handleEquals}
          onClear={handleClear}
          onClearEntry={handleClearEntry}
          onBackspace={handleBackspace}
          onToggleSign={handleToggleSign}
          onDot={handleDot}
        />
      </div>
    </div>
  );
}