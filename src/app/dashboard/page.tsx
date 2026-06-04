"use client";

import { useEffect, useMemo, useState } from "react";

type LiveQuote = {
  symbol: string;
  name?: string;
  exchange?: string;
  close?: string;
  price?: string;
  open?: string;
  high?: string;
  low?: string;
  previous_close?: string;
  change?: string;
  percent_change?: string;
  is_market_open?: boolean;
  code?: number;
  status?: string;
};

type AssetConfig = {
  id: string;
  title: string;
  symbol: string | null;
  subtitle: string;
  fallbackPrice: string;
  fallbackChange: string;
  score: number;
  bias: "Haussier" | "Baissier" | "Neutre";
  confidence: number;
  note: string;
};

type DisplayAsset = AssetConfig & {
  price: string;
  change: string;
  open: string;
  high: string;
  low: string;
  source: string;
  isLive: boolean;
  isUp: boolean;
  marketOpen: boolean | null;
};

const ASSETS: AssetConfig[] = [
  {
    id: "eurusd",
    title: "EUR/USD",
    symbol: "EUR/USD",
    subtitle: "Forex spot",
    fallbackPrice: "1.0847",
    fallbackChange: "+0.12%",
    score: 5.5,
    bias: "Neutre",
    confidence: 6,
    note: "Surveiller BCE/Fed, dollar et NFP.",
  },
  {
    id: "nasdaq",
    title: "Nasdaq",
    symbol: "QQQ",
    subtitle: "Proxy ETF QQQ",
    fallbackPrice: "744.21",
    fallbackChange: "-0.26%",
    score: 7.2,
    bias: "Haussier",
    confidence: 7,
    note: "Proxy Nasdaq. Pour NQ futures réel : ajouter source futures dédiée.",
  },
  {
    id: "dow",
    title: "Dow Jones",
    symbol: "DIA",
    subtitle: "Proxy ETF DIA",
    fallbackPrice: "508.26",
    fallbackChange: "-1.13%",
    score: 5.8,
    bias: "Neutre",
    confidence: 6,
    note: "Proxy Dow. Attention aux secteurs cycliques.",
  },
  {
    id: "spx",
    title: "S&P 500",
    symbol: "SPY",
    subtitle: "Proxy ETF SPY",
    fallbackPrice: "676.11",
    fallbackChange: "+0.01%",
    score: 6.7,
    bias: "Haussier",
    confidence: 7,
    note: "Proxy S&P 500. Breadth + mégacaps à surveiller.",
  },
  {
    id: "dxy",
    title: "DXY",
    symbol: null,
    subtitle: "Statique tant que source DXY non branchée",
    fallbackPrice: "99.21",
    fallbackChange: "+0.01%",
    score: 5.0,
    bias: "Neutre",
    confidence: 5,
    note: "À connecter via une source DXY valide.",
  },
];

const EVENTS = [
  { time: "14:30", zone: "US", name: "NFP / chômage", impact: "Très fort", risk: "Volatilité USD + indices" },
  { time: "16:00", zone: "US", name: "ISM Services", impact: "Fort", risk: "Croissance / inflation services" },
  { time: "20:00", zone: "FED", name: "Minutes / discours", impact: "Fort", risk: "Taux, dollar, Nasdaq" },
  { time: "11:00", zone: "EU", name: "CPI / BCE", impact: "Moyen", risk: "EUR/USD" },
];

const RISKS = [
  { name: "Crédits API Twelve Data", level: "Élevé", text: "Plan gratuit limité : trop de symboles ou refresh trop rapide coupe le live." },
  { name: "Proxy ETF vs futures", level: "Modéré", text: "QQQ/DIA/SPY donnent une direction, pas le prix exact NQ/YM/ES." },
  { name: "Session US", level: "Élevé", text: "Avant 15h30 Paris, les ETF US peuvent être retardés ou hors marché." },
  { name: "Macro surprise", level: "Critique", text: "NFP, CPI, FOMC peuvent invalider tout biais technique." },
];

