import Image from "next/image";
import Link from "next/link";

const navCol = [
  { href: "/",            label: "Início" },
  { href: "/diretrizes",  label: "Diretrizes" },
  { href: "/ferramentas", label: "Ferramentas" },
  { href: "/exemplos",    label: "Exemplos de Uso" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--charcoal)", color: "var(--on-dark)" }}>
      <div className="container-wide" style={{ padding: "64px 32px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: 48, alignItems: "start" }}
             className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 22 }}>
              <Image
                src="/logo-ep-white.png"
                alt="Engenharia de Produção UFRGS"
                width={116}
                height={56}
                style={{ objectFit: "contain", display: "block" }}
              />
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: 360, marginBottom: 12 }}>
              Portal mantido pela COMGRAD do curso de Engenharia de Produção.
            </p>
            <a
              href="mailto:comgrad_engpro@ufrgs.br"
              style={{ fontSize: 13, color: "#fff", borderBottom: "1px solid rgba(255,255,255,0.3)", paddingBottom: 1 }}
            >
              comgrad_engpro@ufrgs.br
            </a>
          </div>

          {/* Nav */}
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: 16, color: "rgba(255,255,255,0.5)" }}>
              Navegar
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {navCol.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }} className="footer-link">
                    {it.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: 16, color: "rgba(255,255,255,0.5)" }}>
              Recursos
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <Link href="/referencias" style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }} className="footer-link">
                  Referências
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "18px 32px", maxWidth: 1440, margin: "24px auto 0", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <span className="num-eyebrow" style={{ color: "rgba(255,255,255,0.4)" }}>
          © 2026 Engenharia de Produção · UFRGS · Conteúdo aberto para fins educacionais
        </span>
        <span className="num-eyebrow" style={{ color: "rgba(255,255,255,0.4)" }}>
          Atualizado abr/2026
        </span>
      </div>

      <style>{`
        .footer-link:hover { color: #fff !important; }
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
