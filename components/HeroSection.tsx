export default function HeroSection() {
  return (
    <section style={{
      position: "relative",
      minHeight: 280,
      backgroundImage: "linear-gradient(180deg, rgba(8,18,32,0.35) 0%, rgba(8,18,32,0.70) 100%), url(/hero-bg.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "var(--on-dark)",
      overflow: "hidden",
    }}>
      <div style={{
        maxWidth: 1440, margin: "0 auto",
        padding: "44px 32px 52px",
        minHeight: 280,
        display: "grid",
        gap: 40,
        alignItems: "center",
      }} className="hero-fiel-grid">
        {/* Left: headline */}
        <div>
          <h1 className="display-tight" style={{
            fontSize: "clamp(44px, 5.6vw, 84px)",
            lineHeight: 1.02,
            color: "#fff",
            letterSpacing: "-0.015em",
          }}>
            Inteligência Artificial<br />
            no Ensino Superior
          </h1>
        </div>

        {/* Right: subtitle */}
        <div style={{ maxWidth: 380 }}>
          <p className="display" style={{
            fontSize: "clamp(22px, 2vw, 30px)",
            lineHeight: 1.2,
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "-0.005em",
          }}>
            Recursos para docentes da UFRGS
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-fiel-grid {
            grid-template-columns: 1fr !important;
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
