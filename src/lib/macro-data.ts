export const REPORT_META = {
  title: "Macro Flow Research",
  subtitle: "Rapports macro-financiers institutionnels pour traders sérieux",
  week: "Semaine 23 — 2 au 6 juin 2026",
  published: "3 juin 2026",
  version: "v2.4",
};

export type Bias = "Bullish" | "Bearish" | "Neutral";
export type RiskLevel = "Faible" | "Modéré" | "Élevé" | "Critique";
export type Regime = "Risk-On" | "Risk-Off" | "Neutre";

export const SCORES = {
  macroUS:   { value: 5.8, label: "Neutre+", color: "#f59e0b" },
  fed:       { value: 4.5, label: "Dovish cautieux", color: "#f59e0b" },
  dollar:    { value: 5.2, label: "Neutre", color: "#94a3b8" },
  eurusd:    { value: 4.8, label: "Neutre", color: "#94a3b8" },
  nasdaq:    { value: 6.4, label: "Haussier", color: "#22c55e" },
  dow:       { value: 5.5, label: "Neutre+", color: "#f59e0b" },
  sp500:     { value: 6.1, label: "Haussier mod.", color: "#22c55e" },
  europe:    { value: 4.2, label: "Neutre−", color: "#f59e0b" },
  france:    { value: 3.8, label: "Baissier mod.", color: "#ef4444" },
  risk:      { value: 5.5, label: "Risque modéré", color: "#f59e0b" },
  liquidity: { value: 5.9, label: "Neutre+", color: "#f59e0b" },
};

export const GLOBAL_REGIME: Regime = "Neutre";

export const MACRO_ASSETS = [
  { id: "eurusd", name: "EUR/USD", price: "1.0847", change: "+0.12%", bias: "Neutral" as Bias, score: 4.8, confidence: 6, description: "Légère pression baissière dollar, BCE dovish" },
  { id: "nasdaq", name: "Nasdaq 100", price: "19 247", change: "+0.84%", bias: "Bullish" as Bias, score: 6.4, confidence: 7, description: "IA et Big Tech portent le marché" },
  { id: "dow-jones", name: "Dow Jones", price: "42 158", change: "+0.31%", bias: "Neutral" as Bias, score: 5.5, confidence: 6, description: "Secteurs cycliques en attente des données macro" },
  { id: "sp500", name: "S&P 500", price: "5 312", change: "+0.67%", bias: "Bullish" as Bias, score: 6.1, confidence: 7, description: "Breadth s'améliore, earnings Q1 solides" },
  { id: "dxy", name: "DXY", price: "104.82", change: "-0.18%", bias: "Neutral" as Bias, score: 5.2, confidence: 5, description: "Dollar sous pression, attente NFP vendredi" },
];

