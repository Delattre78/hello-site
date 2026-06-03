"use client";
import { DXY_ANALYSIS, TRADING_PLAN, getScoreColor } from "@/lib/macro-data";

export default function DXYPage() {
  const plan = TRADING_PLAN.find(t => t.asset === "DXY")!;
  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-blue">Dollar Index</span>
          <span className="badge badge-neutral">Neutre</span>
        </div>
        <h1 className="hero-title">Dollar Index — DXY</h1>
        <p className="hero-subtitle">Tendance dollar, correlations et forces directionnelles.</p>
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          <div><div className="label-xs">DXY</div><div style={{ fontSize: 36, fontWeight: 900 }}>{DXY_ANALYSIS.price}</div></div>
          <div><div className="label-xs">Score</div><div style={{ fontSize: 36, fontWeight: 900, color: getScoreColor(DXY_ANALYSIS.score) }}>{DXY_ANALYSIS.score}<span style={{ fontSize: 16, color: "var(--text-dim)" }}>/10</span></div></div>
        </div>
        <div style={{ marginTop: 12, fontSize: 12, color: "var(--text-muted)" }}>Tendance : {DXY_ANALYSIS.trend}</div>
      </div>

      <div className="section" style={{ marginTop: 28 }}>
        <div className="grid-2">
          <div className="card">
            <div className="grid-2">
              <div>
                <div className="card-title" style={{ color: "var(--green)" }}>Forces haussières</div>
                {DXY_ANALYSIS.bullForces.map((f, i) => <div key={i} style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8, paddingLeft: 10, borderLeft: "2px solid var(--green)" }}>+ {f}</div>)}
              </div>
              <div>
                <div className="card-title" style={{ color: "var(--red)" }}>Forces baissières</div>
                {DXY_ANALYSIS.bearForces.map((f, i) => <div key={i} style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8, paddingLeft: 10, borderLeft: "2px solid var(--red)" }}>- {f}</div>)}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="card">
              <div className="card-title">Correlations</div>
              <div style={{ marginBottom: 12 }}><div className="label-sm">Taux US 10 ans</div><div style={{ fontSize: 18, fontWeight: 800, color: "var(--green)", marginTop: 4 }}>{DXY_ANALYSIS.correlationUS10Y}</div></div>
              <div><div className="label-sm">S&amp;P 500</div><div style={{ fontSize: 18, fontWeight: 800, color: "var(--orange)", marginTop: 4 }}>{DXY_ANALYSIS.correlationSP500}</div></div>
            </div>
            <div className="card">
              <div className="card-title">Scenarios</div>
              <div style={{ marginBottom: 10 }}><div className="label-xs" style={{ marginBottom: 4 }}>Principal</div><div style={{ fontSize: 12, color: "var(--text-muted)" }}>{DXY_ANALYSIS.scenarioPrimary}</div></div>
              <div><div className="label-xs" style={{ marginBottom: 4 }}>Alternatif</div><div style={{ fontSize: 12, color: "var(--text-muted)" }}>{DXY_ANALYSIS.scenarioAlternate}</div></div>
            </div>
          </div>
        </div>
        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-title">Plan de trading DXY</div>
          <div className="grid-3">
            {[["Setup", plan.setup], ["Catalyseur", plan.catalyst], ["Invalidation", plan.invalidation], ["Confiance", `${plan.confidence}/10`], ["Risque", plan.risk]].map(([l, v]) => (
              <div key={l}><div className="label-xs" style={{ marginBottom: 4 }}>{l}</div><div style={{ fontSize: 12, color: "var(--text-muted)" }}>{v}</div></div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>{plan.comment}</div>
        </div>
      </div>
    </div>
  );
}