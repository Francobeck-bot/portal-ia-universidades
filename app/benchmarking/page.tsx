import { Globe, ExternalLink, Star, BookOpen } from "lucide-react";
import Link from "next/link";

const universities = [
  {
    name: "Harvard University",
    country: "EUA",
    flag: "🇺🇸",
    highlight: "PS2 Pal: 2× mais aprendizagem (RCT)",
    details:
      "Realizou um ensaio controlado randomizado (RCT) com 194 alunos de Ciência da Computação. Um tutor IA bem configurado com o syllabus do curso dobrou o ganho de aprendizagem versus aulas tradicionais. Também proibiu detectores de IA e focou em redesign de avaliações.",
    tags: ["Tutoria", "RCT", "Redesign de avaliações"],
    color: "border-red-200 bg-red-50",
    badgeColor: "bg-red-100 text-red-700",
    featured: true,
  },
  {
    name: "Georgia Tech",
    country: "EUA",
    flag: "🇺🇸",
    highlight: "Jill Watson: TA virtual que ninguém percebeu ser IA",
    details:
      "Criou 'Jill Watson', uma assistente de ensino virtual baseada em IA que respondia dúvidas dos alunos no fórum do curso. Alunos passaram semanas interagindo com ela sem perceber que não era humana. Abordagem pioneira em escala de suporte automatizado.",
    tags: ["TA Virtual", "Suporte 24/7", "Automação"],
    color: "border-yellow-200 bg-yellow-50",
    badgeColor: "bg-yellow-100 text-yellow-700",
    featured: true,
  },
  {
    name: "Imperial College London",
    country: "Reino Unido",
    flag: "🇬🇧",
    highlight: "dAIsy: professor virtual de IA para medicina",
    details:
      "Desenvolveu 'dAIsy', um professor virtual que usa IA generativa para ensinar estudantes de medicina a diagnosticar. A ferramenta adapta a complexidade do diálogo ao nível do aluno e é disponível 24/7. Também orienta professores a declarar uso de IA nos materiais.",
    tags: ["Professor virtual", "Medicina", "Ensino adaptativo"],
    color: "border-blue-200 bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-700",
    featured: true,
  },
  {
    name: "University of Helsinki",
    country: "Finlândia",
    flag: "🇫🇮",
    highlight: "Elements of AI: +1M estudantes em literacia de IA",
    details:
      "Criou o MOOC 'Elements of AI' em parceria com a empresa MinnaLearn — gratuito, sem pré-requisitos técnicos, disponível em 25+ idiomas. Mais de 1 milhão de pessoas completaram o curso. Tornou-se modelo global de como universidades podem liderar a literacia em IA da sociedade.",
    tags: ["MOOC gratuito", "Literacia em IA", "1M+ usuários"],
    color: "border-indigo-200 bg-indigo-50",
    badgeColor: "bg-indigo-100 text-indigo-700",
    featured: true,
  },
  {
    name: "NUS – National University of Singapore",
    country: "Singapura",
    flag: "🇸🇬",
    highlight: "Simulações de IA em Direito e Saúde",
    details:
      "Usa IA em role-play de situações profissionais reais: estudantes de Direito negociam com um cliente IA antes de situações reais; estudantes de Saúde praticam diagnósticos e comunicação com pacientes. Framework estruturado de integração IA-currículo em múltiplos cursos.",
    tags: ["Role-play", "Simulação profissional", "Direito", "Saúde"],
    color: "border-red-200 bg-red-50",
    badgeColor: "bg-red-100 text-red-700",
    featured: true,
  },
  {
    name: "University of Toronto",
    country: "Canadá",
    flag: "🇨🇦",
    highlight: "Liderança em ética e política de IA",
    details:
      "Publica guias completos de política de IA para professores, orientando a NÃO usar detectores de IA. Foco em redesenhar avaliações para torná-las mais robustas. Framework de 3 níveis de permissão para uso de IA em avaliações, adotado por outras instituições canadenses.",
    tags: ["Política de IA", "Ética", "Redesign de avaliações"],
    color: "border-green-200 bg-green-50",
    badgeColor: "bg-green-100 text-green-700",
    featured: false,
  },
  {
    name: "MIT",
    country: "EUA",
    flag: "🇺🇸",
    highlight: "Redesign sistemático de avaliações",
    details:
      "Orienta professores a testar suas provas e trabalhos com ChatGPT antes de aplicar. Se a IA consegue resolver trivialmente, a avaliação é redesenhada para exigir síntese, julgamento contextual ou evidência de processo. Publicou guidelines detalhados de uso de IA por disciplina.",
    tags: ["Redesign de avaliações", "Guidelines por disciplina"],
    color: "border-gray-200 bg-gray-50",
    badgeColor: "bg-gray-100 text-gray-700",
    featured: false,
  },
  {
    name: "Carnegie Mellon University",
    country: "EUA",
    flag: "🇺🇸",
    highlight: "Simon: feedback personalizado em escrita",
    details:
      "Desenvolveu 'Simon', uma ferramenta de feedback em escrita que usa IA para dar retorno personalizado a rascunhos de alunos antes da revisão do professor. Reduz carga do professor e melhora a qualidade dos textos finais.",
    tags: ["Feedback em escrita", "IA pedagógica"],
    color: "border-purple-200 bg-purple-50",
    badgeColor: "bg-purple-100 text-purple-700",
    featured: false,
  },
  {
    name: "Johns Hopkins University",
    country: "EUA",
    flag: "🇺🇸",
    highlight: "Integração de IA em cursos de saúde pública",
    details:
      "Integrou IA em múltiplos cursos da Bloomberg School of Public Health. Usa Claude e ChatGPT para análise de estudos de caso, feedback em relatórios epidemiológicos e suporte a alunos internacionais com barreiras de idioma.",
    tags: ["Saúde pública", "Análise de casos", "Inclusão"],
    color: "border-blue-200 bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-700",
    featured: false,
  },
  {
    name: "University of Michigan",
    country: "EUA",
    flag: "🇺🇸",
    highlight: "Maizey: tutorbot para Gestão de Operações",
    details:
      "Criou 'Maizey', um tutorbot alimentado com o material do curso de Gestão de Operações. O sistema permite que alunos tirem dúvidas a qualquer hora e rastreia as perguntas mais frequentes para informar o professor sobre lacunas de aprendizagem.",
    tags: ["Tutorbot", "Gestão de Operações", "Analytics de aprendizagem"],
    color: "border-yellow-200 bg-yellow-50",
    badgeColor: "bg-yellow-100 text-yellow-700",
    featured: false,
  },
];

