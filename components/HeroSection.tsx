import Link from "next/link";
import { ArrowRight, BookOpen, Wrench, Lightbulb } from "lucide-react";

const quickLinks = [
  { href: "/diretrizes",  Icon: BookOpen,  label: "Diretrizes",      sub: "Uso responsável" },
  { href: "/ferramentas", Icon: Wrench,    label: "Ferramentas",     sub: "Catálogo de IA" },
  { href: "/exemplos",    Icon: Lightbulb, label: "Exemplos de Uso", sub: "Casos práticos" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #004aad 0%, #0a2f6e 45%, #5de0e6 100%)" }}>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Neon glow orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(93,224,230,0.35) 0%, transparent 70%)",
          transform: "translate(20%, -20%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,74,173,0.5) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">

          {/* Label pill */}
          <div className="inline-flex items-center gap-2 mb-6 border border-white/20 rounded-full
                           px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/70">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5de0e6] animate-pulse" />
            Engenharia de Produção · UFRGS · 2025
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black leading-[1.02] tracking-tight text-white mb-6">
            Inteligência
            <br />
            Artificial
            <br />
            <span style={{ color: "#5de0e6" }}>no Ensino</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-xl font-normal">
            Recursos práticos e baseados em evidências para professores e alunos
            usarem IA de forma responsável — inspirados nas melhores universidades do mundo.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-14">
            <Link
              href="/diretrizes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm
                         text-[#004aad] transition-all duration-200 hover:scale-105"
              style={{ background: "#5de0e6", boxShadow: "0 0 20px rgba(93,224,230,0.5)" }}
            >
              Ver Diretrizes <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ferramentas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm
                         text-white border-2 border-white/30 hover:border-[#5de0e6]
                         hover:text-[#5de0e6] transition-all duration-200"
            >
              Explorar Ferramentas
            </Link>
          </div>

          {/* Quick nav */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quickLinks.map(({ href, Icon, label, sub }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 bg-white/10 hover:bg-white/20
                           backdrop-blur-sm border border-white/15 hover:border-[#5de0e6]/60
                           rounded-xl px-4 py-3 transition-all duration-200"
              >
                <div className="bg-white/10 group-hover:bg-[#5de0e6]/20 p-2 rounded-lg transition-colors">
                  <Icon className="w-4 h-4 text-white group-hover:text-[#5de0e6] transition-colors" />
                </div>
                <div className="leading-tight">
                  <p className="text-white text-sm font-bold">{label}</p>
                  <p className="text-white/50 text-xs">{sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 50 1440 30V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
