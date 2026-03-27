import { Wrench, Info } from "lucide-react";
import { fetchTools } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";
import ToolsClient from "@/components/ToolsClient";

export const revalidate = 3600;

export default async function FerramentasPage() {
  const tools = await fetchTools(SHEETS_CONFIG.toolsSheetUrl);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-ufrgs-blue text-sm font-medium mb-3">
          <Wrench className="w-4 h-4" />
          Catálogo atualizado
        </div>
        <h1 className="text-4xl font-bold text-ufrgs-dark mb-4">Ferramentas de IA para o Ensino</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Ferramentas selecionadas e recomendadas por universidades de referência mundial. O conteúdo é
          atualizado automaticamente via Google Sheets — qualquer professor pode adicionar novas ferramentas
          sem precisar de programador.
        </p>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <Info className="w-5 h-5 text-ufrgs-blue shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          <strong>Para professores:</strong> Quer adicionar uma ferramenta? Edite a planilha Google Sheets
          vinculada ao portal. O site se atualiza automaticamente em até 1 hora. Consulte o guia{" "}
          <strong>COMO_ATUALIZAR.md</strong> no repositório do projeto.
        </p>
      </div>

      <ToolsClient tools={tools} />
    </div>
  );
}
