"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { Tool } from "@/lib/sheets";

function getCostBadge(custo: string): { label: string; bg: string; color: string } {
  const c = custo.toLowerCase();
  if (c === "gratuito")                          return { label: "Gratuito",              bg: "#dcfce7", color: "#15803d" };
  if (c.includes("gratuito para inst"))          return { label: "Grátis p/ inst.",       bg: "#dcfce7", color: "#15803d" };
  if (c.includes("gratuito") && c.includes("pago")) return { label: "Freemium",           bg: "#fef9c3", color: "#854d0e" };
  if (c.includes("freemium"))                    return { label: "Freemium",              bg: "#fef9c3", color: "#854d0e" };
  if (c.includes("pago"))                        return { label: "Pago",                  bg: "#f3f4f6", color: "#4b5563" };
  return { label: custo, bg: "#f3f4f6", color: "#4b5563" };
}

const FILTER_TYPES = ["Todos", "Tutor", "Feedback", "Criação de Conteúdo", "Transcrição", "Literacia em IA"];

function matchesType(toolTipo: string, filter: string): boolean {
  if (filter === "Todos") return true;
  return toolTipo.toLowerCase().includes(filter.toLowerCase());
}

export default function ToolsClient({ tools }: { tools: Tool[] }) {
  const [selectedType, setSelectedType] = useState("Todos");

  const filtered = tools.filter((t) => matchesType(t.tipo, selectedType));

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className="px-4 py-1.5 text-sm font-bold rounded-full border transition-all duration-150"
            style={
              selectedType === type
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
            {type}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-gray-400 font-medium mb-6">
        {filtered.length} {filtered.length === 1 ? "ferramenta" : "ferramentas"}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="font-bold">Nenhuma ferramenta encontrada</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tool, i) => {
            const badge = getCostBadge(tool.custo);
            return (
              <div
                key={i}
                className="card card-hover p-6 flex flex-col"
                style={{ borderTop: "2px solid #5de0e640" }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-black text-gray-900 text-base">{tool.nome}</h3>
                    <span
                      className="text-xs font-bold mt-0.5 inline-block"
                      style={{ color: "#004aad" }}
                    >
                      {tool.tipo}
                    </span>
                  </div>
                  <span
                    className="badge shrink-0 ml-2 text-xs font-bold"
                    style={{ background: badge.bg, color: badge.color }}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{tool.descricao}</p>

                {/* Casos de uso */}
                <div className="mb-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-wide mb-2">
                    Casos de uso
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {tool.casos_de_uso.split(",").map((c, j) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "#004aad12", color: "#004aad" }}
                      >
                        {c.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Universidades */}
                {tool.universidades_que_recomendam && (
                  <div className="mb-4">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-wide mb-1">
                      Recomendado por
                    </p>
                    <p className="text-xs text-gray-500">{tool.universidades_que_recomendam}</p>
                  </div>
                )}

                {/* CTA */}
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full
                             text-white text-sm font-bold py-2.5 rounded-lg transition-all duration-200
                             hover:opacity-90 mt-auto"
                  style={{
                    background: "linear-gradient(135deg, #004aad, #5de0e6)",
                    boxShadow: "0 4px 14px rgba(0,74,173,0.25)",
                  }}
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
