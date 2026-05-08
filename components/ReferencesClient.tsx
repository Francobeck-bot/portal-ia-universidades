"use client";

import { useState } from "react";
import type { Reference } from "@/lib/sheets";

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
      <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square" />
    </svg>
  );
}

// Country flag emoji helper
function countryFlag(pais: string) {
  const map: Record<string, string> = {
    "EUA": "🇺🇸", "UK": "🇬🇧", "Canada": "🇨🇦", "Canadá": "🇨🇦",
    "Austrália": "🇦🇺", "Australia": "🇦🇺",
    "Alemanha": "🇩🇪", "Germany": "🇩🇪",
    "França": "🇫🇷", "France": "🇫🇷",
    "Finlândia": "🇫🇮", "Finland": "🇫🇮",
    "Singapura": "🇸🇬", "Singapore": "🇸🇬",
    "Brasil": "🇧🇷", "Brazil": "🇧🇷",
    "Holanda": "🇳🇱", "Países Baixos": "🇳🇱",
  };
  return map[pais.trim()] ?? "";
}

const ALL = "Todos";

export default function ReferencesClient({ references }: { references: Reference[] }) {
  const [filter, setFilter] = useState(ALL);

  const types = Array.from(new Set(references.map(r => r.tipo).filter(Boolean)));
  const filterOptions = [ALL, ...types];

  const visible = filter === ALL
    ? references
    : references.filter(r => r.tipo === filter);

  return (
    <div>
      {/* ── Sticky filter bar ── */}
      <div style={{
        position: "sticky", top: 64, zIndex: 10,
        background: "var(--surface)",
        borderBottom: "1px solid var(--hairline)",
        margin: "0 -32px",
      }}>
        <div className="container-wide" style={{ padding: "0 32px" }}>
          <div style={{
            display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center",
            paddingTop: 14, paddingBottom: 14,
          }}>
            <span className="eyebrow" style={{ marginRight: 6, flexShrink: 0 }}>Filtrar</span>
            {filterOptions.map(type => {
              const active = filter === type;
              return (
                <button key={type} onClick={() => setFilter(type)} style={{
                  background: active ? "var(--ink)" : "transparent",
                  color: active ? "#fff" : "var(--ink)",
                  border: `1px solid ${active ? "var(--ink)" : "var(--hairline)"}`,
                  borderRadius: "var(--radius)",
                  padding: "6px 13px", cursor: "pointer",
                  fontSize: 12, fontWeight: 500,
                  fontFamily: "var(--body)",
                  transition: "all 140ms ease",
                }}>
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Reference rows ── */}
      <div style={{ paddingTop: 8, paddingBottom: 96 }}>

        {/* Table header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "48px 1fr 140px 180px 80px",
          gap: 16,
          padding: "16px 0",
          borderBottom: "2px solid var(--ink)",
          marginBottom: 0,
        }} className="ref-row">
          <span className="eyebrow" style={{ fontSize: 10 }}>#</span>
          <span className="eyebrow" style={{ fontSize: 10 }}>Universidade / Fonte</span>
          <span className="eyebrow" style={{ fontSize: 10 }}>País</span>
          <span className="eyebrow" style={{ fontSize: 10 }}>Tipo</span>
          <span className="eyebrow" style={{ fontSize: 10 }}>Link</span>
        </div>

        {visible.map((ref, i) => (
          <RefRow key={i} ref_={ref} index={i} />
        ))}

        {visible.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            <p style={{ fontSize: 15 }}>Nenhuma referência nesta categoria.</p>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ref-row { grid-template-columns: 32px 1fr 80px !important; }
          .ref-col-pais { display: none; }
          .ref-col-tipo { display: none; }
        }
      `}</style>
    </div>
  );
}

function RefRow({ ref_, index }: { ref_: Reference; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const flag = countryFlag(ref_.pais);
  const isEven = index % 2 === 0;

  return (
    <div style={{
      borderBottom: "1px solid var(--hairline)",
      background: isEven ? "transparent" : "rgba(0,0,0,0.015)",
    }}>
      {/* Main row */}
      <div
        onClick={() => ref_.descricao?.trim() && setExpanded(v => !v)}
        style={{
          display: "grid",
          gridTemplateColumns: "48px 1fr 140px 180px 80px",
          gap: 16,
          padding: "18px 0",
          alignItems: "center",
          cursor: ref_.descricao?.trim() ? "pointer" : "default",
          transition: "background 120ms ease",
        }}
        className="ref-row ref-main-row"
      >
        {/* Number */}
        <span className="num-eyebrow" style={{ fontSize: 12, color: "var(--muted)" }}>
          {ref_.numero || String(index + 1).padStart(2, "0")}
        </span>

        {/* University + expand hint */}
        <div>
          <span style={{
            fontFamily: "var(--display)",
            fontSize: 18,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            color: "var(--ink)",
          }}>
            {ref_.universidade}
          </span>
          {ref_.descricao?.trim() && (
            <span style={{
              display: "block",
              fontSize: 12,
              color: "var(--muted)",
              marginTop: 3,
            }}>
              {expanded ? "▲ ocultar descrição" : "▾ ver descrição"}
            </span>
          )}
        </div>

        {/* País */}
        <span className="ref-col-pais" style={{ fontSize: 13, color: "var(--muted)" }}>
          {flag && <span style={{ marginRight: 6 }}>{flag}</span>}
          {ref_.pais}
        </span>

        {/* Tipo */}
        <span className="ref-col-tipo" style={{
          fontSize: 12, lineHeight: 1.4, color: "var(--ink-soft)",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {ref_.tipo}
        </span>

        {/* Link */}
        <div>
          {ref_.link?.trim() && (
            <a
              href={ref_.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 12, fontWeight: 600,
                color: "var(--ink)", textDecoration: "none",
                border: "1px solid var(--hairline)",
                borderRadius: "var(--radius)",
                padding: "6px 10px",
                transition: "border-color 140ms, color 140ms",
                whiteSpace: "nowrap",
              }}
              className="ref-link-btn"
            >
              Acessar <Arrow />
            </a>
          )}
        </div>
      </div>

      {/* Expandable description */}
      {expanded && ref_.descricao?.trim() && (
        <div style={{
          paddingLeft: 64,
          paddingRight: 80,
          paddingBottom: 18,
        }}>
          <p style={{
            fontSize: 13.5,
            lineHeight: 1.65,
            color: "var(--ink-soft)",
            whiteSpace: "pre-line",
            borderLeft: "2px solid var(--hairline)",
            paddingLeft: 16,
            margin: 0,
          }}>
            {ref_.descricao}
          </p>
        </div>
      )}

      <style>{`
        .ref-main-row:hover { background: rgba(0,0,0,0.025) !important; }
        .ref-link-btn:hover { border-color: var(--ink) !important; color: var(--ink) !important; }
      `}</style>
    </div>
  );
}
