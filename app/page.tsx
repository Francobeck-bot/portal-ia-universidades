import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Users,
  BookOpen,
  Wrench,
  Lightbulb,
  Globe,
  ChevronRight,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";

/* ============================================================
   DATA
   ============================================================ */
const stats = [
  {
    icon: TrendingUp,
    value: "2×",
    label: "mais aprendizagem",
    detail:
      "Harvard conduziu um RCT controlado com 194 alunos de Física (PS2 Pal, 2025): alunos com tutor IA personalizado obtiveram o dobro do ganho de aprendizagem em comparação com ensino ativo tradicional.",
    source: "Harvard University, RCT 2025",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Users,
    value: "75–97%",
    label: "acurácia em sala real",
    detail:
      "A Jill Watson, assistente de ensino virtual da Georgia Tech baseada em RAG + GPT, atingiu 75 a 97% de acurácia em respostas a alunos reais. Estudantes chegaram a semanas sem perceber que não era humana.",
    source: "Georgia Tech – Jill Watson",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: GraduationCap,
    value: "+1M",
    label: "pessoas em literacia de IA",
    detail:
      "A Universidade de Helsinki criou o MOOC 'Elements of AI' — gratuito, sem pré-requisitos, em 25+ idiomas. Mais de 1 milhão de pessoas já completaram o curso globalmente.",
    source: "University of Helsinki",
    color: "from-purple-500 to-violet-600",
  },
  {
    icon: BarChart3,
    value: "50.000",
    label: "professores treinados",
    detail:
      "A Universidade Nacional de Seul liderou o maior programa de capacitação em IA para educadores da Ásia: 50.000 professores treinados em literacia de IA, ética e impacto social até 2025.",
    source: "Seoul National University, 2025",
    color: "from-orange-500 to-red-500",
  },
];

const features = [
  {
    href: "/diretrizes",
    Icon: BookOpen,
    title: "Diretrizes",
    description: "5 princípios fundamentais e 3 modelos de política de IA para o syllabus do seu curso.",
    badge: "Para professores",
    badgeBg: "bg-blue-100 text-blue-700",
    iconBg: "bg-blue-50",
    iconColor: "text-ufrgs-blue",
    border: "border-ufrgs-blue",
  },
  {
    href: "/ferramentas",
    Icon: Wrench,
    title: "Ferramentas",
    description: "Catálogo curado de ferramentas de IA recomendadas por Harvard, MIT, Imperial e mais.",
    badge: "8 ferramentas",
    badgeBg: "bg-indigo-100 text-indigo-700",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    border: "border-indigo-400",
  },
  {
    href: "/exemplos",
    Icon: Lightbulb,
    title: "Exemplos de Uso",
    description: "Casos práticos reais: tutor 24/7, simulações, redesign de avaliações e muito mais.",
    badge: "8 casos",
    badgeBg: "bg-amber-100 text-amber-700",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    border: "border-amber-400",
  },
  {
    href: "/benchmarking",
    Icon: Globe,
    title: "Benchmarking Global",
    description: "O que as 38 melhores universidades do mundo fazem de diferente com IA no ensino.",
    badge: "38 universidades",
    badgeBg: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-400",
  },
];

const principles = [
  { Icon: Shield,   title: "Transparência",        sub: "Declare quando usou IA" },
  { Icon: Zap,      title: "Foco no Aprendizado",  sub: "IA apoia, não substitui" },
  { Icon: BookOpen, title: "Objetivos Primeiro",   sub: "Pedagogia antes da ferramenta" },
  { Icon: Users,    title: "Política Clara",        sub: "Comunique no início do semestre" },
];

const highlights = [
  { uni: "Harvard", flag: "🇺🇸", text: "Tutor IA PS2 Pal dobrou aprendizagem em RCT (194 alunos)" },
  { uni: "Georgia Tech", flag: "🇺🇸", text: "Jill Watson: TA virtual com 75–97% de acurácia" },
  { uni: "Oxford", flag: "🇬🇧", text: "ChatGPT EDU adotado institucionalmente em 2025" },
  { uni: "Imperial", flag: "🇬🇧", text: "dAIsy: plataforma multi-modelo para ensino adaptativo" },
  { uni: "Helsinki", flag: "🇫🇮", text: "Elements of AI: 1M+ estudantes em 25 idiomas" },
  { uni: "NUS", flag: "🇸🇬", text: "Role-play em Direito e Saúde com IA desde 2020" },
];

