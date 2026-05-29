"use client";

import { useState } from "react";
import { SearchX } from "lucide-react";
import type { Example } from "@/lib/sheets";

// ── Category color system ─────────────────────────────────────
const CAT_COLORS: Record<string, { bg: string; fg: string; accent: string }> = {
  "Tutor Personalizado":   { bg: "#EEF2FF", fg: "#3730A3", accent: "#4F46E5" },
  "Produção de Material":  { bg: "#FEF3F2", fg: "#9F1239", accent: "#E11D48" },
  "Avaliação e Feedback":  { bg: "#ECFDF5", fg: "#065F46", accent: "#059669" },
  "Simulação e Prática":   { bg: "#FEF9C3", fg: "#713F12", accent: "#CA8A04" },
  "Pensamento Crítico":    { bg: "#FDF4FF", fg: "#6B21A8", accent: "#9333EA" },
};
// Fallback rotation for any category not in the map
const FALLBACK = [
  { bg: "#EEF2FF", fg: "#3730A3", accent: "#4F46E5" },
  { bg: "#FEF3F2", fg: "#9F1239", accent: "#E11D48" },
  { bg: "#ECFDF5", fg: "#065F46", accent: "#059669" },
  { bg: "#FEF9C3", fg: "#713F12", accent: "#CA8A04" },
  { bg: "#FDF4FF", fg: "#6B21A8", accent: "#9333EA" },
];

// ── Step parser ───────────────────────────────────────────────
function parseSteps(text: string): string[] {
  if (!text?.trim()) return [];
  // "1. ...\n2. ..."
  if (/^\d+\./m.test(text)) {
    return text
      .split(/\n(?=\d+\.)/)
      .map(s => s.replace(/^\d+\.\s*/, "").trim())
      .filter(Boolean);
  }
  // "— ..."
  if (text.includes("—")) {
    return text.split(/\n—/).map(s => s.replace(/^—\s*/, "").trim()).filter(Boolean);
  }
  // Newline fallback
  return text.split(/\n+/).map(s => s.trim()).filter(Boolean);
}

