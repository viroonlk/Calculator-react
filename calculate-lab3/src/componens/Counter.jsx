import { useState } from "react";
import "../App.css";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h2 className="title">Counter</h2>
      <p className="count-display">count = {count}</p>

      <div className="button-group">
        <button className="btn btn-inc" onClick={() => setCount(count + 1)}>+1</button>
        
        {/* จุดที่แก้ไข: ใช้ Math.max(0, ...) เพื่อกันติดลบ */}
        <button className="btn btn-dec" onClick={() => setCount(Math.max(0, count - 1))}>-1</button>
        
        <button className="btn btn-reset" onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}