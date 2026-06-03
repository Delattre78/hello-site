"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ASSETS, DATA, scoreColor, scoreLabel,
  type TagColor, type RowStatus, type FinRow, type ScoreRow,
} from "@/lib/data";

/* ─── primitives ─────────────────────────────────────────────── */

function Tag({ children, color = "default" }: { children: React.ReactNode; color?: TagColor }) {
  const s: Record<TagColor, React.CSSProperties> = {
    green:   { background: "var(--green-dim)",        color: "var(--green)",      border: "1px solid rgba(34,197,94,0.25)" },
    red:     { background: "var(--red-dim)",           color: "var(--red)",        border: "1px solid rgba(239,68,68,0.25)" },
    amber:   { background: "var(--amber-dim)",         color: "var(--amber)",      border: "1px solid rgba(245,158,11,0.25)" },
    blue:    { background: "var(--blue-dim)",          color: "var(--blue)",       border: "1px solid rgba(59,130,246,0.25)" },
    purple:  { background: "rgba(168,85,247,0.12)",    color: "#a855f7",           border: "1px solid rgba(168,85,247,0.25)" },
    default: { background: "rgba(255,255,255,0.06)",   color: "var(--text-muted)", border: "1px solid var(--border)" },
  };
  return (
    <span style={{ ...s[color], padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, letterSpacing: 0.3, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px 24px", ...style }}>
      {children}
    </div>
  );
}

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 11, letterSpacing: 1.5, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>{n}</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>{title}</h2>
    </div>
  );
}

/* ─── animated gauge ─────────────────────────────────────────── */

function ScoreGauge({ score, color }: { score: number; color: string }) {
  const [v, setV] = useState(0);
  useEffect(() => { const t = setTimeout(() => setV(score), 150); return () => clearTimeout(t); }, [score]);
  const r = 80, circ = Math.PI * r, offset = circ - (v / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <svg width={200} height={110} viewBox="0 0 200 110">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--border-strong)" strokeWidth={10} strokeLinecap="round" />
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={color} strokeWidth={10} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 8px ${color})` }} />
        <text x="100" y="88" textAnchor="middle" fontSize="36" fontWeight="800" fill={color}>{v}</text>
        <text x="100" y="105" textAnchor="middle" fontSize="11" fill="var(--text-muted)" fontWeight="600">/ 100</text>
      </svg>
      <div style={{ fontSize: 16, fontWeight: 700, color }}>{scoreLabel(score)}</div>
    </div>
  );
}

function ScoreBar({ score, max, color }: { score: number; max: number; color: string }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW((score / max) * 100), 400); return () => clearTimeout(t); }, [score, max]);
  return (
    <div style={{ flex: 1, height: 5, background: "var(--surface2)", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${w}%`, background: color, borderRadius: 3, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
    </div>
  );
}

/* ─── tables ─────────────────────────────────────────────────── */

