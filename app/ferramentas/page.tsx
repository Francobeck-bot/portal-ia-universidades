import { fetchTools } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";
import ToolsClient from "@/components/ToolsClient";

export const revalidate = 3600;

export default async function FerramentasPage() {
  const tools = await fetchTools(SHEETS_CONFIG.toolsSheetUrl);

  return (
    <div className="bg-white">
      {/* Page hero */}
      <div
        className="border-b border-gray-100"
        style={{ background: "linear-gradient(135deg, #004aad08, #5de0e615)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="section-label">Catálogo curado</p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Ferramentas de IA{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #004aad, #5de0e6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              para o Ensino
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Selecionadas e recomendadas por universidades de referência mundial. Filtre por tipo
            e encontre a ferramenta certa para o seu objetivo.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ToolsClient tools={tools} />
      </div>
    </div>
  );
}
