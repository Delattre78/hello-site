"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { MACRO_ASSETS, SCORES, RISKS, EXEC_SUMMARY, CALENDAR, getScoreColor, getRiskColor } from "@/lib/macro-data";

// ── Twelve Data symbols ──────────────────────────────────────────────────────
const TD_SYMBOLS: Record<string, string> = {
  eurusd:    "EUR/USD",
  nasdaq:    "QQQ",
  "dow-jones": "DIA",
  sp500:     "SPY",
  dxy:       "DX-Y.NYB",
};

interface LivePrice {
  price: string;
  change: string;
  changePercent: string;
  live: boolean;
}

// ── Fetch batch prices from Twelve Data ─────────────────────────────────────
async function fetchLivePrices(): Promise<Record<string, LivePrice>> {
  const key = process.env.NEXT_PUBLIC_TWELVEDATA_KEY;
  if (!key || key === "demo") return {};

  const symbols = Object.values(TD_SYMBOLS).join(",");
  const [priceRes, quoteRes] = await Promise.all([
    fetch(`https://api.twelvedata.com/price?symbol=${encodeURIComponent(symbols)}&apikey=${key}`, { signal: AbortSignal.timeout(6000) }),
    fetch(`https://api.twelvedata.com/quote?symbol=${encodeURIComponent(symbols)}&apikey=${key}`, { signal: AbortSignal.timeout(6000) }),
  ]);

  if (!priceRes.ok || !quoteRes.ok) return {};
  const prices = await priceRes.json();
  const quotes = await quoteRes.json();

  const result: Record<string, LivePrice> = {};
  for (const [assetId, symbol] of Object.entries(TD_SYMBOLS)) {
    const p = prices[symbol]?.price ?? prices?.price;
    const q = quotes[symbol] ?? quotes;
    if (!p) continue;
    const price = parseFloat(p);
    const prev  = parseFloat(q?.previous_close ?? q?.close ?? p);
    const chg   = price - prev;
    const pct   = prev !== 0 ? (chg / prev) * 100 : 0;
    const isForex = symbol.includes("/");
    result[assetId] = {
      price:         isForex ? price.toFixed(4) : price.toLocaleString("fr-FR", { maximumFractionDigits: 2 }),
      change:        (chg >= 0 ? "+" : "") + chg.toFixed(isForex ? 4 : 2),
      changePercent: (pct >= 0 ? "+" : "") + pct.toFixed(2) + "%",
      live: true,
    };
  }
  return result;
}

