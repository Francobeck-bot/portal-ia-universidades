import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const scriptUrl = process.env.FEEDBACK_SCRIPT_URL;

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // If no script URL configured yet, log and return OK so the UI still works
  if (!scriptUrl || scriptUrl.includes("SEU_ID") || scriptUrl.trim() === "") {
    console.log("[Feedback - not configured]", body);
    return NextResponse.json({ ok: true });
  }

  try {
    const payload = {
      ...body,
      timestamp: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      pagina: req.headers.get("referer") ?? "",
    };

    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`Apps Script returned ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Feedback] Error sending to Apps Script:", err);
    return NextResponse.json({ ok: false, error: "Submit failed" }, { status: 500 });
  }
}