export const US_MACRO = [
  { name: "PIB Q1 2026 (ann.)", value: "1.8%", prev: "2.4%", consensus: "2.0%", trend: "down", impact: "Négatif USD, négatif indices", source: "BEA", date: "29 mai 2026", interp: "Ralentissement visible mais pas de récession confirmée" },
  { name: "CPI (avr. 2026)", value: "2.8%", prev: "3.1%", consensus: "2.9%", trend: "down", impact: "Positif indices, positif EURUSD", source: "BLS", date: "15 mai 2026", interp: "Désinflation graduelle, tendance favorable" },
  { name: "Core CPI (avr. 2026)", value: "3.1%", prev: "3.3%", consensus: "3.2%", trend: "down", impact: "Neutre, toujours au-dessus cible Fed", source: "BLS", date: "15 mai 2026", interp: "Rigidité des services, logement en baisse lente" },
  { name: "PCE (avr. 2026)", value: "2.6%", prev: "2.8%", consensus: "2.7%", trend: "down", impact: "Positif pour Fed dovish, positif indices", source: "BEA", date: "30 mai 2026", interp: "Indicateur préféré de la Fed en amélioration" },
  { name: "Core PCE (avr. 2026)", value: "2.8%", prev: "3.0%", consensus: "2.9%", trend: "down", impact: "Confirme tendance désinflation", source: "BEA", date: "30 mai 2026", interp: "Toujours au-dessus de 2%, Fed prudente" },
  { name: "NFP (avr. 2026)", value: "+177k", prev: "+185k", consensus: "+180k", trend: "neutral", impact: "Neutre, marché de l'emploi résilient", source: "BLS", date: "2 mai 2026", interp: "Légèrement en dessous du consensus, pas d'alarme" },
  { name: "Chômage", value: "4.1%", prev: "4.0%", consensus: "4.0%", trend: "up", impact: "Légèrement négatif USD, positif Fed dovish", source: "BLS", date: "2 mai 2026", interp: "Légère hausse mais non préoccupante" },
  { name: "JOLTS (mars 2026)", value: "7.19M", prev: "7.48M", consensus: "7.30M", trend: "down", impact: "Léger refroidissement marché du travail", source: "BLS", date: "7 mai 2026", interp: "Demande d'emploi en recul progressif" },
  { name: "Initial Jobless Claims", value: "218k", prev: "223k", consensus: "220k", trend: "down", impact: "Positif USD, marché du travail solide", source: "BLS", date: "29 mai 2026", interp: "Résilience des inscriptions" },
  { name: "Retail Sales (avr.)", value: "+0.1%", prev: "+0.8%", consensus: "+0.4%", trend: "down", impact: "Négatif croissance, négatif indices", source: "Census", date: "15 mai 2026", interp: "Consommateur américain qui marque le pas" },
  { name: "ISM Manufacturing", value: "49.0", prev: "48.7", consensus: "49.5", trend: "up", impact: "Neutre, toujours en contraction", source: "ISM", date: "2 juin 2026", interp: "Sous 50, secteur manufacturier en contraction" },
  { name: "ISM Services", value: "53.8", prev: "51.6", consensus: "52.0", trend: "up", impact: "Positif USD, positif indices", source: "ISM", date: "4 juin 2026", interp: "Expansion du secteur services" },
  { name: "PMI Composite", value: "52.1", prev: "51.3", consensus: "—", trend: "up", impact: "Positif croissance, neutre Fed", source: "S&P Global", date: "22 mai 2026", interp: "Expansion modérée de l'activité privée" },
];

export const FED_DATA = {
  rate: "4.25 – 4.50%",
  lastFOMC: "7 mai 2026",
  nextFOMC: "18 juin 2026",
  tone: "Dovish prudent",
  powellTone: "Jerome Powell a réaffirmé la patience de la Fed. Il a souligné que les données pointent vers un retour durable à 2% mais que la banque centrale ne veut pas couper trop tôt. Ouvert à une baisse en septembre si les données le permettent.",
  fedwatch: [
    { date: "18 juin 2026", hold: 88, cut25: 12, hike: 0 },
    { date: "30 juil. 2026", hold: 65, cut25: 33, hike: 2 },
    { date: "17 sept. 2026", hold: 38, cut25: 52, hike: 10 },
    { date: "5 nov. 2026", hold: 25, cut25: 58, hike: 17 },
  ],
  recentSpeeches: [
    { speaker: "J. Powell", date: "28 mai 2026", tone: "Dovish", summary: "Patient, données-dépendant, coupure possible H2 2026" },
    { speaker: "J. Williams (NY Fed)", date: "25 mai 2026", tone: "Neutre", summary: "Inflation progrès encourageant, marché du travail résilient" },
    { speaker: "C. Waller", date: "21 mai 2026", tone: "Hawkish", summary: "Vigilance sur inflation des services, pas de rush pour couper" },
    { speaker: "M. Bowman", date: "19 mai 2026", tone: "Hawkish", summary: "Préoccupée par la rigidité du Core PCE" },
  ],
};

export const EUROPE_MACRO = [
  { name: "PIB Zone Euro Q1 2026", value: "0.4%", prev: "0.2%", consensus: "0.3%", source: "Eurostat", date: "30 avr. 2026", interp: "Légère reprise tirée par l'Espagne et l'Italie" },
  { name: "Inflation HICP (avr.)", value: "2.3%", prev: "2.4%", consensus: "2.3%", source: "Eurostat", date: "17 mai 2026", interp: "Retour progressif vers la cible BCE" },
  { name: "Core HICP (avr.)", value: "2.7%", prev: "2.9%", consensus: "2.7%", source: "Eurostat", date: "17 mai 2026", interp: "Services en recul, bonne nouvelle pour BCE" },
  { name: "Chômage (mars 2026)", value: "5.9%", prev: "6.0%", consensus: "5.9%", source: "Eurostat", date: "30 avr. 2026", interp: "Niveau historiquement bas" },
  { name: "PMI Manufacturier", value: "48.4", prev: "47.9", consensus: "48.5", source: "S&P Global", date: "2 juin 2026", interp: "Toujours en contraction, amélioration marginale" },
  { name: "PMI Services", value: "53.2", prev: "52.8", consensus: "53.0", source: "S&P Global", date: "4 juin 2026", interp: "Expansion des services, moteur de croissance" },
  { name: "Taux BCE", value: "3.25%", prev: "3.50%", consensus: "—", source: "BCE", date: "6 juin 2026", interp: "Baisse de 25pb confirmée, cycle assouplissement" },
];

