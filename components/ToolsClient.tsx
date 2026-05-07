"use client";

import { useState } from "react";
import { ExternalLink, SearchX } from "lucide-react";
import Image from "next/image";
import type { Tool } from "@/lib/sheets";

// ── Category color system ─────────────────────────────────────
const CAT_COLORS: Record<string, { bg: string; fg: string; accent: string }> = {
  "Tutoria":                      { bg: "#EEF2FF", fg: "#3730A3", accent: "#4F46E5" },
  "Criação de Conteúdo":          { bg: "#FEF3F2", fg: "#9F1239", accent: "#E11D48" },
  "Feedback":                     { bg: "#ECFDF5", fg: "#065F46", accent: "#059669" },
  "Produtividade":                { bg: "#FEF9C3", fg: "#713F12", accent: "#CA8A04" },
  "Gerenciamento de informações": { bg: "#F1F5F9", fg: "#334155", accent: "#475569" },
  "Pesquisa":                     { bg: "#FDF4FF", fg: "#6B21A8", accent: "#9333EA" },
};
const DEFAULT_COLOR = { bg: "#F1F5F9", fg: "#334155", accent: "#475569" };

// ── Display label & size per tool (for the colorful cover) ────
const TOOL_COVER: Record<string, { label: string; fontSize: number }> = {
  "ChatGPT":             { label: "ChatGPT",    fontSize: 80 },
  "Microsoft Copilot":   { label: "Copilot",    fontSize: 80 },
  "Claude (Anthropic)":  { label: "Claude",     fontSize: 80 },
  "Google NotebookLM":   { label: "NotebookLM", fontSize: 50 },
  "Google Gemini":       { label: "Gemini",     fontSize: 70 },
  "Google AI Studio":    { label: "Ai Studio",  fontSize: 60 },
  "Perplexity AI":       { label: "Perplexity", fontSize: 60 },
  "Gamma":               { label: "Gamma",      fontSize: 80 },
  "Granola":             { label: "Granola",    fontSize: 70 },
  "Elicit":              { label: "Elicit",     fontSize: 90 },
  "Manus AI":            { label: "Manus",      fontSize: 90 },
  "Teachy":              { label: "Teachy",     fontSize: 90 },
};

const FILTER_TYPES = [
  "Todos", "Tutoria", "Criação de Conteúdo", "Feedback",
  "Produtividade", "Gerenciamento de informações", "Pesquisa",
];

// ── Helpers ───────────────────────────────────────────────────
function getPrimaryColor(tipo: string) {
  const primary = tipo.split(",")[0].trim();
  return CAT_COLORS[primary] ?? DEFAULT_COLOR;
}
function getTags(tipo: string) {
  return tipo.split(",").map(t => t.trim()).filter(Boolean);
}
function getUseCases(casos: string) {
  return casos.split(",").map(c => c.trim()).filter(Boolean);
}
function getRecommendedBy(unis: string) {
  if (!unis?.trim()) return [];
  return unis.split(/[,·]/g).map(u => u.trim()).filter(Boolean);
}
function getYouTubeThumbnail(url: string): string | null {
  if (!url?.trim()) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? `https://img.youtube.com/vi/${m[1]}/mqdefault.jpg` : null;
}
function matchesType(tipo: string, filter: string) {
  if (filter === "Todos") return true;
  return tipo.split(",").some(t => t.trim().toLowerCase() === filter.toLowerCase());
}

// ── Shared arrow SVG ─────────────────────────────────────────
function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

