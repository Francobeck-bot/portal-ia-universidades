import { Lightbulb, Info } from "lucide-react";
import { fetchExamples } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";
import ExamplesClient from "@/components/ExamplesClient";

export const revalidate = 3600;

export default async function ExemplosPage() {
  const examples = await fetchExamples(SHEETS_CONFIG.examplesSheetUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-ufrgs-blue text-sm font-medium mb-3">
          <Lightbulb className="w-4 h-4" />
          Baseados em casos reais
        </div>
        <h1 className="text-4xl font-bold text-ufrgs-dark mb-4">Exemplos de Uso de IA no Ensino</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Casos práticos de como professores ao redor do mundo estão usando IA para melhorar o aprendizado.
          Todos baseados em experiências reais de universidades de referência.
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-700">
          <strong>Para professores:</strong> Tem um exemplo de uso que deu certo na sua disciplina? Adicione
          na planilha Google Sheets vinculada ao portal — sem precisar de programador. O site atualiza
          automaticamente em até 1 hora.
        </p>
      </div>

      <ExamplesClient examples={examples} />
    </div>
  );
}
