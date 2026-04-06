"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, SearchX } from "lucide-react";
import type { Example } from "@/lib/sheets";

const difficultyConfig: Record<string, { label: string; bg: string; color: string }> = {
  Baixa: { label: "Baixa", bg: "#dcfce7", color: "#15803d" },
  Média: { label: "Média", bg: "#fef9c3", color: "#854d0e" },
  Alta:  { label: "Alta",  bg: "#fee2e2", color: "#b91c1c" },
};

const ALL = "Todas";

function ExampleCard({ example }: { example: Example }) {
  const [open, setOpen] = useState(false);
  const diff = difficultyConfig[example.dificuldade] ?? difficultyConfig["Baixa"];

  return (
    <div className="card overflow-hidden" style={{ borderTop: "3px solid #5de0e670" }}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-black text-gray-900 text-base leading-snug">{example.titulo}</h3>
          <span
            className="badge shrink-0 text-xs font-bold"
            style={{ background: diff.bg, color: diff.color }}
          >
            {diff.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{example.descricao}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-4 font-medium">
          {example.universidade && (
            <span>
              <strong className="text-gray-600">Instituição:</strong> {example.universidade}
            </span>
          )}
          {example.ferramenta && (
            <span>
              <strong className="text-gray-600">Ferramenta:</strong> {example.ferramenta}
            </span>
          )}
        </div>

        {/* Toggle */}
        {example.como_fazer && (
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
            style={{ color: open ? "#004aad" : "#5de0e6" }}
          >
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Como fazer na prática
          </button>
        )}
      </div>

      {/* Expanded */}
      {open && example.como_fazer && (
        <div
          className="border-t px-6 py-5"
          style={{
            background: "linear-gradient(135deg, #004aad06, #5de0e610)",
            borderColor: "#5de0e640",
          }}
        >
          <p
            className="text-xs font-black uppercase tracking-widest mb-3"
            style={{ color: "#004aad" }}
          >
            Passo a passo
          </p>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {example.como_fazer}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExamplesClient({ examples }: { examples: Example[] }) {
  const [selectedCategory, setSelectedCategory] = useState(ALL);

  const categories = [ALL, ...Array.from(new Set(examples.map((e) => e.categoria)))];
  const filtered = examples.filter(
    (e) => selectedCategory === ALL || e.categoria === selectedCategory
  );

  const grouped: Record<string, Example[]> = {};
  filtered.forEach((e) => {
    if (!grouped[e.categoria]) grouped[e.categoria] = [];
    grouped[e.categoria].push(e);
  });

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className="px-5 py-2.5 text-sm font-bold rounded-full border transition-all duration-150"
            style={
              selectedCategory === cat
                ? {
                    background: "linear-gradient(135deg, #004aad, #5de0e6)",
                    color: "white",
                    borderColor: "transparent",
                    boxShadow: "0 0 12px rgba(93,224,230,0.4)",
                  }
                : {
                    background: "white",
                    color: "#6b7280",
                    borderColor: "#e5e7eb",
                  }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <SearchX className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="font-bold text-gray-500">Nenhum exemplo nesta categoria</p>
          <p className="text-sm mt-1">Tente selecionar "Todas" para ver todos os exemplos.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-1 h-5 rounded-full"
                  style={{ background: "linear-gradient(180deg, #004aad, #5de0e6)" }}
                />
                <h2 className="text-lg font-black text-gray-900">{category}</h2>
                <span className="text-sm text-gray-400 font-medium">
                  {items.length} {items.length === 1 ? "exemplo" : "exemplos"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((example, i) => (
                  <ExampleCard key={i} example={example} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
