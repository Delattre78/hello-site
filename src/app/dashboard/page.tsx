"use client";
import Link from "next/link";
import { MACRO_ASSETS, SCORES, RISKS, EXEC_SUMMARY, CALENDAR, getBiasColor, getScoreColor, getRiskColor } from "@/lib/macro-data";

export default function Dashboard() {
  const topEvents = CALENDAR.filter(e => e.importance === 3).slice(0, 5);
  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="hero-tag">Dashboard — Semaine 23 · 3 juin 2026</div>
        <h1 className="hero-title">Vue Globale des Marchés</h1>
        <p className="hero-subtitle">Snapshot macro instantané — scores, régime de marché, risques et alertes de la semaine.</p>
        <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
          <div className="regime-pill regime-neutral"><span className="dot dot-orange" style={{ marginRight: 6 }} />Régime : Neutre</div>
          <span className="badge badge-blue">Données MàJ : 3 juin 2026</span>
          <span className="badge badge-orange">NFP Vendredi 6 juin ⚠</span>
        </div>
      </div>

      {/* Asset score cards */}
      <div className="section" style={{ marginTop: 28 }}>
        <div className="card-title">Scores actifs</div>
        <div className="grid-5">
          {MACRO_ASSETS.map((a) => {
            const sc = getScoreColor(a.score);
            return (
              <Link key={a.id} href={`/markets/${a.id}`}>
                <div className="score-card" style={{ cursor: "pointer", transition: "border-color 0.15s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div className="label-xs" style={{ marginBottom: 4 }}>{a.name}</div>
                      <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: -0.5 }}>{a.price}</div>
                      <div style={{ fontSize: 11, color: a.change.startsWith("+") ? "var(--green)" : "var(--red)", marginTop: 2 }}>{a.change}</div>
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
          {/* Exec summary */}
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

          {/* Key events */}
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
