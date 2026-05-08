"use client";

import type { Reference } from "@/lib/sheets";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 12L12 2M12 2H5.5M12 2V8.5"
        stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function pad(n: string, i: number) {
  const num = n?.trim() ? n.trim() : String(i + 1);
  return num.padStart(2, "0");
}

export default function ReferencesTable({ references }: { references: Reference[] }) {
  return (
    <table style={{
      width: "100%",
      borderCollapse: "collapse",
      minWidth: 860,
    }}>
      {/* ── Header ── */}
      <thead>
        <tr style={{ background: "var(--charcoal)" }}>
          {[
            { label: "Nº",                  w: "56px"  },
            { label: "Universidade / Fonte", w: "18%"   },
            { label: "País",                 w: "72px"  },
            { label: "Tipo de Fonte",        w: "16%"   },
            { label: "Descrição",            w: "auto"  },
            { label: "Link",                 w: "72px"  },
          ].map(({ label, w }, i) => (
            <th key={label} style={{
              width: w,
              padding: i === 0 ? "16px 16px 16px 32px" : i === 5 ? "16px 32px 16px 16px" : "16px",
              textAlign: i === 5 ? "center" : "left",
              borderRight: i < 5 ? "1px solid rgba(255,255,255,0.08)" : "none",
              fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
              fontWeight: 600, color: "rgba(255,255,255,0.55)",
              fontFamily: "var(--body)", fontStyle: "normal",
            }}>
              {label}
            </th>
          ))}
        </tr>
      </thead>

      {/* ── Body ── */}
      <tbody>
        {references.map((ref, i) => (
          <tr key={i} className="ref-row" style={{
            borderBottom: "1px solid var(--hairline)",
            verticalAlign: "top",
          }}>
            {/* Nº */}
            <td style={{ padding: "22px 16px 22px 32px" }}>
              <span className="num-eyebrow" style={{ fontSize: 11, color: "var(--muted)" }}>
                {pad(ref.numero, i)}
              </span>
            </td>

            {/* Universidade */}
            <td style={{ padding: "22px 16px", borderLeft: "1px solid var(--hairline)" }}>
              <span style={{
                fontFamily: "var(--display)", fontSize: 18,
                letterSpacing: "-0.01em", lineHeight: 1.2,
                color: "var(--ink)",
              }}>
                {ref.universidade}
              </span>
            </td>

            {/* País */}
            <td style={{ padding: "22px 16px", borderLeft: "1px solid var(--hairline)" }}>
              <span style={{ fontSize: 13, color: "var(--muted)", whiteSpace: "nowrap" }}>
                {ref.pais}
              </span>
            </td>

            {/* Tipo */}
            <td style={{ padding: "22px 16px", borderLeft: "1px solid var(--hairline)" }}>
              <span style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.45 }}>
                {ref.tipo}
              </span>
            </td>

            {/* Descrição */}
            <td style={{ padding: "22px 16px", borderLeft: "1px solid var(--hairline)" }}>
              <span style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {ref.descricao}
              </span>
            </td>

            {/* Link */}
            <td style={{ padding: "22px 32px 22px 16px", borderLeft: "1px solid var(--hairline)", textAlign: "center" }}>
              {ref.link?.trim() && (
                <a
                  href={ref.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ref-link-btn"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    fontSize: 12, fontWeight: 600, color: "var(--ink)",
                    textDecoration: "none",
                    transition: "opacity 150ms ease",
                  }}
                >
                  Acessar <ArrowIcon />
                </a>
              )}
            </td>
          </tr>
        ))}
      </tbody>

      <style>{`
        .ref-row:hover { background: rgba(0,0,0,0.025); }
        .ref-link-btn:hover { opacity: 0.6; }
        @media (max-width: 860px) {
          table { min-width: 0 !important; }
          .ref-col-tipo, .ref-col-pais { display: none; }
        }
      `}</style>
    </table>
  );
}
