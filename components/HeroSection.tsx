"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Wrench, Lightbulb, Globe } from "lucide-react";

/* ---------- tiny floating-particle canvas ---------- */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; r: number; vx: number; vy: number; alpha: number };
    const particles: P[] = Array.from({ length: 60 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() * 2 + 0.5,
      vx:    (Math.random() - 0.5) * 0.3,
      vy:    -(Math.random() * 0.4 + 0.1),
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4)  p.y = canvas.height + 4;
        if (p.x < -4)  p.x = canvas.width  + 4;
        if (p.x > canvas.width + 4) p.x = -4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ---------- quick-nav cards ---------- */
const quickLinks = [
  { href: "/diretrizes",   Icon: BookOpen,  label: "Diretrizes",        sub: "Uso responsável" },
  { href: "/ferramentas",  Icon: Wrench,    label: "Ferramentas",       sub: "Catálogo de IA" },
  { href: "/exemplos",     Icon: Lightbulb, label: "Exemplos",          sub: "Casos práticos" },
  { href: "/benchmarking", Icon: Globe,     label: "Benchmarking",      sub: "Top universidades" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-bg min-h-[88vh] flex flex-col justify-center">

      {/* animated blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob-a absolute -top-32 -left-32 w-[520px] h-[520px]
                        rounded-full bg-blue-600/20 blur-3xl" />
        <div className="blob-b absolute bottom-0 right-0 w-[480px] h-[480px]
                        rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="blob-c absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[600px] h-[300px] rounded-full bg-ufrgs-blue/10 blur-3xl" />
      </div>

      {/* particle canvas */}
      <ParticleCanvas />

      {/* grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">

          {/* pill badge */}
          <div className="glass-pill mb-6">
            <span className="w-2 h-2 bg-ufrgs-gold rounded-full animate-pulse" />
            Disciplina PEP · Engenharia de Produção · UFRGS
          </div>

          {/* headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6 text-white">
            Inteligência
            <br />
            Artificial
            <br />
            <span className="text-ufrgs-gold">no Ensino</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed mb-10 max-w-2xl">
            Recursos práticos e baseados em evidências para professores e alunos de
            Engenharia de Produção usarem IA de forma responsável — inspirados nas
            melhores universidades do mundo.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link href="/diretrizes" className="btn-gold inline-flex items-center gap-2">
              Ver Diretrizes <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/benchmarking" className="btn-ghost inline-flex items-center gap-2">
              Benchmarking Global
            </Link>
          </div>

          {/* quick-nav strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickLinks.map(({ href, Icon, label, sub }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 bg-white/10 hover:bg-white/20
                           backdrop-blur-sm border border-white/15 hover:border-white/30
                           rounded-xl px-4 py-3 transition-all duration-200"
              >
                <div className="bg-white/10 p-2 rounded-lg group-hover:bg-ufrgs-gold/20 transition-colors">
                  <Icon className="w-4 h-4 text-white group-hover:text-ufrgs-gold transition-colors" />
                </div>
                <div className="leading-tight">
                  <p className="text-white text-sm font-semibold">{label}</p>
                  <p className="text-white/60 text-xs">{sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80V40C240 0 480 0 720 40C960 80 1200 80 1440 40V80H0Z" fill="#f8faff" />
        </svg>
      </div>
    </section>
  );
}