const keyFindings = [
  {
    icon: Star,
    title: "As universidades top não banem IA",
    description:
      "Nenhuma universidade de elite bane IA completamente. O foco é em políticas claras, redesign de avaliações e desenvolvimento de literacia em IA.",
  },
  {
    icon: BookOpen,
    title: "Redesign de avaliações é prioridade universal",
    description:
      "Harvard, MIT, Cornell, Toronto: todas orientam professores a redesenhar avaliações que possam ser trivialmente resolvidas por IA.",
  },
  {
    icon: Globe,
    title: "Detectores de IA são rejeitados",
    description:
      "Toronto, Harvard e outras recomendam explicitamente NÃO usar detectores de IA como evidência disciplinar, pela alta taxa de falso-positivo.",
  },
];

export default function BenchmarkingPage() {
  const featuredUniversities = universities.filter((u) => u.featured);
  const otherUniversities = universities.filter((u) => !u.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 text-ufrgs-blue text-sm font-medium mb-3">
          <Globe className="w-4 h-4" />
          Pesquisa global
        </div>
        <h1 className="text-4xl font-bold text-ufrgs-dark mb-4">Benchmarking Global</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          O que as melhores universidades do mundo estão fazendo com IA no ensino. Análise de 10+
          instituições de referência, com foco nos diferenciais mais relevantes para a Engenharia de
          Produção.
        </p>
      </div>

      {/* Key findings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {keyFindings.map((finding, i) => {
          const Icon = finding.icon;
          return (
            <div key={i} className="card p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-ufrgs-blue/10 p-2 rounded-lg">
                  <Icon className="w-5 h-5 text-ufrgs-blue" />
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{finding.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{finding.description}</p>
            </div>
          );
        })}
      </div>

      {/* Featured universities */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-ufrgs-dark mb-6">
          Destaques — Iniciativas mais relevantes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredUniversities.map((uni, i) => (
            <div key={i} className={`card p-6 border-l-4 ${uni.color}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{uni.flag}</span>
                    <h3 className="font-bold text-gray-900 text-lg">{uni.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{uni.country}</p>
                </div>
              </div>

              <p className={`badge ${uni.badgeColor} text-sm font-semibold mb-4`}>
                ★ {uni.highlight}
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">{uni.details}</p>

              <div className="flex flex-wrap gap-1">
                {uni.tags.map((tag, j) => (
                  <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Other universities */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-ufrgs-dark mb-6">Outras instituições pesquisadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {otherUniversities.map((uni, i) => (
            <div key={i} className={`card p-5 border-l-4 ${uni.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{uni.flag}</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{uni.name}</h3>
                  <p className="text-xs text-gray-500">{uni.country}</p>
                </div>
              </div>

              <p className={`badge ${uni.badgeColor} text-xs font-medium mb-3`}>
                {uni.highlight}
              </p>

              <p className="text-gray-600 text-xs leading-relaxed mb-3">{uni.details}</p>

              <div className="flex flex-wrap gap-1">
                {uni.tags.map((tag, j) => (
                  <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="bg-gradient-to-r from-ufrgs-dark to-ufrgs-blue rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Quer aplicar essas práticas na UFRGS?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Comece pelas diretrizes para entender os princípios, veja os exemplos práticos e escolha as
            ferramentas mais adequadas para sua disciplina.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/diretrizes"
              className="inline-flex items-center gap-2 bg-ufrgs-gold hover:bg-ufrgs-gold-light text-ufrgs-dark font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Ver Diretrizes
            </Link>
            <Link
              href="/exemplos"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
            >
              Ver Exemplos <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
