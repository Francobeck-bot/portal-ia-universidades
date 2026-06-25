"use client";

import { useState } from "react";
import Link from "next/link";
import type { LiteracyItem, Tool } from "@/lib/sheets";

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

export default function AprenderClient({ items, tools }: { items: LiteracyItem[]; tools: Tool[] }) {
  const isPriority = (t: Tool) =>
    t.esforco !== undefined && t.impacto !== undefined
    && t.esforco <= 2.5 && t.impacto >= 3.25;

  const priorityTools = tools
    .filter(t => isPriority(t) || t.nome.toLowerCase().includes("chatgpt"))
    .sort((a, b) => {
      const scoreA = (a.impacto ?? 0) - (a.esforco ?? 5);
      const scoreB = (b.impacto ?? 0) - (b.esforco ?? 5);
      return scoreB - scoreA;
    });
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

      {/* ── Opção A: ganchos para Cursos, Ferramentas e Exemplos ── */}
      {choice === "confident" && (
        <section style={{ background: "var(--bg)", borderBottom: "1px solid var(--hairline)" }}>
          <div className="container-wide" style={{ padding: "64px 32px" }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Próximos passos</span>
            <h3 className="display-tight" style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.05, marginBottom: 40 }}>
              Por onde você quer ir?
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}
                 className="confident-grid">
              {[
                {
                  href: "/cursos",
                  num: "01",
                  title: "Cursos",
                  desc: "Cursos por nível, de introdutórios a avançados, para continuar evoluindo no uso de IA.",
                  cta: "Ver Cursos",
                },
                {
                  href: "/ferramentas",
                  num: "02",
                  title: "Ferramentas",
                  desc: "Catálogo curado de ferramentas recomendadas por Harvard, MIT, Imperial e outras universidades.",
                  cta: "Ver Ferramentas",
                },
                {
                  href: "/exemplos",
                  num: "03",
                  title: "Exemplos de Uso",
                  desc: "Casos práticos reais com instruções de como implementar IA na sua disciplina hoje.",
                  cta: "Ver Exemplos",
                },
              ].map(item => (
                <Link key={item.href} href={item.href} style={{
                  display: "flex", flexDirection: "column", gap: 12,
                  padding: "28px 24px",
                  background: "var(--surface)",
                  border: "1px solid var(--hairline)",
                  borderRadius: 10,
                  textDecoration: "none", color: "var(--ink)",
                  transition: "border-color 180ms ease, box-shadow 180ms ease",
                }} className="confident-card">
                  <span className="num-eyebrow">{item.num}</span>
                  <h4 className="display" style={{ fontSize: 24, lineHeight: 1.1, fontWeight: 400 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--muted)", flex: 1 }}>
                    {item.desc}
                  </p>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, marginTop: 4 }}>
                    {item.cta} <Arrow />
                  </span>
                </Link>
              ))}
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

            {priorityTools.length > 0 && (
              <div style={{ marginTop: 64 }}>
                <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Por onde começar</span>
                <h3 className="display-tight" style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.05, marginBottom: 8 }}>
                  Ferramentas recomendadas para começar
                </h3>
                <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 32, lineHeight: 1.6 }}>
                  Selecionadas com base na nossa matriz esforço-impacto: alto retorno com pouca curva de aprendizado.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}
                     className="priority-tools-grid">
                  {priorityTools.map(tool => {
                    const isP = isPriority(tool);
                    const badge = isP
                      ? { bg: "#D1FAE5", fg: "#065F46", label: "Prioridade" }
                      : { bg: "#DBEAFE", fg: "#1E40AF", label: "Recomendada" };
                    return (
                      <Link key={tool.nome}
                         href={`/ferramentas?tool=${encodeURIComponent(tool.nome)}`}
                         style={{
                           display: "flex", flexDirection: "column", gap: 10,
                           padding: "24px 22px",
                           background: "var(--surface)",
                           border: "1px solid var(--hairline)",
                           borderRadius: 10,
                           textDecoration: "none", color: "var(--ink)",
                           transition: "border-color 180ms ease, box-shadow 180ms ease",
                         }} className="priority-tool-card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                          <h4 className="display" style={{ fontSize: 20, lineHeight: 1.1, fontWeight: 400 }}>
                            {tool.nome}
                          </h4>
                          <span style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                            background: badge.bg, color: badge.fg,
                            padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap", flexShrink: 0,
                          }}>
                            {badge.label}
                          </span>
                        </div>
                        <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--muted)", flex: 1 }}>
                          {tool.descricao}
                        </p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                          <span style={{ fontSize: 12, color: "var(--muted-soft)" }}>{tool.custo}</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600 }}>
                            Saiba mais <Arrow />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            <div style={{ marginTop: 48, padding: "32px 28px", background: "var(--charcoal)", borderRadius: 10, maxWidth: 640 }}>
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
        .confident-card:hover { border-color: var(--ink) !important; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .priority-tool-card:hover { border-color: var(--ink) !important; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        @media (max-width: 640px) {
          .aprender-options-grid { grid-template-columns: 1fr !important; }
          .confident-grid { grid-template-columns: 1fr !important; }
          .priority-tools-grid {
            display: flex !important;
            overflow-x: auto !important;
            flex-wrap: nowrap !important;
            margin-left: -23px !important;
            margin-right: -23px !important;
            padding-left: 23px !important;
            padding-right: 0 !important;
            scrollbar-width: none !important;
          }
          .priority-tools-grid::-webkit-scrollbar { display: none; }
          .priority-tools-grid > a {
            min-width: 80vw !important;
            max-width: 80vw !important;
            flex-shrink: 0 !important;
          }
          .priority-tools-grid > a:last-child { margin-right: 23px; }
        }
      `}</style>
    </div>
  );
}