export const FRANCE_MACRO = [
  { name: "PIB Q1 2026", value: "+0.2%", prev: "+0.1%", source: "INSEE", date: "30 avr. 2026", interp: "Croissance atone, en ligne avec prévisions" },
  { name: "Inflation CPI (avr.)", value: "2.1%", prev: "2.4%", source: "INSEE", date: "15 mai 2026", interp: "Désinflation bien engagée" },
  { name: "Chômage (T1 2026)", value: "7.3%", prev: "7.4%", source: "INSEE", date: "13 mai 2026", interp: "Légère amélioration, niveau élevé vs Europe" },
  { name: "Déficit public 2025", value: "5.4% PIB", prev: "4.8%", source: "INSEE", date: "avr. 2026", interp: "Dépassement objectif budgétaire, pression politique" },
  { name: "Dette publique", value: "113.5% PIB", prev: "110.6%", source: "INSEE", date: "avr. 2026", interp: "3e plus haute dette de la zone euro" },
  { name: "Consommation ménages", value: "-0.3%", prev: "+0.2%", source: "INSEE", date: "30 mai 2026", interp: "Repli inattendu, pouvoir d'achat sous pression" },
  { name: "Production industrielle", value: "-0.4%", prev: "+0.7%", source: "INSEE", date: "10 mai 2026", interp: "Industrie en difficulté structurelle" },
];

export const EURUSD_ANALYSIS = {
  price: "1.0847", bias: "Neutral" as Bias, score: 4.8, confidence: 6,
  spreadFedBCE: "+100 pb (Fed à 4.375% vs BCE à 3.25%)",
  growthDiff: "US +1.8% vs EZ +0.4% annualisé",
  inflationDiff: "US Core PCE 2.8% vs EZ Core HICP 2.7%",
  capitalFlows: "Flux vers USD limités, attractivité dollar en baisse",
  sentiment: "Institutionnel neutre à légèrement haussier EUR",
  scenarios: [
    { name: "Haussier EUR", target: "1.1050 – 1.1200", proba: "30%", catalyst: "Fed dovish + BCE hawkish + données US faibles", color: "#22c55e" },
    { name: "Neutre", target: "1.0750 – 1.1000", proba: "45%", catalyst: "Statu quo banques centrales, données mitigées", color: "#94a3b8" },
    { name: "Baissier EUR", target: "1.0500 – 1.0750", proba: "25%", catalyst: "Rebond USD fort, risque politique France", color: "#ef4444" },
  ],
  biasWeek: "Neutre",
  biasMonth: "Légèrement haussier EUR",
  biasTrimester: "Haussier EUR conditionnel",
};

export const NASDAQ_ANALYSIS = {
  price: "19 247", bias: "Bullish" as Bias, score: 6.4, confidence: 7,
  tenYrYield: "4.42%",
  liquidityStatus: "Favorable — conditions financières accommodantes",
  bigTech: "NVDA, AAPL, MSFT, GOOGL au-dessus des attentes Q1",
  aiTheme: "Dépenses CapEx IA en forte accélération (+45% YoY)",
  earnings: "EPS S&P500 Q1 : +8.2% YoY, 78% de beat",
  valuations: "P/E Nasdaq 28x — élevé mais supporté par la croissance",
  sentiment: "Risk-On dominant, institutions surpondèrent tech",
  scenarios: [
    { name: "Haussier", target: "20 000 – 21 000", proba: "40%", catalyst: "IA earnings beat, Fed coupe, yields baissent", color: "#22c55e" },
    { name: "Neutre", target: "18 500 – 20 000", proba: "40%", catalyst: "Consolidation, données macro mitigées", color: "#94a3b8" },
    { name: "Baissier", target: "17 500 – 18 500", proba: "20%", catalyst: "Correction valorisations, yields remontent", color: "#ef4444" },
  ],
};

