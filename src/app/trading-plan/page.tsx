"use client";
import { TRADING_PLAN, getBiasColor, getScoreColor } from "@/lib/macro-data";

export default function TradingPlanPage() {
  return (
    <div>
      <div className="hero">
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span className="badge badge-blue">Trading Plan</span>
          <span className="badge badge-neutral">Semaine 23 · 2-6 juin 2026</span>
        </div>
        <h1 className="hero-title">Plan de Trading Hebdomadaire</h1>
        <p className="hero-subtitle">Setup, biais, invalidation et confiance pour 5 actifs — EURUSD, Nasdaq, Dow Jones, S&P500, DXY.</p>
      </div>

      <div className="section section-last" style={{ marginTop: 28 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {TRADING_PLAN.map((t, i) => {
            const bc = getBiasColor(t.bias);
            const sc = getScoreColor(t.confidence);
            return (
              <div key={i} className="card" style={{ borderLeft: `3px solid ${bc}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: -0.3, marginBottom: 4 }}>{t.asset}</div>
                    <span className={`badge badge-${t.bias.toLowerCase()}`}>{t.bias === "Bullish" ? "Haussier" : t.bias === "Bearish" ? "Baissier" : "Neutre"}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="label-xs" style={{ marginBottom: 4 }}>Confiance</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: sc }}>{t.confidence}<span style={{ fontSize: 12, color: "var(--text-dim)" }}>/10</span></div>
                    <div style={{ display: "flex", gap: 2, justifyContent: "flex-end", marginTop: 4 }}>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <div key={n} style={{ width: 8, height: 8, borderRadius: 2, background: n <= t.confidence ? sc : "var(--surface2)" }} />)}
                    </div>
                  </div>
                </div>

                <div className="grid-3">
                  <div>
                    <div className="label-xs" style={{ marginBottom: 6 }}>Setup prefere</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{t.setup}</div>
                  </div>
                  <div>
                    <div className="label-xs" style={{ marginBottom: 6 }}>Catalyseur principal</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{t.catalyst}</div>
                  </div>
                  <div>
                    <div className="label-xs" style={{ marginBottom: 6 }}>Niveau d'invalidation</div>
                    <div style={{ fontSize: 12, color: "var(--red)", fontWeight: 600, lineHeight: 1.5 }}>{t.invalidation}</div>
                  </div>
                </div>

                <div style={{ marginTop: 14, padding: 12, background: "var(--surface2)", borderRadius: 8, display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div className="label-xs" style={{ marginBottom: 4 }}>Risque principal</div>
                    <div style={{ fontSize: 12, color: "var(--orange)" }}>{t.risk}</div>
                  </div>
                  <div style={{ flex: 2 }}>
                    <div className="label-xs" style={{ marginBottom: 4 }}>Commentaire trader</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>{t.comment}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card" style={{ marginTop: 20, borderLeft: "3px solid var(--orange)" }}>
          <div className="card-title">Disclaimer</div>
          <div className="label-sm">Ce plan de trading est a but educatif uniquement. Il ne constitue pas un conseil en investissement. Le trading implique des risques de pertes. Les performances passees ne prejugent pas des performances futures. Sources : CME FedWatch, BLS, BEA, ISM, BCE. Donnees au 3 juin 2026.</div>
        </div>
      </div>
    </div>
  );
}