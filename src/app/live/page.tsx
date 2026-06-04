"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const symbols = ["EUR/USD", "QQQ", "DIA", "SPY"];

export default function LivePage() {
  const [data, setData] = useState<any>(null);
  const [updatedAt, setUpdatedAt] = useState("");

  async function load() {
    const key =
      process.env.NEXT_PUBLIC_TWELVEDATA_KEY ||
      process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY ||
      "";
    const url = `https://api.twelvedata.com/quote?symbol=${symbols.join(",")}&apikey=${key}`;
    const res = await fetch(url);
    setData(await res.json());
    setUpdatedAt(new Date().toLocaleTimeString("fr-FR"));
  }

  useEffect(() => {
    load();
    const id = setInterval(load, 60000);
    return () => clearInterval(id);
  }, []);

  const items = data && !data.code ? symbols.map((s) => data[s]).filter(Boolean) : [];

  return (
    <main style={{ background: "#080c10", color: "#e8edf2", minHeight: "100vh", padding: 32 }}>
      <Link href="/" style={{ color: "#38bdf8", textDecoration: "none", fontWeight: 800 }}>← Retour dashboard</Link>
      <h1 style={{ fontSize: 42, fontWeight: 900, marginTop: 20 }}>Macro Flow Live Test</h1>
      <p style={{ color: "#6b7a8d" }}>Test API Twelve Data · EUR/USD · QQQ · DIA · SPY · refresh 60s · {updatedAt}</p>

      {data?.code ? (
        <pre style={{ marginTop: 30, background: "#0f1419", padding: 20, borderRadius: 12, overflow: "auto", color: "#ff5f6d" }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, marginTop: 32 }}>
          {items.map((a: any) => {
            const up = Number(a.percent_change) >= 0;
            return (
              <div key={a.symbol} style={{ background: "#0f1419", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 22 }}>
                <div style={{ color: "#6b7a8d", fontSize: 12 }}>{a.exchange}</div>
                <h2 style={{ fontSize: 24, fontWeight: 900 }}>{a.symbol}</h2>
                <div style={{ fontSize: 34, fontWeight: 900, marginTop: 12 }}>{a.close}</div>
                <div style={{ color: up ? "#22c55e" : "#ef4444", fontWeight: 800 }}>
                  {a.change} · {a.percent_change}%
                </div>
                <p style={{ color: "#6b7a8d", marginTop: 12 }}>
                  Open {a.open} · High {a.high} · Low {a.low}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
