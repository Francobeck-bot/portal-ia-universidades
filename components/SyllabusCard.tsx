"use client";

import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { SyllabusModel } from "@/lib/sheets";

const STYLE_MAP: Record<string, { borderColor: string; tagBg: string; tagColor: string }> = {
  Restritivo: { borderColor: "#ef4444", tagBg: "#fef2f2", tagColor: "#b91c1c" },
  Misto:      { borderColor: "#f59e0b", tagBg: "#fffbeb", tagColor: "#b45309" },
  Aberto:     { borderColor: "#5de0e6", tagBg: "#ecfeff", tagColor: "#0e7490" },
};

const DEFAULT_STYLE = { borderColor: "#5de0e6", tagBg: "#ecfeff", tagColor: "#0e7490" };

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
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
  );
}

export default function SyllabusCard({ model }: { model: SyllabusModel }) {
  const [expanded, setExpanded] = useState(false);
  const style = STYLE_MAP[model.tipo] ?? DEFAULT_STYLE;
  const hasFullText = model.texto_completo?.trim();

  return (
    <div
      className="rounded-xl bg-white border overflow-hidden"
      style={{ borderColor: `${style.borderColor}60` }}
    >
      {/* Resumo */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: style.tagBg, color: style.tagColor }}
          >
            Modelo {model.tipo}
          </span>
          <CopyButton text={model.texto} />
        </div>
        <blockquote
          className="text-gray-700 text-sm leading-relaxed italic border-l-2 pl-4"
          style={{ borderColor: style.borderColor }}
        >
          {model.texto}
        </blockquote>

        {hasFullText && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold transition-colors"
            style={{ color: style.tagColor }}
          >
            {expanded ? (
              <><ChevronUp className="w-3.5 h-3.5" />Ocultar versão completa</>
            ) : (
              <><ChevronDown className="w-3.5 h-3.5" />Ver versão completa da política</>
            )}
          </button>
        )}
      </div>

      {/* Versão completa expandível */}
      {hasFullText && expanded && (
        <div
          className="border-t px-6 py-5"
          style={{
            background: `${style.borderColor}08`,
            borderColor: `${style.borderColor}30`,
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-black uppercase tracking-widest" style={{ color: style.tagColor }}>
              Versão completa
            </p>
            <CopyButton text={model.texto_completo} />
          </div>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {model.texto_completo}
          </div>
        </div>
      )}
    </div>
  );
}