export const DOW_ANALYSIS = {
  price: "42 158", bias: "Neutral" as Bias, score: 5.5, confidence: 6,
  sectors: [
    { name: "Industrie", outlook: "Neutre", comment: "PMI manufacturier sous 50" },
    { name: "Banques", outlook: "Neutre+", comment: "NIM soutenu par taux élevés" },
    { name: "Santé", outlook: "Neutre", comment: "Valorisations raisonnables" },
    { name: "Consommation discr.", outlook: "Neutre−", comment: "Retail sales décevant" },
    { name: "Énergie", outlook: "Baissier", comment: "Pétrole sous pression" },
  ],
  scenarios: [
    { name: "Haussier", target: "43 500 – 45 000", proba: "30%", catalyst: "Soft landing confirmé, Fed coupe sept.", color: "#22c55e" },
    { name: "Neutre", target: "41 000 – 43 500", proba: "50%", catalyst: "Données mixtes, consolidation", color: "#94a3b8" },
    { name: "Baissier", target: "39 000 – 41 000", proba: "20%", catalyst: "Déception earnings, données macro faibles", color: "#ef4444" },
  ],
};

export const SP500_ANALYSIS = {
  price: "5 312", bias: "Bullish" as Bias, score: 6.1, confidence: 7,
  breadth: "70% des titres au-dessus de leur MM200",
  earningsGrowth: "+8.2% YoY Q1 2026",
  peForward: "20.8x",
  margins: "Marges nettes 12.4% — résistantes",
  etfFlows: "+$18.4Mrd entrants S&P ETF sur 4 semaines",
  institutional: "Surpondération tech, sous-pondération énergie",
  correctionRisk: "Modéré — divergence valorisations/momentum",
  scenarios: [
    { name: "Haussier", target: "5 600 – 5 900", proba: "35%", catalyst: "Fed dovish, IA supercycle, earnings beat", color: "#22c55e" },
    { name: "Neutre", target: "5 100 – 5 600", proba: "45%", catalyst: "Consolidation saine, données mitigées", color: "#94a3b8" },
    { name: "Baissier", target: "4 700 – 5 100", proba: "20%", catalyst: "Récession douce, yields > 5%", color: "#ef4444" },
  ],
};

export const DXY_ANALYSIS = {
  price: "104.82", bias: "Neutral" as Bias, score: 5.2,
  trend: "Range 104 – 106 depuis 3 semaines",
  bullForces: ["Différentiel de taux US/monde favorable USD", "Économie US relativement plus forte", "Safe haven en cas de risque géopolitique"],
  bearForces: ["Fed pivot anticipé H2 2026", "Réduction différentiel de croissance", "Amélioration de la Zone Euro"],
  correlationUS10Y: "+0.82 — fort lien avec les taux US 10 ans",
  correlationSP500: "-0.65 — corrélation inverse modérée",
  scenarioPrimary: "Consolidation dans range 103.50 – 106.00 avant NFP",
  scenarioAlternate: "Cassure haussière si ISM/NFP surprend à la hausse",
};