/* ============================================================
   PAGE
   ============================================================ */
export default function HomePage() {
  return (
    <div className="bg-slate-50">

      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection />

      {/* ── FEATURES GRID ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <p className="section-label justify-center">O que você encontra aqui</p>
          <h2 className="section-title">Tudo em um só lugar</h2>
          <p className="section-sub max-w-2xl mx-auto">
            De diretrizes a ferramentas, de exemplos práticos ao benchmarking global —
            conteúdo criado com base nas melhores práticas de universidades de referência.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ href, Icon, title, description, badge, badgeBg, iconBg, iconColor, border }) => (
            <Link
              key={href}
              href={href}
              className={`card card-hover p-6 border-t-4 ${border} group flex flex-col`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`p-2.5 rounded-xl ${iconBg}`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <span className={`badge ${badgeBg}`}>{badge}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-ufrgs-blue text-sm font-semibold
                               group-hover:gap-2 transition-all">
                Acessar <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="bg-ufrgs-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="inline-flex items-center gap-1.5 text-ufrgs-gold text-sm font-semibold
                           bg-ufrgs-gold/10 px-3 py-1 rounded-full mb-3">
              Dados de pesquisa
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Por que isso importa?
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Números reais de universidades que já fizeram a transição — e mediram os resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(({ icon: Icon, value, label, detail, source, color }, i) => (
              <div key={i} className="bg-white/5 hover:bg-white/10 border border-white/10
                                       rounded-2xl p-6 transition-all duration-200 flex flex-col">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color}
                                  flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-4xl font-extrabold text-white mb-1">{value}</div>
                <div className="text-ufrgs-gold font-semibold text-sm mb-3">{label}</div>
                <p className="text-blue-200/80 text-xs leading-relaxed flex-1">{detail}</p>
                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className="text-xs text-blue-300/60">{source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HIGHLIGHTS (university strip) ────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label">Benchmarking global</p>
            <h2 className="section-title mb-0">O que as top universidades fazem</h2>
          </div>
          <Link href="/benchmarking"
            className="inline-flex items-center gap-2 text-ufrgs-blue font-semibold text-sm
                       hover:text-ufrgs-dark transition-colors shrink-0">
            Ver todas as 38 universidades <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map(({ uni, flag, text }, i) => (
            <div key={i}
              className="card p-5 flex items-start gap-4 card-hover">
              <div className="text-3xl leading-none mt-0.5">{flag}</div>
              <div>
                <p className="font-bold text-ufrgs-dark text-sm mb-1">{uni}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRINCIPLES STRIP ─────────────────────────────── */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="section-label justify-center">Diretrizes</p>
            <h2 className="section-title">5 princípios para uso responsável</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {principles.map(({ Icon, title, sub }, i) => (
              <Link key={i} href="/diretrizes"
                className="card p-5 text-center card-hover group">
                <div className="flex justify-center mb-3">
                  <div className="bg-ufrgs-blue/10 group-hover:bg-ufrgs-blue group-hover:text-white
                                   p-3 rounded-xl transition-all duration-200">
                    <Icon className="w-5 h-5 text-ufrgs-blue group-hover:text-white transition-colors" />
                  </div>
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1">{title}</p>
                <p className="text-gray-400 text-xs">{sub}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/diretrizes" className="btn-primary inline-flex items-center gap-2">
              Ver diretrizes completas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative overflow-hidden bg-gradient-to-br from-ufrgs-dark via-ufrgs-blue
                         to-ufrgs-light rounded-3xl p-10 md:p-16 text-white text-center">
          {/* decorative blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-ufrgs-gold/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Comece pelas diretrizes, explore as ferramentas e veja como outros professores
              estão usando IA nas suas disciplinas hoje.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/diretrizes" className="btn-gold inline-flex items-center gap-2">
                Ler Diretrizes <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/ferramentas" className="btn-ghost inline-flex items-center gap-2">
                Ver Ferramentas
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
