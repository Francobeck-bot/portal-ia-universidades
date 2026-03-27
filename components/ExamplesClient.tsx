"use client";

import { useState } from "react";
import { Filter, University, Wrench, TrendingUp } from "lucide-react";
import type { Example } from "@/lib/sheets";

const difficultyConfig: Record<string, { label: string; className: string }> = {
  Baixa: { label: "Baixa", className: "bg-green-100 text-green-700" },
  Média: { label: "Média", className: "bg-yellow-100 text-yellow-700" },
  Alta: { label: "Alta", className: "bg-red-100 text-red-700" },
};

const ALL = "Todas";

export default function ExamplesClient({ examples }: { examples: Example[] }) {
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [selectedDifficulty, setSelectedDifficulty] = useState(ALL);

  const categories = [ALL, ...Array.from(new Set(examples.map((e) => e.categoria)))];
  const difficulties = [ALL, "Baixa", "Média", "Alta"];

  const filtered = examples.filter((e) => {
    const matchCat = selectedCategory === ALL || e.categoria === selectedCategory;
    const matchDiff = selectedDifficulty === ALL || e.dificuldade === selectedDifficulty;
    return matchCat && matchDiff;
  });

  // Group by category
  const grouped: Record<string, Example[]> = {};
  filtered.forEach((e) => {
    if (!grouped[e.categoria]) grouped[e.categoria] = [];
    grouped[e.categoria].push(e);
  });

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Categoria
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  selectedCategory === cat
                    ? "bg-ufrgs-blue text-white border-ufrgs-blue"
                    : "bg-white text-gray-600 border-gray-200 hover:border-ufrgs-blue hover:text-ufrgs-blue"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Dificuldade de implementação
          </p>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  selectedDifficulty === diff
                    ? "bg-ufrgs-blue text-white border-ufrgs-blue"
                    : "bg-white text-gray-600 border-gray-200 hover:border-ufrgs-blue hover:text-ufrgs-blue"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-medium">Nenhum exemplo encontrado</p>
          <p className="text-sm mt-1">Tente remover os filtros</p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-ufrgs-dark mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-ufrgs-gold rounded-full inline-block"></span>
                {category}
                <span className="text-sm font-normal text-gray-400 ml-1">
                  ({items.length} {items.length === 1 ? "exemplo" : "exemplos"})
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((example, i) => {
                  const diff = difficultyConfig[example.dificuldade] || difficultyConfig["Baixa"];
                  return (
                    <div key={i} className="card p-6 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-gray-900 text-base flex-1 pr-2">{example.titulo}</h3>
                        <span className={`badge ${diff.className} text-xs shrink-0`}>
                          Dificuldade: {diff.label}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                        {example.descricao}
                      </p>

                      <div className="grid grid-cols-1 gap-2 text-xs text-gray-500">
                        {example.universidade && (
                          <div className="flex items-start gap-1.5">
                            <University className="w-3.5 h-3.5 shrink-0 mt-0.5 text-ufrgs-blue" />
                            <span>
                              <strong>Instituição:</strong> {example.universidade}
                            </span>
                          </div>
                        )}
                        {example.ferramenta && (
                          <div className="flex items-start gap-1.5">
                            <Wrench className="w-3.5 h-3.5 shrink-0 mt-0.5 text-ufrgs-blue" />
                            <span>
                              <strong>Ferramenta:</strong> {example.ferramenta}
                            </span>
                          </div>
                        )}
                        {example.impacto && (
                          <div className="flex items-start gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 shrink-0 mt-0.5 text-ufrgs-blue" />
                            <span>
                              <strong>Impacto:</strong> {example.impacto}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
