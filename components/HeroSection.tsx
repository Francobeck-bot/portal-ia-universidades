import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "78vh", background: "#12181f" }}
    >
      {/* Background photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(8, 18, 32, 0.52)" }}
      />

      {/* Content — items pinned to bottom like Harvard */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
                    flex flex-col justify-end pb-16 md:pb-24"
        style={{ minHeight: "78vh" }}
      >
        {/* Eyebrow label */}
        <p
          className="text-xs font-bold uppercase tracking-widest mb-8"
          style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, system-ui, sans-serif" }}
        >
          Engenharia de Produção · UFRGS · 2025
        </p>

        {/* Two-column editorial layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 items-end">

          {/* Left: Display heading */}
          <div className="md:col-span-2">
            <h1
              className="text-white leading-[1.0]"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
            >
              Inteligência
              <br />Artificial
              <br />
              <span style={{ color: "#5de0e6" }}>no Ensino Superior</span>
            </h1>
          </div>

          {/* Right: Description + links */}
          <div className="flex flex-col gap-7 pb-1">
            <p
              className="text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)", fontFamily: "Inter, system-ui, sans-serif" }}
            >
              Recursos práticos e baseados em evidências para professores e alunos
              usarem IA de forma responsável, inspirados nas melhores universidades do mundo.
            </p>

            <div className="flex flex-col gap-4">
              <Link
                href="/diretrizes"
                className="inline-flex items-center gap-2 text-sm font-semibold
                           transition-all duration-200 self-start group"
                style={{
                  color: "white",
                  fontFamily: "Inter, system-ui, sans-serif",
                  borderBottom: "1px solid rgba(255,255,255,0.35)",
                  paddingBottom: "2px",
                }}
              >
                Ver Diretrizes <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/ferramentas"
                className="inline-flex items-center gap-2 text-sm font-medium
                           hover:text-white transition-colors duration-200 self-start"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "Inter, system-ui, sans-serif",
                }}
              >
                Explorar Ferramentas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
