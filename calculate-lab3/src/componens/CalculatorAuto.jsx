import { useEffect, useState } from "react";
import "../CalculatorAuto.css";

export default function CalculatorAuto() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [op, setOp] = useState("+");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  
  // 1. สร้างตัวแปรมาเช็คว่า "โหลดเสร็จยัง?"
  const [isLoaded, setIsLoaded] = useState(false); 

  // --- ส่วน Load (ทำงานครั้งเดียว) ---
  useEffect(() => {
    const raw = localStorage.getItem("calc_v1");
    if (raw) {
      try {
        const obj = JSON.parse(raw);
        setA(obj.a ?? "");
        setB(obj.b ?? "");
        setOp(obj.op ?? "+");
      } catch (err) {
        console.error("Error parsing data", err);
      }
    }
    // 2. เมื่อดึงข้อมูลเสร็จแล้ว (หรือไม่มีข้อมูล) ให้บอกว่า "โหลดเสร็จแล้วนะ"
    setIsLoaded(true); 
  }, []);

  // --- ส่วน Save (ทำงานเมื่อข้อมูลเปลี่ยน) ---
  useEffect(() => {
    // 3. ถ้ายังโหลดไม่เสร็จ "ห้ามบันทึกเด็ดขาด" (เพื่อกันไม่ให้ค่าว่างไปทับข้อมูลเก่า)
    if (!isLoaded) return; 

    const obj = { a, b, op };
    localStorage.setItem("calc_v1", JSON.stringify(obj));
  }, [a, b, op, isLoaded]); // เพิ่ม isLoaded เข้าไปตรงนี้ด้วย

  
  // --- ส่วนคำนวณ (เหมือนเดิม) ---
  useEffect(() => {
    setError("");
    if (a === "" || b === "") {
      setResult(null);
      return;
    }
    const na = Number(a);
    const nb = Number(b);
    if (!Number.isFinite(na) || !Number.isFinite(nb)) {
      setError("Invalid number input.");
      setResult(null);
      return;
    }
    if (op === "/" && nb === 0) {
      setError("Cannot divide by zero.");
      setResult(null);
      return;
    }
    let r = 0;
    if (op === "+") r = na + nb;
    if (op === "-") r = na - nb;
    if (op === "*") r = na * nb;
    if (op === "/") r = na / nb;
    setResult(r);
  }, [a, b, op]);

  // ฟังก์ชัน Clear
  const handleClear = () => {
    setA("");
    setB("");
    setOp("+");
    setResult(null);
    setError("");
    // พอกดปุ่มนี้ มันจะบันทึกค่าว่างลง LocalStorage เอง เพราะ isLoaded เป็น true แล้ว
  };

  return (
    <div className="calc-container">
      <div className="calc-card">
        <h2>Auto Calculator</h2>

        <div className="form-group">
          <label>Number A</label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Enter first number"
          />
        </div>

        <div className="form-group">
          <label>Operator</label>
          <select value={op} onChange={(e) => setOp(e.target.value)}>
            <option value="+">+ (Add)</option>
            <option value="-">- (Subtract)</option>
            <option value="*">* (Multiply)</option>
            <option value="/">/ (Divide)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Number B</label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="Enter second number"
          />
        </div>

        <div className="button-group">
          <button className="btn btn-clear" onClick={handleClear}>
            Reset Values
          </button>
        </div>

        <div className="result-area">
          {error && <p className="error-msg">{error}</p>}
          {result !== null && (
            <div className="result-box">
              <span>Result:</span>
              <span className="result-value">{result}</span>
            </div>
          )}
          {(a === "" || b === "") && !error && (
             <p style={{textAlign: 'center', color: '#aaa', fontSize: '0.9rem', marginTop: '10px'}}>
               Enter numbers to calculate automatically...
             </p>
          )}
        </div>
      </div>
    </div>
  );
}