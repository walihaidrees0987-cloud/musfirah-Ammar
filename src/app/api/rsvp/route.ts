import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const text = await request.text();
    if (text.length > 4000) return NextResponse.json({ error: "Réponse trop longue." }, { status: 413 });
    let data;
    try { data = JSON.parse(text); } catch { return NextResponse.json({ error: "Réponse invalide." }, { status: 400 }); }
    const guests = Number(data?.guests);
    if (!data || typeof data.name !== "string" || !data.name.trim() || data.name.length > 150 || !Number.isInteger(guests) || guests < 1 || guests > 20 || !["yes", "no"].includes(data.attendance)) return NextResponse.json({ error: "Veuillez vérifier les informations." }, { status: 400 });
    const directory = path.join(process.cwd(), ".data");
    await mkdir(directory, { recursive: true });
    await appendFile(path.join(directory, "rsvps.ndjson"), JSON.stringify({ name: data.name.trim(), guests, attendance: data.attendance, receivedAt: new Date().toISOString() }) + "\n", "utf8");
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Impossible d’enregistrer votre réponse." }, { status: 500 }); }
}
