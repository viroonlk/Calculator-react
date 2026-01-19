import { useState } from "react";

export default function FormDemo() {
  const [name, setName] = useState("");

  return (
    <div>
      <h2>Controlled Input</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name..."
      />

      <p>Hello, {name || "(anonymous)"}</p>
    </div>
  );
}
