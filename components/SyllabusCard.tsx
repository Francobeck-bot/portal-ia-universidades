"use client";

import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { SyllabusModel } from "@/lib/sheets";

const POLICY_STYLE: Record<string, { bar: string; dot: string; label: string }> = {
  Restritivo: { bar: "#ef4444", dot: "#ef4444", label: "Restritivo" },
  Misto:      { bar: "#f59e0b", dot: "#f59e0b", label: "Misto"      },
  Aberto:     { bar: "#22c55e", dot: "#22c55e", label: "Aberto"     },
};

const DEFAULT_POLICY = { bar: "#6b7280", dot: "#6b7280", label: "Outro" };

function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
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
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontSize: 12, fontWeight: 500, letterSpacing: "0.04em",
        color: copied ? "#22c55e" : "var(--muted)",
        background: "none", border: "none", cursor: "pointer",
        transition: "color 160ms ease", padding: 0,
        fontFamily: "var(--body)",
      }}
      title="Copiar texto"
    >
      {copied ? (
        <><Check size={13} /><span>Copiado!</span></>
      ) : (
        <><Copy size={13} /><span>{label}</span></>
      )}
    </button>
  );
}

export default function SyllabusCard({ model }: { model: SyllabusModel }) {
  const [expanded, setExpanded] = useState(false);
  const style = POLICY_STYLE[model.tipo] ?? DEFAULT_POLICY;
  const hasFullText = model.texto_completo?.trim();

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--hairline)",
      borderRadius: "var(--radius)",
      overflow: "hidden",
    }}>
      {/* 3px top bar */}
      <div style={{ height: 3, background: style.bar }} />

      {/* Main body */}
      <div style={{ padding: "24px 28px" }}>

        {/* Header row: badge + copy */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
            fontWeight: 500, fontFamily: "var(--body)",
            color: "var(--muted)",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: style.bar, flexShrink: 0,
            }} />
            Modelo {style.label}
          </span>
          <CopyButton text={model.texto} label="Copiar texto" />
        </div>

        {/* Short text with left-accent border */}
        <blockquote style={{
          margin: 0, padding: "2px 0 2px 16px",
          borderLeft: `2px solid ${style.bar}`,
          fontSize: 15, lineHeight: 1.65,
          color: "var(--ink-soft)",
          fontStyle: "normal",
          fontFamily: "var(--body)",
        }}>
          {model.texto}
        </blockquote>

        {/* Expand toggle */}
        {hasFullText && (
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              marginTop: 20,
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, letterSpacing: "0.06em",
              fontWeight: 500, fontFamily: "var(--body)",
              color: "var(--muted)", cursor: "pointer",
              background: "none", border: "none", padding: 0,
              transition: "color 160ms ease",
            }}
          >
            {expanded ? (
              <><ChevronUp size={14} /><span>Ocultar versão completa</span></>
            ) : (
              <><ChevronDown size={14} /><span>Ver versão completa da política</span></>
            )}
          </button>
        )}
      </div>

      {/* Expandable full text */}
      {hasFullText && expanded && (
        <div style={{
          borderTop: "1px solid var(--hairline)",
          padding: "20px 28px 24px",
          background: "var(--bg)",
        }}>
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginBottom: 12,
          }}>
            <span className="eyebrow">Versão completa</span>
            <CopyButton text={model.texto_completo} label="Copiar completo" />
          </div>
          <pre style={{
            margin: 0,
            padding: "16px 18px",
            background: "var(--surface)",
            border: "1px solid var(--hairline)",
            borderRadius: "var(--radius)",
            fontFamily: "var(--mono)",
            fontSize: 13,
            lineHeight: 1.7,
            color: "var(--ink-soft)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowX: "auto",
          }}>
            {model.texto_completo}
          </pre>
        </div>
      )}
    </div>
  );
}
