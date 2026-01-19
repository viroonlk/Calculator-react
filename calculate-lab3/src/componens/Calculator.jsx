import { useState } from "react";

export default function Calculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [op, setOp] = useState("+");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calc = () => {
    setError("");

    const na = Number(a);
    const nb = Number(b);

    if (a === "" || b === "") {
      setError("Please enter both numbers.");
      setResult(null);
      return;
    }

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
  };

  const clear = () => {
    setA("");
    setB("");
    setOp("+");
    setResult(null);
    setError("");
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Calculator</h2>

      <label>A</label>
      <input value={a} onChange={(e) => setA(e.target.value)} />

      <label>Operator</label>
      <select value={op} onChange={(e) => setOp(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>

      <label>B</label>
      <input value={b} onChange={(e) => setB(e.target.value)} />

      <div style={{ marginTop: 12 }}>
        <button onClick={calc}>Calc</button>
        <button onClick={clear} style={{ marginLeft: 8 }}>Clear</button>
      </div>

      <div style={{ marginTop: 16 }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {result !== null && <p>Result = {result}</p>}
      </div>
    </div>
  );
}