export default function Dashboard() {
  const [live, setLive]         = useState<Record<string, LivePrice>>({});
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isLive, setIsLive]     = useState(false);
  const topEvents = CALENDAR.filter(e => e.importance === 3).slice(0, 5);

  const refresh = useCallback(async () => {
    try {
      const data = await fetchLivePrices();
      if (Object.keys(data).length > 0) {
        setLive(data);
        setIsLive(true);
        setLastUpdate(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    refresh();
    const iv = setInterval(refresh, 60_000); // refresh every 60s (free plan limit)
    return () => clearInterval(iv);
  }, [refresh]);

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="hero-tag">Dashboard — Semaine 23 · 4 juin 2026</div>
        <h1 className="hero-title">Vue Globale des Marchés</h1>
        <p className="hero-subtitle">Snapshot macro instantané — scores, régime de marché, risques et alertes de la semaine.</p>
        <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap", alignItems: "center" }}>
          <div className="regime-pill regime-neutral"><span className="dot dot-orange" style={{ marginRight: 6 }} />Régime : Neutre</div>
          {isLive ? (
            <span className="badge badge-bullish" style={{ fontSize: 10 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", display: "inline-block", marginRight: 4, boxShadow: "0 0 4px var(--green)" }} />
              Live · {lastUpdate}
            </span>
          ) : (
            <span className="badge badge-neutral">Données statiques</span>
          )}
          <span className="badge badge-orange">NFP Vendredi 6 juin ⚠</span>
        </div>
      </div>

      {/* Asset score cards */}
      <div className="section" style={{ marginTop: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div className="card-title" style={{ margin: 0 }}>Scores actifs</div>
          {isLive && (
            <span style={{ fontSize: 10, color: "var(--text-dim)", fontStyle: "italic" }}>
              Proxy ETF utilisé pour Nasdaq/Dow/SP500 sur plan Twelve Data actuel
            </span>
          )}
        </div>
        <div className="grid-5">
          {MACRO_ASSETS.map((a) => {
            const sc  = getScoreColor(a.score);
            const lp  = live[a.id];
            const displayPrice  = lp?.price ?? a.price;
            const displayChange = lp?.changePercent ?? a.change;
            const isUp = displayChange.startsWith("+");
            return (
              <Link key={a.id} href={`/markets/${a.id}`}>
                <div className="score-card" style={{ cursor: "pointer", transition: "border-color 0.15s", position: "relative" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                >
                  {lp?.live && (
                    <span style={{
                      position: "absolute", top: 10, right: 10,
                      width: 6, height: 6, borderRadius: "50%",
                      background: "var(--green)", boxShadow: "0 0 5px var(--green)",
                      display: "inline-block"
                    }} />
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div className="label-xs" style={{ marginBottom: 4 }}>{a.name}</div>
                      <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: -0.5, transition: "color 0.4s", color: lp ? (isUp ? "var(--green)" : "var(--red)") : "var(--text)" }}>
                        {displayPrice}
                      </div>
                      <div style={{ fontSize: 11, color: isUp ? "var(--green)" : "var(--red)", marginTop: 2 }}>
                        {displayChange}
                        {lp?.live && <span style={{ color: "var(--text-dim)", marginLeft: 4 }}>· live</span>}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 26, fontWeight: 900, color: sc, letterSpacing: -1, lineHeight: 1 }}>{a.score}</div>
                      <div style={{ fontSize: 9, color: sc, textAlign: "right", marginTop: 2 }}>/10</div>
                    </div>
                  </div>
                  <div className="score-bar-track"><div className="score-bar-fill" style={{ width: `${a.score * 10}%`, background: sc }} /></div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className={`badge badge-${a.bias.toLowerCase()}`}>{a.bias === "Bullish" ? "Haussier" : a.bias === "Bearish" ? "Baissier" : "Neutre"}</div>
                    <div style={{ fontSize: 11, color: "var(--text-dim)" }}>Confiance: {a.confidence}/10</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Scores grille */}
      <div className="section" style={{ marginTop: 24 }}>
        <div className="card-title">Tableau de bord macro</div>
        <div className="grid-4">
          {Object.entries(SCORES).map(([key, s]) => (
            <div key={key} className="card-sm">
              <div className="label-xs" style={{ marginBottom: 8 }}>{key.replace(/([A-Z])/g, " $1").trim().toUpperCase()}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: s.color, letterSpacing: -1 }}>{s.value}</span>
                <span style={{ fontSize: 12, color: "var(--text-dim)" }}>/10</span>
              </div>
              <div className="score-bar-track" style={{ marginBottom: 6 }}>
                <div className="score-bar-fill" style={{ width: `${s.value * 10}%`, background: s.color }} />
              </div>
              <div style={{ fontSize: 11, color: s.color, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2 col: exec summary + events */}
      <div className="section" style={{ marginTop: 24 }}>
        <div className="grid-2">
          <div className="card">
            <div className="card-title">Résumé exécutif</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {EXEC_SUMMARY.topFive.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 20, height: 20, borderRadius: 5, background: "var(--blue-dim)", color: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{item}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Événements clés à venir</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {topEvents.map((ev, i) => (
                <div key={i} style={{ padding: "10px 12px", background: "var(--surface2)", borderRadius: 8, border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{ev.event}</span>
                    <span className="badge badge-risk-critique" style={{ fontSize: 9 }}>FORT</span>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{ev.flag} {ev.date} · {ev.time}</span>
                    <span style={{ fontSize: 11, color: "var(--text-dim)" }}>Consensus: {ev.consensus}</span>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/calendar">
              <div style={{ marginTop: 12, fontSize: 12, color: "var(--blue)", fontWeight: 600 }}>Voir le calendrier complet →</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Risks */}
      <div className="section" style={{ marginTop: 24 }}>
        <div className="card-title">Risk Monitor — Top risques</div>
        <div className="grid-4">
          {RISKS.slice(0, 4).map((r) => {
            const rc = getRiskColor(r.level);
            const badgeClass = r.level === "Critique" ? "badge-risk-critique" : r.level === "Élevé" ? "badge-risk-eleve" : r.level === "Modéré" ? "badge-risk-modere" : "badge-risk-faible";
            return (
              <div key={r.id} className="card-sm">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</div>
                  <span className={`badge ${badgeClass}`}>{r.level}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 10 }}>{r.comment}</div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span className="label-xs">Probabilité</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: rc }}>{r.proba}</span>
                </div>
              </div>
            );
          })}
        </div>
        <Link href="/risk-monitor">
          <div style={{ marginTop: 12, fontSize: 12, color: "var(--blue)", fontWeight: 600 }}>Voir tous les risques →</div>
        </Link>
      </div>

      {/* Global bias */}
      <div className="section section-last" style={{ marginTop: 24 }}>
        <div className="card" style={{ borderLeft: "3px solid var(--blue)" }}>
          <div className="card-title">Biais global de la semaine</div>
          <div style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7 }}>{EXEC_SUMMARY.globalBias}</div>
        </div>
      </div>
    </div>
  );
}
