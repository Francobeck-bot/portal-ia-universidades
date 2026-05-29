import { fetchExamples } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";
import ExamplesClient from "@/components/ExamplesClient";

export const dynamic = "force-dynamic";

export default async function ExemplosPage() {
  const examples = await fetchExamples(SHEETS_CONFIG.examplesSheetUrl);

  return (
    <main style={{ background: "var(--bg)" }}>

      {/* ── Page header ── */}
      <section style={{
        backgroundImage: "linear-gradient(180deg, rgba(8,18,32,0.45) 0%, rgba(8,18,32,0.85) 100%), url(/hero-bg.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
        color: "var(--on-dark)",
      }}>
        <div className="container-wide" style={{ padding: "72px 32px 80px" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: 24, color: "rgba(255,255,255,0.55)" }}>
            Baseados em casos reais
          </span>
          <h1 className="display-tight" style={{
            fontSize: "clamp(44px, 5.6vw, 84px)",
            lineHeight: 1.02, letterSpacing: "-0.02em",
            maxWidth: 1100, color: "#fff",
          }}>
            Exemplos de Uso de IA no Ensino
          </h1>
          <p className="lead" style={{ maxWidth: 640, marginTop: 32, color: "rgba(255,255,255,0.72)" }}>
            Casos práticos com instruções passo a passo de como implementar na
            sua disciplina hoje. Todos baseados em experiências reais de
            universidades de referência.
          </p>
        </div>
      </section>

      {/* ── Examples — sem container para o filter bar ir até as bordas ── */}
      <ExamplesClient examples={examples} />

    </main>
  );
}
