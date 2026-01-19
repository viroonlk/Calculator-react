import { useEffect, useState } from "react";

export default function TitleDemo() {
  const [name, setName] = useState("");

  useEffect(() => {
    document.title = name ? `Hello ${name}` : "React App";
  }, [name]);

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Preview: {name || "(anonymous)"}</p>
    </div>
  );
}