// ── Example card ──────────────────────────────────────────────
function ExampleCard({
  example, color, isOpen, onToggle,
}: {
  example: Example;
  color: { bg: string; fg: string; accent: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [hover, setHover] = useState(false);
  const steps = parseSteps(example.como_fazer);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--surface)",
        border: `1px solid ${hover ? color.accent : "var(--hairline)"}`,
        borderRadius: "var(--radius)",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hover
          ? "0 12px 28px rgba(15,23,42,0.10)"
          : "0 1px 2px rgba(15,23,42,0.04)",
      }}
    >
      {/* Colored cover */}
      <div style={{
        background: color.accent,
        padding: "32px 24px 28px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at top right, rgba(255,255,255,0.22), transparent 60%)",
          pointerEvents: "none",
        }} />
        <span className="num-eyebrow" style={{ color: "rgba(255,255,255,0.75)", position: "relative" }}>
          Esforço · {example.dificuldade}
        </span>
        <h3 className="display" style={{
          fontSize: 24, color: "#fff",
          letterSpacing: "-0.01em", lineHeight: 1.15,
          marginTop: 10, position: "relative",
        }}>
          {example.titulo}
        </h3>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--muted)", margin: 0, whiteSpace: "pre-line" }}>
          {example.descricao}
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {example.ferramenta && (
            <span style={{
              fontSize: 11, padding: "4px 10px",
              background: color.bg, color: color.fg,
              borderRadius: 4, fontWeight: 500,
            }}>
              {example.ferramenta}
            </span>
          )}
          {example.universidade && (
            <span style={{
              fontSize: 11, padding: "4px 10px",
              background: "#f4f5f6", color: "var(--muted)",
              borderRadius: 4,
            }}>
              {example.universidade}
            </span>
          )}
        </div>
      </div>

      {/* Expand toggle */}
      {example.como_fazer && (
        <>
          <button
            onClick={onToggle}
            style={{
              marginTop: "auto",
              width: "100%",
              padding: "14px 24px",
              background: "#fafbfc",
              border: 0,
              borderTop: "1px solid var(--hairline-soft)",
              cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              fontSize: 13, fontWeight: 600, color: color.accent,
              fontFamily: "var(--body)",
              transition: "background 160ms ease",
            }}
            className="ex-toggle"
          >
            <span>Como fazer na prática</span>
            <span style={{
              fontSize: 20, fontWeight: 200,
              display: "inline-block",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: "transform 220ms ease",
            }}>+</span>
          </button>

          {/* Steps */}
          <div style={{
            maxHeight: isOpen ? 900 : 0,
            overflow: "hidden",
            transition: "max-height 380ms ease",
            background: "#fafbfc",
            borderTop: isOpen ? "1px solid var(--hairline-soft)" : "none",
          }}>
            <ol style={{
              listStyle: "none",
              padding: "18px 24px 22px", margin: 0,
              display: "flex", flexDirection: "column", gap: 12,
            }}>
              {steps.map((s, si) => (
                <li key={si} style={{
                  display: "grid", gridTemplateColumns: "28px 1fr", gap: 12,
                  fontSize: 13.5, lineHeight: 1.55, color: "var(--ink-soft)",
                }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: color.bg, color: color.fg,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700,
                    fontFeatureSettings: '"tnum"',
                    fontVariantNumeric: "tabular-nums",
                    flexShrink: 0,
                  }}>{si + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}
    </article>
  );
}

// ── Main export ───────────────────────────────────────────────
const ALL = "Todas";

export default function ExamplesClient({ examples }: { examples: Example[] }) {
  const [filter, setFilter] = useState(ALL);
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = Array.from(new Set(examples.map(e => e.categoria)));
  const filterOptions = [ALL, ...categories];

  const byCategory = categories.map(cat => ({
    name: cat,
    items: examples.filter(e => e.categoria === cat),
  }));

  const visible =
    filter === ALL ? byCategory : byCategory.filter(g => g.name === filter);

  return (
    <div>
      {/* ── Sticky filter bar ── */}
      <div className="ex-filter-wrap" style={{
        position: "sticky", top: 64, zIndex: 10,
        background: "var(--surface)",
        borderBottom: "1px solid var(--hairline)",
      }}>
        <div className="ex-filter-inner" style={{ maxWidth: 1440, margin: "0 auto", padding: "0 32px" }}>
          <div style={{
            display: "flex", gap: 8, alignItems: "center",
            paddingTop: 14, paddingBottom: 14,
            overflowX: "auto", WebkitOverflowScrolling: "touch" as const,
          }} className="filter-scroll">
            <span className="eyebrow" style={{ marginRight: 6, flexShrink: 0 }}>Filtrar</span>
            {filterOptions.map(cat => {
              const active = filter === cat;
              return (
                <button key={cat} onClick={() => setFilter(cat)}
                  style={{
                    flexShrink: 0,
                    background: active ? "var(--ink)" : "transparent",
                    color: active ? "#fff" : "var(--ink)",
                    border: `1px solid ${active ? "var(--ink)" : "var(--hairline)"}`,
                    borderRadius: "var(--radius)",
                    padding: "6px 13px", cursor: "pointer",
                    fontSize: 13, fontWeight: 500,
                    fontFamily: "var(--body)",
                    transition: "all 140ms ease",
                  }}>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Groups ── */}
      <div className="ex-cards-wrap" style={{ maxWidth: 1440, margin: "0 auto", paddingTop: 48, paddingBottom: 96, padding: "48px 32px 96px" }}>
        {visible.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            <SearchX size={36} style={{ margin: "0 auto 12px", opacity: 0.4, display: "block" }} />
            <p style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-soft)" }}>
              Nenhum exemplo nesta categoria
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 72 }}>
            {visible.map((group, gi) => {
              const color = CAT_COLORS[group.name] ?? FALLBACK[gi % FALLBACK.length];
              return (
                <div key={group.name}>
                  {/* Category header */}
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "baseline",
                    marginBottom: 24, paddingBottom: 16,
                    borderBottom: `2px solid ${color.accent}`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span className="num-eyebrow" style={{ color: color.accent, fontWeight: 600 }}>
                        {String(gi + 1).padStart(2, "0")}
                      </span>
                      <h2 className="display-tight" style={{
                        fontSize: "clamp(28px, 3vw, 40px)",
                        letterSpacing: "-0.015em", lineHeight: 1.05,
                      }}>
                        {group.name}
                      </h2>
                    </div>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: color.bg, color: color.fg,
                      padding: "6px 12px", borderRadius: 999,
                      fontSize: 12, fontWeight: 600,
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: color.accent }} />
                      {group.items.length} {group.items.length === 1 ? "exemplo" : "exemplos"}
                    </span>
                  </div>

                  {/* Cards */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 20,
                  }} className="ex-cards-grid">
                    {group.items.map((ex, i) => {
                      const key = `${group.name}-${i}`;
                      return (
                        <ExampleCard
                          key={key}
                          example={ex}
                          color={color}
                          isOpen={expanded === key}
                          onToggle={() =>
                            setExpanded(expanded === key ? null : key)
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .ex-toggle:hover { background: var(--bg) !important; }
        .filter-scroll { scrollbar-width: none; }
        .filter-scroll::-webkit-scrollbar { display: none; }
        @media (max-width: 640px) {
          .ex-filter-inner { padding: 0 23px !important; }
          .ex-cards-wrap { padding: 32px 23px 64px !important; }
          .ex-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
