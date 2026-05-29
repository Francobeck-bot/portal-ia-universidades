"use client";

import { useState, useEffect } from "react";
import { SearchX, X } from "lucide-react";
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
  "Claude":             "/logos/Claude_AI_logo.svg.png",
  "Google NotebookLM":  "/logos/NotebookLM_logo.svg.png",
  "Google Gemini":      "/logos/Google-Gemini-Logo.jpg",
  "Perplexity AI":      "/logos/Perplexity_AI_logo.svg.png",
  "Gamma":              "/logos/gamma ai logo.jpg",
  "Google AI Studio":   "/logos/google ai studio logo.jpg",
  "Elicit":             "/logos/elicit ai logo.png",
  "Granola":            "/logos/granola ai logo.avif",
  "Manus AI":           "/logos/manus ai logo.png",
  "Teachy":             "/logos/teachy ai logo.svg",
};

// ── Display label & size per tool name (for the cover monogram) ─
const TOOL_COVER: Record<string, { label: string; fontSize: number }> = {
  "ChatGPT":             { label: "ChatGPT",    fontSize: 80 },
  "Microsoft Copilot":   { label: "Copilot",    fontSize: 80 },
  "Claude":              { label: "Claude",     fontSize: 80 },
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

// ── Single card color (uniform across all tools) ──────────────
const CARD_COLOR = { bg: "#EEF2FF", fg: "#3730A3", accent: "#4F46E5" };

// ── Tool detail modal (mobile only) ──────────────────────────
function ToolModal({ tool, onClose }: { tool: Tool; onClose: () => void }) {
  const color = CARD_COLOR;
  const tags = getTags(tool.tipo);
  const useCases = getUseCases(tool.casos_de_uso);
  const recommendedBy = getRecommendedBy(tool.universidades_que_recomendam);
  const hasVideo = !!tool.video_url?.trim();

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(10,15,25,0.6)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      backdropFilter: "blur(3px)",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "var(--surface)",
        width: "100%", maxWidth: 560,
        maxHeight: "90vh", overflowY: "auto",
        borderRadius: "14px 14px 0 0",
        boxShadow: "0 -8px 48px rgba(0,0,0,0.3)",
        overscrollBehavior: "contain",
      }}>
        {/* Header */}
        <div style={{
          position: "sticky", top: 0, zIndex: 1,
          background: "var(--surface)", borderBottom: "1px solid var(--hairline)",
          padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {tags.map(tag => (
              <span key={tag} style={{
                background: color.bg, color: color.fg,
                padding: "3px 8px", borderRadius: 999,
                fontSize: 10, fontWeight: 600, letterSpacing: "0.02em",
              }}>{tag}</span>
            ))}
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: 0, cursor: "pointer", color: "var(--muted)", padding: 4, display: "flex" }}>
            <X size={18} />
          </button>
        </div>

        {/* Logo */}
        <ToolMonogram name={tool.nome} accent={color.accent} />

        <div style={{ padding: "22px 24px 36px" }}>
          <span className="num-eyebrow" style={{ display: "block", marginBottom: 8 }}>{tool.custo}</span>
          <h2 style={{ fontFamily: "var(--display)", fontSize: 34, letterSpacing: "-0.015em", lineHeight: 1.05, color: "var(--ink)", marginBottom: 16 }}>
            {tool.nome}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--muted)", marginBottom: 24, whiteSpace: "pre-line" }}>
            {tool.descricao}
          </p>

          {useCases.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: 10, fontSize: 10 }}>Casos de uso</span>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {useCases.map(u => (
                  <span key={u} style={{ fontSize: 12, padding: "4px 10px", background: "var(--bg)", border: "1px solid var(--hairline)", borderRadius: "var(--radius)", color: "var(--ink-soft)" }}>{u}</span>
                ))}
              </div>
            </div>
          )}

          {recommendedBy.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <span className="eyebrow" style={{ display: "block", marginBottom: 6, fontSize: 10 }}>Recomendado por</span>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{recommendedBy.join(" · ")}</p>
            </div>
          )}

          {hasVideo && (
            <div style={{ marginBottom: 24 }}>
              <TutorialBlock nome={tool.nome} videoUrl={tool.video_url} accent={color.accent} colorBg={color.bg} />
            </div>
          )}

          <a href={tool.link} target="_blank" rel="noopener noreferrer" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            background: color.accent, color: "#fff",
            padding: "15px 24px", borderRadius: "var(--radius)",
            fontSize: 14, fontWeight: 600, textDecoration: "none",
          }}>
            Acessar ferramenta <Arrow />
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Modern Card ───────────────────────────────────────────────
function ModernCard({ tool, index, onMore }: { tool: Tool; index: number; onMore: () => void }) {
  const [hover, setHover] = useState(false);
  const color = CARD_COLOR;
  const tags = getTags(tool.tipo);
  const useCases = getUseCases(tool.casos_de_uso);
  const recommendedBy = getRecommendedBy(tool.universidades_que_recomendam);

  return (
    <article
      className="tool-card"
      data-tool={tool.nome}
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
      {/* Logo + tag badge */}
      <div style={{ position: "relative" }}>
        <ToolMonogram name={tool.nome} accent={color.accent} />
        {tool.tag?.trim() && (
          <span style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(15,23,42,0.78)",
            color: "#fff",
            fontSize: 10, fontWeight: 700,
            padding: "3px 8px",
            borderRadius: 999,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            backdropFilter: "blur(4px)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}>
            {tool.tag}
          </span>
        )}
      </div>

      <div className="tool-card-body" style={{ padding: "24px 24px 20px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
        {/* Category pills (all types) */}
        <div className="tool-card-pills" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
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
      <div className="tool-card-usecases" style={{ borderTop: "1px solid var(--hairline-soft)", padding: "16px 24px", background: "#fafbfc" }}>
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
        <div className="tool-card-recby" style={{ padding: "14px 24px", borderTop: "1px solid var(--hairline-soft)", background: "#fafbfc" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: 6, fontSize: 10 }}>Recomendado por</span>
          <p style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.5 }}>
            {recommendedBy.join(" · ")}
          </p>
        </div>
      )}

      {/* Tutorial + Acessar — visíveis no desktop, ocultos no mobile */}
      <div className="card-desktop-only">
        <TutorialBlock
          nome={tool.nome} videoUrl={tool.video_url}
          accent={color.accent} colorBg={color.bg}
        />
      </div>
      <div className="card-desktop-only" style={{ padding: "14px 24px", borderTop: "1px solid var(--hairline-soft)" }}>
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

      {/* Mais informações — visível só no mobile */}
      <div className="card-mobile-cta" style={{ display: "none", padding: "11px 12px", borderTop: "1px solid var(--hairline-soft)" }}>
        <button onClick={onMore} style={{
          fontSize: 12, fontWeight: 600, color: color.accent,
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "transparent", border: 0, cursor: "pointer",
          fontFamily: "var(--body)", padding: 0,
        }}>
          Mais informações <Arrow />
        </button>
      </div>
    </article>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function ToolsClient({ tools }: { tools: Tool[] }) {
  const [selectedType, setSelectedType] = useState("Todos");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);

  const filtered = tools.filter(t => matchesType(t.tipo, selectedType));

  return (
    <div>
      {/* ── Sticky filter bar ── */}
      <div className="tools-filter-wrap" style={{
        position: "sticky", top: 64, zIndex: 10,
        background: "var(--surface)",
        borderBottom: "1px solid var(--hairline)",
        margin: "0 -32px",
      }}>
        <div style={{ padding: "0 32px" }}>
          {/* Mobile toggle — hidden on desktop via CSS */}
          <button
            className="filter-toggle-btn"
            onClick={() => setFiltersOpen(v => !v)}
            style={{ display: "none" }}
          >
            <span className="eyebrow">
              Filtros{selectedType !== "Todos" ? ` · ${selectedType}` : ""}
            </span>
            <span style={{
              display: "inline-block", fontSize: 14, color: "var(--muted)",
              transition: "transform 200ms ease",
              transform: filtersOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}>▾</span>
          </button>

          {/* Filter pills — desktop: always visible; mobile: toggle */}
          <div
            className={`filter-pills-row filter-scroll${filtersOpen ? " filter-pills-open" : ""}`}
            style={{
              display: "flex", gap: 8, alignItems: "center",
              paddingTop: 14, paddingBottom: 14,
              overflowX: "auto", WebkitOverflowScrolling: "touch" as const,
            }}
          >
            <span className="eyebrow filter-label" style={{ marginRight: 6, flexShrink: 0 }}>Filtrar</span>
            {FILTER_TYPES.map(type => {
              const active = selectedType === type;
              return (
                <button key={type}
                  onClick={() => { setSelectedType(type); setFiltersOpen(false); }}
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
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }} className="tools-grid">
            {filtered.map((tool, i) => (
              <ModernCard key={tool.nome} tool={tool} index={i} onMore={() => setActiveTool(tool)} />
            ))}
          </div>
        )}
      </div>

      {activeTool && (
        <ToolModal tool={activeTool} onClose={() => setActiveTool(null)} />
      )}

      <style>{`
        .tool-link:hover { gap: 12px !important; }
        .filter-scroll { scrollbar-width: none; }
        .filter-scroll::-webkit-scrollbar { display: none; }

        @media (max-width: 640px) {
          /* Container */
          .tools-filter-wrap { margin: 0 -23px !important; }

          /* 2 colunas */
          .tools-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }

          /* Logos — caixa igual para todos, só reduz a imagem dentro */
          .tool-card > div:first-child { height: 80px !important; }
          .tool-card > div:first-child img { max-height: 56px !important; max-width: 126px !important; }
          .tool-card[data-tool="Google Gemini"] > div:first-child img { max-height: 72px !important; }
          .tool-card[data-tool="Teachy"] > div:first-child img { max-height: 80px !important; max-width: 180px !important; }

          /* Cards compactos */
          .tool-card-body { padding: 10px 10px 6px !important; gap: 5px !important; }

          /* Nome em destaque — no topo */
          .tool-card-body h3 { order: -1 !important; font-size: 26px !important; line-height: 0.95 !important; margin-bottom: 4px !important; }

          /* Pills muito menores */
          .tool-card-pills { gap: 3px !important; }
          .tool-card-pills > span { font-size: 7px !important; padding: 1px 4px !important; gap: 2px !important; letter-spacing: 0 !important; }
          .tool-card-pills > span > span { width: 3px !important; height: 3px !important; }

          /* Esconde descrição no card — aparece só no popup */
          .tool-card-body p { display: none !important; }
          .tool-card-usecases, .tool-card-recby { display: none !important; }
          .card-desktop-only { display: none !important; }
          .card-mobile-cta { display: block !important; }

          /* Botão filtros */
          .filter-toggle-btn {
            display: flex !important; width: 100%;
            justify-content: space-between; align-items: center;
            padding: 14px 0; background: transparent; border: 0;
            cursor: pointer; font-family: var(--body);
          }
          .filter-pills-row { display: none !important; }
          .filter-pills-row.filter-pills-open {
            display: flex !important; flex-wrap: wrap !important;
            overflow-x: visible !important;
            padding-top: 4px !important; padding-bottom: 14px !important;
          }
          .filter-label { display: none !important; }
        }
      `}</style>
    </div>
  );
}