// ── ToolMonogram — colored cover with big tool name ───────────
function ToolMonogram({ name, accent }: { name: string; accent: string }) {
  const cfg = TOOL_COVER[name] ?? {
    label: name.replace(/\(.*?\)/g, "").trim(),
    fontSize: name.length > 10 ? 48 : name.length > 7 ? 60 : 80,
  };
  return (
    <div style={{
      height: 140, background: accent,
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "0 20px",
    }}>
      <span className="display" style={{
        fontSize: cfg.fontSize, color: "#fff",
        letterSpacing: "-0.03em", lineHeight: 1, textAlign: "center",
      }}>{cfg.label}</span>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at top right, rgba(255,255,255,0.22), transparent 60%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

// ── Tutorial section (shared between both card layouts) ───────
function TutorialBlock({
  nome, videoUrl, accent, colorBg,
  dark = false,
}: {
  nome: string; videoUrl: string; accent: string; colorBg: string; dark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const thumb = getYouTubeThumbnail(videoUrl);

  return (
    <div style={{ borderTop: "1px solid var(--hairline-soft)", marginTop: "auto" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%",
          display: "flex", alignItems: "center", gap: dark ? 14 : 12,
          padding: dark ? "18px 28px" : "14px 24px",
          background: open ? (dark ? "#0f1114" : colorBg) : (dark ? "transparent" : "#fafbfc"),
          color: dark ? (open ? "#fff" : "var(--ink)") : "var(--ink)",
          border: 0, cursor: "pointer", textAlign: "left",
          transition: "background 180ms ease, color 180ms ease",
          fontFamily: "var(--body)",
        }}
        className={dark ? "tut-dark-toggle" : ""}
      >
        <span style={{
          width: dark ? 34 : 32, height: dark ? 34 : 32,
          borderRadius: "50%", background: accent, color: "#fff",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, flexShrink: 0,
        }}>▶</span>
        <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <span className="eyebrow" style={{
            fontSize: 10,
            color: open
              ? (dark ? "rgba(255,255,255,0.55)" : accent)
              : (dark ? "var(--muted)" : accent),
          }}>Tutorial em vídeo</span>
          <span style={{ fontSize: dark ? 14 : 13, fontWeight: 500, fontFamily: "var(--display)", letterSpacing: "-0.005em" }}>
            Como usar {nome} na prática
          </span>
        </span>
        <span style={{
          fontSize: 11, letterSpacing: "0.04em",
          color: open ? (dark ? "rgba(255,255,255,0.6)" : "var(--muted)") : "var(--muted)",
        }}>
          {open ? "Ocultar" : "Assistir"}
        </span>
      </button>

      {open && (
        <div style={{
          padding: dark ? "0 28px 24px" : "16px 24px 20px",
          background: dark ? "#0f1114" : colorBg,
        }}>
          {thumb ? (
            <a href={videoUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)" }}>
              <Image
                src={thumb} alt={`Tutorial: ${nome}`}
                width={640} height={360}
                style={{ width: "100%", display: "block", objectFit: "cover" }}
              />
            </a>
          ) : (
            // Styled placeholder when no video URL
            <div style={{
              position: "relative", aspectRatio: "16 / 9",
              borderRadius: "var(--radius)", overflow: "hidden",
              background: `linear-gradient(135deg, ${accent} 0%, #1a1d22 100%)`,
              border: "1px solid rgba(0,0,0,0.08)",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 14px)",
              }} />
              <div style={{ position: "absolute", left: 20, top: 18, fontFamily: "var(--display)", fontSize: 22, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em" }}>
                {nome}
              </div>
              <div style={{ position: "absolute", left: 20, bottom: 16, fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Em breve
              </div>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "rgba(255,255,255,0.95)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  color: accent, fontSize: 18, paddingLeft: 3,
                }}>▶</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Editorial Card (hairline grid, monochrome) ────────────────
function EditorialCard({ tool, index }: { tool: Tool; index: number }) {
  const color = getPrimaryColor(tool.tipo);
  const tags = getTags(tool.tipo);
  const useCases = getUseCases(tool.casos_de_uso);
  const recommendedBy = getRecommendedBy(tool.universidades_que_recomendam);

  return (
    <article style={{
      borderRight: "1px solid var(--hairline)",
      borderBottom: "1px solid var(--hairline)",
      padding: "32px 28px 0",
      background: "var(--surface)",
      display: "flex", flexDirection: "column", gap: 16,
    }}>
      <span className="num-eyebrow">{String(index + 1).padStart(2, "0")} · {tool.custo}</span>

      <h3 className="display" style={{ fontSize: 30, letterSpacing: "-0.01em", lineHeight: 1.05 }}>
        {tool.nome}
      </h3>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tags.map(tag => (
          <span key={tag} style={{
            fontSize: 11, padding: "3px 8px",
            border: "1px solid var(--hairline)", borderRadius: 999,
            color: "var(--muted)", letterSpacing: "0.02em",
          }}>{tag}</span>
        ))}
      </div>

      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "var(--muted)" }}>{tool.descricao}</p>

      <div style={{ borderTop: "1px solid var(--hairline)", paddingTop: 14 }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: 8, fontSize: 10 }}>Casos de uso</span>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
          {useCases.map(u => (
            <li key={u} style={{ fontSize: 13, color: "var(--ink-soft)", display: "grid", gridTemplateColumns: "14px 1fr", gap: 8 }}>
              <span style={{ color: "var(--muted-soft)", fontFamily: "var(--mono)", fontSize: 11 }}>—</span>
              <span>{u}</span>
            </li>
          ))}
        </ul>
      </div>

      {recommendedBy.length > 0 && (
        <div style={{ borderTop: "1px solid var(--hairline)", paddingTop: 14 }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: 8, fontSize: 10 }}>Recomendado por</span>
          <p style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.5 }}>
            {recommendedBy.join(" · ")}
          </p>
        </div>
      )}

      <div style={{ marginTop: "auto", paddingTop: 20 }}>
        <a href={tool.link} target="_blank" rel="noopener noreferrer"
          className="link-arrow" style={{ fontSize: 13 }}>
          Acessar ferramenta <Arrow />
        </a>
      </div>

      <TutorialBlock
        nome={tool.nome} videoUrl={tool.video_url}
        accent={color.accent} colorBg={color.bg} dark
      />
    </article>
  );
}

// ── Modern Card (colored cover, hover lift, category colors) ──
function ModernCard({ tool }: { tool: Tool }) {
  const [hover, setHover] = useState(false);
  const color = getPrimaryColor(tool.tipo);
  const tags = getTags(tool.tipo);
  const useCases = getUseCases(tool.casos_de_uso);
  const recommendedBy = getRecommendedBy(tool.universidades_que_recomendam);

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
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover
          ? "0 12px 32px rgba(15,23,42,0.12)"
          : "0 1px 2px rgba(15,23,42,0.04)",
      }}
    >
      <ToolMonogram name={tool.nome} accent={color.accent} />

      <div style={{ padding: "24px 24px 20px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {/* Category pill + pricing */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: color.bg, color: color.fg,
            padding: "5px 10px", borderRadius: 999,
            fontSize: 11, fontWeight: 600, letterSpacing: "0.02em",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: color.accent }} />
            {tags[0]}
          </span>
          <span className="num-eyebrow" style={{ fontSize: 11 }}>{tool.custo}</span>
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: "var(--display)", fontSize: 28,
          letterSpacing: "-0.015em", lineHeight: 1.1,
          color: "var(--ink)", fontWeight: 400,
        }}>
          {tool.nome}
        </h3>

        {/* Description */}
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--muted)" }}>
          {tool.descricao}
        </p>

        {/* Secondary tags */}
        {tags.length > 1 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {tags.slice(1).map(tag => (
              <span key={tag} style={{
                fontSize: 11, padding: "3px 8px",
                background: "#f4f5f6", color: "var(--muted)",
                borderRadius: 4,
              }}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Use cases */}
      <div style={{ borderTop: "1px solid var(--hairline-soft)", padding: "16px 24px", background: "#fafbfc" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: 10, fontSize: 10 }}>Casos de uso</span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {useCases.map(u => (
            <span key={u} style={{
              fontSize: 12, padding: "4px 10px",
              background: "#fff", border: "1px solid var(--hairline)",
              borderRadius: "var(--radius)", color: "var(--ink-soft)",
            }}>{u}</span>
          ))}
        </div>
      </div>

      {/* Recommended by */}
      {recommendedBy.length > 0 && (
        <div style={{ padding: "14px 24px", borderTop: "1px solid var(--hairline-soft)", background: "#fafbfc" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: 6, fontSize: 10 }}>Recomendado por</span>
          <p style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.5 }}>
            {recommendedBy.join(" · ")}
          </p>
        </div>
      )}

      {/* Tutorial */}
      <TutorialBlock
        nome={tool.nome} videoUrl={tool.video_url}
        accent={color.accent} colorBg={color.bg}
      />

      {/* Acessar ferramenta */}
      <div style={{ padding: "14px 24px", borderTop: "1px solid var(--hairline-soft)" }}>
        <a
          href={tool.link} target="_blank" rel="noopener noreferrer"
          className="tool-link"
          style={{
            fontSize: 13, fontWeight: 600, color: color.accent,
            display: "inline-flex", alignItems: "center", gap: 8,
            textDecoration: "none", transition: "gap 160ms ease",
          }}
        >
          Acessar ferramenta <Arrow />
        </a>
      </div>
    </article>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function ToolsClient({ tools }: { tools: Tool[] }) {
  const [selectedType, setSelectedType] = useState("Todos");
  const [layout, setLayout] = useState<"editorial" | "modern">("modern");

  const filtered = tools.filter(t => matchesType(t.tipo, selectedType));

  return (
    <div>
      {/* ── Sticky filter + layout toggle ── */}
      <div style={{
        position: "sticky", top: 64, zIndex: 10,
        background: "var(--surface)",
        borderBottom: "1px solid var(--hairline)",
        margin: "0 -32px",
      }}>
        <div className="container-wide" style={{
          padding: "0 32px",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", gap: 24, flexWrap: "wrap",
          minHeight: 56,
        }}>
          {/* Category filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", paddingTop: 14, paddingBottom: 14 }}>
            <span className="eyebrow" style={{ marginRight: 6, flexShrink: 0 }}>Filtrar</span>
            {FILTER_TYPES.map(type => {
              const active = selectedType === type;
              return (
                <button key={type} onClick={() => setSelectedType(type)}
                  style={{
                    background: active ? "var(--ink)" : "transparent",
                    color: active ? "#fff" : "var(--ink)",
                    border: `1px solid ${active ? "var(--ink)" : "var(--hairline)"}`,
                    borderRadius: "var(--radius)",
                    padding: "6px 13px", cursor: "pointer",
                    fontSize: 13, fontWeight: 500,
                    fontFamily: "var(--body)",
                    transition: "all 140ms ease",
                  }}>
                  {type}
                </button>
              );
            })}
          </div>

          {/* Layout toggle */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            borderLeft: "1px solid var(--hairline)", paddingLeft: 20,
            flexShrink: 0, paddingTop: 14, paddingBottom: 14,
          }}>
            <span className="eyebrow" style={{ fontSize: 10 }}>Layout</span>
            <div style={{
              display: "inline-flex",
              border: "1px solid var(--hairline)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
            }}>
              {(["modern", "editorial"] as const).map((opt, i) => {
                const active = layout === opt;
                return (
                  <button key={opt} onClick={() => setLayout(opt)}
                    style={{
                      background: active ? "var(--ink)" : "transparent",
                      color: active ? "#fff" : "var(--muted)",
                      border: 0,
                      borderLeft: i > 0 ? "1px solid var(--hairline)" : "none",
                      padding: "6px 13px", cursor: "pointer",
                      fontSize: 12, fontWeight: 500, letterSpacing: "0.02em",
                      fontFamily: "var(--body)",
                    }}>
                    {opt === "modern" ? "Moderna" : "Editorial"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div style={{ paddingTop: 48, paddingBottom: 96 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            <SearchX size={36} style={{ margin: "0 auto 12px", opacity: 0.4, display: "block" }} />
            <p style={{ fontSize: 15, fontWeight: 500, color: "var(--ink-soft)" }}>
              Nenhuma ferramenta nesta categoria
            </p>
            <p style={{ fontSize: 13, marginTop: 6 }}>
              Tente selecionar &ldquo;Todos&rdquo; para ver o catálogo completo.
            </p>
          </div>
        ) : layout === "editorial" ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            borderTop: "1px solid var(--hairline)",
            borderLeft: "1px solid var(--hairline)",
          }} className="tools-editorial-grid">
            {filtered.map((tool, i) => (
              <EditorialCard key={tool.nome} tool={tool} index={i} />
            ))}
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }} className="tools-modern-grid">
            {filtered.map(tool => (
              <ModernCard key={tool.nome} tool={tool} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .tool-link:hover { gap: 12px !important; }
        .tut-dark-toggle:hover { background: #f5f6f7 !important; color: var(--ink) !important; }
        @media (max-width: 640px) {
          .tools-editorial-grid { grid-template-columns: 1fr !important; }
          .tools-modern-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
