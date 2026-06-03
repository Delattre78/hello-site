"use client";
import { RISKS, getRiskColor } from "@/lib/macro-data";

export default function RiskMonitorPage() {
  const critiques = RISKS.filter(r => r.level === "Élevé" || r.level === "Critique");
  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-blue">Risk Monitor</span>
          <span className="badge badge-risk-eleve">{critiques.length} risques elevés</span>
        </div>
        <h1 className="hero-title">Risk Monitor</h1>
        <p className="hero-subtitle">Surveillance des 8 risques macro majeurs avec probabilite et impact marche.</p>
      </div>

      <div className="section section-last" style={{ marginTop: 28 }}>
        <div className="grid-4">
          {RISKS.map((r) => {
            const rc = getRiskColor(r.level);
            const badgeClass = r.level === "Élevé" ? "badge-risk-eleve" : r.level === "Modéré" ? "badge-risk-modere" : r.level === "Critique" ? "badge-risk-critique" : "badge-risk-faible";
            return (
              <div key={r.id} className="risk-card" style={{ borderTop: `3px solid ${rc}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: -0.3 }}>{r.name}</div>
                  <span className={`badge ${badgeClass}`}>{r.level}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>{r.comment}</div>
                <div style={{ padding: "12px", background: "var(--surface2)", borderRadius: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div><div className="label-xs" style={{ marginBottom: 3 }}>Probabilite</div><div style={{ fontSize: 20, fontWeight: 900, color: rc }}>{r.proba}</div></div>
                    <div style={{ textAlign: "right" }}><div className="label-xs" style={{ marginBottom: 3 }}>Impact</div><div style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: 130, textAlign: "right" }}>{r.impact}</div></div>
                  </div>
                  <div className="label-xs" style={{ marginBottom: 6 }}>Actifs exposes</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {r.assets.map(a => <span key={a} className="badge badge-neutral">{a}</span>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <div className="card-title">Synthese des risques — Semaine 23</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { level: "Critique", count: RISKS.filter(r => r.level === "Critique").length, color: "var(--red)" },
              { level: "Eleve", count: RISKS.filter(r => r.level === "Élevé").length, color: "#fb923c" },
              { level: "Modere", count: RISKS.filter(r => r.level === "Modéré").length, color: "var(--orange)" },
              { level: "Faible", count: RISKS.filter(r => r.level === "Faible").length, color: "var(--green)" },
            ].map(d => (
              <div key={d.level} style={{ textAlign: "center", padding: "16px 24px", background: "var(--surface2)", borderRadius: 10, flex: 1 }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: d.color }}>{d.count}</div>
                <div className="label-xs" style={{ marginTop: 4 }}>{d.level}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}