export type TagColor = "green" | "red" | "amber" | "blue" | "purple" | "default";
export type RowStatus = "hit" | "miss" | "neutral";

export interface Asset {
  id: string;
  slug: string;
  ticker: string;
  name: string;
  exchange: string;
  sector: string;
  price: string;
  priceChange: string;
  positive: boolean;
  marketCap: string;
  score: number;
  color: string;
  description: string;
}

export interface MetricItem { label: string; value: string; sub?: string; delta?: string; positive?: boolean }
export interface ResultRow { label: string; v1: string; v2: string; change: string; status: RowStatus }
export interface FinRow { label: string; y1: string; y2: string; y3: string; bold?: boolean; muted?: boolean }
export interface ScoreRow { label: string; weight: string; score: number; max: number; note: string }
export interface Catalyst { icon: string; title: string; year: string; desc: string }
export interface PriceTarget { scenario: string; emoji: string; range: string; condition: string }
export interface Competitor { name: string; detail: string; tag: string; color: TagColor }
export interface KeyPoint { text: string; positive: boolean }
export interface DcfLine { label: string; value: string; pos: boolean }

export interface AssetData {
  headline: string;
  tags: string[];
  metrics: MetricItem[];
  resultRows: ResultRow[];
  resultPeriods: [string, string];
  keyPoints: [KeyPoint[], KeyPoint[]];
  finHeaders: [string, string, string];
  incomeRows: FinRow[];
  cashRows: FinRow[];
  valuation: {
    dcfLines: DcfLine[];
    evLabel: string; evValue: string; evNote: string; wacc: string; note: string;
  };
  priceTargets: PriceTarget[];
  currentZone: string;
  compsRows: { multiple: string; peers: string; v1: string; v2: string }[];
  scoreRows: ScoreRow[];
  competitors: Competitor[];
  catalysts: Catalyst[];
  recommendation: string;
  thresholds: { label: string; value: string; color: string }[];
  sources: { label: string; url: string }[];
}

export const ASSETS: Asset[] = [
  {
    id: "airliquide", slug: "air-liquide",
    ticker: "AI.PA", name: "Air Liquide", exchange: "Euronext Paris",
    sector: "Gaz industriels · Santé · Hydrogène",
    price: "184,44 €", priceChange: "+0,8%", positive: true, marketCap: "73B€",
    score: 65, color: "#3b82f6",
    description: "Marge record 20,7% — 30e dividende consécutif en hausse",
  },
  {
    id: "michelin", slug: "michelin",
    ticker: "ML.PA", name: "Michelin", exchange: "Euronext Paris",
    sector: "Pneumatiques · Mobilité durable",
    price: "31,54 €", priceChange: "+1,7%", positive: true, marketCap: "21,7B€",
    score: 55, color: "#f59e0b",
    description: "Résultats 2025 en recul — PER 11× et buyback 2B€ en soutien",
  },
  {
    id: "nvidia", slug: "nvidia",
    ticker: "NVDA", name: "Nvidia", exchange: "NASDAQ",
    sector: "Semi-conducteurs · IA · Data Center",
    price: "$225.61", priceChange: "+2,1%", positive: true, marketCap: "$5,46T",
    score: 72, color: "#22c55e",
    description: "$81,6B Q1 FY2027 · +85% YoY — 1ère capitalisation mondiale",
  },
  {
    id: "total", slug: "total",
    ticker: "TTE.PA", name: "TotalEnergies", exchange: "Euronext Paris",
    sector: "Pétrole · Gaz · Énergies renouvelables",
    price: "79,30 €", priceChange: "−0,4%", positive: false, marketCap: "~152B€",
    score: 60, color: "#f59e0b",
    description: "Dividende 6,2% — transition énergétique en cours",
  },
  {
    id: "bitcoin", slug: "bitcoin",
    ticker: "BTC", name: "Bitcoin", exchange: "Crypto",
    sector: "Actif numérique · Store of Value",
    price: "$69 874", priceChange: "+1,2%", positive: true, marketCap: "$1,54T",
    score: 48, color: "#f97316",
    description: "Halving 2024 actif · ETF spot >$100B AUM · Supply <7% restante",
  },
];

