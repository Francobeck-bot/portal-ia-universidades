export const dynamic = "force-dynamic";

import Link from "next/link";
import { fetchCourses } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";
import type { Course } from "@/lib/sheets";

const LEVELS = ["Iniciante", "Intermediário", "Avançado"] as const;

const LEVEL_META: Record<string, { color: string; bg: string; desc: string }> = {
  "Iniciante":      { color: "#065F46", bg: "#D1FAE5", desc: "Sem pré-requisitos. Ideal para quem está começando agora." },
  "Intermediário":  { color: "#1E40AF", bg: "#DBEAFE", desc: "Alguma familiaridade com IA recomendada." },
  "Avançado":       { color: "#6B21A8", bg: "#EDE9FE", desc: "Para quem quer entender a fundo como a tecnologia funciona." },
};

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 12L12 2M12 2H5.5M12 2V8.5"
        stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GratisTag({ gratuito }: { gratuito?: string }) {
  if (!gratuito?.trim()) return null;
  const colors =
    gratuito === "Sim"     ? { bg: "#D1FAE5", fg: "#065F46" } :
    gratuito === "Parcial" ? { bg: "#FEF3C7", fg: "#92400E" } :
                             { bg: "#FEE2E2", fg: "#991B1B" };
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: "2px 7px",
      borderRadius: 6, letterSpacing: "0.04em", textTransform: "uppercase",
      background: colors.bg, color: colors.fg,
    }}>
      {gratuito === "Sim" ? "Gratuito" : gratuito === "Parcial" ? "Parcial" : "Pago"}
    </span>
  );
}

