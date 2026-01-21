export const runtime = "nodejs";

function mustGet(name: string) {
  const v = process.env[name];
  if (!v) throw new Error("Missing env var: " + name);
  return v;
}

export async function POST(req: Request) {
  const token = mustGet("TELEGRAM_BOT_TOKEN");
  const chatId = mustGet("TELEGRAM_CHAT_ID");

  let path = "/";
  try {
    const body = await req.json();
    if (body && typeof body.path === "string") path = body.path;
  } catch {}

  const text = "👀 Visite sur le site: " + path + " — " + new Date().toISOString();

  const url = "https://api.telegram.org/bot" + token + "/sendMessage";
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json" },
  });
}
