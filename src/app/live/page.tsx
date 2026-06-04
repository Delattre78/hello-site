"use client";

import { useEffect, useState } from "react";

const symbols = ["EUR/USD", "QQQ", "DIA"];

export default function LivePage() {
  const [data, setData] = useState<any>(null);

  async function load() {
    const key = process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY || "";
    const url = `https://api.twelvedata.com/quote?symbol=${symbols.join(",")}&apikey=${key}`;
    const res = await fetch(url);
    setData(await res.json());
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60000);
    return () => clearInterval(id);
  }, []);

  const items = data ? Object.values(data) as any[] : [];

  return (
    <main style={{ background: "#080c10", color: "#e8edf2", minHeight: "100vh", padding: 32 }}>
      <h1 style={{ fontSize: 42, fontWeight: 900 }}>Macro Flow Live</h1>
      <p style={{ color: "#6b7a8d" }}>EUR/USD · QQQ Nasdaq proxy · DIA Dow proxy</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginTop: 32 }}>
        {items.map((a: any) => (
          <div key={a.symbol} style={{ background: "#0f1419", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 22 }}>
            <div style={{ color: "#6b7a8d", fontSize: 12 }}>{a.exchange}</div>
            <h2 style={{ fontSize: 24, fontWeight: 900 }}>{a.symbol}</h2>
            <div style={{ fontSize: 34, fontWeight: 900, marginTop: 12 }}>{a.close}</div>
            <div style={{ color: Number(a.percent_change) >= 0 ? "#22c55e" : "#ef4444", fontWeight: 800 }}>
              {a.change} · {a.percent_change}%
            </div>
            <p style={{ color: "#6b7a8d", marginTop: 12 }}>
              Open {a.open} · High {a.high} · Low {a.low}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
