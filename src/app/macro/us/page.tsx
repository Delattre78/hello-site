"use client";
import { US_MACRO } from "@/lib/macro-data";

export default function MacroUSPage() {
  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-blue">Macro</span>
          <span className="badge badge-neutral">MaJ : 3 juin 2026</span>
        </div>
        <h1 className="hero-title">Economie Americaine</h1>
        <p className="hero-subtitle">15 indicateurs macro US avec sources verifiees, interpretations et impact marche.</p>
      </div>
      <div className="section section-last" style={{ marginTop: 28 }}>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Indicateur</th><th>Dernier</th><th>Precedent</th><th>Consensus</th>
                <th>Tendance</th><th>Impact marche</th><th>Interpretation</th><th>Source</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {US_MACRO.map((item, i) => (
                <tr key={i}>
                  <td className="cell-main">{item.name}</td>
                  <td style={{ color: item.trend === "down" ? "var(--red)" : item.trend === "up" ? "var(--green)" : "var(--text)", fontWeight: 700 }}>{item.value}</td>
                  <td className="cell-neutral">{item.prev}</td>
                  <td className="cell-neutral">{item.consensus}</td>
                  <td style={{ color: item.trend === "up" ? "var(--green)" : item.trend === "down" ? "var(--red)" : "var(--text-muted)", fontSize: 14 }}>{item.trend === "up" ? "▲" : item.trend === "down" ? "▼" : "—"}</td>
                  <td className="cell-impact">{item.impact}</td>
                  <td style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: 200 }}>{item.interp}</td>
                  <td style={{ fontSize: 10, color: "var(--blue-light)" }}>{item.source}</td>
                  <td style={{ fontSize: 10, color: "var(--text-dim)", whiteSpace: "nowrap" }}>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid-3" style={{ marginTop: 20 }}>
          <div className="card-sm" style={{ borderLeft: "2px solid var(--green)" }}><div className="card-title">Conditions financieres</div><div style={{ fontSize: 13, color: "var(--green)", fontWeight: 700, marginBottom: 6 }}>Accommodantes</div><div className="label-sm">GS FCI : 99.4. Credit spreads IG/HY stables. Conditions favorables pour actifs risques.</div></div>
          <div className="card-sm" style={{ borderLeft: "2px solid var(--blue)" }}><div className="card-title">Liquidite systeme</div><div className="label-sm">TGA (Treasury General Account) : ~720Mrd USD. Reverse Repo Fed : ~380Mrd. Bilan Fed : 7.1T USD (reduction QT en cours).</div></div>
          <div className="card-sm" style={{ borderLeft: "2px solid var(--orange)" }}><div className="card-title">Immobilier</div><div className="label-sm">Pending Home Sales : -3.4% (avr.). Taux hypothecaires 30 ans : 6.82%. Starts : 1.36M. Refroidissement controle.</div></div>
        </div>
        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-title">Sources</div>
          <div className="label-sm">BLS (Bureau of Labor Statistics) : CPI, NFP, JOLTS, Jobless Claims | BEA (Bureau of Economic Analysis) : PIB, PCE | ISM (Institute for Supply Management) : PMI mfg/services | Census Bureau : Retail Sales, Housing | S&amp;P Global : PMI Composite</div>
        </div>
      </div>
    </div>
  );
}