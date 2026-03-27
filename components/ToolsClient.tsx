"use client";

import { useState } from "react";
import { ExternalLink, Filter, Search } from "lucide-react";
import type { Tool } from "@/lib/sheets";

const costBadge: Record<string, { label: string; className: string }> = {
  Gratuito: { label: "Gratuito", className: "bg-green-100 text-green-700" },
  "Gratuito/Plus": { label: "Grátis / Plus", className: "bg-green-100 text-green-700" },
  "Gratuito/Pro": { label: "Grátis / Pro", className: "bg-blue-100 text-blue-700" },
  "Gratuito (API)": { label: "Grátis (API)", className: "bg-blue-100 text-blue-700" },
  "Gratuito para instituições": { label: "Grátis para inst.", className: "bg-purple-100 text-purple-700" },
  Pago: { label: "Pago", className: "bg-red-100 text-red-700" },
  Freemium: { label: "Freemium", className: "bg-amber-100 text-amber-700" },
};

function getCostBadge(custo: string) {
  if (custo in costBadge) return costBadge[custo];
  if (custo.toLowerCase().includes("gratuito")) return costBadge["Gratuito"];
  if (custo.toLowerCase().includes("pago")) return costBadge["Pago"];
  return { label: custo, className: "bg-gray-100 text-gray-700" };
}

const ALL_TYPES = "Todos";

export default function ToolsClient({ tools }: { tools: Tool[] }) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState(ALL_TYPES);

  const types = [ALL_TYPES, ...Array.from(new Set(tools.map((t) => t.tipo)))];

  const filtered = tools.filter((t) => {
    const matchesType = selectedType === ALL_TYPES || t.tipo === selectedType;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      t.nome.toLowerCase().includes(q) ||
      t.descricao.toLowerCase().includes(q) ||
      t.casos_de_uso.toLowerCase().includes(q) ||
      t.tipo.toLowerCase().includes(q);
    return matchesType && matchesSearch;
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar ferramenta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ufrgs-blue text-sm"
          />
        </div>

        {/* Type filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                selectedType === type
                  ? "bg-ufrgs-blue text-white border-ufrgs-blue"
                  : "bg-white text-gray-600 border-gray-200 hover:border-ufrgs-blue hover:text-ufrgs-blue"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-6">
        {filtered.length} {filtered.length === 1 ? "ferramenta encontrada" : "ferramentas encontradas"}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium">Nenhuma ferramenta encontrada</p>
          <p className="text-sm mt-1">Tente outro termo ou remova os filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool, i) => {
            const badge = getCostBadge(tool.custo);
            return (
              <div key={i} className="card p-6 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{tool.nome}</h3>
                    <span className="text-xs text-ufrgs-blue font-medium bg-ufrgs-blue/10 px-2 py-0.5 rounded-full mt-1 inline-block">
                      {tool.tipo}
                    </span>
                  </div>
                  <span className={`badge ${badge.className} text-xs shrink-0 ml-2`}>
                    {badge.label}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{tool.descricao}</p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Casos de uso
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {tool.casos_de_uso.split(",").map((c, j) => (
                      <span
                        key={j}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {c.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {tool.universidades_que_recomendam && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                      Recomendado por
                    </p>
                    <p className="text-xs text-gray-500">{tool.universidades_que_recomendam}</p>
                  </div>
                )}

                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-ufrgs-blue hover:bg-ufrgs-dark text-white text-sm font-semibold py-2 rounded-lg transition-colors mt-auto"
                >
                  Acessar ferramenta <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
