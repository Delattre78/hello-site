"use client";
import { DOW_ANALYSIS, TRADING_PLAN, getScoreColor } from "@/lib/macro-data";

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

export default function DowJonesPage() {
  const plan = TRADING_PLAN.find(t => t.asset === "Dow Jones")!;
  const sc = getScoreColor(DOW_ANALYSIS.score);
  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-blue">Indices US</span>
          <span className="badge badge-neutral">Neutre</span>
        </div>
        <h1 className="hero-title">Dow Jones Industrial Average</h1>
        <p className="hero-subtitle">Analyse sectorielle — cycliques, banques, sante et industrie.</p>
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          <div><div className="label-xs">DJIA</div><div style={{ fontSize: 36, fontWeight: 900 }}>{DOW_ANALYSIS.price}</div></div>
          <div><div className="label-xs">Score</div><div style={{ fontSize: 36, fontWeight: 900, color: sc }}>{DOW_ANALYSIS.score}<span style={{ fontSize: 16, color: "var(--text-dim)" }}>/10</span></div></div>
        </div>
      </div>

      <div className="section" style={{ marginTop: 28 }}>
        <div className="grid-2">
          <div className="card">
            <div className="card-title">Analyse sectorielle</div>
            {DOW_ANALYSIS.sectors.map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>{s.comment}</div>
                </div>
                <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: s.outlook.includes("Baissier") ? "rgba(239,68,68,0.12)" : "rgba(148,163,184,0.1)", color: s.outlook.includes("Baissier") ? "var(--red)" : "#94a3b8", fontWeight: 700 }}>{s.outlook}</span>
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
        <div className="card-title" style={{ marginTop: 24, marginBottom: 16 }}>Scenarios</div>
        <div className="grid-3">
          {DOW_ANALYSIS.scenarios.map((s, i) => <ScenarioCard key={i} s={s} />)}
        </div>
      </div>
    </div>
  );
}