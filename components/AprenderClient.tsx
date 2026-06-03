"use client";

import { useState } from "react";
import Link from "next/link";
import type { LiteracyItem } from "@/lib/sheets";

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

const CARD_ACCENTS = [
  { bar: "#3B82F6", num: "#DBEAFE", numFg: "#1E40AF" }, // azul
  { bar: "#059669", num: "#D1FAE5", numFg: "#065F46" }, // verde
  { bar: "#7C3AED", num: "#EDE9FE", numFg: "#5B21B6" }, // violeta
  { bar: "#D97706", num: "#FEF3C7", numFg: "#92400E" }, // âmbar
];

export default function AprenderClient({ items }: { items: LiteracyItem[] }) {
  const [choice, setChoice] = useState<"confident" | "learning" | null>(null);

  return (
    <div>
      {/* ── Pergunta ── */}
      <section style={{ background: "var(--surface)", borderBottom: "1px solid var(--hairline)" }}>
        <div className="container-wide" style={{ padding: "72px 32px 64px" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Antes de começar</span>
          <h2 className="display-tight" style={{
            fontSize: "clamp(28px, 3.6vw, 48px)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
            maxWidth: 680, marginBottom: 48,
          }}>
            Qual é o seu perfil com Inteligência Artificial?
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 860 }}
               className="aprender-options-grid">

            {/* Opção A — já usa com confiança */}
            <button
              onClick={() => setChoice("confident")}
              style={{
                textAlign: "left", padding: "32px 28px",
                background: choice === "confident" ? "var(--charcoal)" : "var(--bg)",
                color: choice === "confident" ? "#fff" : "var(--ink)",
                border: `2px solid ${choice === "confident" ? "var(--charcoal)" : "var(--hairline)"}`,
                borderRadius: 10, cursor: "pointer",
                transition: "all 200ms ease",
                fontFamily: "var(--body)",
              }}
            >
              <p style={{
                fontFamily: "var(--display)", fontSize: "clamp(18px, 2.2vw, 26px)",
                lineHeight: 1.15, fontWeight: 400,
                color: choice === "confident" ? "#fff" : "var(--ink)",
                marginBottom: 10,
              }}>
                Já uso IA no meu dia a dia com confiança
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: choice === "confident" ? "rgba(255,255,255,0.65)" : "var(--muted)" }}>
                Tenho familiaridade com ferramentas de IA e quero explorar cursos mais avançados.
              </p>
            </button>

            {/* Opção B — ainda tem dúvidas */}
            <button
              onClick={() => setChoice("learning")}
              style={{
                textAlign: "left", padding: "32px 28px",
                background: choice === "learning" ? "var(--charcoal)" : "var(--bg)",
                color: choice === "learning" ? "#fff" : "var(--ink)",
                border: `2px solid ${choice === "learning" ? "var(--charcoal)" : "var(--hairline)"}`,
                borderRadius: 10, cursor: "pointer",
                transition: "all 200ms ease",
                fontFamily: "var(--body)",
              }}
            >
              <p style={{
                fontFamily: "var(--display)", fontSize: "clamp(18px, 2.2vw, 26px)",
                lineHeight: 1.15, fontWeight: 400,
                color: choice === "learning" ? "#fff" : "var(--ink)",
                marginBottom: 10,
              }}>
                Ainda tenho dúvidas ou nunca usei
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: choice === "learning" ? "rgba(255,255,255,0.65)" : "var(--muted)" }}>
                Quero entender o básico antes de escolher ferramentas ou cursos.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* ── Opção A: ir para Cursos ── */}
      {choice === "confident" && (
        <section style={{ background: "var(--bg)", borderBottom: "1px solid var(--hairline)" }}>
          <div className="container-wide" style={{ padding: "64px 32px" }}>
            <div style={{ maxWidth: 560 }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Próximo passo</span>
              <h3 className="display-tight" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05, marginBottom: 16 }}>
                Explore os cursos disponíveis
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--muted)", marginBottom: 28 }}>
                Separamos cursos por nível, de introdutórios a avançados, para você continuar evoluindo no uso de IA.
              </p>
              <Link href="/cursos" className="btn-primary" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "var(--ink)", color: "#fff", border: "none",
                borderRadius: "var(--radius)", padding: "14px 22px", cursor: "pointer",
                fontSize: 14, fontWeight: 500, fontFamily: "var(--body)",
                textDecoration: "none",
              }}>
                Ver Cursos <Arrow />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Opção B: conteúdo de letramento ── */}
      {choice === "learning" && (
        <section style={{ background: "var(--bg)" }}>
          <div className="container-wide" style={{ padding: "64px 32px 96px" }}>
            <div style={{ marginBottom: 48, maxWidth: 640 }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Letramento em IA</span>
              <h3 className="display-tight" style={{ fontSize: "clamp(28px, 3.6vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 14 }}>
                O essencial para começar
              </h3>
              <p className="lead" style={{ color: "var(--muted)" }}>
                Entenda os conceitos fundamentais antes de usar qualquer ferramenta.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
              {items.map((item, i) => {
                const accent = CARD_ACCENTS[i % CARD_ACCENTS.length];
                return (
                  <div key={i} style={{
                    background: "var(--surface)",
                    border: "1px solid var(--hairline)",
                    borderRadius: 10, overflow: "hidden",
                    display: "flex", flexDirection: "column",
                  }}>
                    {/* Barra colorida no topo */}
                    <div style={{ height: 4, background: accent.bar }} />

                    <div style={{ padding: "22px 24px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                      {/* Número */}
                      <span style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        width: 28, height: 28, borderRadius: 6,
                        background: accent.num, color: accent.numFg,
                        fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <h4 style={{
                        fontFamily: "var(--display)", fontSize: 22,
                        letterSpacing: "-0.01em", lineHeight: 1.1, fontWeight: 400,
                        color: "var(--ink)",
                      }}>
                        {item.titulo}
                      </h4>
                      <p style={{ fontSize: 14, lineHeight: 1.65, color: "var(--muted)", whiteSpace: "pre-line" }}>
                        {item.descricao}
                      </p>
                      {item.subtopicos?.trim() && (
                        <div style={{ marginTop: 4, display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {item.subtopicos.split(",").map(s => s.trim()).filter(Boolean).map(sub => (
                            <span key={sub} style={{
                              fontSize: 11, padding: "2px 8px",
                              background: "var(--bg)", border: "1px solid var(--hairline)",
                              borderRadius: 6, color: "var(--ink-soft)",
                            }}>{sub}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 64, padding: "32px 28px", background: "var(--charcoal)", borderRadius: 10, maxWidth: 640 }}>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                Próximo passo
              </p>
              <h4 className="display" style={{ fontSize: 22, color: "#fff", marginBottom: 10 }}>
                Pronto para dar o próximo passo?
              </h4>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 20, lineHeight: 1.6 }}>
                Agora que você entende o básico, explore os cursos que separamos por nível.
              </p>
              <Link href="/cursos" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 13, fontWeight: 600, color: "#fff",
                borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 2,
                textDecoration: "none",
              }}>
                Ver Cursos <Arrow />
              </Link>
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 640px) {
          .aprender-options-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
