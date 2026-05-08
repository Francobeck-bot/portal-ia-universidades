"use client";

import type { Reference } from "@/lib/sheets";

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 13L13 3M13 3H6M13 3V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function pad(n: string | number, i: number) {
  const num = typeof n === "string" && n.trim() ? n.trim() : String(i + 1);
  return num.padStart(2, "0");
}

export default function ReferencesTable({ references }: { references: Reference[] }) {
  return (
    <div style={{ marginTop: 0 }}>

      {/* ── Table header ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "56px 200px 80px 200px 1fr 64px",
        gap: 0,
        background: "var(--charcoal)",
        borderRadius: "0 0 0 0",
      }} className="ref-grid">
        {["Nº", "Universidade / Fonte", "País", "Tipo de Fonte", "Descrição", "Link"].map((col, i) => (
          <div key={col} style={{
            padding: i === 0 ? "16px 12px 16px 0" : "16px 16px",
            borderRight: i < 5 ? "1px solid rgba(255,255,255,0.1)" : "none",
          }}>
            <span style={{
              fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
              fontWeight: 600, color: "rgba(255,255,255,0.6)",
              fontFamily: "var(--body)",
            }}>{col}</span>
          </div>
        ))}
      </div>

      {/* ── Rows ── */}
      <div style={{ border: "1px solid var(--hairline)", borderTop: "none" }}>
        {references.map((ref, i) => (
          <div
            key={i}
            style={{
              display: "grid",
              gridTemplateColumns: "56px 200px 80px 200px 1fr 64px",
              gap: 0,
              borderBottom: i < references.length - 1 ? "1px solid var(--hairline)" : "none",
              transition: "background 120ms ease",
            }}
            className="ref-row ref-grid"
          >
            {/* Nº */}
            <div style={{ padding: "20px 12px 20px 0", display: "flex", alignItems: "flex-start" }}>
              <span className="num-eyebrow" style={{ fontSize: 11, color: "var(--muted)" }}>
                {pad(ref.numero, i)}
              </span>
            </div>

            {/* Universidade */}
            <div style={{ padding: "20px 16px", borderLeft: "1px solid var(--hairline)", display: "flex", alignItems: "flex-start" }}>
              <span style={{
                fontFamily: "var(--display)",
                fontSize: 17, letterSpacing: "-0.01em", lineHeight: 1.2,
                color: "var(--ink)", fontWeight: 400,
              }}>
                {ref.universidade}
              </span>
            </div>

            {/* País */}
            <div style={{ padding: "20px 16px", borderLeft: "1px solid var(--hairline)", display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.4 }}>
                {ref.pais}
              </span>
            </div>

            {/* Tipo */}
            <div style={{ padding: "20px 16px", borderLeft: "1px solid var(--hairline)", display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.4 }}>
                {ref.tipo}
              </span>
            </div>

            {/* Descrição */}
            <div style={{ padding: "20px 16px", borderLeft: "1px solid var(--hairline)", display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.55, whiteSpace: "pre-line" }}>
                {ref.descricao}
              </span>
            </div>

            {/* Link */}
            <div style={{ padding: "20px 0 20px 16px", borderLeft: "1px solid var(--hairline)", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
              {ref.link?.trim() && (
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "var(--ink)", color: "#fff",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    textDecoration: "none", flexShrink: 0,
                    transition: "transform 160ms ease, background 160ms ease",
                  }}
                  className="ref-link-circle"
                >
                  <ArrowIcon />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .ref-row:hover { background: rgba(0,0,0,0.02); }
        .ref-link-circle:hover { transform: scale(1.1); background: #000 !important; }
        @media (max-width: 900px) {
          .ref-grid { grid-template-columns: 40px 1fr 60px 64px !important; }
          .ref-col-tipo { display: none; }
        }
        @media (max-width: 640px) {
          .ref-grid { grid-template-columns: 36px 1fr 48px !important; }
          .ref-col-pais { display: none; }
        }
      `}</style>
    </div>
  );
}
