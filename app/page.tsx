export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight, BookOpen, Wrench, Lightbulb } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import { fetchTools, fetchExamples } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";

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

export default async function HomePage() {
  const [tools, examples] = await Promise.all([
    fetchTools(SHEETS_CONFIG.toolsSheetUrl),
    fetchExamples(SHEETS_CONFIG.examplesSheetUrl),
  ]);

  const pages = [
    {
      href: "/diretrizes",
      Icon: BookOpen,
      title: "Diretrizes",
      description:
        "5 princípios para uso responsável e 3 modelos prontos de política de IA para o syllabus.",
      tag: "Para professores",
    },
    {
      href: "/ferramentas",
      Icon: Wrench,
      title: "Ferramentas",
      description:
        "Catálogo curado de ferramentas recomendadas por Harvard, MIT, Imperial e outras.",
      tag: `${tools.length} ferramentas`,
    },
    {
      href: "/exemplos",
      Icon: Lightbulb,
      title: "Exemplos de Uso",
      description:
        "Casos práticos reais com instruções de como implementar na sua disciplina hoje.",
      tag: `${examples.length} exemplos`,
    },
  ];

  return (
    <div>

      {/* ── HERO ─────────────────────────────────── */}
      <HeroSection />

      {/* ── NAVIGATION CARDS ─────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-10">
            <p className="section-label">O que você encontra aqui</p>
            <h2 className="section-title">Tudo em um só lugar</h2>
            <p className="section-sub max-w-xl">
              De diretrizes a ferramentas, de casos práticos a instruções passo a passo.
              Conteúdo baseado nas melhores universidades do mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pages.map(({ href, Icon, title, description, tag }) => (
              <Link
                key={href}
                href={href}
                className="group card card-hover p-7 flex flex-col"
                style={{ borderTop: "3px solid #111827" }}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="p-2.5 rounded-lg bg-gray-100">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <span className="text-xs text-gray-400 font-semibold" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>{tag}</span>
                </div>
                <h3 className="text-gray-900 text-xl mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>{description}</p>
                <span
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900
                               group-hover:gap-3 transition-all duration-200"
                  style={{ fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  Acessar <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────── */}
      <section style={{ background: "#111827" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="mb-12">
            <p
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Inter, system-ui, sans-serif" }}
            >
              <span className="w-4 h-px bg-white/30" />
              Evidências de universidades globais
            </p>
            <h2 className="text-3xl md:text-4xl text-white mb-4">
              Por que usar IA no ensino?
            </h2>
            <p className="text-lg max-w-xl" style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, system-ui, sans-serif" }}>
              Números reais de pesquisas nas melhores universidades, para quem ainda tem dúvidas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(({ value, label, source, detail }, i) => (
              <div
                key={i}
                className="rounded-xl p-8 border"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <div className="text-5xl text-white mb-1" style={{ fontFamily: "OPTIBakerDanmarkOne, Georgia, serif", letterSpacing: "0.03em" }}>
                  {value}
                </div>
                <div
                  className="text-xs font-bold mb-1 uppercase"
                  style={{ color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", fontFamily: "Inter, system-ui, sans-serif" }}
                >
                  {label}
                </div>
                <div className="text-xs mb-5 font-medium" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Inter, system-ui, sans-serif" }}>
                  {source}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Inter, system-ui, sans-serif" }}>
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div
            className="rounded-2xl p-10 md:p-14 flex flex-col md:flex-row
                         md:items-center justify-between gap-8 border border-gray-200"
            style={{ background: "#f3f4f4" }}
          >
            <div>
              <h2 className="section-title mb-2">Pronto para começar?</h2>
              <p className="text-gray-500 max-w-md" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>
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
        </div>
      </section>

    </div>
  );
}
