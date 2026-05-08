"use client";

import { useState } from "react";
import { SearchX } from "lucide-react";
import Image from "next/image";
import type { Tool } from "@/lib/sheets";

// ── Category color system ─────────────────────────────────────
const CAT_COLORS: Record<string, { bg: string; fg: string; accent: string }> = {
  "tutoria":                      { bg: "#EEF2FF", fg: "#3730A3", accent: "#4F46E5" },
  "criação de conteúdo":          { bg: "#FEF3F2", fg: "#9F1239", accent: "#E11D48" },
  "feedback":                     { bg: "#ECFDF5", fg: "#065F46", accent: "#059669" },
  "produtividade":                { bg: "#FEF9C3", fg: "#713F12", accent: "#CA8A04" },
  "gerenciamento de informações": { bg: "#EFF6FF", fg: "#1E40AF", accent: "#3B82F6" },
  "pesquisa":                     { bg: "#FDF4FF", fg: "#6B21A8", accent: "#9333EA" },
};

// Index-based fallback palette so every card always gets a vivid color
const FALLBACK_PALETTE = [
  { bg: "#EEF2FF", fg: "#3730A3", accent: "#4F46E5" },
  { bg: "#FEF3F2", fg: "#9F1239", accent: "#E11D48" },
  { bg: "#ECFDF5", fg: "#065F46", accent: "#059669" },
  { bg: "#FEF9C3", fg: "#713F12", accent: "#CA8A04" },
  { bg: "#FDF4FF", fg: "#6B21A8", accent: "#9333EA" },
  { bg: "#EFF6FF", fg: "#1E40AF", accent: "#3B82F6" },
];

// ── Resolve color: case-insensitive → partial → index fallback ─
function resolveColor(tipo: string, index: number) {
  const primary = tipo.split(/[,;|/]/)[0].trim().toLowerCase();

  // Exact (normalised) match
  if (CAT_COLORS[primary]) return CAT_COLORS[primary];

  // Partial: tipo contains the key or key contains tipo
  const partial = Object.entries(CAT_COLORS).find(([key]) =>
    primary.includes(key) || key.includes(primary)
  );
  if (partial) return partial[1];

  // Guaranteed vivid fallback by card position
  return FALLBACK_PALETTE[index % FALLBACK_PALETTE.length];
}

// ── Logo images for known tools (replaces monogram cover) ────────
const TOOL_LOGOS: Record<string, string> = {
  "ChatGPT":            "/logos/chatgpt.png",
  "Microsoft Copilot":  "/logos/copilot-logo.png",
  "Claude (Anthropic)": "/logos/Claude_AI_logo.svg.png",
  "Google NotebookLM":  "/logos/NotebookLM_logo.svg.png",
  "Google Gemini":      "/logos/Google-Gemini-Logo.jpg",
  "Perplexity AI":      "/logos/Perplexity_AI_logo.svg.png",
  "Gamma":              "/logos/gamma ai logo.jpg",
  "Google AI Studio":   "/logos/google ai studio.png",
};

// ── Display label & size per tool name (for the cover monogram) ─
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
function getTags(tipo: string) {
  if (!tipo?.trim()) return [];
  return tipo.split(/[,;|/]/).map(t => t.trim()).filter(Boolean);
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
  if (!tipo?.trim()) return false;
  const lowerFilter = filter.toLowerCase();
  // Split on comma, semicolon, pipe or slash — whatever the Sheet uses
  const tags = tipo.split(/[,;|/]/).map(t => t.trim().toLowerCase()).filter(Boolean);
  return tags.some(t => t === lowerFilter || t.includes(lowerFilter) || lowerFilter.includes(t));
}

// ── Arrow SVG ─────────────────────────────────────────────────
function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

