"use client";
import { FED_DATA } from "@/lib/macro-data";

export default function FedPage() {
  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-blue">Banque centrale</span>
          <span className="badge badge-neutral">Dovish prudent</span>
        </div>
        <h1 className="hero-title">Federal Reserve — FOMC</h1>
        <p className="hero-subtitle">Taux directeur, FedWatch, discours et scenarios de politique monetaire.</p>
        <div style={{ display: "flex", gap: 24, marginTop: 20 }}>
          <div><div className="label-xs">Fed Funds Rate</div><div style={{ fontSize: 32, fontWeight: 900, color: "var(--blue)" }}>{FED_DATA.rate}</div></div>
          <div><div className="label-xs">Dernier FOMC</div><div style={{ fontSize: 18, fontWeight: 700 }}>{FED_DATA.lastFOMC}</div></div>
          <div><div className="label-xs">Prochain FOMC</div><div style={{ fontSize: 18, fontWeight: 700, color: "var(--orange)" }}>{FED_DATA.nextFOMC}</div></div>
        </div>
      </div>

      <div className="section section-last" style={{ marginTop: 28 }}>
        <div className="grid-2">
          <div className="card">
            <div className="card-title">Ton Jerome Powell</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}><span className="badge badge-neutral">{FED_DATA.tone}</span></div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{FED_DATA.powellTone}</div>
            <div className="divider" />
            <div className="card-title">Bilan Fed</div>
            <div className="label-sm">7.1T USD — reduction via QT a ~60Mrd/mois. Ralentissement probable de la reduction en 2026.</div>
          </div>
          <div className="card">
            <div className="card-title">CME FedWatch — Probabilites de baisse</div>
            {FED_DATA.fedwatch.map((f, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{f.date}</span>
                  <div style={{ display: "flex", gap: 10 }}>
                    <span style={{ fontSize: 11, color: "var(--text-dim)" }}>Statu quo: <strong>{f.hold}%</strong></span>
                    <span style={{ fontSize: 11, color: "var(--green)", fontWeight: 700 }}>-25pb: {f.cut25}%</span>
                    {f.hike > 0 && <span style={{ fontSize: 11, color: "var(--red)" }}>+25pb: {f.hike}%</span>}
                  </div>
                </div>
                <div style={{ height: 8, background: "var(--surface2)", borderRadius: 4, overflow: "hidden", display: "flex" }}>
                  <div style={{ width: `${f.hold}%`, height: "100%", background: "var(--text-dim)" }} />
                  <div style={{ width: `${f.cut25}%`, height: "100%", background: "var(--green)" }} />
                  {f.hike > 0 && <div style={{ width: `${f.hike}%`, height: "100%", background: "var(--red)" }} />}
                </div>
              </div>
            ))}
            <div className="label-xs" style={{ marginTop: 8 }}>Source : CME FedWatch Tool — 3 juin 2026</div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-title">Discours recents des membres de la Fed</div>
          <div className="grid-2">
            {FED_DATA.recentSpeeches.map((s, i) => (
              <div key={i} style={{ padding: 14, background: "var(--surface2)", borderRadius: 8, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 800 }}>{s.speaker}</span>
                  <span className={`badge ${s.tone === "Dovish" ? "badge-bullish" : s.tone === "Hawkish" ? "badge-bearish" : "badge-neutral"}`}>{s.tone}</span>
                </div>
                <div className="label-xs" style={{ marginBottom: 6 }}>{s.date}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{s.summary}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid-3" style={{ marginTop: 20 }}>
          <div className="card-sm" style={{ borderLeft: "2px solid var(--blue)" }}><div className="card-title">Impact sur USD/DXY</div><div className="label-sm">Statu quo maintient le dollar stable. Premiere baisse = pression baissiere sur DXY, potentiel -2 a -3% post-decision.</div></div>
          <div className="card-sm" style={{ borderLeft: "2px solid var(--green)" }}><div className="card-title">Impact sur indices US</div><div className="label-sm">Fed dovish = positif pour Nasdaq et S&amp;P500. Chaque baisse de 25pb = re-rating potentiel de +3 a +5% sur les indices.</div></div>
          <div className="card-sm" style={{ borderLeft: "2px solid var(--orange)" }}><div className="card-title">Impact sur EURUSD</div><div className="label-sm">Reduction differentiel Fed/BCE = positif EUR. Si Fed coupe en septembre et BCE pause = EURUSD peut tester 1.11-1.12.</div></div>
        </div>
      </div>
    </div>
  );
}