"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { section: "Plateforme", items: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/reports/weekly", label: "Rapport hebdo" },
  ]},
  { section: "Marchés", items: [
    { href: "/markets/eurusd", label: "EUR/USD" },
    { href: "/markets/dxy", label: "DXY" },
    { href: "/markets/nasdaq", label: "Nasdaq 100" },
    { href: "/markets/sp500", label: "S&P 500" },
    { href: "/markets/dow-jones", label: "Dow Jones" },
  ]},
  { section: "Macro", items: [
    { href: "/macro/us", label: "Économie US" },
    { href: "/macro/fed", label: "Fed / FOMC" },
    { href: "/macro/europe", label: "Zone Euro" },
    { href: "/macro/france", label: "France" },
  ]},
  { section: "Outils", items: [
    { href: "/calendar", label: "Calendrier" },
    { href: "/risk-monitor", label: "Risk Monitor" },
    { href: "/trading-plan", label: "Trading Plan" },
  ]},
];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  if (pathname === "/") return <>{children}</>;

  return (
    <div className="page-wrap">
      <div className={`sidebar-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-logo">
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <div className="brand">MACRO <span>FLOW</span><br />RESEARCH</div>
            <div className="tagline">Institutional Research</div>
          </Link>
        </div>
        {NAV.map((g) => (
          <div key={g.section} className="nav-section">
            <div className="nav-section-label">{g.section}</div>
            {g.items.map((item) => (
              <Link key={item.href} href={item.href} className={`nav-item ${pathname === item.href ? "active" : ""}`} onClick={() => setSidebarOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
        <div style={{ marginTop: "auto", padding: "16px", borderTop: "1px solid var(--border)" }}>
          <div style={{ fontSize: 10, color: "var(--text-dim)", lineHeight: 1.5 }}>
            Semaine 23 · 3 juin 2026<br />
            ⚠ Pas un conseil en investissement
          </div>
        </div>
      </aside>
      <div className="content-area">
        <div className="topbar">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <span className="topbar-title">Macro Flow Research</span>
          <span className="topbar-badge blue">Institutional Research</span>
          <span className="topbar-meta">Semaine 23 · 2–6 juin 2026 · MàJ : 3 juin 2026</span>
        </div>
        {children}
      </div>
    </div>
  );
}
