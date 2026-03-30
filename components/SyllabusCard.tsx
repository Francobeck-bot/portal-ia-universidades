"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import type { SyllabusModel } from "@/lib/sheets";

const STYLE_MAP: Record<string, { borderColor: string; tagBg: string; tagColor: string }> = {
  Restritivo: { borderColor: "#ef4444", tagBg: "#fef2f2", tagColor: "#b91c1c" },
  Misto:      { borderColor: "#f59e0b", tagBg: "#fffbeb", tagColor: "#b45309" },
  Aberto:     { borderColor: "#5de0e6", tagBg: "#ecfeff", tagColor: "#0e7490" },
};

const DEFAULT_STYLE = { borderColor: "#5de0e6", tagBg: "#ecfeff", tagColor: "#0e7490" };

export default function SyllabusCard({ model }: { model: SyllabusModel }) {
  const [copied, setCopied] = useState(false);
  const style = STYLE_MAP[model.tipo] ?? DEFAULT_STYLE;

  function handleCopy() {
    navigator.clipboard.writeText(model.texto).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      className="rounded-xl p-6 bg-white border"
      style={{ borderColor: `${style.borderColor}60` }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: style.tagBg, color: style.tagColor }}
        >
          Modelo {model.tipo}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs font-medium
                     text-gray-400 hover:text-gray-700 transition-colors"
          title="Copiar texto"
        >
          {copied ? (
            <><Check className="w-3.5 h-3.5 text-green-500" /><span className="text-green-500">Copiado!</span></>
          ) : (
            <><Copy className="w-3.5 h-3.5" />Copiar</>
          )}
        </button>
      </div>
      <blockquote
        className="text-gray-700 text-sm leading-relaxed italic border-l-2 pl-4"
        style={{ borderColor: style.borderColor }}
      >
        {model.texto}
      </blockquote>
    </div>
  );
}
