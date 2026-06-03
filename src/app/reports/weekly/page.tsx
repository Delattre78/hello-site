"use client";
import Link from "next/link";
import { EXEC_SUMMARY, US_MACRO, FED_DATA, EUROPE_MACRO, FRANCE_MACRO, EURUSD_ANALYSIS, NASDAQ_ANALYSIS, DOW_ANALYSIS, SP500_ANALYSIS, DXY_ANALYSIS, RISKS, TRADING_PLAN, CALENDAR, getScoreColor, getRiskColor } from "@/lib/macro-data";

function SectionHeader({ id, title, sub, badge }: { id: string; title: string; sub: string; badge?: string }) {
  return (
    <div id={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, paddingTop: 8 }}>
      <div>
        <div className="label-xs" style={{ marginBottom: 6 }}>{sub}</div>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: -0.5 }}>{title}</div>
      </div>
      {badge && <span className="badge badge-blue">{badge}</span>}
    </div>
  );
}

function ScenarioCard({ s }: { s: { name: string; target: string; proba: string; catalyst: string; color: string } }) {
  return (
    <div className="scenario-card">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.name}</span>
        <span style={{ fontSize: 16, fontWeight: 900, color: s.color }}>{s.proba}</span>
      </div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}><strong>Cible :</strong> {s.target}</div>
      <div style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.5 }}>{s.catalyst}</div>
      <div style={{ marginTop: 10, height: 3, background: "var(--surface2)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: s.proba, height: "100%", background: s.color, borderRadius: 2 }} />
      </div>
    </div>
  );
}

const NAV_SECTIONS = [
  { id: "exec", label: "Resume" }, { id: "macro-us", label: "USA" }, { id: "fed", label: "Fed" },
  { id: "dxy", label: "DXY" }, { id: "eurusd", label: "EURUSD" }, { id: "nasdaq", label: "Nasdaq" },
  { id: "dow", label: "Dow" }, { id: "sp500", label: "SP500" }, { id: "europe", label: "Europe" },
  { id: "france", label: "France" }, { id: "calendar", label: "Cal." }, { id: "risks", label: "Risques" },
  { id: "trading", label: "Trading" }, { id: "conclusion", label: "Concl." },
];

