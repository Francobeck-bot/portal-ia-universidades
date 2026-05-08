export const dynamic = "force-dynamic";

import Link from "next/link";
import { fetchReferences } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";
import ReferencesClient from "@/components/ReferencesClient";

export default async function ReferenciasPage() {
  const references = await fetchReferences(SHEETS_CONFIG.referencesSheetUrl);

  return (
    <main style={{ background: "var(--bg)" }}>

      {/* ── Page header ── */}
      <section style={{
        backgroundImage: "linear-gradient(180deg, rgba(8,18,32,0.45) 0%, rgba(8,18,32,0.85) 100%), url(/hero-bg.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
        color: "var(--on-dark)",
      }}>
        <div className="container-wide" style={{ padding: "72px 32px 80px" }}>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)", textDecoration: "none",
            marginBottom: 28, fontFamily: "var(--body)",
          }}>
            ← Voltar ao início
          </Link>
          <span className="eyebrow" style={{ display: "block", marginBottom: 20, color: "rgba(255,255,255,0.55)" }}>
            {references.length} fontes indexadas
          </span>
          <h1 className="display-tight" style={{
            fontSize: "clamp(44px, 5.6vw, 84px)",
            lineHeight: 1.02, letterSpacing: "-0.02em",
            maxWidth: 1100, color: "#fff",
          }}>
            Referências
          </h1>
          <p className="lead" style={{ maxWidth: 600, marginTop: 28, color: "rgba(255,255,255,0.72)" }}>
            Diretrizes, guias e centros de recursos das principais universidades do mundo
            que embasam as recomendações deste portal.
          </p>
        </div>
      </section>

      {/* ── Table ── */}
      <div className="container-wide" style={{ padding: "0 32px" }}>
        <ReferencesClient references={references} />
      </div>

    </main>
  );
}
