import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const scriptUrl = process.env.FEEDBACK_SCRIPT_URL?.trim();

  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!scriptUrl) {
    console.warn("[Feedback] FEEDBACK_SCRIPT_URL não configurada. Dados recebidos:", body);
    return NextResponse.json({ ok: true });
  }

  try {
    const payload = {
      ...body,
      timestamp: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      pagina: req.headers.get("referer") ?? "",
    };

    // Google Apps Script redireciona POSTs — usar Content-Type text/plain
    // evita o problema do redirect POST→GET no Node.js fetch
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const responseText = await res.text().catch(() => "");
    console.log("[Feedback] GAS status:", res.status, "| resposta:", responseText.slice(0, 150));

    if (!res.ok) throw new Error(`GAS retornou status ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Feedback] Erro ao enviar:", err);
    return NextResponse.json({ ok: false, error: "Submit failed" }, { status: 500 });
  }
}
