"use client";

import { useEffect, useState } from "react";

export default function LivePage() {
  const [data, setData] = useState<any>(null);

  async function load() {
    const res = await fetch("/api/live-prices", { cache: "no-store" });
    setData(await res.json());
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <main style={{ background: "#080c10", color: "#e8edf2", minHeight: "100vh", padding: 32 }}>
      <h1 style={{ fontSize: 42, fontWeight: 900 }}>Macro Flow Live</h1>
      <p style={{ color: "#6b7a8d" }}>Prix live via Twelve Data — refresh 60s</p>

      <pre style={{
        marginTop: 30,
        background: "#0f1419",
        border: "1px solid rgba(255,255,255,.08)",
        padding: 20,
        borderRadius: 12,
        overflow: "auto"
      }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
