export const runtime = "nodejs";

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!name) {
    return new Response(JSON.stringify({ error: "name_required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // "Score du jour" = dépend du prénom + de la date (change chaque jour)
  const today = new Date();
  const y = today.getUTCFullYear();
  const m = String(today.getUTCMonth() + 1).padStart(2, "0");
  const d = String(today.getUTCDate()).padStart(2, "0");
  const dayKey = `${y}-${m}-${d}`;

  const h = hashString((name.toLowerCase() + "|" + dayKey).normalize("NFKD"));
  const score = (h % 101); // 0..100

  const labels = [
    "chance",
    "charisme",
    "discipline",
    "énergie",
    "aura",
    "focus",
    "confiance",
  ];
  const label = labels[h % labels.length];

  const title = `Ton score ${label} du jour`;
  const message =
    score >= 85 ? "🔥 Tu es en mode MONSTRE aujourd’hui." :
    score >= 65 ? "✅ Solide. Tu peux tout prendre." :
    score >= 45 ? "😐 Moyen. Fais simple et efficace." :
    "🧊 Journée froide. Reste discret et régulier.";

  return new Response(
    JSON.stringify({ dayKey, name, score, label, title, message }),
    { headers: { "content-type": "application/json" } }
  );
}
