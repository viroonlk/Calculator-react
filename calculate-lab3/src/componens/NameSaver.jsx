import { useEffect, useState } from "react";

export default function NameSaver() {
  const [name, setName] = useState("");

  // 1) mount: load once
  useEffect(() => {
    const saved = localStorage.getItem("name");
    if (saved) setName(saved);
  }, []);

  // 2) watch: save when name changes
  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <p>Hello {name || "(anonymous)"}</p>
    </div>
  );
}
