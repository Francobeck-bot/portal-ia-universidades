import { fetchTools } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";
import ToolsClient from "@/components/ToolsClient";

export const dynamic = "force-dynamic";

export default async function FerramentasPage() {
  const tools = await fetchTools(SHEETS_CONFIG.toolsSheetUrl);

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
            {tools.length} ferramentas
          </span>
          <h1 className="display-tight" style={{
            fontSize: "clamp(44px, 5.6vw, 84px)",
            lineHeight: 1.02, letterSpacing: "-0.02em",
            maxWidth: 1100, color: "#fff",
          }}>
            Ferramentas de IA para o Ensino
          </h1>
          <p className="lead" style={{ maxWidth: 640, marginTop: 32, color: "rgba(255,255,255,0.72)" }}>
            Selecionadas e recomendadas por universidades de referência mundial.
            Filtre por tipo e encontre a ferramenta certa para o seu objetivo.
          </p>
        </div>
      </section>

      {/* ── Catalog — sem container para a filter bar ir até as bordas ── */}
      <ToolsClient tools={tools} />

    </main>
  );
}
