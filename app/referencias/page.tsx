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
        backgroundImage: "linear-gradient(180deg, rgba(8,18,32,0.5) 0%, rgba(8,18,32,0.9) 100%), url(/hero-bg.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
        minHeight: 380,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center",
        color: "var(--on-dark)",
        position: "relative",
      }}>
        <Link href="/" style={{
          position: "absolute", top: 32,
          fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)", textDecoration: "none",
          fontFamily: "var(--body)", display: "inline-flex", alignItems: "center", gap: 8,
        }} className="ref-back">
          ← Voltar para o início
        </Link>
        <h1 className="display-tight" style={{
          fontSize: "clamp(64px, 9vw, 120px)",
          lineHeight: 0.95, letterSpacing: "-0.03em",
          color: "#fff", fontWeight: 400,
        }}>
          Referências
        </h1>
      </section>

      {/* ── Table ── */}
      <div style={{ overflowX: "auto" }}>
        <ReferencesTable references={references} />
      </div>

      <style>{`
        .ref-back:hover { color: rgba(255,255,255,0.75) !important; }
      `}</style>
    </main>
  );
}
