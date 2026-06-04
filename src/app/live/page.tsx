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
    <main style={{ background: "#060a10", color: "#f8fafc", minHeight: "100vh", padding: 32, fontFamily: "system-ui" }}>
      <Link href="/" style={{ color: "#38bdf8", fontWeight: 900, textDecoration: "none" }}>← Retour dashboard</Link>
      <h1 style={{ fontSize: 52, letterSpacing: "-.06em" }}>Diagnostic Twelve Data</h1>
      <p style={{ color: "#94a3b8" }}>Test brut contrôlé · refresh 60s · {updatedAt}</p>
      {data?.code ? (
        <pre style={{ background: "#101826", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: 20, color: "#fb7185", overflow: "auto" }}>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 16, marginTop: 24 }}>
          {items.map((a: any) => (
            <div key={a.symbol} style={{ background: "#101826", border: "1px solid rgba(255,255,255,.1)", borderRadius: 16, padding: 20 }}>
              <div style={{ color: "#64748b", fontWeight: 900 }}>{a.exchange}</div>
              <h2>{a.symbol}</h2>
              <div style={{ fontSize: 36, fontWeight: 950 }}>{a.close}</div>
              <div style={{ color: Number(a.percent_change) >= 0 ? "#22c55e" : "#fb7185", fontWeight: 900 }}>{a.percent_change}%</div>
              <p style={{ color: "#94a3b8" }}>Open {a.open} · High {a.high} · Low {a.low}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
