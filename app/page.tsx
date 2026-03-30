import Link from "next/link";
import { ArrowRight, BookOpen, Wrench, Lightbulb } from "lucide-react";
import HeroSection from "@/components/HeroSection";

const stats = [
  {
    value: "2×",
    label: "mais aprendizagem",
    source: "Harvard · 2025",
    detail:
      "Tutor IA (PS2 Pal) gerou o dobro de aprendizagem em estudo controlado com 194 alunos de Física. O maior ganho já medido em comparação com aula ativa tradicional.",
  },
  {
    value: "75–97%",
    label: "de precisão nas respostas",
    source: "Georgia Tech · Jill Watson",
    detail:
      "Assistente virtual Jill Watson responde dúvidas dos alunos 24/7 com precisão de 75 a 97%. Estudantes passaram semanas sem perceber que não era humana.",
  },
  {
    value: "Simulação",
    label: "de pacientes com IA",
    source: "NUS · Singapura",
    detail:
      "Chatbot simula pacientes para estudantes de saúde praticarem anamnese e diagnóstico antes de situações reais. Usado amplamente desde 2020.",
  },
];

const pages = [
  {
    href: "/diretrizes",
    Icon: BookOpen,
    title: "Diretrizes",
    description:
      "5 princípios para uso responsável e 3 modelos prontos de política de IA para o syllabus.",
    tag: "Para professores",
    accent: "#004aad",
  },
  {
    href: "/ferramentas",
    Icon: Wrench,
    title: "Ferramentas",
    description:
      "Catálogo curado de ferramentas recomendadas por Harvard, MIT, Imperial e outras.",
    tag: "8 ferramentas",
    accent: "#5de0e6",
  },
  {
    href: "/exemplos",
    Icon: Lightbulb,
    title: "Exemplos de Uso",
    description:
      "Casos práticos reais com instruções de como implementar na sua disciplina hoje.",
    tag: "7 exemplos",
    accent: "#004aad",
  },
];

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────── */}
      <HeroSection />

      {/* ── NAVIGATION CARDS ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10">
          <p className="section-label">O que você encontra aqui</p>
          <h2 className="section-title">Tudo em um só lugar</h2>
          <p className="section-sub max-w-xl">
            De diretrizes a ferramentas, de casos práticos a instruções passo a passo.
            Conteúdo baseado nas melhores universidades do mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pages.map(({ href, Icon, title, description, tag, accent }) => (
            <Link
              key={href}
              href={href}
              className="group card card-hover p-7 flex flex-col"
              style={{ borderTop: `3px solid ${accent}` }}
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="p-2.5 rounded-lg"
                  style={{ background: `${accent}18` }}
                >
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <span className="text-xs text-gray-400 font-semibold">{tag}</span>
              </div>
              <h3 className="font-black text-gray-900 text-xl mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{description}</p>
              <span
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold
                             group-hover:gap-3 transition-all duration-200"
                style={{ color: accent }}
              >
                Acessar <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── STATS ────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg, #004aad 0%, #0a2f6e 50%, #5de0e6 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-12">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3"
               style={{ color: "#5de0e6" }}>
              <span className="w-4 h-px" style={{ background: "#5de0e6" }} />
              Evidências de universidades globais
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Por que usar IA no ensino?
            </h2>
            <p className="text-white/60 text-lg max-w-xl">
              Números reais de pesquisas nas melhores universidades, para quem ainda tem dúvidas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(({ value, label, source, detail }, i) => (
              <div
                key={i}
                className="rounded-xl p-8 border transition-colors duration-200"
                style={{
                  background: "rgba(0, 10, 30, 0.55)",
                  borderColor: "rgba(93,224,230,0.25)",
                  backdropFilter: "blur(2px)",
                }}
              >
                <div
                  className="text-5xl font-black mb-1"
                  style={{
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg, #ffffff 40%, #5de0e6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {value}
                </div>
                <div
                  className="text-xs font-bold mb-1 uppercase"
                  style={{ color: "#5de0e6", letterSpacing: "0.1em" }}
                >
                  {label}
                </div>
                <div className="text-xs mb-5 font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {source}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.82)" }}>
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          className="rounded-2xl p-10 md:p-14 flex flex-col md:flex-row
                       md:items-center justify-between gap-8 border border-gray-100"
          style={{ background: "linear-gradient(135deg, #004aad08, #5de0e610)" }}
        >
          <div>
            <h2 className="section-title mb-2">Pronto para começar?</h2>
            <p className="text-gray-500 max-w-md">
              Comece pelas diretrizes, explore as ferramentas e veja como outros
              professores implementam IA nas disciplinas hoje.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/diretrizes" className="btn-primary">
              Ler Diretrizes <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/ferramentas" className="btn-outline">
              Ver Ferramentas
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