export default function WeeklyReport() {
  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          <span className="badge badge-blue">Institutional Macro Research</span>
          <span className="badge badge-neutral">Semaine 23 — 2 au 6 juin 2026</span>
          <span className="badge badge-neutral">Publie : 3 juin 2026</span>
        </div>
        <h1 className="hero-title">Rapport Hebdomadaire<br />Macro &amp; Marches Financiers</h1>
        <p className="hero-subtitle">Analyse fondamentale institutionnelle sur devises, indices US et economie mondiale.</p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 20 }}>
          {NAV_SECTIONS.map(s => (
            <a key={s.id} href={`#${s.id}`} style={{ fontSize: 11, padding: "4px 10px", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 4, color: "var(--text-muted)", fontWeight: 600 }}>{s.label}</a>
          ))}
        </div>
      </div>

      {/* EXEC SUMMARY */}
      <div className="section" id="exec" style={{ marginTop: 28 }}>
        <SectionHeader id="exec-h" title="Resume Executif" sub="01 — Executive Summary" badge="PRIORITE" />
        <div className="grid-2">
          <div className="card">
            <div className="card-title">5 informations macro cles</div>
            {EXEC_SUMMARY.topFive.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "var(--blue-dim)", color: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.55 }}>{item}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="card">
              <div className="card-title">Catalyseurs</div>
              {EXEC_SUMMARY.catalysts.map((c, i) => <div key={i} style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8, display: "flex", gap: 8 }}><span style={{ color: "var(--orange)" }}>◆</span>{c}</div>)}
            </div>
            <div className="card">
              <div className="card-title">Risques</div>
              {EXEC_SUMMARY.risks.map((r, i) => <div key={i} style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8, display: "flex", gap: 8 }}><span style={{ color: "var(--red)" }}>▲</span>{r}</div>)}
            </div>
          </div>
        </div>
        <div className="card" style={{ marginTop: 16, borderLeft: "3px solid var(--blue)" }}>
          <div className="card-title">Biais global</div>
          <div style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.7 }}>{EXEC_SUMMARY.globalBias}</div>
        </div>
      </div>

      {/* US MACRO */}
      <div className="section" id="macro-us" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="macro-us-h" title="Economie Americaine" sub="02 — US Economy" />
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Indicateur</th><th>Dernier</th><th>Precedent</th><th>Consensus</th><th>Impact marche</th><th>Source</th></tr></thead>
            <tbody>
              {US_MACRO.map((item, i) => (
                <tr key={i}>
                  <td className="cell-main">{item.name}</td>
                  <td style={{ color: item.trend === "down" ? "var(--red)" : item.trend === "up" ? "var(--green)" : "var(--text-muted)", fontWeight: 700 }}>{item.trend === "up" ? "▲" : item.trend === "down" ? "▼" : "—"} {item.value}</td>
                  <td className="cell-neutral">{item.prev}</td>
                  <td className="cell-neutral">{item.consensus}</td>
                  <td className="cell-impact">{item.impact}</td>
                  <td style={{ fontSize: 10, color: "var(--text-dim)" }}>{item.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid-3" style={{ marginTop: 16 }}>
          <div className="card-sm"><div className="card-title">Conditions financieres</div><div style={{ fontSize: 12, color: "var(--green)", fontWeight: 700, marginBottom: 4 }}>Accommodantes</div><div className="label-sm">GS FCI : 99.4 — favorable pour les actifs a risque.</div></div>
          <div className="card-sm"><div className="card-title">Liquidite (TGA + RRP)</div><div className="label-sm">TGA : ~720Mrd USD. Reverse Repo : ~380Mrd. Liquidite systeme suffisante.</div></div>
          <div className="card-sm"><div className="card-title">Immobilier</div><div className="label-sm">Pending Home Sales -3.4% (avr.). Taux hypothecaires 30 ans : 6.82%.</div></div>
        </div>
      </div>

      {/* FED */}
      <div className="section" id="fed" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="fed-h" title="Fed — Politique Monetaire" sub="03 — Federal Reserve" />
        <div className="grid-2">
          <div className="card">
            <div className="card-title">Taux directeur</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "var(--blue)", marginBottom: 8 }}>{FED_DATA.rate}</div>
            <div className="label-sm" style={{ marginBottom: 8 }}>Dernier FOMC : {FED_DATA.lastFOMC} — Prochain : {FED_DATA.nextFOMC}</div>
            <span className="badge badge-neutral">{FED_DATA.tone}</span>
            <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, borderTop: "1px solid var(--border)", paddingTop: 12, marginTop: 12 }}>{FED_DATA.powellTone}</div>
          </div>
          <div className="card">
            <div className="card-title">CME FedWatch — Probabilites</div>
            {FED_DATA.fedwatch.map((f, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>{f.date}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span style={{ fontSize: 11, color: "var(--text-dim)" }}>Hold: {f.hold}%</span>
                    <span style={{ fontSize: 11, color: "var(--green)", fontWeight: 700 }}>-25pb: {f.cut25}%</span>
                    {f.hike > 0 && <span style={{ fontSize: 11, color: "var(--red)" }}>+25pb: {f.hike}%</span>}
                  </div>
                </div>
                <div style={{ height: 6, background: "var(--surface2)", borderRadius: 3, overflow: "hidden", display: "flex" }}>
                  <div style={{ width: `${f.hold}%`, height: "100%", background: "var(--text-dim)" }} />
                  <div style={{ width: `${f.cut25}%`, height: "100%", background: "var(--green)" }} />
                  {f.hike > 0 && <div style={{ width: `${f.hike}%`, height: "100%", background: "var(--red)" }} />}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-title">Discours Fed</div>
          <div className="grid-2">
            {FED_DATA.recentSpeeches.map((s, i) => (
              <div key={i} style={{ padding: "12px", background: "var(--surface2)", borderRadius: 8, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700 }}>{s.speaker}</span>
                  <span className={`badge ${s.tone === "Dovish" ? "badge-bullish" : s.tone === "Hawkish" ? "badge-bearish" : "badge-neutral"}`}>{s.tone}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 4 }}>{s.date}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.summary}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DXY */}
      <div className="section" id="dxy" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="dxy-h" title="Dollar Index — DXY" sub="04 — Dollar Analysis" />
        <div className="grid-2">
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <div className="label-xs">DXY</div>
                <div style={{ fontSize: 36, fontWeight: 900 }}>{DXY_ANALYSIS.price}</div>
                <div style={{ fontSize: 12, color: "var(--red)", marginTop: 4 }}>-0.18% — {DXY_ANALYSIS.trend}</div>
              </div>
              <span className="badge badge-neutral">Neutre</span>
            </div>
            <div className="grid-2">
              <div><div className="card-title" style={{ color: "var(--green)" }}>Haussier</div>{DXY_ANALYSIS.bullForces.map((f, i) => <div key={i} style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>+ {f}</div>)}</div>
              <div><div className="card-title" style={{ color: "var(--red)" }}>Baissier</div>{DXY_ANALYSIS.bearForces.map((f, i) => <div key={i} style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>- {f}</div>)}</div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">Correlations</div>
            <div style={{ marginBottom: 14 }}><div className="label-sm">US 10Y</div><div style={{ fontSize: 16, fontWeight: 800, color: "var(--green)" }}>{DXY_ANALYSIS.correlationUS10Y}</div></div>
            <div style={{ marginBottom: 14 }}><div className="label-sm">SP500</div><div style={{ fontSize: 16, fontWeight: 800, color: "var(--orange)" }}>{DXY_ANALYSIS.correlationSP500}</div></div>
            <div className="divider" />
            <div style={{ marginBottom: 10 }}><div className="label-xs" style={{ marginBottom: 6 }}>Scenario principal</div><div style={{ fontSize: 12, color: "var(--text-muted)" }}>{DXY_ANALYSIS.scenarioPrimary}</div></div>
            <div><div className="label-xs" style={{ marginBottom: 6 }}>Scenario alternatif</div><div style={{ fontSize: 12, color: "var(--text-muted)" }}>{DXY_ANALYSIS.scenarioAlternate}</div></div>
          </div>
        </div>
      </div>

      {/* EURUSD */}
      <div className="section" id="eurusd" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="eurusd-h" title="EUR/USD — Analyse Fondamentale" sub="05 — EURUSD Analysis" />
        <div className="grid-2">
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div><div className="label-xs">EUR/USD</div><div style={{ fontSize: 36, fontWeight: 900 }}>{EURUSD_ANALYSIS.price}</div></div>
              <div style={{ textAlign: "right" }}><span className="badge badge-neutral">Neutre</span><div style={{ fontSize: 14, fontWeight: 800, color: getScoreColor(EURUSD_ANALYSIS.score), marginTop: 8 }}>{EURUSD_ANALYSIS.score}/10</div></div>
            </div>
            {[
              ["Differentiel Fed/BCE", EURUSD_ANALYSIS.spreadFedBCE],
              ["Differentiel croissance", EURUSD_ANALYSIS.growthDiff],
              ["Differentiel inflation", EURUSD_ANALYSIS.inflationDiff],
              ["Flux capitaux", EURUSD_ANALYSIS.capitalFlows],
              ["Sentiment institutionnel", EURUSD_ANALYSIS.sentiment],
            ].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <span className="label-xs">{l}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: "55%", textAlign: "right" }}>{v}</span>
              </div>
            ))}
            <div className="card-sm" style={{ marginTop: 12 }}>
              <div className="card-title">Biais directionnel</div>
              <div style={{ display: "flex", gap: 8 }}>
                {[["1 sem.", EURUSD_ANALYSIS.biasWeek], ["1 mois", EURUSD_ANALYSIS.biasMonth], ["3 mois", EURUSD_ANALYSIS.biasTrimester]].map(([h, b]) => (
                  <div key={h} style={{ flex: 1, textAlign: "center", padding: 8, background: "var(--surface2)", borderRadius: 6 }}>
                    <div className="label-xs">{h}</div>
                    <div style={{ fontSize: 10, color: "var(--text)", fontWeight: 700, marginTop: 4 }}>{b}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {EURUSD_ANALYSIS.scenarios.map((s, i) => <ScenarioCard key={i} s={s} />)}
          </div>
        </div>
      </div>

      {/* NASDAQ */}
      <div className="section" id="nasdaq" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="nasdaq-h" title="Nasdaq 100" sub="06 — Nasdaq Analysis" />
        <div className="grid-2">
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div><div className="label-xs">NQ</div><div style={{ fontSize: 32, fontWeight: 900, color: "var(--green)" }}>{NASDAQ_ANALYSIS.price}</div></div>
              <div><span className="badge badge-bullish">Haussier</span><div style={{ fontSize: 14, fontWeight: 800, color: "var(--green)", marginTop: 8 }}>{NASDAQ_ANALYSIS.score}/10</div></div>
            </div>
            {[["US 10Y", NASDAQ_ANALYSIS.tenYrYield], ["Liquidite", NASDAQ_ANALYSIS.liquidityStatus], ["Big Tech", NASDAQ_ANALYSIS.bigTech], ["IA / CapEx", NASDAQ_ANALYSIS.aiTheme], ["Earnings Q1", NASDAQ_ANALYSIS.earnings], ["Valorisations", NASDAQ_ANALYSIS.valuations]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
                <span className="label-xs">{l}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: "60%", textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {NASDAQ_ANALYSIS.scenarios.map((s, i) => <ScenarioCard key={i} s={s} />)}
          </div>
        </div>
      </div>

      {/* DOW */}
      <div className="section" id="dow" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="dow-h" title="Dow Jones — Analyse Sectorielle" sub="07 — Dow Jones" />
        <div className="grid-2">
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div><div className="label-xs">DJIA</div><div style={{ fontSize: 32, fontWeight: 900 }}>{DOW_ANALYSIS.price}</div></div>
              <span className="badge badge-neutral">Neutre</span>
            </div>
            {DOW_ANALYSIS.sectors.map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{s.name}</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{s.comment}</span>
                  <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, background: s.outlook.includes("Baissier") ? "var(--red-dim)" : "rgba(148,163,184,0.1)", color: s.outlook.includes("Baissier") ? "var(--red)" : "#94a3b8", fontWeight: 700 }}>{s.outlook}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {DOW_ANALYSIS.scenarios.map((s, i) => <ScenarioCard key={i} s={s} />)}
          </div>
        </div>
      </div>

      {/* SP500 */}
      <div className="section" id="sp500" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="sp500-h" title="S&amp;P 500 — Analyse Complete" sub="08 — S&P 500" />
        <div className="grid-2">
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <div><div className="label-xs">SPX</div><div style={{ fontSize: 32, fontWeight: 900, color: "var(--green)" }}>{SP500_ANALYSIS.price}</div></div>
              <div><span className="badge badge-bullish">Haussier</span><div style={{ fontSize: 14, fontWeight: 800, color: "var(--green)", marginTop: 8 }}>{SP500_ANALYSIS.score}/10</div></div>
            </div>
            {[["Breadth MM200", SP500_ANALYSIS.breadth], ["Earnings YoY", SP500_ANALYSIS.earningsGrowth], ["P/E Forward", SP500_ANALYSIS.peForward], ["Marges", SP500_ANALYSIS.margins], ["ETF Flows", SP500_ANALYSIS.etfFlows], ["Instit.", SP500_ANALYSIS.institutional]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
                <span className="label-xs">{l}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: "60%", textAlign: "right" }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SP500_ANALYSIS.scenarios.map((s, i) => <ScenarioCard key={i} s={s} />)}
          </div>
        </div>
      </div>

      {/* EUROPE */}
      <div className="section" id="europe" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="europe-h" title="Economie Zone Euro" sub="09 — Eurozone" />
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Indicateur</th><th>Dernier</th><th>Precedent</th><th>Consensus</th><th>Interpretation</th><th>Source</th></tr></thead>
            <tbody>
              {EUROPE_MACRO.map((item, i) => (
                <tr key={i}><td className="cell-main">{item.name}</td><td className="cell-up">{item.value}</td><td className="cell-neutral">{item.prev}</td><td className="cell-neutral">{item.consensus}</td><td className="cell-impact">{item.interp}</td><td style={{ fontSize: 10, color: "var(--text-dim)" }}>{item.source}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FRANCE */}
      <div className="section" id="france" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="france-h" title="Focus France" sub="10 — France Analysis" badge="RISQUE ELEVE" />
        <div className="grid-2">
          <div className="table-wrap">
            <table className="data-table">
              <thead><tr><th>Indicateur</th><th>Valeur</th><th>Precedent</th><th>Interpretation</th></tr></thead>
              <tbody>
                {FRANCE_MACRO.map((item, i) => (
                  <tr key={i}>
                    <td className="cell-main">{item.name}</td>
                    <td style={{ color: item.value.startsWith("-") ? "var(--red)" : "var(--text)", fontWeight: 600 }}>{item.value}</td>
                    <td className="cell-neutral">{item.prev}</td>
                    <td className="cell-impact">{item.interp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div className="card" style={{ borderLeft: "3px solid var(--red)" }}>
              <div className="card-title">Risques politiques et budgetaires</div>
              <div className="label-sm">Deficit 5.4% PIB depasse les objectifs. Dette 113.5% PIB. Instabilite politique (3 gouvernements en 18 mois). Fitch sous surveillance negative. Spread OAT-Bund 10 ans a 65pb (+12pb depuis jan.).</div>
            </div>
            <div className="card">
              <div className="card-title">Impact sur euro et marches</div>
              <div className="label-sm">Facteur de risque structurel pour EUR. Spread OAT-Bund au-dessus de 80pb = flux baissiers EURUSD. Impact CAC40 modere tant que BCE peut intervenir.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CALENDAR */}
      <div className="section" id="calendar" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="calendar-h" title="Calendrier Economique" sub="11 — Economic Calendar" />
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Date</th><th>Heure</th><th>Pays</th><th>Evenement</th><th>Consensus</th><th>Precedent</th><th>Importance</th><th>Impact</th></tr></thead>
            <tbody>
              {CALENDAR.map((ev, i) => (
                <tr key={i}>
                  <td className="cell-main">{ev.date}</td>
                  <td style={{ color: "var(--text-muted)", fontFamily: "monospace", fontSize: 11 }}>{ev.time}</td>
                  <td>{ev.flag} {ev.country}</td>
                  <td style={{ fontWeight: 600, color: "var(--text)" }}>{ev.event}</td>
                  <td className="cell-neutral">{ev.consensus}</td>
                  <td className="cell-neutral">{ev.prev}</td>
                  <td><div style={{ display: "flex", gap: 2 }}>{[1,2,3].map(n => <div key={n} style={{ width: 8, height: 8, borderRadius: 2, background: n <= ev.importance ? (ev.importance === 3 ? "var(--red)" : "var(--orange)") : "var(--surface2)" }} />)}</div></td>
                  <td className="cell-impact">{ev.impact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RISKS */}
      <div className="section" id="risks" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="risks-h" title="Risques Majeurs" sub="12 — Risk Monitor" />
        <div className="grid-4">
          {RISKS.map((r) => {
            const rc = getRiskColor(r.level);
            const badgeClass = r.level === "Élevé" ? "badge-risk-eleve" : r.level === "Modéré" ? "badge-risk-modere" : r.level === "Critique" ? "badge-risk-critique" : "badge-risk-faible";
            return (
              <div key={r.id} className="risk-card" style={{ borderTop: `2px solid ${rc}` }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 13, fontWeight: 800 }}>{r.name}</div>
                  <span className={`badge ${badgeClass}`}>{r.level}</span>
                </div>
                <div className="label-sm">{r.comment}</div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><div className="label-xs">Probabilite</div><div style={{ fontSize: 14, fontWeight: 800, color: rc }}>{r.proba}</div></div>
                  <div style={{ textAlign: "right" }}><div className="label-xs">Impact</div><div style={{ fontSize: 11, color: "var(--text-muted)", maxWidth: 120, textAlign: "right" }}>{r.impact}</div></div>
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {r.assets.map(a => <span key={a} className="badge badge-neutral">{a}</span>)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TRADING PLAN */}
      <div className="section" id="trading" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="trading-h" title="Plan de Trading — Semaine 23" sub="13 — Trading Plan" />
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Actif</th><th>Biais</th><th>Setup</th><th>Catalyseur</th><th>Invalidation</th><th>Confiance</th><th>Risque</th></tr></thead>
            <tbody>
              {TRADING_PLAN.map((t, i) => (
                <tr key={i}>
                  <td className="cell-main">{t.asset}</td>
                  <td><span className={`badge badge-${t.bias.toLowerCase()}`}>{t.bias === "Bullish" ? "Haussier" : t.bias === "Bearish" ? "Baissier" : "Neutre"}</span></td>
                  <td style={{ fontSize: 11 }}>{t.setup}</td>
                  <td className="cell-impact">{t.catalyst}</td>
                  <td style={{ fontSize: 11, color: "var(--red)" }}>{t.invalidation}</td>
                  <td><span style={{ fontSize: 13, fontWeight: 800, color: getScoreColor(t.confidence) }}>{t.confidence}/10</span></td>
                  <td className="cell-impact">{t.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONCLUSION */}
      <div className="section section-last" id="conclusion" style={{ marginTop: 36 }}>
        <div className="divider" />
        <SectionHeader id="conclusion-h" title="Conclusion Institutionnelle" sub="14 — Final Conclusion" />
        <div className="card" style={{ borderLeft: "3px solid var(--blue)", marginBottom: 16 }}>
          <div className="card-title">Si je gerais un fonds cette semaine...</div>
          <div style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.8, marginBottom: 12 }}><strong style={{ color: "var(--green)" }}>Agressif sur :</strong> Nasdaq sur replis (IA supercycle intact, earnings solides). Long S&amp;P500 si NFP et CPI en ligne — breadth positif.</div>
          <div style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.8, marginBottom: 12 }}><strong style={{ color: "var(--orange)" }}>Prudent sur :</strong> EURUSD — attendre confirmation post-NFP. Dow Jones — cycliques vulnerables si PIB deçoit.</div>
          <div style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.8 }}><strong style={{ color: "var(--red)" }}>Defensif sur :</strong> Exposition France, petrole/energie. Dollar short a eviter avant FOMC 18 juin.</div>
        </div>
        <div className="card">
          <div className="card-title">Scores globaux Semaine 23</div>
          <div className="grid-4">
            {Object.entries(EXEC_SUMMARY.finalScores).map(([key, val]) => {
              const c = getScoreColor(val);
              const labels: Record<string, string> = { us: "Eco US", europe: "Europe", france: "France", eurusd: "EURUSD", nasdaq: "Nasdaq", dow: "Dow", sp500: "S&P 500" };
              return (
                <div key={key} style={{ textAlign: "center", padding: "12px 8px", background: "var(--surface2)", borderRadius: 8 }}>
                  <div className="label-xs" style={{ marginBottom: 6 }}>{labels[key]}</div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: c }}>{val}</div>
                  <div style={{ fontSize: 10, color: "var(--text-dim)" }}>/10</div>
                  <div className="score-bar-track" style={{ marginTop: 6 }}><div className="score-bar-fill" style={{ width: `${val * 10}%`, background: c }} /></div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ marginTop: 16, padding: 16, background: "var(--surface2)", borderRadius: 8, border: "1px solid var(--border)" }}>
          <div style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.6 }}>Sources : BLS (NFP, CPI, JOLTS), BEA (PIB, PCE), ISM, CME FedWatch, S&amp;P Global (PMI), Eurostat, INSEE, BCE, Census. Donnees au 3 juin 2026. Ce rapport est a but educatif uniquement et ne constitue pas un conseil en investissement.</div>
        </div>
      </div>
    </div>
  );
}