export default async function CursosPage() {
  const courses = await fetchCourses(SHEETS_CONFIG.coursesSheetUrl);

  const byLevel = LEVELS.reduce<Record<string, Course[]>>((acc, lvl) => {
    acc[lvl] = courses.filter(c => c.nivel?.trim().toLowerCase() === lvl.toLowerCase());
    return acc;
  }, {});

  return (
    <main style={{ background: "var(--bg)" }}>

      {/* ── Hero ── */}
      <section style={{
        backgroundImage: "linear-gradient(180deg, rgba(8,18,32,0.45) 0%, rgba(8,18,32,0.85) 100%), url(/hero-bg.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
        color: "var(--on-dark)",
      }}>
        <div className="container-wide" style={{ padding: "72px 32px 80px" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: 24, color: "rgba(255,255,255,0.55)" }}>
            {courses.length} cursos · Iniciante ao Avançado
          </span>
          <h1 className="display-tight" style={{
            fontSize: "clamp(44px, 5.6vw, 84px)",
            lineHeight: 1.02, letterSpacing: "-0.02em",
            maxWidth: 900, color: "#fff",
          }}>
            Cursos de IA para Educadores
          </h1>
          <p className="lead" style={{ maxWidth: 600, marginTop: 32, color: "rgba(255,255,255,0.72)" }}>
            Uma seleção curada de cursos online, de introdutórios a avançados,
            para quem quer entender e usar IA com mais profundidade.
          </p>
        </div>
      </section>

      {/* ── Cursos por nível ── */}
      <div className="container-wide" style={{ padding: "48px 32px 96px" }}>
        {LEVELS.map((level, li) => {
          const list = byLevel[level];
          const meta = LEVEL_META[level];
          if (list.length === 0) return null;
          return (
            <section key={level} style={{ marginBottom: li < LEVELS.length - 1 ? 40 : 0 }}>
              {/* Level header */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                paddingBottom: 16, marginBottom: 28,
                borderBottom: `2px solid ${meta.color}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: meta.color,
                    background: meta.bg, padding: "4px 10px", borderRadius: 6,
                  }}>
                    {level}
                  </span>
                  <h2 className="display" style={{ fontSize: "clamp(22px, 2.8vw, 32px)", letterSpacing: "-0.01em", fontWeight: 400 }}>
                    {level === "Iniciante" ? "Começando do zero" :
                     level === "Intermediário" ? "Aprofundando o conhecimento" :
                     "Entendendo a fundo"}
                  </h2>
                </div>
                <span className="num-eyebrow" style={{ color: "var(--muted-soft)", whiteSpace: "nowrap" }}>
                  {list.length} {list.length === 1 ? "curso" : "cursos"}
                </span>
              </div>
              <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 28, marginTop: -16 }}>
                {meta.desc}
              </p>

              {/* Cards */}
              <div style={{
                display: "flex",
                overflowX: "auto",
                gap: 20,
                paddingBottom: 12,
              }} className="cursos-cards-grid">
                {list.map((course, ci) => (
                  <div key={ci} style={{ minWidth: 300, maxWidth: 300, flex: "0 0 auto", display: "flex", flexDirection: "column" }}>
                  <div style={{
                    background: "var(--surface)",
                    border: "1px solid var(--hairline)",
                    borderRadius: 10, overflow: "hidden",
                    display: "flex", flexDirection: "column",
                    height: "100%",
                  }}>
                    {/* Colored top bar */}
                    <div style={{ height: 4, background: meta.color }} />

                    <div style={{ padding: "22px 22px 16px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                      {/* Tags */}
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                        <GratisTag gratuito={course.gratuito} />
                        {course.duracao?.trim() && (
                          <span className="num-eyebrow" style={{ fontSize: 10 }}>{course.duracao}</span>
                        )}
                      </div>

                      {/* Name */}
                      <h3 style={{
                        fontFamily: "var(--display)", fontSize: 22,
                        letterSpacing: "-0.01em", lineHeight: 1.15, fontWeight: 400,
                        color: "var(--ink)",
                      }}>
                        {course.nome}
                      </h3>

                      {/* Platform */}
                      {course.plataforma?.trim() && (
                        <span className="eyebrow" style={{ fontSize: 10 }}>{course.plataforma}</span>
                      )}

                      {/* Description */}
                      <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--muted)", flex: 1 }}>
                        {course.descricao}
                      </p>
                    </div>

                    {/* Footer */}
                    <div style={{ padding: "13px 22px", borderTop: "1px solid var(--hairline-soft)" }}>
                      <a
                        href={course.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 13, fontWeight: 600,
                          color: meta.color,
                          display: "inline-flex", alignItems: "center", gap: 7,
                          textDecoration: "none", transition: "gap 160ms ease",
                        }}
                        className="curso-link"
                      >
                        Acessar curso <Arrow />
                      </a>
                    </div>
                  </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA Aprender IA */}
        <div style={{
          marginTop: 72, padding: "40px 36px",
          background: "var(--charcoal)", borderRadius: 10,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <p className="eyebrow" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Não sabe por onde começar?</p>
            <h3 className="display" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", color: "#fff", fontWeight: 400 }}>
              Descubra seu perfil com IA
            </h3>
          </div>
          <Link href="/aprender" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#fff", color: "var(--charcoal)",
            padding: "13px 22px", borderRadius: "var(--radius)",
            fontSize: 14, fontWeight: 600, textDecoration: "none",
            whiteSpace: "nowrap",
          }}>
            Aprender IA <Arrow />
          </Link>
        </div>
      </div>

      <style>{`
        .curso-link:hover { gap: 11px !important; }
        .cursos-cards-grid { align-items: stretch; }
        .cursos-cards-grid > div { display: flex; flex-direction: column; }
        @media (max-width: 640px) {
          .cursos-cards-grid {
            margin-left: -23px !important;
            margin-right: -23px !important;
            padding-left: 23px !important;
            padding-right: 0 !important;
            scrollbar-width: none !important;
          }
          .cursos-cards-grid::-webkit-scrollbar { display: none; }
          .cursos-cards-grid > div {
            min-width: 80vw !important;
            max-width: 80vw !important;
          }
          .cursos-cards-grid > div:last-child { padding-right: 23px; }
        }
      `}</style>
    </main>
  );
}
