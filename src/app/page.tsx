"use client";
import Link from "next/link";
import { MACRO_ASSETS, SCORES, getBiasColor, getScoreColor } from "@/lib/macro-data";

export default function Landing() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(8,12,16,0.94)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", padding: "0 32px", height: 56, gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 900, letterSpacing: -0.3 }}>MACRO <span style={{ color: "var(--blue)" }}>FLOW</span> RESEARCH</span>
        <span style={{ fontSize: 9, color: "var(--text-dim)", letterSpacing: 1.5, textTransform: "uppercase", marginLeft: 4 }}>Institutional Research</span>
        <div style={{ marginLeft: "auto" }}>
          <Link href="/dashboard" style={{ padding: "7px 18px", borderRadius: 6, fontSize: 12, fontWeight: 700, background: "var(--blue)", color: "#fff", display: "inline-block" }}>Dashboard →</Link>
        </div>
      </nav>

      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "100px 48px 60px", maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", top: 120, right: 80, width: 280, height: 280, border: "1px solid rgba(59,130,246,0.07)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--blue)", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 24, height: 1, background: "var(--blue)", display: "inline-block" }} />
          Institutional Macro Research · Semaine 23, 2026
        </div>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 62px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.0, marginBottom: 24, maxWidth: 660 }}>
          Rapports Macro<br /><span style={{ color: "var(--blue)" }}>Financiers</span><br />Institutionnels
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 460, lineHeight: 1.7, marginBottom: 36 }}>
          Analyse fondamentale hebdomadaire sur EURUSD, Nasdaq, S&P500, Dow Jones et DXY — données vérifiées, scénarios pondérés et plans de trading.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
          <div className="regime-pill regime-neutral"><span className="dot dot-orange" style={{ marginRight: 4 }} /> Régime Neutre · Semaine 23</div>
          <span className="badge badge-blue">Données vérifiées</span>
          <span className="badge badge-blue">Sources citées</span>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/dashboard" style={{ padding: "12px 28px", background: "var(--blue)", color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 700, display: "inline-block" }}>Voir le Dashboard →</Link>
          <Link href="/reports/weekly" style={{ padding: "12px 28px", background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, fontWeight: 600, display: "inline-block" }}>Rapport Hebdo</Link>
        </div>
      </section>

      <section style={{ padding: "0 48px 64px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="label-xs" style={{ marginBottom: 20 }}>Scores actifs — Semaine 23</div>
        <div className="grid-5">
          {MACRO_ASSETS.map((a) => {
            const sc = getScoreColor(a.score);
            return (
              <Link key={a.id} href={`/markets/${a.id}`}>
                <div className="card" style={{ cursor: "pointer", transition: "border-color 0.15s, transform 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 800 }}>{a.name}</div>
                    <div className={`badge badge-${a.bias.toLowerCase()}`}>{a.bias === "Bullish" ? "Haussier" : a.bias === "Bearish" ? "Baissier" : "Neutre"}</div>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: -0.5, marginBottom: 4 }}>{a.price}</div>
                  <div style={{ fontSize: 11, color: a.change.startsWith("+") ? "var(--green)" : "var(--red)", marginBottom: 12 }}>{a.change}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span className="label-xs">Score</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: sc }}>{a.score}/10</span>
                  </div>
                  <div className="score-bar-track"><div className="score-bar-fill" style={{ width: `${a.score * 10}%`, background: sc }} /></div>
                  <div className="label-sm" style={{ marginTop: 10 }}>{a.description}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section style={{ padding: "60px 48px", borderTop: "1px solid var(--border)", maxWidth: 1200, margin: "0 auto" }}>
        <div className="label-xs" style={{ marginBottom: 8 }}>Plateforme</div>
        <h2 style={{ fontSize: 26, fontWeight: 900, letterSpacing: -0.8, marginBottom: 36, maxWidth: 400 }}>Une vraie plateforme de recherche institutionnelle</h2>
        <div className="grid-3">
          {[
            { title: "Rapport hebdomadaire", desc: "15 sections, données vérifiées avec sources, scénarios pondérés, plans de trading.", href: "/reports/weekly" },
            { title: "Dashboard global", desc: "Scores, régime de marché, heatmap actifs, alertes macro et résumé exécutif.", href: "/dashboard" },
            { title: "Risk Monitor", desc: "8 risques macro suivis avec probabilité, niveau et actifs exposés.", href: "/risk-monitor" },
            { title: "Calendrier économique", desc: "Tous les events clés avec impact potentiel sur chaque actif.", href: "/calendar" },
            { title: "Trading Plan", desc: "Setup, biais, invalidation et confiance pour chaque actif chaque semaine.", href: "/trading-plan" },
            { title: "Analyse Fed & BCE", desc: "FedWatch, discours récents, scénarios de taux et impact marché détaillé.", href: "/macro/fed" },
          ].map((f) => (
            <Link key={f.href} href={f.href}>
              <div className="card" style={{ cursor: "pointer", height: "100%", transition: "border-color 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--blue)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"}
              >
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, color: "var(--text)" }}>{f.title}</div>
                <div className="label-sm">{f.desc}</div>
                <div style={{ marginTop: 12, fontSize: 12, color: "var(--blue)", fontWeight: 600 }}>Accéder →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer style={{ padding: "24px 48px", borderTop: "1px solid var(--border)", maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.6, maxWidth: 700 }}>
          <strong style={{ color: "var(--text-muted)" }}>⚠ Avertissement :</strong> Ce site est à but éducatif et informatif uniquement. Il ne constitue pas un conseil en investissement. Sources : BLS, BEA, ISM, Fed, BCE, Eurostat, INSEE, CME FedWatch. Données à jour au 3 juin 2026.
        </p>
      </footer>
    </div>
  );
}
