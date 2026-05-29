"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";

const TIPOS = [
  "Sugerir uma ferramenta",
  "Erro no conteúdo",
  "Melhoria no site",
  "Outro",
];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "8px 10px",
  border: "1px solid var(--hairline)",
  borderRadius: "var(--radius)",
  fontSize: 13, fontFamily: "var(--body)",
  color: "var(--ink)", background: "var(--bg)",
  outline: "none", boxSizing: "border-box",
};

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [form, setForm] = useState({ nome: "", email: "", tipo: TIPOS[0], mensagem: "" });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setTimeout(() => {
        setStatus("idle");
        setOpen(false);
        setForm({ nome: "", email: "", tipo: TIPOS[0], mensagem: "" });
      }, 2800);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(v => !v)}
        title="Enviar sugestão"
        className="feedback-fab"
        style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 900,
          width: 50, height: 50, borderRadius: "50%",
          background: "var(--charcoal)", color: "#fff",
          border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
          transition: "transform 160ms ease, box-shadow 160ms ease",
        }}
      >
        {open ? (
          <X size={20} />
        ) : (
          /* Chat bubble icon */
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="9" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="9" y1="13" x2="13" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* ── Form panel ── */}
      {open && (
        <div className="feedback-panel" style={{
          position: "fixed", bottom: 90, right: 28, zIndex: 899,
          width: 340,
          background: "var(--surface)",
          borderRadius: 12,
          boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
          border: "1px solid var(--hairline)",
          overflow: "hidden",
          animation: "feedback-in 200ms ease",
        }}>
          {/* Header */}
          <div style={{
            padding: "14px 18px",
            background: "var(--charcoal)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>
              Enviar sugestão
            </p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.02em" }}>
              Seu feedback vai direto para a COMGRAD
            </p>
          </div>

          {/* Success state */}
          {status === "done" ? (
            <div style={{ padding: "36px 20px", textAlign: "center" }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "#ECFDF5",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 14px",
              }}>
                <Check size={22} color="#059669" />
              </div>
              <p style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginBottom: 5 }}>
                Sugestão enviada!
              </p>
              <p style={{ fontSize: 13, color: "var(--muted)" }}>
                Obrigado pela contribuição.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              padding: "16px 18px 18px",
              display: "flex", flexDirection: "column", gap: 11,
            }}>
              {/* Nome + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                    Nome
                  </label>
                  <input required value={form.nome} onChange={set("nome")} placeholder="Seu nome" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                    Email
                  </label>
                  <input type="email" required value={form.email} onChange={set("email")} placeholder="seu@email.com" style={inputStyle} />
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                  Tipo de sugestão
                </label>
                <select value={form.tipo} onChange={set("tipo")} style={{ ...inputStyle, appearance: "auto" }}>
                  {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Mensagem */}
              <div>
                <label style={{ display: "block", fontSize: 10, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                  Sugestão
                </label>
                <textarea
                  required
                  value={form.mensagem}
                  onChange={set("mensagem")}
                  placeholder="Descreva sua sugestão..."
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", lineHeight: 1.55 }}
                />
              </div>

              {status === "error" && (
                <p style={{ fontSize: 12, color: "#E11D48", margin: 0 }}>
                  Erro ao enviar. Tente novamente.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  background: "var(--ink)", color: "#fff", border: 0,
                  borderRadius: "var(--radius)",
                  padding: "11px 18px",
                  cursor: status === "sending" ? "wait" : "pointer",
                  fontSize: 13, fontWeight: 600, fontFamily: "var(--body)",
                  opacity: status === "sending" ? 0.7 : 1,
                  transition: "opacity 160ms ease",
                }}
              >
                {status === "sending" ? "Enviando…" : "Enviar sugestão"}
              </button>
            </form>
          )}
        </div>
      )}

      <style>{`
        .feedback-fab:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(0,0,0,0.32) !important; }
        @keyframes feedback-in {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 640px) {
          .feedback-panel { width: calc(100vw - 32px) !important; right: 16px !important; bottom: 84px !important; }
          .feedback-fab   { bottom: 20px !important; right: 20px !important; }
        }
      `}</style>
    </>
  );
}
