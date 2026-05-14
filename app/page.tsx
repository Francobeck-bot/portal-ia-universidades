export const dynamic = "force-dynamic";

import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { fetchTools, fetchExamples } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";

const stats = [
  { value: "2×",      label: "mais aprendizagem",        source: "Harvard · 2025",
    detail: "Tutor IA (PS2 Pal) gerou o dobro de aprendizagem em estudo controlado com 194 alunos de Física. O maior ganho já medido em comparação com aula ativa tradicional.",
    refLink: "/referencias#ref-11" },
  { value: "75–97%",  label: "de precisão nas respostas", source: "Georgia Tech · Jill Watson",
    detail: "Assistente virtual Jill Watson responde dúvidas dos alunos 24/7 com precisão de 75 a 97%. Estudantes passaram semanas sem perceber que não era humana.",
    refLink: "/referencias#ref-21" },
  { value: "Simulação", label: "de pacientes com IA",    source: "NUS · Singapura",
    detail: "Chatbot simula pacientes para estudantes de saúde praticarem anamnese e diagnóstico antes de situações reais. Usado amplamente desde 2020.",
    refLink: "/referencias#ref-42" },
];

export default async function HomePage() {
  const [tools, examples] = await Promise.all([
    fetchTools(SHEETS_CONFIG.toolsSheetUrl),
    fetchExamples(SHEETS_CONFIG.examplesSheetUrl),
  ]);

  const pages = [
    { href: "/diretrizes",  n: "01", label: "Diretrizes",
      desc: "5 princípios para uso responsável e 3 modelos prontos de política de IA para o syllabus.",
      tag: "Para professores" },
    { href: "/ferramentas", n: "02", label: "Ferramentas",
      desc: "Catálogo curado de ferramentas recomendadas por Harvard, MIT, Imperial e outras.",
      tag: `${tools.length} ferramentas` },
    { href: "/exemplos",    n: "03", label: "Exemplos de Uso",
      desc: "Casos práticos reais com instruções de como implementar na sua disciplina hoje.",
      tag: `${examples.length} exemplos` },
  ];

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection />

      {/* ── NAVIGATION CARDS ─────────────────────────────── */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}>
        <div className="container-wide home-section" style={{ padding: "88px 32px" }}>
          <div style={{ marginBottom: 56, maxWidth: 680 }}>
            <span className="eyebrow" style={{ display: "block", marginBottom: 16 }}>O que você encontra aqui</span>
            <h2 className="display-tight" style={{ fontSize: "clamp(36px, 4.4vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.02em", marginBottom: 16 }}>
              Tudo em um só lugar
            </h2>
            <p className="lead" style={{ color: "var(--muted)", maxWidth: 560 }}>
              De diretrizes a ferramentas, de casos práticos a instruções passo a passo. Conteúdo baseado nas melhores universidades do mundo.
            </p>
          </div>

          <div style={{ display: "grid", gap: 0, borderTop: "1px solid var(--hairline)" }}
               className="nav-cards-grid">
            {pages.map((it, i) => (
              <Link
                key={it.href}
                href={it.href}
                style={{
                  textAlign: "left",
                  padding: "36px 28px 36px 0",
                  borderRight: i < 2 ? "1px solid var(--hairline)" : "none",
                  paddingLeft: i > 0 ? 28 : 0,
                  display: "flex", flexDirection: "column", gap: 18,
                  transition: "background 180ms ease",
                }}
                className="nav-card-item"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span className="num-eyebrow" style={{ flexShrink: 0 }}>{it.n}</span>
                  <span className="num-eyebrow" style={{ color: "var(--muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginLeft: 4 }}>{it.tag}</span>
                </div>
                <h3 className="display" style={{ fontSize: "clamp(13px, 4.5vw, 34px)", letterSpacing: "-0.01em", lineHeight: 1 }}>
                  {it.label}
                </h3>
                <p style={{ fontSize: "clamp(9px, 2vw, 15px)", lineHeight: 1.6, color: "var(--muted)", maxWidth: 340 }}>
                  {it.desc}
                </p>
                <span style={{ marginTop: "auto", paddingTop: 24, display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500 }}>
                  Acessar
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section style={{ background: "var(--charcoal)", color: "var(--on-dark)" }}>
        <div className="container-wide home-section-stats" style={{ padding: "88px 32px" }}>
          <div style={{ marginBottom: 56, maxWidth: 680 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span className="eyebrow" style={{ color: "rgba(255,255,255,0.55)" }}>Evidências de universidades globais</span>
            </div>
            <h2 className="display-tight" style={{ fontSize: "clamp(36px, 4.4vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "#fff", marginBottom: 16 }}>
              Por que usar IA no ensino?
            </h2>
            <p className="stats-lead" style={{ fontSize: 18, lineHeight: 1.55, color: "rgba(255,255,255,0.65)", maxWidth: 560 }}>
              Números reais de pesquisas nas melhores universidades, para quem ainda tem dúvidas.
            </p>
          </div>

          <div style={{ display: "grid", gap: 0, borderTop: "1px solid rgba(255,255,255,0.2)" }}
               className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: "40px 28px 40px 0",
                paddingLeft: i > 0 ? 28 : 0,
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.2)" : "none",
                display: "flex", flexDirection: "column", gap: 16, minHeight: 280,
              }}>
                <span className="num-eyebrow" style={{ color: "rgba(255,255,255,0.4)" }}>0{i + 1}</span>
                <div className="display-tight" style={{ fontSize: "clamp(14px, 5vw, 64px)", color: "#fff", lineHeight: 0.95, letterSpacing: "-0.015em" }}>
                  {s.value}
                </div>
                <div className="eyebrow" style={{ color: "rgba(255,255,255,0.55)", marginTop: 4 }}>{s.label}</div>
                <span className="num-eyebrow" style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{s.source}</span>
                <p style={{ fontSize: "clamp(13px, 1.8vw, 14px)", lineHeight: 1.55, color: "rgba(255,255,255,0.78)", marginTop: "auto" }}>
                  {s.detail}
                </p>
                {s.refLink && (
                  <a href={s.refLink} style={{
                    marginTop: 12,
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 11, letterSpacing: "0.04em",
                    color: "rgba(255,255,255,0.35)",
                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                    paddingBottom: 1, textDecoration: "none",
                    fontFamily: "var(--body)",
                  }}>
                    Ver referência ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--hairline)" }}>
        <div className="container-wide cta-container" style={{ padding: "88px 32px" }}>
          <div style={{ display: "grid", borderTop: "1px solid var(--hairline)", paddingTop: 56 }}
               className="cta-grid">
            <div>
              <span className="eyebrow" style={{ display: "block", marginBottom: 20 }}>Comece por aqui</span>
              <h2 className="display-tight" style={{ fontSize: "clamp(20px, 4.8vw, 64px)", lineHeight: 1, letterSpacing: "-0.02em", maxWidth: 520 }}>
                Pronto para começar?
              </h2>
            </div>
            <div style={{ paddingBottom: 8, maxWidth: 460 }}>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--muted)", marginBottom: 28 }}>
                Comece pelas diretrizes, explore as ferramentas e veja como outros professores implementam IA nas disciplinas hoje.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/diretrizes" className="btn-primary">
                  Ler Diretrizes
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                  </svg>
                </Link>
                <Link href="/ferramentas" className="btn-outline">
                  Ver Ferramentas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .nav-card-item:hover { background: #fafbfb; }
      `}</style>
    </div>
  );
}