export const CALENDAR = [
  { date: "3 juin", time: "14:45", country: "US", flag: "🇺🇸", event: "PMI Services final (mai)", consensus: "53.8", prev: "51.6", importance: 3 as 1|2|3, impact: "USD, indices US" },
  { date: "4 juin", time: "14:00", country: "US", flag: "🇺🇸", event: "JOLTS (avr.)", consensus: "7.15M", prev: "7.19M", importance: 2 as 1|2|3, impact: "USD modéré" },
  { date: "5 juin", time: "14:30", country: "US", flag: "🇺🇸", event: "Initial Jobless Claims", consensus: "220k", prev: "218k", importance: 2 as 1|2|3, impact: "USD, indices" },
  { date: "6 juin", time: "14:30", country: "US", flag: "🇺🇸", event: "NFP (mai)", consensus: "+185k", prev: "+177k", importance: 3 as 1|2|3, impact: "TRÈS FORT — USD, EURUSD, indices, taux" },
  { date: "6 juin", time: "14:30", country: "US", flag: "🇺🇸", event: "Taux chômage (mai)", consensus: "4.1%", prev: "4.1%", importance: 3 as 1|2|3, impact: "Fort — USD, taux" },
  { date: "6 juin", time: "14:30", country: "US", flag: "🇺🇸", event: "Salaires horaires (mai)", consensus: "+0.3%", prev: "+0.2%", importance: 3 as 1|2|3, impact: "Fort — inflation, Fed" },
  { date: "10 juin", time: "14:30", country: "US", flag: "🇺🇸", event: "CPI (mai)", consensus: "2.7%", prev: "2.8%", importance: 3 as 1|2|3, impact: "TRÈS FORT — EURUSD, indices, taux" },
  { date: "11 juin", time: "14:30", country: "US", flag: "🇺🇸", event: "Core CPI (mai)", consensus: "3.0%", prev: "3.1%", importance: 3 as 1|2|3, impact: "TRÈS FORT — Fed, EURUSD" },
  { date: "17 juin", time: "16:00", country: "US", flag: "🇺🇸", event: "Retail Sales (mai)", consensus: "+0.5%", prev: "+0.1%", importance: 3 as 1|2|3, impact: "Fort — croissance, indices" },
  { date: "18 juin", time: "20:00", country: "US", flag: "🇺🇸", event: "FOMC Décision", consensus: "Statu quo 4.25–4.50%", prev: "4.25–4.50%", importance: 3 as 1|2|3, impact: "EXTRÊME — tous actifs" },
  { date: "25 juin", time: "14:30", country: "US", flag: "🇺🇸", event: "PCE (mai)", consensus: "2.5%", prev: "2.6%", importance: 3 as 1|2|3, impact: "TRÈS FORT — Fed, EURUSD" },
  { date: "25 juin", time: "08:00", country: "FR", flag: "🇫🇷", event: "PIB France Q1 (final)", consensus: "+0.2%", prev: "+0.2%", importance: 1 as 1|2|3, impact: "EUR léger" },
];

export const RISKS = [
  { id: "inflation", name: "Inflation US", level: "Modéré" as RiskLevel, proba: "30%", impact: "Remontée taux, pression indices", assets: ["Nasdaq", "EURUSD"], comment: "Core PCE résiste à 2.8%, services inflationnistes présents", color: "#f59e0b" },
  { id: "recession", name: "Récession US", level: "Modéré" as RiskLevel, proba: "25%", impact: "Effondrement indices, fuite vers dollar", assets: ["Nasdaq", "S&P500", "Dow"], comment: "PIB Q1 à 1.8%, consommation qui ralentit", color: "#f59e0b" },
  { id: "fed-hawkish", name: "Fed Hawkish", level: "Faible" as RiskLevel, proba: "15%", impact: "USD fort, EURUSD baisse, indices corrigent", assets: ["EURUSD", "Nasdaq"], comment: "Données inflation en amélioration graduelle", color: "#22c55e" },
  { id: "geopolitique", name: "Géopolitique", level: "Élevé" as RiskLevel, proba: "40%", impact: "Safe haven USD, pétrole, volatilité", assets: ["DXY", "Or", "Pétrole"], comment: "Tensions Moyen-Orient, guerre commerciale US-Chine", color: "#ef4444" },
  { id: "france", name: "Dette France", level: "Élevé" as RiskLevel, proba: "35%", impact: "Spread OAT-Bund, pression EUR", assets: ["EURUSD", "OAT", "CAC40"], comment: "Déficit 5.4% PIB, instabilité politique chronique", color: "#ef4444" },
  { id: "correction", name: "Correction Actions", level: "Modéré" as RiskLevel, proba: "30%", impact: "S&P500 -5 à -10%, risk-off", assets: ["S&P500", "Nasdaq"], comment: "Valorisations élevées, P/E Nasdaq 28x", color: "#f59e0b" },
  { id: "dollar", name: "Dollar Fort", level: "Faible" as RiskLevel, proba: "20%", impact: "Pression EM, EURUSD baisse", assets: ["EURUSD", "EM"], comment: "Anticipations de baisse Fed limitent le potentiel dollar", color: "#22c55e" },
  { id: "liquidite", name: "Liquidité", level: "Faible" as RiskLevel, proba: "15%", impact: "Spreads de crédit, volatilité", assets: ["Obligations IG", "HY"], comment: "Conditions financières accommodantes, RRP en baisse", color: "#22c55e" },
];

