export const dynamic = "force-dynamic";

import { fetchPrinciples, fetchSyllabus } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";
import SyllabusCard from "@/components/SyllabusCard";
import PrincipleCard from "@/components/PrincipleCard";

const worldPolicies = [
  { n: "01", uni: "Harvard University", year: "2024", stance: "Permissiva com declaração",
    note: 'Adota framework de "disclosure obrigatório" — uso é permitido em quase toda situação, desde que declarado com prompt e ferramenta.' },
  { n: "02", uni: "MIT", year: "2024", stance: "Caso a caso por curso",
    note: "Política definida pelo docente em cada disciplina. Rejeita detectores de IA como evidência em processos disciplinares." },
  { n: "03", uni: "Stanford", year: "2023", stance: "Integrada ao syllabus",
    note: "Exige que todo plano de ensino inclua seção sobre IA. Oferece três templates institucionais análogos aos adotados aqui." },
  { n: "04", uni: "University of Toronto", year: "2024", stance: "Contra detectores",
    note: "Rejeita formalmente Turnitin AI e GPTZero. Investe em redesenho de avaliações com evidência de processo." },
];

export default async function DiretrizesPage() {
  const [principles, syllabusModels] = await Promise.all([
    fetchPrinciples(SHEETS_CONFIG.principlesSheetUrl),
    fetchSyllabus(SHEETS_CONFIG.syllabusSheetUrl),
  ]);

  return (
    <main style={{ background: "var(--bg)" }}>

      {/* ── Page header ── */}
      <section style={{
        backgroundImage: "linear-gradient(180deg, rgba(8,18,32,0.45) 0%, rgba(8,18,32,0.85) 100%), url(/hero-bg.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
        color: "var(--on-dark)",
      }}>
        <div className="container-wide" style={{ padding: "88px 32px 96px" }}>
          <h1 className="display-tight" style={{ fontSize: "clamp(44px, 5.6vw, 84px)", lineHeight: 1.02, letterSpacing: "-0.02em", maxWidth: 1100, color: "#fff" }}>
            Diretrizes para Uso Responsável de IA
          </h1>
          <p className="lead" style={{ maxWidth: 680, marginTop: 32, color: "rgba(255,255,255,0.72)" }}>
            O uso de IA no ensino superior não é uma questão de ser a favor ou contra. É uma questão de como fazer de forma que realmente beneficie o aprendizado.
          </p>
        </div>
      </section>

      {/* ── 01 · Princípios ── */}
      <section>
        <div className="container-wide" style={{ padding: "80px 32px 64px" }}>
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <span className="num-eyebrow" style={{ display: "block", marginBottom: 14, fontSize: 13 }}>01</span>
            <h2 className="display-tight" style={{ fontSize: "clamp(30px, 3.4vw, 44px)", letterSpacing: "-0.015em", lineHeight: 1.08, marginBottom: 12 }}>
              Princípios para uso responsável de IA no ensino
            </h2>
            <p className="lead" style={{ color: "var(--muted)" }}>
              Cinco princípios baseados no que as melhores universidades do mundo praticam e recomendam.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {principles.map((p, i) => (
              <PrincipleCard key={i} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 · Modelos de política ── */}
      <section>
        <div className="container-wide" style={{ padding: "80px 32px 64px" }}>
          <div style={{ marginBottom: 40, maxWidth: 760 }}>
            <span className="num-eyebrow" style={{ display: "block", marginBottom: 14, fontSize: 13 }}>02</span>
            <h2 className="display-tight" style={{ fontSize: "clamp(30px, 3.4vw, 44px)", letterSpacing: "-0.015em", lineHeight: 1.08, marginBottom: 12 }}>
              Como comunicar sua política de IA para os alunos
            </h2>
            <p className="lead" style={{ color: "var(--muted)" }}>
              Três modelos prontos para copiar e colar no syllabus do seu curso.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {syllabusModels.map((model, i) => (
              <SyllabusCard key={i} model={model} />
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK · Como universidades decidem ── */}
      <section style={{ background: "var(--charcoal)", color: "var(--on-dark)" }}>
        <div className="container-wide" style={{ padding: "72px 32px" }}>
          <div style={{ marginBottom: 48 }}>
            <h2 className="display-tight" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#fff" }}>
              Como as melhores universidades estão decidindo
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderTop: "1px solid rgba(255,255,255,0.2)" }}
               className="world-grid">
            {worldPolicies.map((w, i) => (
              <div key={w.n} style={{
                padding: "32px 24px 32px 0",
                paddingLeft: i > 0 ? 24 : 0,
                borderRight: i < worldPolicies.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none",
                display: "flex", flexDirection: "column", gap: 14, minHeight: 260,
              }}>
                <span className="num-eyebrow" style={{ color: "rgba(255,255,255,0.4)" }}>{w.n}</span>
                <div className="display" style={{ fontSize: 22, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.005em" }}>{w.uni}</div>
                <span className="num-eyebrow" style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{w.year}</span>
                <div className="eyebrow" style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, marginTop: 4 }}>{w.stance}</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "rgba(255,255,255,0.72)", marginTop: "auto" }}>{w.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK · Detectores de IA ── */}
      <section style={{ background: "var(--charcoal)", color: "var(--on-dark)" }}>
        <div className="container-wide" style={{ padding: "96px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.2)", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 20, height: 1, background: "rgba(255,255,255,0.4)" }} />
              <span className="eyebrow" style={{ color: "rgba(255,255,255,0.55)" }}>Ponto de atenção</span>
            </div>
            <span className="num-eyebrow" style={{ color: "rgba(255,255,255,0.4)" }}>03</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}
               className="detector-grid">
            <div>
              <h2 className="display-tight" style={{ fontSize: "clamp(36px, 4.2vw, 52px)", lineHeight: 1.02, letterSpacing: "-0.02em", color: "#fff", marginBottom: 20 }}>
                Detectores de IA não são confiáveis.
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.7)", maxWidth: 440 }}>
                Antes de adotar qualquer ferramenta de detecção, entenda o risco.
              </p>
            </div>
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}>
              {[
                { n: "01", title: "Alta taxa de falso-positivo",
                  body: "Turnitin AI Detection e GPTZero são comprovadamente enviesados contra falantes não-nativos de inglês, acusando injustamente alunos que escreveram por conta própria." },
                { n: "02", title: "Rejeitadas por instituições de referência",
                  body: "Universidades como MIT e University of Toronto rejeitam formalmente o uso dessas ferramentas como evidência em processos disciplinares." },
                { n: "03", title: "O que funciona no lugar",
                  body: "Redesenhar avaliações para exigir evidência de processo (rascunhos, reflexões, defesas orais) e adotar declaração de uso como mecanismo de integridade acadêmica." },
              ].map((row, i) => (
                <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", padding: "28px 0", display: "grid", gridTemplateColumns: "56px 1fr", gap: 20 }}>
                  <span className="num-eyebrow" style={{ color: "rgba(255,255,255,0.45)", paddingTop: 4 }}>{row.n}</span>
                  <div>
                    <div className="display" style={{ fontSize: 22, color: "#fff", letterSpacing: "-0.005em", lineHeight: 1.2, marginBottom: 10 }}>{row.title}</div>
                    <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>{row.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .world-grid { grid-template-columns: 1fr 1fr !important; }
          .detector-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 480px) {
          .world-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
