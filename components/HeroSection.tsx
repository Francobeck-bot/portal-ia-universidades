export default function HeroSection() {
  return (
    <section className="hero-section" style={{
      position: "relative",
      minHeight: 420,
      backgroundImage: "linear-gradient(180deg, rgba(8,18,32,0.35) 0%, rgba(8,18,32,0.70) 100%), url(/hero-bg.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "var(--on-dark)",
      overflow: "hidden",
    }}>
      <div style={{
        maxWidth: 1440, margin: "0 auto",
        padding: "64px 32px 72px",
        minHeight: 420,
        display: "grid",
        gap: 56,
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
            Recursos para docentes
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-section { min-height: 0 !important; }
          .hero-fiel-grid {
            grid-template-columns: 1fr !important;
            min-height: 0 !important;
            padding-top: 34px !important;
            padding-bottom: 34px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .hero-section h1 { font-size: 50px !important; }
        }
      `}</style>
    </section>
  );
}
