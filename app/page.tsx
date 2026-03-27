import Link from "next/link";
import {
  BookOpen,
  Wrench,
  Lightbulb,
  Globe,
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Users,
  ChevronRight,
} from "lucide-react";

const quickLinks = [
  {
    href: "/diretrizes",
    icon: BookOpen,
    title: "Diretrizes",
    description: "Como usar IA de forma responsável no ensino. Princípios, políticas e modelos de syllabus.",
    color: "bg-blue-50 border-ufrgs-blue",
    iconColor: "text-ufrgs-blue",
    badge: "Para professores",
  },
  {
    href: "/ferramentas",
    icon: Wrench,
    title: "Ferramentas",
    description: "Catálogo de ferramentas de IA recomendadas por universidades top do mundo.",
    color: "bg-indigo-50 border-indigo-500",
    iconColor: "text-indigo-600",
    badge: "8 ferramentas",
  },
  {
    href: "/exemplos",
    icon: Lightbulb,
    title: "Exemplos de Uso",
    description: "Casos práticos de como professores estão usando IA em suas aulas hoje.",
    color: "bg-amber-50 border-ufrgs-gold",
    iconColor: "text-ufrgs-gold",
    badge: "8 casos práticos",
  },
  {
    href: "/benchmarking",
    icon: Globe,
    title: "Benchmarking Global",
    description: "O que Harvard, MIT, Georgia Tech e outras instituições fazem de diferente.",
    color: "bg-emerald-50 border-emerald-500",
    iconColor: "text-emerald-600",
    badge: "Pesquisa global",
  },
];

const stats = [
  {
    icon: TrendingUp,
    value: "2×",
    label: "mais aprendizagem",
    detail:
      "Harvard realizou um RCT controlado (194 alunos) e comprovou que um tutor IA bem configurado dobra o ganho de aprendizagem em relação à aula tradicional.",
    source: "Harvard, 2024",
  },
  {
    icon: Users,
    value: "24/7",
    label: "suporte a alunos",
    detail:
      "Georgia Tech criou a Jill Watson, uma TA virtual com IA, que responde dúvidas de alunos a qualquer hora. Alunos passaram semanas sem perceber que não era humana.",
    source: "Georgia Tech",
  },
  {
    icon: GraduationCap,
    value: "+1M",
    label: "estudantes em literacia de IA",
    detail:
      "A Universidade de Helsinki criou o MOOC 'Elements of AI' — gratuito, sem pré-requisitos — e mais de 1 milhão de pessoas já completaram o curso em todo o mundo.",
    source: "U. Helsinki",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-ufrgs-dark via-ufrgs-blue to-ufrgs-light text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-ufrgs-gold rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 bg-ufrgs-gold rounded-full animate-pulse"></span>
              Disciplina PEP · Engenharia de Produção · UFRGS
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Inteligência Artificial{" "}
              <span className="text-ufrgs-gold">no Ensino Superior</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8 max-w-2xl">
              Recursos práticos para professores e alunos de Engenharia de Produção usarem IA de forma
              responsável, baseados em evidências das melhores universidades do mundo.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/diretrizes"
                className="inline-flex items-center gap-2 bg-ufrgs-gold hover:bg-ufrgs-gold-light text-ufrgs-dark font-semibold px-6 py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Ver Diretrizes <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/exemplos"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                Explorar Exemplos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="section-title">O que você encontra aqui</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Um guia completo e atualizado sobre IA no ensino — das diretrizes às ferramentas, dos exemplos práticos às boas práticas globais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`card p-6 border-t-4 ${item.color} group hover:-translate-y-1 transition-transform duration-200`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                    <Icon className={`w-6 h-6 ${item.iconColor}`} />
                  </div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.description}</p>
                <span className="inline-flex items-center gap-1 text-ufrgs-blue text-sm font-medium group-hover:gap-2 transition-all">
                  Acessar <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Por que isso importa?</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              As universidades mais avançadas do mundo já integraram IA no ensino — com resultados mensuráveis.
              Aqui estão os dados que motivaram este portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="card p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-ufrgs-blue/10 p-3 rounded-full">
                      <Icon className="w-8 h-8 text-ufrgs-blue" />
                    </div>
                  </div>
                  <div className="text-5xl font-bold text-ufrgs-dark mb-1">{stat.value}</div>
                  <div className="text-ufrgs-blue font-semibold text-lg mb-3">{stat.label}</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{stat.detail}</p>
                  <span className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                    Fonte: {stat.source}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-ufrgs-dark to-ufrgs-blue rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Comece pelas diretrizes para entender os princípios, depois explore as ferramentas e veja exemplos
            reais de outros professores.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/diretrizes"
              className="inline-flex items-center gap-2 bg-ufrgs-gold hover:bg-ufrgs-gold-light text-ufrgs-dark font-semibold px-8 py-3 rounded-lg transition-all duration-200"
            >
              Ler Diretrizes <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ferramentas"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200"
            >
              Ver Ferramentas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
