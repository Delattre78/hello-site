"use client";
import { EUROPE_MACRO } from "@/lib/macro-data";

export default function EuropePage() {
  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-blue">Macro</span>
          <span className="badge badge-neutral">Zone Euro</span>
        </div>
        <h1 className="hero-title">Economie Zone Euro</h1>
        <p className="hero-subtitle">PIB, inflation, BCE et indicateurs avances — 7 indicateurs cles.</p>
      </div>

      <div className="section section-last" style={{ marginTop: 28 }}>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Indicateur</th><th>Dernier</th><th>Precedent</th><th>Consensus</th><th>Interpretation</th><th>Source</th><th>Date</th></tr></thead>
            <tbody>
              {EUROPE_MACRO.map((item, i) => (
                <tr key={i}>
                  <td className="cell-main">{item.name}</td>
                  <td className="cell-up">{item.value}</td>
                  <td className="cell-neutral">{item.prev}</td>
                  <td className="cell-neutral">{item.consensus}</td>
                  <td className="cell-impact">{item.interp}</td>
                  <td style={{ fontSize: 10, color: "var(--blue-light)" }}>{item.source}</td>
                  <td style={{ fontSize: 10, color: "var(--text-dim)", whiteSpace: "nowrap" }}>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid-2" style={{ marginTop: 20 }}>
          <div className="card">
            <div className="card-title">Croissance par pays</div>
            {[
              ["Allemagne", "Q1 2026", "+0.2%", "var(--orange)", "Legere reprise apres recessions techniques"],
              ["France", "Q1 2026", "+0.2%", "var(--text-muted)", "Croissance atone, risques budgetaires"],
              ["Italie", "Q1 2026", "+0.3%", "var(--green)", "Meilleure surprise de la zone euro"],
              ["Espagne", "Q1 2026", "+0.7%", "var(--green)", "Leader de la croissance europeenne"],
            ].map(([pays, period, val, color, comment]) => (
              <div key={pays as string} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{pays}</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{period} · {comment}</div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 800, color: color as string }}>{val}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ borderLeft: "3px solid var(--blue)" }}>
            <div className="card-title">BCE — Analyse</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 16 }}>
              La BCE a procede a une nouvelle baisse de 25pb le 6 juin 2026, portant le taux de depot a 3.25%. Christine Lagarde confirme le cycle d'assouplissement graduel. Prochain pivot si Core HICP passe sous 2.5%.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, textAlign: "center", padding: 12, background: "var(--surface2)", borderRadius: 8 }}>
                <div className="label-xs">Taux depot</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "var(--blue)", marginTop: 6 }}>3.25%</div>
              </div>
              <div style={{ flex: 1, textAlign: "center", padding: 12, background: "var(--surface2)", borderRadius: 8 }}>
                <div className="label-xs">Prochaine BCE</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 6 }}>17 juil. 2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}