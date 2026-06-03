"use client";
import { NASDAQ_ANALYSIS, TRADING_PLAN, getScoreColor } from "@/lib/macro-data";

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

export default function NasdaqPage() {
  const plan = TRADING_PLAN.find(t => t.asset === "Nasdaq 100")!;
  const sc = getScoreColor(NASDAQ_ANALYSIS.score);
  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-blue">Indices US</span>
          <span className="badge badge-bullish">Haussier</span>
        </div>
        <h1 className="hero-title">Nasdaq 100</h1>
        <p className="hero-subtitle">Big Tech, IA, yields obligataires et sentiment risk-on — analyse institutionnelle.</p>
        <div style={{ display: "flex", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
          <div><div className="label-xs">NQ</div><div style={{ fontSize: 36, fontWeight: 900, color: "var(--green)" }}>{NASDAQ_ANALYSIS.price}</div></div>
          <div><div className="label-xs">Score</div><div style={{ fontSize: 36, fontWeight: 900, color: sc }}>{NASDAQ_ANALYSIS.score}<span style={{ fontSize: 16, color: "var(--text-dim)" }}>/10</span></div></div>
        </div>
      </div>

      <div className="section" style={{ marginTop: 28 }}>
        <div className="grid-2">
          <div className="card">
            <div className="card-title">Analyse fondamentale</div>
            {[
              ["US 10Y Yield", NASDAQ_ANALYSIS.tenYrYield],
              ["Liquidite", NASDAQ_ANALYSIS.liquidityStatus],
              ["Big Tech Q1", NASDAQ_ANALYSIS.bigTech],
              ["IA / CapEx", NASDAQ_ANALYSIS.aiTheme],
              ["Earnings S&P500", NASDAQ_ANALYSIS.earnings],
              ["Valorisations", NASDAQ_ANALYSIS.valuations],
              ["Sentiment", NASDAQ_ANALYSIS.sentiment],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                <span className="label-xs">{l}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: "60%", textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title">Plan de trading</div>
            {[["Biais", "Haussier"], ["Setup", plan.setup], ["Catalyseur", plan.catalyst], ["Invalidation", plan.invalidation], ["Confiance", `${plan.confidence}/10`], ["Risque", plan.risk]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                <span className="label-xs">{l}</span>
                <span style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: "60%", textAlign: "right" }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: 12, background: "var(--surface2)", borderRadius: 8, fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>{plan.comment}</div>
          </div>
        </div>
        <div className="card-title" style={{ marginTop: 24, marginBottom: 16 }}>Scenarios avec probabilites</div>
        <div className="grid-3">
          {NASDAQ_ANALYSIS.scenarios.map((s, i) => <ScenarioCard key={i} s={s} />)}
        </div>
      </div>
    </div>
  );
}