// ── Colored cover with tool name ──────────────────────────────
function ToolMonogram({ name, accent }: { name: string; accent: string }) {
  const logoSrc = TOOL_LOGOS[name];
  if (logoSrc) {
    return (
      <div style={{
        height: 140, background: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "0 32px",
        borderBottom: "1px solid var(--hairline)",
      }}>
        <Image
          src={logoSrc}
          alt={name}
          width={180}
          height={90}
          style={{ objectFit: "contain", maxHeight: 80, maxWidth: 180 }}
        />
      </div>
    );
  }

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

// ── Tutorial expand block ─────────────────────────────────────
function TutorialBlock({
  nome, videoUrl, accent, colorBg,
}: {
  nome: string; videoUrl: string; accent: string; colorBg: string;
}) {
  const [open, setOpen] = useState(false);
  const thumb = getYouTubeThumbnail(videoUrl);

  return (
    <div style={{ borderTop: "1px solid var(--hairline-soft)", marginTop: "auto" }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: "100%",
          display: "flex", alignItems: "center", gap: 12,
          padding: "14px 24px",
          background: open ? colorBg : "#fafbfc",
          border: 0, cursor: "pointer", textAlign: "left",
          transition: "background 180ms ease",
          fontFamily: "var(--body)",
          borderBottom: open ? "1px solid var(--hairline-soft)" : "none",
        }}
      >
        <span style={{
          width: 32, height: 32, borderRadius: "50%",
          background: accent, color: "#fff",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, flexShrink: 0,
        }}>▶</span>
        <span style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <span className="eyebrow" style={{ fontSize: 10, color: accent }}>Tutorial em vídeo</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>
            Como usar {nome} na prática
          </span>
        </span>
        <span style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.04em" }}>
          {open ? "Ocultar" : "Assistir"}
        </span>
      </button>

      {open && (
        <div style={{ padding: "16px 24px 20px", background: colorBg }}>
          {thumb ? (
            <a href={videoUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: "block", borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)" }}>
              <Image src={thumb} alt={`Tutorial: ${nome}`} width={640} height={360}
                style={{ width: "100%", display: "block", objectFit: "cover" }} />
            </a>
          ) : (
            <div style={{
              position: "relative", aspectRatio: "16 / 9",
              borderRadius: "var(--radius)", overflow: "hidden",
              background: `linear-gradient(135deg, ${accent} 0%, #1a1d22 100%)`,
              border: "1px solid rgba(0,0,0,0.08)",
            }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 14px)" }} />
              <div style={{ position: "absolute", left: 20, top: 18, fontFamily: "var(--display)", fontSize: 22, color: "rgba(255,255,255,0.92)", letterSpacing: "-0.01em" }}>{nome}</div>
              <div style={{ position: "absolute", left: 20, bottom: 16, fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Em breve</div>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.95)", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,0,0,0.4)", color: accent, fontSize: 18, paddingLeft: 3 }}>▶</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Modern Card ───────────────────────────────────────────────
function ModernCard({ tool, index }: { tool: Tool; index: number }) {
  const [hover, setHover] = useState(false);
  const color = resolveColor(tool.tipo, index);
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
      {/* Colored cover */}
      <ToolMonogram name={tool.nome} accent={color.accent} />

      <div style={{ padding: "24px 24px 20px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {/* Category pills (all types) */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tags.map(tag => (
            <span key={tag} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: color.bg, color: color.fg,
              padding: "5px 10px", borderRadius: 999,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: color.accent, flexShrink: 0 }} />
              {tag}
            </span>
          ))}
        </div>

        {/* Pricing */}
        <span className="num-eyebrow" style={{ fontSize: 11 }}>{tool.custo}</span>

        {/* Name */}
        <h3 style={{
          fontFamily: "var(--display)", fontSize: 28,
          letterSpacing: "-0.015em", lineHeight: 1.1,
          color: "var(--ink)", fontWeight: 400,
        }}>
          {tool.nome}
        </h3>

        {/* Description */}
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--muted)", whiteSpace: "pre-line" }}>
          {tool.descricao}
        </p>
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

      {/* Acessar */}
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

  const filtered = tools.filter(t => matchesType(t.tipo, selectedType));

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
        </div>
      </div>

      {/* ── Cards ── */}
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
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }} className="tools-grid">
            {filtered.map((tool, i) => (
              <ModernCard key={tool.nome} tool={tool} index={i} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .tool-link:hover { gap: 12px !important; }
        @media (max-width: 640px) {
          .tools-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
