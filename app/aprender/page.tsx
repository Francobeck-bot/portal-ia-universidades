export const dynamic = "force-dynamic";

import { fetchLiteracy } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";
import AprenderClient from "@/components/AprenderClient";

export default async function AprenderPage() {
  const items = await fetchLiteracy(SHEETS_CONFIG.literacySheetUrl);

  return (
    <main style={{ background: "var(--bg)" }}>

      {/* ── Hero ── */}
      <section style={{
        backgroundImage: "linear-gradient(180deg, rgba(8,18,32,0.45) 0%, rgba(8,18,32,0.85) 100%), url(/hero-bg.jpg)",
        backgroundSize: "cover", backgroundPosition: "center",
        color: "var(--on-dark)",
      }}>
        <div className="container-wide" style={{ padding: "72px 32px 80px" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: 24, color: "rgba(255,255,255,0.55)" }}>
            Letramento em IA
          </span>
          <h1 className="display-tight" style={{
            fontSize: "clamp(44px, 5.6vw, 84px)",
            lineHeight: 1.02, letterSpacing: "-0.02em",
            maxWidth: 900, color: "#fff",
          }}>
            Aprender Inteligência Artificial
          </h1>
          <p className="lead" style={{ maxWidth: 600, marginTop: 32, color: "rgba(255,255,255,0.72)" }}>
            Do zero ao uso consciente. Entenda o que é IA, como funciona e como usá-la
            de forma ética e eficaz no contexto acadêmico.
          </p>
        </div>
      </section>

      <AprenderClient items={items} />

    </main>
  );
}