const PLAN = [
  "15h20 : lire le régime macro + dollar + indices.",
  "15h30–15h45 : attendre l'ouverture US, éviter l'entrée impulsive.",
  "15h45–16h30 : chercher uniquement un setup avec RR logique.",
  "Si DXY monte fort + QQQ/DIA rouges : biais risk-off.",
  "Si DXY faible + QQQ/SPY verts : biais risk-on.",
];

function n(value: unknown) {
  const x = Number(value);
  return Number.isFinite(x) ? x : null;
}

function format(value: unknown, decimals = 2) {
  const x = n(value);
  if (x === null) return "—";
  return x.toLocaleString("fr-FR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function getApiKey() {
  return (
    process.env.NEXT_PUBLIC_TWELVEDATA_KEY ||
    process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY ||
    ""
  );
}

async function loadQuotes(): Promise<Record<string, LiveQuote>> {
  const key = getApiKey();
  const symbols = ASSETS.map((a) => a.symbol).filter(Boolean).join(",");

  if (!key || !symbols) return {};

  const url = `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(symbols)}&apikey=${key}`;
  const res = await fetch(url, { cache: "no-store" });
  const json = await res.json();

  if (!json || json.code || json.status === "error") {
    throw new Error(json?.message || "Twelve Data error");
  }

  return json;
}

function buildAsset(config: AssetConfig, live: Record<string, LiveQuote>): DisplayAsset {
  const q = config.symbol ? live[config.symbol] : undefined;
  const valid = Boolean(q && !q.code && q.status !== "error");
  const priceRaw = q?.close ?? q?.price;
  const priceNum = n(priceRaw);
  const prev = n(q?.previous_close);
  const changeNum = n(q?.change);
  const pctNum = n(q?.percent_change);

  const decimals = config.symbol?.includes("/") ? 4 : 2;
  const fallbackUp = config.fallbackChange.trim().startsWith("+");

  if (!valid || priceNum === null) {
    return {
      ...config,
      price: config.fallbackPrice,
      change: config.fallbackChange,
      open: "—",
      high: "—",
      low: "—",
      source: config.symbol ? "Fallback statique" : "Source non connectée",
      isLive: false,
      isUp: fallbackUp,
      marketOpen: null,
    };
  }

  let pct = pctNum;
  if (pct === null && prev !== null && prev !== 0) pct = ((priceNum - prev) / prev) * 100;

  const chg = changeNum ?? (prev !== null ? priceNum - prev : 0);
  const isUp = (pct ?? chg) >= 0;

  return {
    ...config,
    price: format(priceNum, decimals),
    change: `${isUp ? "+" : ""}${format(pct ?? 0, 2)}%`,
    open: format(q?.open, decimals),
    high: format(q?.high, decimals),
    low: format(q?.low, decimals),
    source: q?.exchange || "Twelve Data",
    isLive: true,
    isUp,
    marketOpen: typeof q?.is_market_open === "boolean" ? q.is_market_open : null,
  };
}

function scoreColor(score: number) {
  if (score >= 6.5) return "#22c55e";
  if (score <= 4.5) return "#fb7185";
  return "#fbbf24";
}

export default function Dashboard() {
  const [quotes, setQuotes] = useState<Record<string, LiveQuote>>({});
  const [status, setStatus] = useState<"loading" | "live" | "static" | "error">("loading");
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  async function refresh() {
    try {
      const data = await loadQuotes();
      setQuotes(data);
      setStatus("live");
      setError("");
      setUpdatedAt(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    } catch (e: any) {
      setStatus((old) => (old === "live" ? "live" : "static"));
      setError(e?.message || "Live indisponible");
    }
  }

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 60_000);
    return () => clearInterval(id);
  }, []);

  const assets = useMemo(() => ASSETS.map((a) => buildAsset(a, quotes)), [quotes]);
  const liveCount = assets.filter((a) => a.isLive).length;
  const riskOnScore = assets.find((a) => a.id === "nasdaq")!.score + assets.find((a) => a.id === "spx")!.score - assets.find((a) => a.id === "dxy")!.score;
  const regime = riskOnScore >= 8 ? "Risk-ON contrôlé" : riskOnScore <= 5 ? "Risk-OFF / prudence" : "Neutre actif";

  return (
    <main className="mf-shell">
      <style jsx global>{`
        :root {
          --bg: #060a10;
          --panel: rgba(13, 20, 32, 0.88);
          --panel2: rgba(17, 24, 39, 0.72);
          --line: rgba(148, 163, 184, 0.16);
          --line2: rgba(56, 189, 248, 0.32);
          --text: #f8fafc;
          --muted: #94a3b8;
          --dim: #64748b;
          --blue: #38bdf8;
          --green: #22c55e;
          --red: #fb7185;
          --orange: #fbbf24;
        }
        body { margin: 0; background: var(--bg); color: var(--text); }
        .mf-shell {
          min-height: 100vh;
          background:
            radial-gradient(circle at 20% 0%, rgba(56, 189, 248, 0.15), transparent 36%),
            radial-gradient(circle at 80% 10%, rgba(34, 197, 94, 0.08), transparent 30%),
            linear-gradient(180deg, #070b13 0%, #05080d 100%);
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif;
        }
        .tape {
          display: flex;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          background: rgba(2, 6, 23, 0.82);
          backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .tape-item {
          white-space: nowrap;
          padding: 11px 22px;
          border-right: 1px solid var(--line);
          font-size: 12px;
          letter-spacing: .08em;
          color: var(--muted);
        }
        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 34px 18px;
          border-bottom: 1px solid var(--line);
          background: rgba(5, 8, 13, 0.62);
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 26px;
          font-weight: 950;
          letter-spacing: .06em;
          text-transform: uppercase;
        }
        .brand span { color: var(--blue); }
        .pill {
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 8px 12px;
          font-size: 11px;
          font-weight: 800;
          color: var(--muted);
          background: rgba(15, 23, 42, 0.72);
        }
        .pill-live {
          border-color: rgba(34, 197, 94, .35);
          color: var(--green);
          background: rgba(34, 197, 94, .09);
        }
        .hero {
          padding: 54px 34px 36px;
          border-bottom: 1px solid var(--line);
          background-image:
            linear-gradient(rgba(56,189,248,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,.04) 1px, transparent 1px);
          background-size: 44px 44px;
        }
        .eyebrow {
          color: var(--blue);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: .22em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        h1 {
          margin: 0;
          font-size: clamp(42px, 6.4vw, 86px);
          line-height: .92;
          letter-spacing: -.07em;
          max-width: 1050px;
        }
        .gradient { color: var(--blue); }
        .hero p {
          color: var(--muted);
          max-width: 850px;
          line-height: 1.65;
          font-size: 16px;
          margin-top: 20px;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 26px;
        }
        .container { padding: 30px 34px 70px; }
        .grid-5 {
          display: grid;
          grid-template-columns: repeat(5, minmax(180px, 1fr));
          gap: 16px;
        }
        .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, minmax(210px, 1fr));
          gap: 16px;
        }
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(3, minmax(240px, 1fr));
          gap: 16px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 16px;
        }
        .card {
          background: linear-gradient(180deg, rgba(15, 23, 42, .82), rgba(8, 13, 22, .82));
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 18px 60px rgba(0,0,0,.22);
        }
        .card:hover { border-color: var(--line2); }
        .section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 28px 0 14px;
          color: var(--muted);
          font-size: 12px;
          letter-spacing: .18em;
          text-transform: uppercase;
          font-weight: 950;
        }
        .label {
          color: var(--dim);
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: .14em;
        }
        .price {
          font-size: 30px;
          font-weight: 950;
          margin: 10px 0 4px;
          letter-spacing: -.05em;
        }
        .change { font-size: 13px; font-weight: 900; }
        .green { color: var(--green); }
        .red { color: var(--red); }
        .orange { color: var(--orange); }
        .blue { color: var(--blue); }
        .muted { color: var(--muted); }
        .dim { color: var(--dim); }
        .bar {
          height: 7px;
          background: rgba(148, 163, 184, .12);
          border-radius: 999px;
          overflow: hidden;
          margin: 15px 0 12px;
        }
        .bar-fill { height: 100%; border-radius: 999px; }
        .row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
        }
        .mini {
          font-size: 12px;
          color: var(--muted);
          line-height: 1.55;
        }
        .status-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          margin-right: 8px;
          background: var(--green);
          box-shadow: 0 0 12px var(--green);
        }
        .news-card, .event-card {
          border: 1px solid var(--line);
          background: rgba(15,23,42,.5);
          border-radius: 14px;
          padding: 14px;
          margin-bottom: 10px;
        }
        .tag {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 4px 8px;
          font-size: 10px;
          font-weight: 900;
          border: 1px solid var(--line);
          color: var(--muted);
        }
        @media (max-width: 1100px) {
          .grid-5, .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 720px) {
          .grid-5, .grid-4, .grid-3, .grid-2 { grid-template-columns: 1fr; }
          .topbar { align-items: flex-start; flex-direction: column; gap: 14px; }
          .container, .hero, .topbar { padding-left: 18px; padding-right: 18px; }
        }
      `}</style>

      <div className="tape">
        {assets.map((a) => (
          <div className="tape-item" key={a.id}>
            {a.title} <strong style={{ color: "var(--text)", marginLeft: 6 }}>{a.price}</strong>
            <span className={a.isUp ? "green" : "red"} style={{ marginLeft: 8 }}>{a.change}</span>
          </div>
        ))}
      </div>

      <header className="topbar">
        <div className="brand">MACRO <span>FLOW</span> RESEARCH</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div className={status === "live" ? "pill pill-live" : "pill"}>
            {status === "live" ? <><span className="status-dot" />LIVE · {updatedAt}</> : "DONNÉES STATIQUES"}
          </div>
          <button onClick={refresh} className="pill" style={{ cursor: "pointer" }}>↻ RAFRAÎCHIR</button>
        </div>
      </header>

      <section className="hero">
        <div className="eyebrow">Institutional · Dashboard macro · NY session</div>
        <h1>Rapport Macro & <span className="gradient">Marchés Financiers</span></h1>
        <p>
          Vue trader opérationnelle : prix live quand disponibles, proxies ETF assumés, prévisions de scénario,
          risque macro, calendrier et plan d’exécution. Ce dashboard n’est pas un conseil financier.
        </p>
        <div className="hero-actions">
          <div className="pill pill-live">Régime : {regime}</div>
          <div className="pill">Flux live : {liveCount}/4</div>
          <div className="pill">Refresh : 60s</div>
          {error && <div className="pill orange">API : {error.slice(0, 58)}</div>}
        </div>
      </section>

      <div className="container">
        <div className="section-title">
          <span>Market command center</span>
          <span className="dim">QQQ/DIA/SPY = proxies tant que futures non branchés</span>
        </div>
        <div className="grid-5">
          {assets.map((a) => {
            const c = scoreColor(a.score);
            return (
              <div className="card" key={a.id}>
                <div className="row">
                  <div>
                    <div className="label">{a.title}</div>
                    <div className="mini">{a.subtitle}</div>
                  </div>
                  <span className="tag">{a.isLive ? "LIVE" : "STATIC"}</span>
                </div>
                <div className="price">{a.price}</div>
                <div className={`change ${a.isUp ? "green" : "red"}`}>{a.change}</div>
                <div className="bar"><div className="bar-fill" style={{ width: `${a.score * 10}%`, background: c }} /></div>
                <div className="row">
                  <span className="tag" style={{ color: c }}>{a.bias}</span>
                  <span className="mini">Score {a.score}/10 · conf. {a.confidence}/10</span>
                </div>
                <p className="mini" style={{ marginTop: 12 }}>{a.note}</p>
                <div className="mini" style={{ marginTop: 10 }}>O {a.open} · H {a.high} · L {a.low}</div>
              </div>
            );
          })}
        </div>

        <div className="grid-2" style={{ marginTop: 22 }}>
          <div>
            <div className="section-title"><span>Prévisions de séance</span><span>Probabilités indicatives</span></div>
            <div className="grid-3">
              <div className="card">
                <div className="label">Scénario A</div>
                <div className="price green">Risk-on</div>
                <p className="mini">DXY stable/faible + QQQ/SPY positifs. Chercher longs propres, pullback, RR ≥ 1.8.</p>
                <div className="bar"><div className="bar-fill" style={{ width: "42%", background: "var(--green)" }} /></div>
                <span className="tag green">42%</span>
              </div>
              <div className="card">
                <div className="label">Scénario B</div>
                <div className="price orange">Range / attente</div>
                <p className="mini">Données mitigées, marché attend catalyseur. Réduire taille, privilégier extrêmes de range.</p>
                <div className="bar"><div className="bar-fill" style={{ width: "36%", background: "var(--orange)" }} /></div>
                <span className="tag orange">36%</span>
              </div>
              <div className="card">
                <div className="label">Scénario C</div>
                <div className="price red">Risk-off</div>
                <p className="mini">DXY fort + indices faibles. Éviter longs agressifs, attendre confirmation sous VWAP.</p>
                <div className="bar"><div className="bar-fill" style={{ width: "22%", background: "var(--red)" }} /></div>
                <span className="tag red">22%</span>
              </div>
            </div>
          </div>

          <div>
            <div className="section-title"><span>Plan NY</span><span>Exécution</span></div>
            <div className="card">
              {PLAN.map((x, i) => (
                <div key={x} className="event-card">
                  <div className="row">
                    <span className="tag blue">0{i + 1}</span>
                    <span className="mini">{x}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: 22 }}>
          <div>
            <div className="section-title"><span>Calendrier macro</span><span>Événements clés</span></div>
            <div className="card">
              {EVENTS.map((e) => (
                <div className="event-card" key={e.name}>
                  <div className="row">
                    <div>
                      <div className="label">{e.zone} · {e.time}</div>
                      <strong>{e.name}</strong>
                    </div>
                    <span className={e.impact === "Très fort" ? "tag red" : "tag orange"}>{e.impact}</span>
                  </div>
                  <div className="mini" style={{ marginTop: 8 }}>{e.risk}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="section-title"><span>Risk monitor</span><span>À surveiller</span></div>
            <div className="card">
              {RISKS.map((r) => (
                <div className="news-card" key={r.name}>
                  <div className="row">
                    <strong>{r.name}</strong>
                    <span className={r.level === "Critique" ? "tag red" : r.level === "Élevé" ? "tag orange" : "tag"}>{r.level}</span>
                  </div>
                  <div className="mini" style={{ marginTop: 8 }}>{r.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-title"><span>Synthèse</span><span>Lecture opérationnelle</span></div>
        <div className="card">
          <p className="mini" style={{ fontSize: 14 }}>
            Le dashboard fonctionne avec un flux live limité par le plan API actuel. Pour un vrai terminal trading complet,
            il faudra brancher une source futures NQ/YM/ES, une vraie source DXY et un flux calendrier macro temps réel.
            La structure est prête : il reste à remplacer les proxies par des flux premium.
          </p>
        </div>
      </div>
    </main>
  );
}
