"use client";
import { FRANCE_MACRO } from "@/lib/macro-data";

export default function FrancePage() {
  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-blue">Macro</span>
          <span className="badge badge-risk-eleve">Risque Eleve</span>
        </div>
        <h1 className="hero-title">Focus France</h1>
        <p className="hero-subtitle">Croissance, dette, deficit, risques politiques et impact sur l'euro.</p>
      </div>

      <div className="section section-last" style={{ marginTop: 28 }}>
        <div className="grid-2">
          <div>
            <div className="table-wrap">
              <table className="data-table">
                <thead><tr><th>Indicateur</th><th>Valeur</th><th>Precedent</th><th>Source</th><th>Interpretation</th></tr></thead>
                <tbody>
                  {FRANCE_MACRO.map((item, i) => (
                    <tr key={i}>
                      <td className="cell-main">{item.name}</td>
                      <td style={{ color: item.value.startsWith("-") ? "var(--red)" : item.value.includes("5.4") || item.value.includes("113") ? "var(--red)" : "var(--text)", fontWeight: 700 }}>{item.value}</td>
                      <td className="cell-neutral">{item.prev}</td>
                      <td style={{ fontSize: 10, color: "var(--blue-light)" }}>{item.source}</td>
                      <td className="cell-impact">{item.interp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="card" style={{ borderLeft: "3px solid var(--red)" }}>
              <div className="card-title">Risques politiques</div>
              <div className="label-sm">3 gouvernements en 18 mois. Absence de majorite stable a l'Assemblee. Reformes structurelles bloquees. Budget 2026 adopte sous 49.3.</div>
            </div>
            <div className="card" style={{ borderLeft: "3px solid var(--red)" }}>
              <div className="card-title">Risques budgetaires</div>
              <div className="label-sm">Deficit 5.4% PIB vs objectif 4.4%. Dette 113.5% PIB en hausse. Procedure deficit excessif UE engagee. Fitch : sous surveillance negative.</div>
            </div>
            <div className="card" style={{ borderLeft: "3px solid var(--orange)" }}>
              <div className="card-title">Impact sur l'euro</div>
              <div className="label-sm">Spread OAT-Bund 10 ans : 65pb (+12pb depuis jan.). Au-dessus de 80pb = signal de stress EUR. Risque contagion Italie/Espagne si escalade.</div>
            </div>
            <div className="card">
              <div className="card-title">Signaux positifs</div>
              <div className="label-sm">Inflation en baisse a 2.1%. Chomage stable a 7.3%. Attractivite FDI encore solide. BCE peut intervenir via TPI si besoin.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}