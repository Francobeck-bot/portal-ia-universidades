"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Principle } from "@/lib/sheets";

export default function PrincipleCard({ p }: { p: Principle }) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = p.descricao_completa?.trim();

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--hairline)",
      borderRadius: "var(--radius)",
      overflow: "hidden",
    }}>
      {/* Main row */}
      <div style={{
        padding: "24px 28px",
        display: "grid",
        gridTemplateColumns: "44px 1fr",
        gap: 20,
        alignItems: "start",
      }}>
        <span className="num-eyebrow" style={{ fontSize: 14, color: "var(--muted)", paddingTop: 4 }}>
          {p.numero}
        </span>
        <div>
          <h3 className="display" style={{ fontSize: 22, letterSpacing: "-0.005em", lineHeight: 1.2, marginBottom: 8 }}>
            {p.titulo}
          </h3>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--muted)", whiteSpace: "pre-line" }}>
            {p.descricao}
          </p>

          {hasMore && (
            <button
              onClick={() => setExpanded(v => !v)}
              style={{
                marginTop: 14,
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 12, letterSpacing: "0.06em",
                fontWeight: 500, fontFamily: "var(--body)",
                color: "var(--muted)", cursor: "pointer",
                background: "none", border: "none", padding: 0,
                transition: "color 160ms ease",
              }}
            >
              {expanded
                ? <><ChevronUp size={14} /><span>Ocultar detalhes</span></>
                : <><ChevronDown size={14} /><span>Ver mais detalhes</span></>}
            </button>
          )}
        </div>
      </div>

      {/* Expandable full text */}
      {hasMore && expanded && (
        <div className="principle-expanded" style={{
          borderTop: "1px solid var(--hairline)",
          padding: "20px 28px 24px",
          paddingLeft: `calc(28px + 44px + 20px)`,
          background: "var(--bg)",
        }}>
          <p style={{
            fontSize: 14.5, lineHeight: 1.7,
            color: "var(--ink-soft)",
            whiteSpace: "pre-line",
          }}>
            {p.descricao_completa}
          </p>
        </div>
      )}
      <style>{`
        @media (max-width: 640px) {
          .principle-expanded { padding-left: 28px !important; }
        }
      `}</style>
    </div>
  );
}