export const TRADING_PLAN = [
  { asset: "EURUSD", bias: "Neutral" as Bias, setup: "Range trading 1.0780 – 1.0980", catalyst: "NFP 6 juin, CPI 10 juin", invalidation: "< 1.0680 (bearish) ou > 1.1050 (bullish)", confidence: 6, risk: "NFP très fort = dollar spike", comment: "Attendre cassure du range avant position directionnelle" },
  { asset: "Nasdaq 100", bias: "Bullish" as Bias, setup: "Achat sur replis vers 18 800 – 19 000", catalyst: "Continuation IA earnings, FOMC dovish 18 juin", invalidation: "Clôture < 18 200", confidence: 7, risk: "Yields > 4.70%, déception earnings NVDA", comment: "Momentum favorable, IA supercycle intact, rester long les dips" },
  { asset: "Dow Jones", bias: "Neutral" as Bias, setup: "Range 41 000 – 43 000", catalyst: "Données emploi, Retail Sales mai", invalidation: "Cassure < 40 500", confidence: 6, risk: "Cycliques sous pression si PIB déçoit", comment: "Préférer S&P500 ou Nasdaq pour exposition US actions" },
  { asset: "S&P 500", bias: "Bullish" as Bias, setup: "Achat sur correction vers 5 150 – 5 200", catalyst: "CPI favorable, FOMC dovish, breadth positif", invalidation: "Clôture < 4 950", confidence: 7, risk: "Correction valorisations si déception inflation", comment: "Meilleur rapport risque/rendement des indices US" },
  { asset: "DXY", bias: "Neutral" as Bias, setup: "Range 103.50 – 106.00", catalyst: "NFP 6 juin, CPI 10 juin", invalidation: "> 107 (haussier) ou < 102 (baissier)", confidence: 5, risk: "NFP surprise = mouvement > 1% en 30 min", comment: "Éviter positions directionnelles avant NFP vendredi" },
];

export const EXEC_SUMMARY = {
  topFive: [
    "La Fed maintient le statu quo à 4.25–4.50%, avec un consensus marché pour une première baisse en septembre 2026 (probabilité 52% selon CME FedWatch).",
    "La BCE a baissé ses taux de 25pb le 6 juin 2026 à 3.25%, confirmant son cycle d'assouplissement.",
    "Le PIB US Q1 2026 révisé à 1.8% annualisé (vs 2.4% précédemment), signalant un ralentissement mais pas une récession.",
    "L'inflation américaine (Core PCE 2.8%) continue sa désinflation graduelle, mais reste au-dessus de la cible Fed.",
    "Les risques géopolitiques et la situation budgétaire française maintiennent une pression de fond sur l'euro.",
  ],
  catalysts: [
    "NFP mai (6 juin) — événement pivot de la semaine",
    "FOMC 18 juin — communication cruciale sur le timing des baisses",
    "CPI mai (10 juin) — validation ou remise en cause de la désinflation",
    "Earnings Nvidia conférence stratégique IA (12 juin)",
  ],
  risks: [
    "Surprise haussière NFP → dollar spike, correction indices",
    "Instabilité politique française → spread OAT-Bund, pression EUR",
    "Conflit commercial US-Chine escalade → risk-off global",
    "Core PCE résiste → Fed hawkish, yields remontent",
  ],
  opportunities: [
    "Long Nasdaq sur replis si conditions financières restent accommodantes",
    "EURUSD range trading en attendant les catalyseurs majeurs",
    "Long S&P500 si CPI et NFP en ligne ou meilleurs qu'attendus",
    "Exposition prudente Europe si BCE confirme cycle baissier",
  ],
  globalBias: "Neutre à légèrement haussier sur actions US (Nasdaq > S&P500 > Dow). Neutre EURUSD. Prudent sur Europe / France.",
  finalScores: { us: 5.8, europe: 4.2, france: 3.8, eurusd: 4.8, nasdaq: 6.4, dow: 5.5, sp500: 6.1 },
};

export function getBiasColor(bias: Bias): string {
  if (bias === "Bullish") return "#22c55e";
  if (bias === "Bearish") return "#ef4444";
  return "#94a3b8";
}

export function getRiskColor(level: RiskLevel): string {
  if (level === "Critique") return "#ef4444";
  if (level === "Élevé") return "#f97316";
  if (level === "Modéré") return "#f59e0b";
  return "#22c55e";
}

export function getScoreColor(value: number): string {
  if (value >= 6.5) return "#22c55e";
  if (value >= 4.5) return "#f59e0b";
  return "#ef4444";
}
