import { fetchExamples } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";
import ExamplesClient from "@/components/ExamplesClient";

export const dynamic = "force-dynamic";

export default async function ExemplosPage() {
  const examples = await fetchExamples(SHEETS_CONFIG.examplesSheetUrl);

  return (
    <div className="bg-white">
      {/* Page hero */}
      <div
        className="border-b border-gray-100"
        style={{ background: "linear-gradient(135deg, #004aad08, #5de0e615)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="section-label">Baseados em casos reais</p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Exemplos de Uso{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #004aad, #5de0e6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              de IA no Ensino
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Casos práticos com instruções passo a passo de como implementar na sua disciplina hoje.
            Todos baseados em experiências reais de universidades de referência.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ExamplesClient examples={examples} />
      </div>
    </div>
  );
}
