"use client";
import { useState } from "react";
import { CALENDAR } from "@/lib/macro-data";

export default function CalendarPage() {
  const [filter, setFilter] = useState<"all" | "high" | "medium">("all");
  const filtered = CALENDAR.filter(ev => {
    if (filter === "high") return ev.importance === 3;
    if (filter === "medium") return ev.importance >= 2;
    return true;
  });

  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-blue">Calendrier</span>
          <span className="badge badge-orange">NFP vendredi 6 juin</span>
        </div>
        <h1 className="hero-title">Calendrier Economique</h1>
        <p className="hero-subtitle">Evenements cles a venir avec consensus, precedent et impact potentiel sur les marches.</p>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          {[["all", "Tous", undefined], ["high", "Importance forte", 3], ["medium", "Importance >= 2", 2]].map(([f, l, lvl]) => (
            <button key={f as string} onClick={() => setFilter(f as "all" | "high" | "medium")} style={{ padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, background: filter === f ? "var(--blue)" : "var(--surface2)", color: filter === f ? "#fff" : "var(--text-muted)", border: "1px solid var(--border)", cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </div>

      <div className="section section-last" style={{ marginTop: 28 }}>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th><th>Heure</th><th>Pays</th><th>Evenement</th>
                <th>Consensus</th><th>Precedent</th><th>Importance</th><th>Impact potentiel</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ev, i) => (
                <tr key={i} style={{ background: ev.importance === 3 ? "rgba(239,68,68,0.03)" : "transparent" }}>
                  <td className="cell-main" style={{ whiteSpace: "nowrap" }}>{ev.date}</td>
                  <td style={{ fontFamily: "monospace", fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{ev.time}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{ev.flag} {ev.country}</td>
                  <td style={{ fontWeight: ev.importance === 3 ? 700 : 400, color: ev.importance === 3 ? "var(--text)" : "var(--text-muted)" }}>{ev.event}</td>
                  <td style={{ color: "var(--green)", fontWeight: 600 }}>{ev.consensus}</td>
                  <td className="cell-neutral">{ev.prev}</td>
                  <td>
                    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                      {[1,2,3].map(n => <div key={n} style={{ width: 9, height: 9, borderRadius: 2, background: n <= ev.importance ? (ev.importance === 3 ? "var(--red)" : ev.importance === 2 ? "var(--orange)" : "var(--text-dim)") : "var(--surface2)" }} />)}
                      <span style={{ fontSize: 9, color: ev.importance === 3 ? "var(--red)" : "var(--text-dim)", marginLeft: 4, fontWeight: 700 }}>{ev.importance === 3 ? "FORT" : ev.importance === 2 ? "MOD." : "LOW"}</span>
                    </div>
                  </td>
                  <td className="cell-impact" style={{ color: ev.importance === 3 ? "var(--red)" : "var(--text-dim)" }}>{ev.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid-3" style={{ marginTop: 20 }}>
          <div className="card-sm" style={{ borderLeft: "2px solid var(--red)" }}>
            <div className="card-title" style={{ color: "var(--red)" }}>Evenement de la semaine</div>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>NFP Mai — 6 juin 14:30</div>
            <div className="label-sm">Consensus : +185k. Precedent : +177k. Impact extreme sur USD, EURUSD, indices et taux US.</div>
          </div>
          <div className="card-sm" style={{ borderLeft: "2px solid var(--orange)" }}>
            <div className="card-title">Semaine suivante — CPI</div>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>CPI Mai — 10 juin</div>
            <div className="label-sm">Consensus : 2.7%. Cle pour valider le narrative desinflation et anticiper le FOMC.</div>
          </div>
          <div className="card-sm" style={{ borderLeft: "2px solid var(--blue)" }}>
            <div className="card-title">FOMC 18 juin</div>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>Statu quo attendu</div>
            <div className="label-sm">88% de probabilite de statu quo. Communication sur septembre cle pour tous les actifs.</div>
          </div>
        </div>
      </div>
    </div>
  );
}