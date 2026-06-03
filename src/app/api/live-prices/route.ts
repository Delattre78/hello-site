import { NextResponse } from "next/server";

const symbols = [
  "IXIC", "SPX", "DJI", "DXY", "EUR/USD", "BTC/USD"
];

export async function GET() {
  const key = process.env.TWELVE_DATA_API_KEY;

  if (!key) {
    return NextResponse.json({ error: "Missing TWELVE_DATA_API_KEY" }, { status: 500 });
  }

  const url = `https://api.twelvedata.com/quote?symbol=${symbols.join(",")}&apikey=${key}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  const data = await res.json();

  return NextResponse.json({
    updatedAt: new Date().toISOString(),
    data
  });
}
