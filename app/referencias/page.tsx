export const dynamic = "force-dynamic";

import Link from "next/link";
import { fetchReferences } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";
import ReferencesTable from "@/components/ReferencesClient";

export default async function ReferenciasPage() {
  const references = await fetchReferences(SHEETS_CONFIG.referencesSheetUrl);

  return (
    <main style={{ background: "var(--bg)" }}>

      {/* ── Hero ── */}
      <section style={{
        backgroundImage: "linear-gradient(180deg, rgba(8,18,32,0.55) 0%, rgba(8,18,32,0.88) 100%), url(/hero-bg.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
        color: "var(--on-dark)",
        minHeight: 320,
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <div className="container-wide" style={{ padding: "32px 32px 56px" }}>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.45)", textDecoration: "none",
            marginBottom: 32, fontFamily: "var(--body)",
            transition: "color 160ms ease",
          }} className="ref-back-link">
            ← Voltar para o início
          </Link>
          <h1 className="display-tight" style={{
            fontSize: "clamp(56px, 7vw, 100px)",
            lineHeight: 0.96, letterSpacing: "-0.025em",
            color: "#fff", fontWeight: 400,
          }}>
            Referências
          </h1>
        </div>
      </section>

      {/* ── Table ── */}
      <div className="container-wide" style={{ padding: "0 32px 96px" }}>
        <ReferencesTable references={references} />
      </div>

      <style>{`
        .ref-back-link:hover { color: rgba(255,255,255,0.75) !important; }
      `}</style>

    </main>
  );
}
