"use client";
import { SP500_ANALYSIS, TRADING_PLAN, getScoreColor } from "@/lib/macro-data";

function ScenarioCard({ s }: { s: { name: string; target: string; proba: string; catalyst: string; color: string } }) {
  return (
    <div className="scenario-card">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.name}</span>
        <span style={{ fontSize: 18, fontWeight: 900, color: s.color }}>{s.proba}</span>
      </div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>Cible : {s.target}</div>
      <div style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.5 }}>{s.catalyst}</div>
    </div>
  );
}

export default function SP500Page() {
  const plan = TRADING_PLAN.find(t => t.asset === "S&P 500")!;
  const sc = getScoreColor(SP500_ANALYSIS.score);
  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-blue">Indices US</span>
          <span className="badge badge-bullish">Haussier</span>
        </div>
        <h1 className="hero-title">S&amp;P 500</h1>
        <p className="hero-subtitle">Breadth, earnings, valorisations et flux institutionnels — analyse complete.</p>
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          <div><div className="label-xs">SPX</div><div style={{ fontSize: 36, fontWeight: 900, color: "var(--green)" }}>{SP500_ANALYSIS.price}</div></div>
          <div><div className="label-xs">Score</div><div style={{ fontSize: 36, fontWeight: 900, color: sc }}>{SP500_ANALYSIS.score}<span style={{ fontSize: 16, color: "var(--text-dim)" }}>/10</span></div></div>
        </div>
      </div>

      <div className="section" style={{ marginTop: 28 }}>
        <div className="grid-2">
          <div className="card">
            <div className="card-title">Metriques cles</div>
            {[
              ["Breadth (MM200)", SP500_ANALYSIS.breadth],
              ["Earnings Q1 YoY", SP500_ANALYSIS.earningsGrowth],
              ["P/E Forward", SP500_ANALYSIS.peForward],
              ["Marges nettes", SP500_ANALYSIS.margins],
              ["Flux ETF (4 sem.)", SP500_ANALYSIS.etfFlows],
              ["Positionnement institutionnel", SP500_ANALYSIS.institutional],
              ["Risque correction", SP500_ANALYSIS.correctionRisk],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                <span className="label-xs">{l}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: "60%", textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-title">Plan de trading</div>
            {[["Setup", plan.setup], ["Catalyseur", plan.catalyst], ["Invalidation", plan.invalidation], ["Confiance", `${plan.confidence}/10`], ["Risque", plan.risk]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                <span className="label-xs">{l}</span>
                <span style={{ fontSize: 12, color: "var(--text-muted)", maxWidth: "60%", textAlign: "right" }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 12, fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>{plan.comment}</div>
          </div>
        </div>
        <div className="card-title" style={{ marginTop: 24, marginBottom: 16 }}>Scenarios avec probabilites</div>
        <div className="grid-3">
          {SP500_ANALYSIS.scenarios.map((s, i) => <ScenarioCard key={i} s={s} />)}
        </div>
      </div>
    </div>
  );
}