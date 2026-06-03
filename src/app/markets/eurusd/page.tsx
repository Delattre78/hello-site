"use client";
import { EURUSD_ANALYSIS, TRADING_PLAN, getScoreColor } from "@/lib/macro-data";

function ScenarioCard({ s }: { s: { name: string; target: string; proba: string; catalyst: string; color: string } }) {
  return (
    <div className="scenario-card">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.name}</span>
        <span style={{ fontSize: 18, fontWeight: 900, color: s.color }}>{s.proba}</span>
      </div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>Cible : {s.target}</div>
      <div style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.5 }}>{s.catalyst}</div>
      <div style={{ marginTop: 10, height: 4, background: "var(--surface2)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: s.proba, height: "100%", background: s.color }} />
      </div>
    </div>
  );
}

export default function EURUSDPage() {
  const plan = TRADING_PLAN.find(t => t.asset === "EURUSD")!;
  const sc = getScoreColor(EURUSD_ANALYSIS.score);
  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-blue">Forex</span>
          <span className="badge badge-neutral">Neutre</span>
          <span className="badge badge-neutral">MaJ : 3 juin 2026</span>
        </div>
        <h1 className="hero-title">EUR / USD</h1>
        <p className="hero-subtitle">Analyse fondamentale institutionnelle — differentiel taux, croissance et inflation.</p>
        <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
          <div><div className="label-xs">Prix</div><div style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1 }}>{EURUSD_ANALYSIS.price}</div></div>
          <div><div className="label-xs">Score</div><div style={{ fontSize: 36, fontWeight: 900, color: sc }}>{EURUSD_ANALYSIS.score}<span style={{ fontSize: 16, color: "var(--text-dim)" }}>/10</span></div></div>
          <div><div className="label-xs">Confiance</div><div style={{ fontSize: 36, fontWeight: 900, color: "var(--text-muted)" }}>{EURUSD_ANALYSIS.confidence}<span style={{ fontSize: 16, color: "var(--text-dim)" }}>/10</span></div></div>
        </div>
      </div>

      <div className="section" style={{ marginTop: 28 }}>
        <div className="grid-2">
          <div className="card">
            <div className="card-title">Analyse Fondamentale</div>
            {[
              ["Differentiel Fed/BCE", EURUSD_ANALYSIS.spreadFedBCE],
              ["Differentiel croissance", EURUSD_ANALYSIS.growthDiff],
              ["Differentiel inflation", EURUSD_ANALYSIS.inflationDiff],
              ["Flux de capitaux", EURUSD_ANALYSIS.capitalFlows],
              ["Sentiment institutionnel", EURUSD_ANALYSIS.sentiment],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <span className="label-xs">{l}</span>
                <span style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: "55%", textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title">Biais directionnel</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              {[["1 semaine", EURUSD_ANALYSIS.biasWeek], ["1 mois", EURUSD_ANALYSIS.biasMonth], ["3 mois", EURUSD_ANALYSIS.biasTrimester]].map(([h, b]) => (
                <div key={h} style={{ flex: 1, textAlign: "center", padding: "12px 8px", background: "var(--surface2)", borderRadius: 8 }}>
                  <div className="label-xs">{h}</div>
                  <div style={{ fontSize: 12, color: "var(--text)", fontWeight: 700, marginTop: 6 }}>{b}</div>
                </div>
              ))}
            </div>
            <div className="card-title">Plan de trading</div>
            {[
              ["Setup", plan.setup], ["Catalyseur", plan.catalyst],
              ["Invalidation", plan.invalidation], ["Risque", plan.risk],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <span className="label-xs">{l}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: "60%", textAlign: "right" }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, fontStyle: "italic" }}>{plan.comment}</div>
          </div>
        </div>
        <div className="card-title" style={{ marginTop: 24, marginBottom: 16 }}>Scenarios</div>
        <div className="grid-3">
          {EURUSD_ANALYSIS.scenarios.map((s, i) => <ScenarioCard key={i} s={s} />)}
        </div>
        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-title">Sources</div>
          <div className="label-sm">Fed (federalreserve.gov), BCE (ecb.europa.eu), CME FedWatch, BEA (PIB US), Eurostat (PIB Zone Euro), BLS (CPI, PCE). Donnees au 3 juin 2026.</div>
        </div>
      </div>
    </div>
  );
}