function ResultsTable({ rows, period1, period2 }: {
  rows: { label: string; v1: string; v2: string; change: string; status: RowStatus }[];
  period1: string; period2: string;
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border-strong)" }}>
            {["Métrique", period1, period2, "Variation", "Statut"].map((h) => (
              <th key={h} style={{ padding: "8px 14px", textAlign: "left", color: "var(--text-muted)", fontWeight: 600, fontSize: 11, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} style={{ borderBottom: "1px solid var(--border)" }}>
              <td style={{ padding: "10px 14px", fontWeight: 600 }}>{r.label}</td>
              <td style={{ padding: "10px 14px", fontWeight: 700 }}>{r.v1}</td>
              <td style={{ padding: "10px 14px", color: "var(--text-muted)" }}>{r.v2}</td>
              <td style={{ padding: "10px 14px", fontWeight: 600, color: r.change.startsWith("+") ? "var(--green)" : r.change.startsWith("−") || r.change.startsWith("-") ? "var(--red)" : "var(--text-muted)" }}>{r.change}</td>
              <td style={{ padding: "10px 14px" }}>
                {r.status === "hit"     && <Tag color="green">✓ Beat</Tag>}
                {r.status === "miss"    && <Tag color="red">✗ Miss</Tag>}
                {r.status === "neutral" && <Tag>—</Tag>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FinTable({ rows, headers }: { rows: FinRow[]; headers: [string, string, string] }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border-strong)" }}>
            <th style={{ padding: "8px 14px", textAlign: "left", color: "var(--text-muted)", fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}></th>
            {headers.map((h) => (
              <th key={h} style={{ padding: "8px 14px", textAlign: "right", color: "var(--text-muted)", fontWeight: 600, fontSize: 11, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} style={{ borderBottom: "1px solid var(--border)", background: r.bold ? "rgba(255,255,255,0.02)" : "transparent" }}>
              <td style={{ padding: "10px 14px", fontWeight: r.bold ? 700 : 400, color: r.muted ? "var(--text-muted)" : "var(--text)", paddingLeft: r.muted ? 26 : 14 }}>{r.label}</td>
              {[r.y1, r.y2, r.y3].map((v, i) => (
                <td key={i} style={{ padding: "10px 14px", textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: r.bold ? 700 : 400, color: (v.startsWith("−") || v.startsWith("-")) ? "var(--red)" : v.startsWith("+") ? "var(--green)" : "var(--text)" }}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── main client component ──────────────────────────────────── */

export function AssetPageClient({ slug }: { slug: string }) {
  const asset = ASSETS.find((a) => a.slug === slug);
  if (!asset) { notFound(); return null; }

  const d = DATA[asset.id];
  const total = d.scoreRows.reduce((a: number, r: ScoreRow) => a + r.score, 0);
  const color = scoreColor(total);
  const shell: React.CSSProperties = { maxWidth: 900, margin: "0 auto", padding: "0 24px" };

  const sections = [
    { id: "secteur", label: "Secteur" },
    { id: "resultats", label: "Résultats" },
    { id: "modele", label: "Modèle" },
    { id: "valorisation", label: "Valorisation" },
    { id: "score", label: "Score" },
  ];
  const [activeSection, setActiveSection] = useState("secteur");

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const onScroll = () => {
      const y = window.scrollY + 120;
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= y) { setActiveSection(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* sticky nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(8,12,16,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ ...shell, display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/" style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "none" }}>
              ← Accueil
            </Link>
            <span style={{ color: "var(--border-strong)" }}>|</span>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: asset.color + "25", border: `1px solid ${asset.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: asset.color }}>
              {asset.ticker.slice(0, 2)}
            </div>
            <span style={{ fontWeight: 700, fontSize: 13 }}>{asset.ticker}</span>
            <span style={{ fontSize: 12, color, fontWeight: 600, background: color + "15", border: `1px solid ${color}30`, borderRadius: 6, padding: "1px 7px" }}>
              {total}/100
            </span>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} style={{
                padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, textDecoration: "none",
                color: activeSection === s.id ? "var(--text)" : "var(--text-muted)",
                background: activeSection === s.id ? "var(--surface2)" : "transparent",
                transition: "all 0.15s",
              }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* hero */}
      <div style={{ borderBottom: "1px solid var(--border)", padding: "52px 0 44px" }}>
        <div style={shell}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 28, alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                <Tag>{asset.exchange}: {asset.ticker}</Tag>
                {d.tags.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
              <h1 style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1.5, lineHeight: 1, marginBottom: 10 }}>{asset.name}</h1>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 4 }}>{asset.sector}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{d.headline}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 300 }}>
              <Card style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 0.8, fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Cours actuel</div>
                  <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: -1.2 }}>{asset.price}</div>
                  <div style={{ fontSize: 12, color: asset.positive ? "var(--green)" : "var(--red)", fontWeight: 600, marginTop: 4 }}>
                    {asset.positive ? "▲" : "▼"} {asset.priceChange}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 0.8, fontWeight: 600, textTransform: "uppercase", marginBottom: 6 }}>Market Cap</div>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>{asset.marketCap}</div>
                </div>
              </Card>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                {d.metrics.map((m) => (
                  <Card key={m.label} style={{ padding: "12px 14px" }}>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", letterSpacing: 0.8, textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>{m.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 800 }}>{m.value}</div>
                    {m.delta && <div style={{ fontSize: 10, color: m.positive ? "var(--green)" : "var(--red)", fontWeight: 600, marginTop: 3 }}>{m.positive ? "▲" : "▼"} {m.delta}</div>}
                    {m.sub && <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{m.sub}</div>}
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={shell}>

        {/* 01 — secteur */}
        <section id="secteur" style={{ padding: "44px 0", borderBottom: "1px solid var(--border)" }}>
          <SectionLabel n="01 — Secteur & Concurrence" title="Paysage concurrentiel" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Card>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 14 }}>Concurrents principaux</div>
              {d.competitors.map((c) => (
                <div key={c.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{c.detail}</div>
                  </div>
                  <Tag color={c.color}>{c.tag}</Tag>
                </div>
              ))}
            </Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {d.keyPoints[0].slice(0, 2).map((p) => (
                <Card key={p.text} style={{ borderLeft: "3px solid var(--green)", padding: "14px 16px" }}>
                  <span style={{ color: "var(--green)", marginRight: 8 }}>▸</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{p.text}</span>
                </Card>
              ))}
              {d.keyPoints[1].slice(0, 2).map((p) => (
                <Card key={p.text} style={{ borderLeft: "3px solid var(--red)", padding: "14px 16px" }}>
                  <span style={{ color: "var(--red)", marginRight: 8 }}>▸</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{p.text}</span>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 02 — résultats */}
        <section id="resultats" style={{ padding: "44px 0", borderBottom: "1px solid var(--border)" }}>
          <SectionLabel n="02 — Résultats" title={`${d.resultPeriods[0]} — Chiffres clés`} />
          <Card style={{ marginBottom: 14 }}>
            <ResultsTable rows={d.resultRows} period1={d.resultPeriods[0]} period2={d.resultPeriods[1]} />
          </Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Card style={{ borderLeft: "3px solid var(--green)" }}>
              <div style={{ fontSize: 11, color: "var(--green)", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>✓ Points positifs</div>
              {d.keyPoints[0].map((p) => (
                <div key={p.text} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ color: "var(--green)", flexShrink: 0, marginTop: 2 }}>▸</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{p.text}</span>
                </div>
              ))}
            </Card>
            <Card style={{ borderLeft: "3px solid var(--red)" }}>
              <div style={{ fontSize: 11, color: "var(--red)", fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 10 }}>⚠ Points de vigilance</div>
              {d.keyPoints[1].map((p) => (
                <div key={p.text} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 8 }}>
                  <span style={{ color: "var(--red)", flexShrink: 0, marginTop: 2 }}>▸</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{p.text}</span>
                </div>
              ))}
            </Card>
          </div>
        </section>

        {/* 03 — modèle */}
        <section id="modele" style={{ padding: "44px 0", borderBottom: "1px solid var(--border)" }}>
          <SectionLabel n="03 — Modèle financier" title="Projections 3 ans" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            <Card>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>Compte de résultat</div>
              <FinTable rows={d.incomeRows} headers={d.finHeaders} />
            </Card>
            <Card>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>Cash Flow</div>
              <FinTable rows={d.cashRows} headers={d.finHeaders} />
            </Card>
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>Catalyseurs clés</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {d.catalysts.map((c) => (
              <Card key={c.title} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 16px" }}>
                <div style={{ fontSize: 20, lineHeight: 1, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{c.title}</span>
                    <Tag>{c.year}</Tag>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.55 }}>{c.desc}</div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 04 — valorisation */}
        <section id="valorisation" style={{ padding: "44px 0", borderBottom: "1px solid var(--border)" }}>
          <SectionLabel n="04 — Valorisation" title="DCF & Scénarios de prix" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <Card>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 14 }}>{d.valuation.evLabel}</div>
              {d.valuation.dcfLines.map((l) => (
                <div key={l.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{l.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: l.pos ? "var(--green)" : "var(--red)" }}>{l.value}</span>
                </div>
              ))}
              <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--surface2)", borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Valeur estimée</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "var(--amber)" }}>{d.valuation.evValue}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{d.valuation.evNote}</div>
              </div>
              <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-muted)", lineHeight: 1.65 }}>
                {d.valuation.wacc}<br />{d.valuation.note}
              </div>
            </Card>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {d.priceTargets.map((pt) => {
                const c = pt.scenario === "Bear" ? "var(--red)" : pt.scenario === "Bull" ? "var(--green)" : "var(--amber)";
                return (
                  <Card key={pt.scenario} style={{ borderLeft: `3px solid ${c}`, display: "flex", gap: 14, alignItems: "center", padding: "14px 16px" }}>
                    <div style={{ fontSize: 24 }}>{pt.emoji}</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
                        <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase" }}>{pt.scenario}</span>
                        <span style={{ fontSize: 18, fontWeight: 900, color: c }}>{pt.range}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{pt.condition}</div>
                    </div>
                  </Card>
                );
              })}
              <Card style={{ background: "var(--surface2)", padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Cours actuel</div>
                <div style={{ fontSize: 17, fontWeight: 800 }}>{asset.price} <span style={{ fontSize: 12, color: "var(--amber)", fontWeight: 600 }}>— {d.currentZone}</span></div>
              </Card>
            </div>
          </div>
          <Card>
            <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 14 }}>Multiples comparables</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-strong)" }}>
                    {["Multiple", "Pairs (médiane)", d.finHeaders[0], d.finHeaders[1]].map((h) => (
                      <th key={h} style={{ padding: "8px 14px", textAlign: "left", color: "var(--text-muted)", fontWeight: 600, fontSize: 11, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {d.compsRows.map((r) => (
                    <tr key={r.multiple} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 14px", fontWeight: 600 }}>{r.multiple}</td>
                      <td style={{ padding: "10px 14px", color: "var(--text-muted)" }}>{r.peers}</td>
                      <td style={{ padding: "10px 14px", color: "var(--red)", fontWeight: 700 }}>{r.v1}</td>
                      <td style={{ padding: "10px 14px", color: "var(--amber)", fontWeight: 700 }}>{r.v2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* 05 — score */}
        <section id="score" style={{ padding: "44px 0", borderBottom: "1px solid var(--border)" }}>
          <SectionLabel n="05 — Recommandation" title="Score d'achat" />
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 14, marginBottom: 14 }}>
            <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <ScoreGauge score={total} color={color} />
              <div style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", lineHeight: 1.65, padding: "0 4px" }}>
                Score pondéré sur 6 critères.
              </div>
            </Card>
            <Card>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 16 }}>Grille de notation</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {d.scoreRows.map((r: ScoreRow) => {
                  const ratio = r.score / r.max;
                  const bc = ratio >= 0.6 ? "var(--green)" : ratio >= 0.4 ? "var(--amber)" : "var(--red)";
                  return (
                    <div key={r.label}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{r.label}</span>
                        <Tag>{r.weight}</Tag>
                        <span style={{ fontSize: 13, fontWeight: 700, minWidth: 36, textAlign: "right" }}>
                          <span style={{ color: bc }}>{r.score}</span>
                          <span style={{ color: "var(--text-dim)" }}>/{r.max}</span>
                        </span>
                      </div>
                      <ScoreBar score={r.score} max={r.max} color={bc} />
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{r.note}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
          <Card style={{ background: "var(--surface2)", borderColor: color + "20" }}>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 240 }}>
                <div style={{ fontSize: 11, color, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8 }}>Recommandation</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{scoreLabel(total)}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.75 }}>{d.recommendation}</div>
              </div>
              <div style={{ minWidth: 200 }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 10 }}>Seuils à surveiller</div>
                {d.thresholds.map((t) => (
                  <div key={t.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: t.color }}>{t.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* sources + navigation */}
        <div style={{ padding: "28px 0 44px" }}>
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>Sources</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
            {d.sources.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "none", display: "flex", gap: 5, alignItems: "flex-start" }}>
                <span style={{ color: "var(--text-dim)" }}>↗</span>
                <span style={{ borderBottom: "1px solid var(--border)" }}>{s.label}</span>
              </a>
            ))}
          </div>

          {/* navigation vers les autres actifs */}
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 }}>Autres analyses</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/" style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
              background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10,
              textDecoration: "none", fontSize: 13, fontWeight: 600, color: "var(--text-muted)",
            }}>
              ← Accueil
            </Link>
            {ASSETS.filter((a) => a.id !== asset.id).map((a) => (
              <Link key={a.id} href={`/actif/${a.slug}`} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
                background: "var(--surface)", border: `1px solid ${a.color}30`, borderRadius: 10,
                textDecoration: "none", fontSize: 13, fontWeight: 600,
              }}>
                <span style={{ color: scoreColor(a.score), fontWeight: 700 }}>{a.score}</span>
                <span style={{ color: "var(--text-muted)" }}>{a.ticker}</span>
                <span style={{ color: "var(--text-dim)", fontSize: 11 }}>{a.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* footer */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "20px 0" }}>
        <div style={{ ...shell, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: 11, color: "var(--text-dim)" }}>Skills Financial Analysis (DCF · Comps · Competitive Analysis · 3-Statement)</div>
          <div style={{ fontSize: 11, color: "var(--text-dim)" }}>Pas un conseil en investissement · Juin 2026</div>
        </div>
      </footer>
    </div>
  );
}