export const DATA: Record<string, AssetData> = {
  airliquide: {
    headline: "Marge record 20,7% — dividende +12%",
    tags: ["Gaz industriels", "CAC 40", "Dividende croissant"],
    metrics: [
      { label: "CA 2025", value: "26,94B€", delta: "+2% comparable", positive: true },
      { label: "Bénéfice net", value: "3,52B€", delta: "+6,4% YoY", positive: true },
      { label: "Marge op.", value: "20,7%", delta: "+80 bps", positive: true, sub: "1ère fois >20%" },
      { label: "Dividende", value: "3,70€", delta: "+12,1%", positive: true },
    ],
    resultPeriods: ["FY2025", "FY2024"],
    resultRows: [
      { label: "Chiffre d'affaires", v1: "26,94B€", v2: "27,05B€", change: "−0,4%", status: "neutral" },
      { label: "CA comparable", v1: "+2,0%", v2: "—", change: "+2,0%", status: "hit" },
      { label: "Résultat net récurrent", v1: "3,68B€", v2: "3,46B€", change: "+6,2%", status: "hit" },
      { label: "Marge opérationnelle", v1: "20,7%", v2: "19,9%", change: "+80 bps", status: "hit" },
      { label: "EPS", v1: "6,10€", v2: "5,74€", change: "+6,3%", status: "hit" },
      { label: "Dividende/action", v1: "3,70€", v2: "3,30€", change: "+12,1%", status: "hit" },
    ],
    keyPoints: [
      [
        { text: "Marge opérationnelle franchit 20% pour la 1ère fois de l'histoire du groupe", positive: true },
        { text: "Dividende en hausse de 12,1% — 30e année consécutive de hausse", positive: true },
        { text: "Résultat net récurrent +9,7% à taux de change constants", positive: true },
        { text: "Forte dynamique en santé et hydrogène industriel", positive: true },
      ],
      [
        { text: "Effets de change défavorables (−2,4% sur le CA publié)", positive: false },
        { text: "Croissance organique modérée à +2% — pas d'accélération franche", positive: false },
        { text: "Capex élevé lié aux projets hydrogène à long terme", positive: false },
        { text: "Valorisation légèrement supérieure à la moyenne historique (PER 29)", positive: false },
      ],
    ],
    finHeaders: ["FY2026E", "FY2027E", "FY2028E"],
    incomeRows: [
      { label: "Chiffre d'affaires", y1: "27,8B€", y2: "29,3B€", y3: "31,0B€", bold: true },
      { label: "↳ Gaz industriels", y1: "22,0B€", y2: "23,2B€", y3: "24,5B€", muted: true },
      { label: "↳ Santé / Hydrogène", y1: "5,8B€", y2: "6,1B€", y3: "6,5B€", muted: true },
      { label: "Marge opérationnelle", y1: "21,0%", y2: "21,5%", y3: "22,0%" },
      { label: "EBIT", y1: "5,8B€", y2: "6,3B€", y3: "6,8B€", bold: true },
      { label: "Bénéfice net", y1: "3,8B€", y2: "4,1B€", y3: "4,5B€", bold: true },
      { label: "EPS", y1: "6,60€", y2: "7,15€", y3: "7,80€" },
    ],
    cashRows: [
      { label: "Cash Flow Opérationnel", y1: "6,5B€", y2: "7,0B€", y3: "7,8B€" },
      { label: "Capex", y1: "−4,5B€", y2: "−4,2B€", y3: "−4,0B€" },
      { label: "Free Cash Flow", y1: "+2,0B€", y2: "+2,8B€", y3: "+3,8B€", bold: true },
      { label: "Dividende versé", y1: "−2,1B€", y2: "−2,3B€", y3: "−2,5B€" },
    ],
    valuation: {
      dcfLines: [
        { label: "FCF 2026E actualisé", value: "+€1,8B", pos: true },
        { label: "FCF 2027E actualisé", value: "+€2,4B", pos: true },
        { label: "FCF 2028E actualisé", value: "+€3,0B", pos: true },
        { label: "Valeur terminale (PV)", value: "+€62B", pos: true },
      ],
      evLabel: "Enterprise Value DCF", evValue: "~€69B",
      evNote: "≈ 188€/action — légèrement sous le cours (184€)",
      wacc: "WACC 7,5% · Croissance terminale 2,5%",
      note: "La valorisation DCF est proche du cours actuel. La prime reflète la qualité du modèle récurrent et la croissance régulière du dividende.",
    },
    priceTargets: [
      { scenario: "Bear", emoji: "🐻", range: "155–165€", condition: "Récession, chute prix énergie, hydrogène déçoit" },
      { scenario: "Base", emoji: "⚖️", range: "185–210€", condition: "Croissance organique 2-3%, marge stable >20%" },
      { scenario: "Bull", emoji: "🚀", range: "230–250€", condition: "Hydrogène décolle, marge 23%+, nouvelles acquisitions" },
    ],
    currentZone: "Zone Base",
    compsRows: [
      { multiple: "P/E", peers: "22–26× (Linde, Air Products)", v1: "29×", v2: "24×" },
      { multiple: "EV/EBITDA", peers: "14–17×", v1: "18×", v2: "16×" },
      { multiple: "Rdt dividende", peers: "1,5–2%", v1: "2,0%", v2: "2,3%" },
    ],
    scoreRows: [
      { label: "Fondamentaux", weight: "20%", score: 14, max: 20, note: "Marge record, 30 ans de dividende croissant, modèle résilient" },
      { label: "Qualité du bilan", weight: "10%", score: 8, max: 10, note: "Dette maîtrisée, investment grade A+" },
      { label: "Momentum croissance", weight: "15%", score: 10, max: 15, note: "+2% comparable, régulier — hydrogène en construction" },
      { label: "Valorisation relative", weight: "20%", score: 11, max: 20, note: "PER 29 vs historique 25 — légèrement premium" },
      { label: "Catalyseurs 2026–28", weight: "20%", score: 13, max: 20, note: "Hydrogène, projets GNL, expansion Healthcare" },
      { label: "Risques spécifiques", weight: "15%", score: 9, max: 15, note: "Change USD/EUR, prix énergie, capex long terme" },
    ],
    competitors: [
      { name: "Linde (LIN)", detail: "Leader mondial, plus grande market cap gaz", tag: "Concurrent direct", color: "red" },
      { name: "Air Products", detail: "Focus hydrogène vert, valorisation tendue", tag: "Concurrent", color: "amber" },
      { name: "Messer / SOL", detail: "Acteurs régionaux non cotés", tag: "Secondaire", color: "default" },
    ],
    catalysts: [
      { icon: "💧", title: "Hydrogène vert", year: "2027", desc: "Projets NEOM, ACEQ — premières livraisons. Marché estimé $100B+ à horizon 2030." },
      { icon: "🏥", title: "Healthcare expansion", year: "2026", desc: "Gaz médicaux +5–7%/an, marge supérieure à l'industriel." },
      { icon: "💰", title: "34e dividende record", year: "2026", desc: "34ème hausse consécutive attendue — critère ESG et patrimonial." },
      { icon: "🌍", title: "Nouveaux marchés", year: "2028", desc: "Inde, MENA, Asie du Sud-Est — forte croissance industrielle." },
    ],
    recommendation: "Air Liquide est une valeur de fond de portefeuille de très haute qualité. Au cours actuel (184€), la décote par rapport au DCF est faible. Point d'entrée idéal sous 170€ pour un meilleur rendement.",
    thresholds: [
      { label: "Achat fort", value: "< 170€", color: "var(--green)" },
      { label: "Zone actuelle (hold)", value: "170–200€", color: "var(--amber)" },
      { label: "Alléger", value: "> 220€", color: "var(--red)" },
    ],
    sources: [
      { label: "Résultats FY2025 — Boursorama", url: "https://www.boursorama.com/bourse/actualites/air-liquide-devoile-ses-resultats-et-objectifs-et-releve-son-dividende-3ad4a53d64b4177def2c07fa308319a3" },
      { label: "Bénéfice 3,5B€ — ABC Bourse", url: "https://www.abcbourse.com/marches/air-liquide-affiche-3-5-milliards-d-euros-de-benefice-en-2025-et-augmente-son-di_689697" },
      { label: "AI.PA valorisation — StockInvest", url: "https://stockinvest.us/stock/AI.PA" },
      { label: "Résultats annuels — Zone Bourse", url: "https://www.zonebourse.com/actualite-bourse/l-air-liquide-s-a-publie-ses-resultats-annuels-pour-l-exercice-clos-le-31-decembre-2025-ce7e5dddde8afe22" },
    ],
  },

  michelin: {
    headline: "Résultats 2025 en recul — Recovery en vue, PER 11×",
    tags: ["Pneumatiques", "CAC 40", "Buyback 2B€"],
    metrics: [
      { label: "CA 2025", value: "25,9B€", delta: "−1,4% YoY", positive: false },
      { label: "Résultat net", value: "1,7B€", delta: "−10% YoY", positive: false },
      { label: "Marge op.", value: "10,9%", delta: "−150 bps", positive: false, sub: "vs 12,4% en 2024" },
      { label: "FCF", value: "2,1B€", delta: "Solide", positive: true },
    ],
    resultPeriods: ["FY2025", "FY2024"],
    resultRows: [
      { label: "Chiffre d'affaires", v1: "25,9B€", v2: "26,3B€", change: "−1,4%", status: "miss" },
      { label: "Résultat opérationnel", v1: "2,72B€", v2: "3,26B€", change: "−16,6%", status: "miss" },
      { label: "Marge opérationnelle", v1: "10,9%", v2: "12,4%", change: "−150 bps", status: "miss" },
      { label: "Bénéfice net", v1: "1,70B€", v2: "1,89B€", change: "−10,1%", status: "miss" },
      { label: "Free Cash Flow", v1: "2,1B€", v2: "1,8B€", change: "+16,7%", status: "hit" },
      { label: "Dividende/action", v1: "1,38€", v2: "1,25€", change: "+10,4%", status: "hit" },
    ],
    keyPoints: [
      [
        { text: "FCF meilleur que prévu à 2,1B€ — solidité financière confirmée", positive: true },
        { text: "Buyback 2B€ sur 2026–2028 — retour de valeur actionnaire", positive: true },
        { text: "PER 11× — valorisation très attractive vs secteur (17×)", positive: true },
        { text: "Retour du pricing power attendu en 2026", positive: true },
      ],
      [
        { text: "Résultats 2025 en recul sur quasi tous les indicateurs opérationnels", positive: false },
        { text: "Pression des pneus chinois à bas coût (Doublestar, Sailun)", positive: false },
        { text: "Volumes auto en baisse en Europe et en Amérique du Nord", positive: false },
        { text: "Tarifs douaniers US impactent les chaînes d'approvisionnement", positive: false },
      ],
    ],
    finHeaders: ["FY2026E", "FY2027E", "FY2028E"],
    incomeRows: [
      { label: "Chiffre d'affaires", y1: "26,5B€", y2: "27,8B€", y3: "29,0B€", bold: true },
      { label: "↳ Pneus VP/VL", y1: "17,0B€", y2: "17,8B€", y3: "18,5B€", muted: true },
      { label: "↳ Pneus Spéciaux", y1: "7,0B€", y2: "7,5B€", y3: "8,0B€", muted: true },
      { label: "↳ Services & Solutions", y1: "2,5B€", y2: "2,5B€", y3: "2,5B€", muted: true },
      { label: "Marge opérationnelle", y1: "11,5%", y2: "12,3%", y3: "13,0%" },
      { label: "Résultat opérationnel", y1: "3,05B€", y2: "3,42B€", y3: "3,77B€", bold: true },
      { label: "Bénéfice net", y1: "1,90B€", y2: "2,15B€", y3: "2,45B€", bold: true },
      { label: "EPS", y1: "2,65€", y2: "3,00€", y3: "3,40€" },
    ],
    cashRows: [
      { label: "Cash Flow Opérationnel", y1: "3,2B€", y2: "3,6B€", y3: "4,0B€" },
      { label: "Capex", y1: "−1,6B€", y2: "−1,5B€", y3: "−1,4B€" },
      { label: "Free Cash Flow", y1: "+1,6B€", y2: "+2,1B€", y3: "+2,6B€", bold: true },
      { label: "Rachat d'actions", y1: "−0,7B€", y2: "−0,7B€", y3: "−0,6B€" },
    ],
    valuation: {
      dcfLines: [
        { label: "FCF 2026E actualisé", value: "+€1,4B", pos: true },
        { label: "FCF 2027E actualisé", value: "+€1,8B", pos: true },
        { label: "FCF 2028E actualisé", value: "+€2,1B", pos: true },
        { label: "Valeur terminale (PV)", value: "+€22B", pos: true },
      ],
      evLabel: "Enterprise Value DCF", evValue: "~€27B",
      evNote: "≈ 37€/action — potentiel de +17% vs cours actuel (31,5€)",
      wacc: "WACC 8% · Croissance terminale 2%",
      note: "Le DCF suggère une décote de ~17% par rapport au cours actuel. Le PER 11× confirme la sous-valorisation.",
    },
    priceTargets: [
      { scenario: "Bear", emoji: "🐻", range: "22–25€", condition: "Récession, volumes −10%, concurrence chinoise renforcée" },
      { scenario: "Base", emoji: "⚖️", range: "31–38€", condition: "Recovery progressive, pricing power 2026, buyback actif" },
      { scenario: "Bull", emoji: "🚀", range: "45–55€", condition: "Marge 14%+, volumes EV, nouveaux marchés Inde" },
    ],
    currentZone: "Zone Base basse",
    compsRows: [
      { multiple: "P/E", peers: "17× (secteur auto équipement)", v1: "11×", v2: "9×" },
      { multiple: "EV/EBITDA", peers: "8–10×", v1: "7×", v2: "6×" },
      { multiple: "Rdt dividende", peers: "2–3%", v1: "4,4%", v2: "4,9%" },
    ],
    scoreRows: [
      { label: "Fondamentaux", weight: "20%", score: 11, max: 20, note: "Résultats 2025 en baisse, mais FCF solide et dividende tenu" },
      { label: "Qualité du bilan", weight: "10%", score: 7, max: 10, note: "FCF 2,1B€, dette maîtrisée, investment grade" },
      { label: "Momentum croissance", weight: "15%", score: 8, max: 15, note: "CA en baisse en 2025, recovery attendue 2026–27" },
      { label: "Valorisation relative", weight: "20%", score: 14, max: 20, note: "PER 11× vs secteur 17× — net discount" },
      { label: "Catalyseurs 2026–28", weight: "20%", score: 10, max: 20, note: "Buyback 2B€, pricing power, pneus EV hautes performances" },
      { label: "Risques spécifiques", weight: "15%", score: 5, max: 15, note: "Concurrence chinoise, tarifs US, volumes auto faibles" },
    ],
    competitors: [
      { name: "Bridgestone", detail: "Leader mondial en volume", tag: "Concurrent #1", color: "red" },
      { name: "Goodyear", detail: "Difficultés financières, restructuration en cours", tag: "Concurrent", color: "amber" },
      { name: "Doublestar / Sailun", detail: "Pneus chinois bas coût — pression majeure sur les prix", tag: "Menace prix", color: "red" },
    ],
    catalysts: [
      { icon: "🔄", title: "Buyback 2B€", year: "2026–28", desc: "Programme de rachat d'actions sur 3 ans — soutien mécanique du cours." },
      { icon: "⚡", title: "Pneus EV", year: "2027", desc: "Les véhicules électriques nécessitent des pneus spécifiques à marges plus élevées." },
      { icon: "💪", title: "Pricing power", year: "2026", desc: "Retour attendu du pouvoir de tarification après les pressions de 2025." },
      { icon: "🇮🇳", title: "Inde & Asie", year: "2028", desc: "Croissance du parc automobile en Inde — nouveau relais de croissance." },
    ],
    recommendation: "Michelin est sous-valorisé sur les multiples (PER 11× vs secteur 17×). Le FCF solide et le buyback offrent un plancher. Point d'entrée intéressant pour un investisseur patient avec un horizon 2–3 ans.",
    thresholds: [
      { label: "Achat fort", value: "< 28€", color: "var(--green)" },
      { label: "Zone actuelle (neutre+)", value: "28–36€", color: "var(--amber)" },
      { label: "Alléger", value: "> 48€", color: "var(--red)" },
    ],
    sources: [
      { label: "Michelin résultats 2025 — Journal du Pneu", url: "https://journaldupneu.com/manufacturiers/michelin-enregistre-des-resultats-a-la-baisse-pour-2025/" },
      { label: "Michelin FCF 2,1B€ — Yahoo Finance", url: "https://fr.finance.yahoo.com/actualites/michelin-enregistre-2025-r%C3%A9sultat-op%C3%A9rationnel-164500833.html" },
      { label: "ML.PA cours & PER — Tauxde.com", url: "https://tauxde.com/ml-stock" },
    ],
  },

  nvidia: {
    headline: "Q1 FY2027 : $81,6B de revenus, +85% — 1ère capitalisation mondiale",
    tags: ["IA · Data Center", "NASDAQ", "Hypercroissance"],
    metrics: [
      { label: "CA Q1 FY2027", value: "$81,6B", delta: "+85% YoY", positive: true },
      { label: "Data Center", value: "$75,2B", delta: "+92% YoY", positive: true },
      { label: "Marge brute", value: "74,9%", delta: "+1,4pts", positive: true },
      { label: "Guidance Q2", value: "~$91B", delta: "+12% QoQ", positive: true },
    ],
    resultPeriods: ["Q1 FY2027", "Q1 FY2026"],
    resultRows: [
      { label: "Revenus totaux", v1: "$81,6B", v2: "$44,1B", change: "+85,0%", status: "hit" },
      { label: "Data Center", v1: "$75,2B", v2: "$39,3B", change: "+91,3%", status: "hit" },
      { label: "Marge brute", v1: "74,9%", v2: "60,5%", change: "+1440 bps", status: "hit" },
      { label: "Bénéfice net", v1: "~$35B", v2: "$18,8B", change: "+86%", status: "hit" },
      { label: "Guidance Q2 FY27", v1: "~$91B", v2: "$79,2B (est.)", change: "+15%", status: "hit" },
    ],
    keyPoints: [
      [
        { text: "Record absolu — $81,6B en un trimestre, +85% YoY sans précédent", positive: true },
        { text: "Data Center à $75,2B — capex IA des hyperscalers toujours en forte hausse", positive: true },
        { text: "Marge brute 74,9% — levier opérationnel exceptionnel", positive: true },
        { text: "Guidance Q2 à $91B — l'accélération ne ralentit pas", positive: true },
      ],
      [
        { text: "Charge $4,5B sur stocks H20 liée aux export controls Chine (Q1 FY26)", positive: false },
        { text: "Concentration revenus : quelques hyperscalers = 40%+ du CA", positive: false },
        { text: "Valorisation extrême — PER 42× FY27E justifiable mais risqué", positive: false },
        { text: "Compétition AMD, Google TPU, Amazon Trainium (custom silicon)", positive: false },
      ],
    ],
    finHeaders: ["FY2027E", "FY2028E", "FY2029E"],
    incomeRows: [
      { label: "Revenus totaux", y1: "$320B", y2: "$400B", y3: "$480B", bold: true },
      { label: "↳ Data Center", y1: "$295B", y2: "$370B", y3: "$445B", muted: true },
      { label: "↳ Gaming / Auto / Other", y1: "$25B", y2: "$30B", y3: "$35B", muted: true },
      { label: "Marge brute", y1: "73%", y2: "74%", y3: "75%" },
      { label: "EBIT", y1: "$175B", y2: "$225B", y3: "$275B", bold: true },
      { label: "Bénéfice net", y1: "$135B", y2: "$170B", y3: "$210B", bold: true },
      { label: "EPS (dilué)", y1: "~$5,4", y2: "~$6,8", y3: "~$8,4" },
    ],
    cashRows: [
      { label: "Cash Flow Opérationnel", y1: "$150B", y2: "$195B", y3: "$240B" },
      { label: "Capex", y1: "−$15B", y2: "−$18B", y3: "−$20B" },
      { label: "Free Cash Flow", y1: "+$135B", y2: "+$177B", y3: "+$220B", bold: true },
      { label: "Rachats d'actions", y1: "−$30B", y2: "−$35B", y3: "−$40B" },
    ],
    valuation: {
      dcfLines: [
        { label: "FCF FY2027E actualisé", value: "+$118B", pos: true },
        { label: "FCF FY2028E actualisé", value: "+$143B", pos: true },
        { label: "FCF FY2029E actualisé", value: "+$162B", pos: true },
        { label: "Valeur terminale (PV)", value: "+$3 200B", pos: true },
      ],
      evLabel: "Enterprise Value DCF", evValue: "~$3,6T",
      evNote: "≈ $146/action — en dessous du cours actuel ($225)",
      wacc: "WACC 9% · Croissance terminale 4%",
      note: "Le DCF strict sous-estime Nvidia car il ne capture pas le levier de la prochaine vague (Blackwell Ultra, Rubin). La prime reflète le monopole de facto sur les GPU d'entraînement IA.",
    },
    priceTargets: [
      { scenario: "Bear", emoji: "🐻", range: "$120–$150", condition: "Export controls élargis, ralentissement capex IA, récession" },
      { scenario: "Base", emoji: "⚖️", range: "$200–$260", condition: "Croissance continue, Blackwell en ramp, concurrence modérée" },
      { scenario: "Bull", emoji: "🚀", range: "$350–$450", condition: "Rubin plateforme dominante, CUDA moat renforcé, NIM software" },
    ],
    currentZone: "Zone Base haute",
    compsRows: [
      { multiple: "P/E FY27E", peers: "20–25× (ASML, TSMC)", v1: "42×", v2: "33×" },
      { multiple: "EV/Revenus", peers: "5–10× (semi)", v1: "17×", v2: "14×" },
      { multiple: "PEG ratio", peers: "1,0–1,5×", v1: "0,5×", v2: "0,4×" },
    ],
    scoreRows: [
      { label: "Fondamentaux", weight: "20%", score: 19, max: 20, note: "$81,6B Q1 FY27, +85% YoY — résultats historiques absolus" },
      { label: "Qualité du bilan", weight: "10%", score: 9, max: 10, note: "Net cash massif, pas de dette significative" },
      { label: "Momentum croissance", weight: "15%", score: 14, max: 15, note: "Hypercroissance IA — guidance Q2 à $91B" },
      { label: "Valorisation relative", weight: "20%", score: 8, max: 20, note: "PER 42× FY27E — cher mais PEG <1 justifie la prime" },
      { label: "Catalyseurs 2026–28", weight: "20%", score: 16, max: 20, note: "Blackwell Ultra, Rubin, NIM software, inference scaling" },
      { label: "Risques spécifiques", weight: "15%", score: 6, max: 15, note: "Export controls, concentration clients, AMD/Google silicon" },
    ],
    competitors: [
      { name: "AMD", detail: "MI300X/MI400 — alternative crédible mais très loin derrière", tag: "Concurrent GPU", color: "amber" },
      { name: "Google TPU / Amazon Trainium", detail: "Custom silicon in-house — menace sur les hyperscalers", tag: "Custom silicon", color: "red" },
      { name: "Intel Gaudi", detail: "Très en retard, parts de marché marginales", tag: "Concurrent", color: "default" },
    ],
    catalysts: [
      { icon: "⚫", title: "Blackwell Ultra", year: "2026", desc: "Prochaine génération de GPU — densité de calcul ×4 vs H100. En ramp actif." },
      { icon: "🔮", title: "Rubin Platform", year: "2027", desc: "Architecture next-gen prévue pour FY2028 — maintient l'avance sur AMD." },
      { icon: "💻", title: "CUDA Moat", year: "Continu", desc: "4M+ développeurs formés sur CUDA — switching cost quasi-insurmontable." },
      { icon: "🤖", title: "NIM / Software", year: "2027", desc: "Nvidia accelerates software revenue (NIM, DGX Cloud) — marges encore plus élevées." },
    ],
    recommendation: "Nvidia est l'entreprise la plus profitable de l'histoire à cette vitesse de croissance. Au cours actuel ($225), le PEG <1 justifie la prime. Le principal risque est une déception sur la cadence Rubin ou des export controls renforcés.",
    thresholds: [
      { label: "Achat fort", value: "< $170", color: "var(--green)" },
      { label: "Zone actuelle (Achat)", value: "$170–$270", color: "var(--green)" },
      { label: "Alléger / Prendre profits", value: "> $350", color: "var(--red)" },
    ],
    sources: [
      { label: "Nvidia Q1 FY2027 $81,6B — TIKR", url: "https://www.tikr.com/blog/nvidia-q1-2027-earnings-81-6b-revenue-and-three-straight-quarters-of-acceleration" },
      { label: "Nvidia record revenue — Yahoo Finance", url: "https://finance.yahoo.com/markets/stocks/articles/nvidia-q1-fy2027-earnings-record-214649637.html" },
      { label: "NVDA Market Cap $5,46T — Capital.com", url: "https://capital.com/en-int/markets/shares/nvidia-corp-share-price/market-cap" },
      { label: "Nvidia Q1 FY2027 Newsroom", url: "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-first-quarter-fiscal-2027" },
    ],
  },

  total: {
    headline: "Bénéfice −17% en 2025 — dividende 6,2% et transition accélérée",
    tags: ["Pétrole & Gaz", "CAC 40", "Dividende 6,2%"],
    metrics: [
      { label: "Bénéfice ajusté", value: "$15,6B", delta: "−14,6% YoY", positive: false },
      { label: "Rdt dividende", value: "6,23%", delta: "+5,6% dividende", positive: true },
      { label: "Production", value: "~2,5Mbep/j", delta: "Stable", positive: true },
      { label: "Cours", value: "79,30€", delta: "−0,4%", positive: false },
    ],
    resultPeriods: ["FY2025", "FY2024"],
    resultRows: [
      { label: "Revenus", v1: "~$220B", v2: "~$238B", change: "−7,6%", status: "miss" },
      { label: "Résultat net ajusté", v1: "$15,6B", v2: "$18,3B", change: "−14,6%", status: "miss" },
      { label: "Résultat net GAAP", v1: "$13,1B", v2: "$15,8B", change: "−17,1%", status: "miss" },
      { label: "Dividende/action", v1: "3,40€", v2: "3,22€", change: "+5,6%", status: "hit" },
      { label: "Rachat d'actions", v1: "~$8B", v2: "~$9B", change: "Maintenu", status: "neutral" },
    ],
    keyPoints: [
      [
        { text: "Dividende 3,40€/action (+5,6%) — rendement 6,2% exceptionnel dans le secteur", positive: true },
        { text: "Production stable à ~2,5Mbep/j malgré la baisse des prix du Brent", positive: true },
        { text: "25% du capex sur les renouvelables en 2025 — transition en cours", positive: true },
        { text: "Bilan solide — investment grade, retour actionnarial maintenu", positive: true },
      ],
      [
        { text: "Bénéfice net en baisse de 17% — forte pression du prix du Brent", positive: false },
        { text: "Exposition directe au prix du pétrole (Brent autour de $70–75/bbl)", positive: false },
        { text: "Risque politique — taxation windfall profits en Europe", positive: false },
        { text: "Transition énergétique : investissements long terme qui pèsent à court terme", positive: false },
      ],
    ],
    finHeaders: ["FY2026E", "FY2027E", "FY2028E"],
    incomeRows: [
      { label: "Revenus", y1: "~$215B", y2: "~$210B", y3: "~$205B", bold: true },
      { label: "↳ Pétrole & Gaz", y1: "~$185B", y2: "~$175B", y3: "~$165B", muted: true },
      { label: "↳ LNG / Électricité / ENR", y1: "~$30B", y2: "~$35B", y3: "~$40B", muted: true },
      { label: "Résultat net ajusté", y1: "$14,0B", y2: "$13,0B", y3: "$12,5B", bold: true },
      { label: "EPS ajusté", y1: "~$5,5", y2: "~$5,2", y3: "~$5,0" },
      { label: "Dividende/action", y1: "3,60€", y2: "3,80€", y3: "4,00€" },
    ],
    cashRows: [
      { label: "Cash Flow Opérationnel", y1: "~$22B", y2: "~$21B", y3: "~$20B" },
      { label: "Capex", y1: "~$17B", y2: "~$16B", y3: "~$15B" },
      { label: "Free Cash Flow", y1: "~$5B", y2: "~$5B", y3: "~$5B", bold: true },
      { label: "Rachats + dividendes", y1: "~$11B", y2: "~$10B", y3: "~$10B" },
    ],
    valuation: {
      dcfLines: [
        { label: "FCF 2026E actualisé", value: "+$4,3B", pos: true },
        { label: "FCF 2027E actualisé", value: "+$3,9B", pos: true },
        { label: "FCF 2028E actualisé", value: "+$3,6B", pos: true },
        { label: "Valeur terminale (PV)", value: "+$100B", pos: true },
      ],
      evLabel: "Enterprise Value DCF", evValue: "~$112B",
      evNote: "≈ 82€/action — légèrement au-dessus du cours actuel (79€)",
      wacc: "WACC 8,5% · Croissance terminale 1%",
      note: "TotalEnergies est valorisé proche de sa juste valeur DCF. L'argument d'achat repose sur le dividende 6,2% et non sur la croissance des bénéfices.",
    },
    priceTargets: [
      { scenario: "Bear", emoji: "🐻", range: "55–65€", condition: "Brent <$55, taxes windfall, récession Europe" },
      { scenario: "Base", emoji: "⚖️", range: "75–90€", condition: "Brent $70–80, dividende maintenu, LNG stable" },
      { scenario: "Bull", emoji: "🚀", range: "100–115€", condition: "Brent >$90, LNG boom, renouvelables valorisés" },
    ],
    currentZone: "Zone Base",
    compsRows: [
      { multiple: "P/E", peers: "7–10× (Shell, BP, Exxon)", v1: "10×", v2: "11×" },
      { multiple: "EV/EBITDA", peers: "4–6×", v1: "5×", v2: "5×" },
      { multiple: "Rdt dividende", peers: "4–5%", v1: "6,2%", v2: "6,6%" },
    ],
    scoreRows: [
      { label: "Fondamentaux", weight: "20%", score: 12, max: 20, note: "Bénéfice en baisse mais reste très profitable, production stable" },
      { label: "Qualité du bilan", weight: "10%", score: 8, max: 10, note: "Investment grade, retour actionnarial maintenu" },
      { label: "Momentum croissance", weight: "15%", score: 8, max: 15, note: "Déclin pétrole compensé par LNG et ENR" },
      { label: "Valorisation relative", weight: "20%", score: 13, max: 20, note: "Dividende 6,2% attractif, PER 10× pas cher" },
      { label: "Catalyseurs 2026–28", weight: "20%", score: 11, max: 20, note: "LNG Qatar, ENR 100GW, transition maîtrisée" },
      { label: "Risques spécifiques", weight: "15%", score: 8, max: 15, note: "Prix Brent, fiscalité, décarbonation structurelle" },
    ],
    competitors: [
      { name: "Shell", detail: "Transition plus rapide, valorisation similaire", tag: "Concurrent #1", color: "amber" },
      { name: "ExxonMobil / Chevron", detail: "Plus exposés pétrole pur, US market", tag: "Concurrent", color: "amber" },
      { name: "BP", detail: "Difficultés stratégiques, restructuration en cours", tag: "Concurrent", color: "default" },
    ],
    catalysts: [
      { icon: "🇶🇦", title: "Qatar LNG expansion", year: "2026–27", desc: "North Field Expansion — +32M tonnes/an de LNG. TotalEnergies actionnaire majeur." },
      { icon: "☀️", title: "Solaire & Éolien", year: "2027", desc: "Objectif 100 GW ENR d'ici 2030 — croissance portfolio renouvelables." },
      { icon: "💵", title: "Dividende croissant", year: "Chaque année", desc: "Engagement de hausser le dividende chaque année — rendement 6%+ durable." },
      { icon: "🔄", title: "Buybacks $8B+", year: "2026", desc: "Rachat d'actions maintenu — soutien mécanique du cours." },
    ],
    recommendation: "TotalEnergies est un excellent générateur de cash pour un portefeuille revenus. Le dividende 6,2% est soutenable et croissant. La valorisation est juste. Idéal pour un investisseur income, moins pour la croissance en capital.",
    thresholds: [
      { label: "Achat fort (rendement)", value: "< 70€", color: "var(--green)" },
      { label: "Zone actuelle (hold)", value: "70–90€", color: "var(--amber)" },
      { label: "Alléger", value: "> 100€", color: "var(--red)" },
    ],
    sources: [
      { label: "TotalEnergies dividende +5,6% — FranceTransactions", url: "https://www.francetransactions.com/actus/news-bourse/marches/totalenergies-hausse-dividende-2026.html" },
      { label: "TotalEnergies SEC Filing FY2025", url: "https://www.sec.gov/Archives/edgar/data/0000879764/000110465925103925/tm2529545d2_ex99-1.htm" },
    ],
  },

  bitcoin: {
    headline: "$69 874 — Halving actif, ETF >$100B AUM, supply quasi épuisée",
    tags: ["Store of Value", "Crypto", "Halving 2024"],
    metrics: [
      { label: "Prix actuel", value: "$69 874", delta: "+1,2% 24h", positive: true },
      { label: "Market Cap", value: "$1,54T", delta: "#1 crypto mondial", positive: true },
      { label: "Supply restante", value: "~1,32M BTC", delta: "<7% à miner", positive: true },
      { label: "ETF Bitcoin AUM", value: ">$100B", delta: "+67% sur 1 an", positive: true },
    ],
    resultPeriods: ["Juin 2026", "Juin 2025"],
    resultRows: [
      { label: "Prix (USD)", v1: "$69 874", v2: "~$67 000", change: "+4,3%", status: "neutral" },
      { label: "Market Cap", v1: "$1,54T", v2: "~$1,32T", change: "+16,7%", status: "hit" },
      { label: "Hashrate (EH/s)", v1: "~800 EH/s", v2: "~600 EH/s", change: "+33%", status: "hit" },
      { label: "ETF Bitcoin AUM", v1: ">$100B", v2: "~$60B", change: "+67%", status: "hit" },
      { label: "Indicateurs tech.", v1: "28 bearish", v2: "—", change: "5 bullish", status: "miss" },
    ],
    keyPoints: [
      [
        { text: "ETF Bitcoin spot — afflux institutionnel continu, AUM >$100B", positive: true },
        { text: "Halving avril 2024 — réduction offre minée, effet haussier sur 18–24 mois", positive: true },
        { text: "Supply effective réduite — 3–4M BTC perdus, <7% non minés", positive: true },
        { text: "Adoption institutionnelle croissante (fonds souverains, corporates)", positive: true },
      ],
      [
        { text: "28 indicateurs techniques bearish vs 5 bullish — momentum CT faible", positive: false },
        { text: "Volatilité extrême — drawdowns de 50–70% possibles en marché baissier", positive: false },
        { text: "Régulation incertaine (MiCA Europe, SEC US)", positive: false },
        { text: "Pas de cash flow — valorisation entièrement basée sur le sentiment", positive: false },
      ],
    ],
    finHeaders: ["2026E", "2027E", "2028E"],
    incomeRows: [
      { label: "Prix cible Base", y1: "$75–90k", y2: "$90–130k", y3: "$70–200k", bold: true },
      { label: "Prix cible Bull", y1: "$110k", y2: "$180k", y3: "$250k", muted: true },
      { label: "Prix cible Bear", y1: "$40k", y2: "$35k", y3: "$30k", muted: true },
      { label: "Market Cap Base", y1: "$1,5–1,8T", y2: "$1,8–2,6T", y3: "$1,4–4,0T" },
      { label: "Dominance BTC", y1: "~55–60%", y2: "~50–55%", y3: "~45–55%" },
      { label: "ETF AUM estimé", y1: ">$120B", y2: ">$180B", y3: ">$220B" },
    ],
    cashRows: [
      { label: "Récompense bloc mineurs", y1: "3,125 BTC", y2: "3,125 BTC", y3: "~1,56 BTC", bold: true },
      { label: "Émission annuelle BTC", y1: "~164k BTC", y2: "~164k BTC", y3: "~82k BTC" },
      { label: "Revenus mineurs (frais)", y1: "Variable", y2: "Variable", y3: "Croissant" },
    ],
    valuation: {
      dcfLines: [
        { label: "Modèle Stock-to-Flow", value: "$85k–$150k", pos: true },
        { label: "Modèle Metcalfe (réseau)", value: "$60k–$110k", pos: true },
        { label: "Parité or (10% de la cap or)", value: "~$90k", pos: true },
        { label: "Sentiment macro actuel", value: "Neutre / Bearish CT", pos: false },
      ],
      evLabel: "Valeur fondamentale estimée", evValue: "$75–95k",
      evNote: "Base case 2026 — cours actuel proche de la fair value",
      wacc: "Pas de DCF applicable — actif non-générateur de cash",
      note: "Bitcoin n'a pas de DCF traditionnel. La 'fair value' découle de modèles monétaires (S2F, Metcalfe, parité or). Le cours actuel de $69k est dans la zone de fair value estimée.",
    },
    priceTargets: [
      { scenario: "Bear", emoji: "🐻", range: "$35–45k", condition: "Régulation drastique, krach actions, liquidations ETF massives" },
      { scenario: "Base", emoji: "⚖️", range: "$70–100k", condition: "ETF inflows stables, halving effect, macro neutre" },
      { scenario: "Bull", emoji: "🚀", range: "$150–180k", condition: "Réserve stratégique US, macro dovish, FOMO retail" },
    ],
    currentZone: "Zone Base (proche)",
    compsRows: [
      { multiple: "vs Or (market cap)", peers: "$14T (or mondial)", v1: "$1,54T", v2: "~11% de l'or" },
      { multiple: "Perf. 1 an vs S&P 500", peers: "+~12% S&P 500", v1: "+4%", v2: "Sous-perf." },
      { multiple: "Volatilité 30j annualisée", peers: "15% (or)", v1: "~55%", v2: "×3,6 l'or" },
    ],
    scoreRows: [
      { label: "Fondamentaux", weight: "20%", score: 8, max: 20, note: "Pas de revenus — store of value, supply décroissante" },
      { label: "Solidité / Réseau", weight: "10%", score: 7, max: 10, note: "Hashrate record, réseau le plus sécurisé, immuabilité" },
      { label: "Momentum adoption", weight: "15%", score: 9, max: 15, note: "ETF >$100B AUM, institutionnels, fonds souverains" },
      { label: "Valorisation relative", weight: "20%", score: 7, max: 20, note: "Proche fair value estimée — pas de décote franche" },
      { label: "Catalyseurs 2026–28", weight: "20%", score: 12, max: 20, note: "Halving effect, ETF inflows, réserve stratégique US possible" },
      { label: "Risques spécifiques", weight: "15%", score: 5, max: 15, note: "Régulation, volatilité extrême, sentiment CT bearish" },
    ],
    competitors: [
      { name: "Ethereum (ETH)", detail: "Smart contracts, staking — différenciation produit forte", tag: "Crypto #2", color: "blue" },
      { name: "Or (XAU)", detail: "Concurrent store of value — $14T vs $1,54T Bitcoin", tag: "Rival traditionnel", color: "amber" },
      { name: "Stablecoins (USDT, USDC)", detail: "Concurrence pour l'usage de paiement quotidien", tag: "Paiement", color: "default" },
    ],
    catalysts: [
      { icon: "✂️", title: "Halving 2024 (actif)", year: "2025–26", desc: "Réduction de 50% de l'émission — effet historiquement haussier sur 12–18 mois après." },
      { icon: "🏦", title: "ETF Bitcoin spot", year: "Continu", desc: "BlackRock, Fidelity, ARK — AUM déjà >$100B. Demande institutionnelle structurelle." },
      { icon: "🏛️", title: "Réserve stratégique US", year: "2026", desc: "Discussions au Congrès US — catalyseur potentiel majeur si adopté." },
      { icon: "✂️", title: "Prochain halving", year: "2028", desc: "Quatrième halving — réduction à 1,5625 BTC/bloc. Supply encore plus contrainte." },
    ],
    recommendation: "Bitcoin est proche de sa fair value estimée à $69–70k. Le risque/rendement est correct mais pas exceptionnel au cours actuel. Les creux sous $50k offriraient une asymétrie bien meilleure. À réserver à <10% d'un portefeuille diversifié.",
    thresholds: [
      { label: "Achat fort", value: "< $50k", color: "var(--green)" },
      { label: "Zone actuelle (neutre)", value: "$50–95k", color: "var(--amber)" },
      { label: "Prendre profits", value: "> $130k", color: "var(--red)" },
    ],
    sources: [
      { label: "Bitcoin prix & market cap — Perplexity Finance", url: "https://www.perplexity.ai/finance/BTCUSD" },
      { label: "Bitcoin price prediction 2026 — CryptoNews", url: "https://cryptonews.com/price-predictions/bitcoin-price-prediction/" },
      { label: "Bitcoin Rainbow Chart juin 2026 — CryptoNews.net", url: "https://cryptonews.net/news/bitcoin/32953063/" },
    ],
  },
};

export function scoreColor(score: number): string {
  if (score >= 70) return "var(--green)";
  if (score >= 50) return "var(--amber)";
  return "var(--red)";
}

export function scoreLabel(score: number): string {
  if (score >= 70) return "Achat";
  if (score >= 50) return "Neutre";
  return "Éviter";
}
