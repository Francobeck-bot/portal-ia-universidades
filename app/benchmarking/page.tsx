import { Globe, ExternalLink, Star, TrendingUp, Lightbulb, AlertTriangle } from "lucide-react";
import Link from "next/link";

/* ============================================================
   DATA — extracted from PEP2 Excel files
   ============================================================ */

const keyFindings = [
  {
    Icon: Star,
    title: "Nenhuma top university bane IA",
    description:
      "Das 38 instituições pesquisadas, nenhuma proíbe IA completamente. O consenso é: políticas claras, redesign de avaliações e desenvolvimento de literacia.",
  },
  {
    Icon: TrendingUp,
    title: "Evidência experimental: 2× mais aprendizagem",
    description:
      "Harvard (2025): RCT controlado com 194 alunos de Física. Tutor IA personalizado com o syllabus dobrou o ganho de aprendizagem vs. ensino ativo.",
  },
  {
    Icon: Lightbulb,
    title: "Redesign de avaliações é prioridade",
    description:
      "Harvard, MIT, Cornell, Toronto e Cambridge: todas orientam professores a testar avaliações com ChatGPT antes de aplicar e redesenhar se a IA resolver trivialmente.",
  },
  {
    Icon: AlertTriangle,
    title: "Detectores de IA são rejeitados",
    description:
      "Toronto, Harvard e Edinburgh orientam explicitamente a NÃO usar detectores de IA como evidência disciplinar — alta taxa de falso-positivo é documentada.",
  },
];

type Uni = {
  name: string; country: string; flag: string;
  highlight: string; details: string; tags: string[];
  color: string; badgeColor: string;
};

const regionGroups: { region: string; emoji: string; unis: Uni[] }[] = [
  {
    region: "América do Norte",
    emoji: "🌎",
    unis: [
      {
        name: "Harvard University", country: "EUA", flag: "🇺🇸",
        highlight: "★ PS2 Pal: 2× mais aprendizagem (RCT, 194 alunos, 2025)",
        details:
          "Ensaio controlado randomizado com 194 alunos de Física: tutor IA personalizado dobrou o ganho de aprendizagem. 4 modelos pedagógicos documentados: Activity Leader, Personal Tutor, Custom Reviewer, Skill Leveler. Proíbe detectores de IA como prova disciplinar.",
        tags: ["RCT", "Tutoria personalizada", "Redesign de avaliações"],
        color: "border-red-300 bg-red-50", badgeColor: "bg-red-100 text-red-700",
      },
      {
        name: "Georgia Tech", country: "EUA", flag: "🇺🇸",
        highlight: "★ Jill Watson: TA virtual com 75–97% de acurácia",
        details:
          "Criou a primeira TA virtual com IA da história (2016, evoluída em 2024). Usa RAG + GPT. Alunos interagiram por semanas sem perceber que não era humana. Impacto documentado em notas e satisfação.",
        tags: ["TA Virtual", "RAG", "Suporte 24/7"],
        color: "border-yellow-300 bg-yellow-50", badgeColor: "bg-yellow-100 text-yellow-700",
      },
      {
        name: "MIT", country: "EUA", flag: "🇺🇸",
        highlight: "GenAI Your Course: objetivos de aprendizagem primeiro",
        details:
          "Framework 'GenAI Your Course' com 4 etapas: (1) definir objetivos, (2) mapear onde IA ajuda vs. atrapalha, (3) redesenhar avaliações, (4) comunicar política clara. Testar prova com ChatGPT antes de aplicar é prática institucional.",
        tags: ["Framework pedagógico", "Redesign de avaliações"],
        color: "border-gray-300 bg-gray-50", badgeColor: "bg-gray-100 text-gray-700",
      },
      {
        name: "Stanford University", country: "EUA", flag: "🇺🇸",
        highlight: "AIMES Program: exemplos reais por disciplina",
        details:
          "Teaching Commons AI Teaching Guide + AIMES Program (2025): biblioteca de casos reais de professores de diferentes áreas. AI-Enhanced Learning Spaces aumentaram capacidade em 45%. Ferramentas: Canvas, ChatGPT, Stanford Hybrid+ Platform.",
        tags: ["Guia pedagógico", "Learning spaces", "+45% capacidade"],
        color: "border-red-300 bg-red-50", badgeColor: "bg-red-100 text-red-700",
      },
      {
        name: "Cornell University", country: "EUA", flag: "🇺🇸",
        highlight: "Centro dedicado a IA na educação + redesign de provas",
        details:
          "Publicou diretrizes por departamento para uso de IA. Orienta que professores testem avaliações com LLMs antes de aplicar. Centro de Inovação em Ensino ativo na disseminação de boas práticas.",
        tags: ["Diretrizes por departamento", "Centro de inovação"],
        color: "border-red-300 bg-red-50", badgeColor: "bg-red-100 text-red-700",
      },
      {
        name: "University of Toronto", country: "Canadá", flag: "🇨🇦",
        highlight: "Liderança ética: rejeita detectores de IA",
        details:
          "Publicou guias completos orientando professores a NÃO usar detectores de IA como evidência. Framework de 3 níveis de permissão para avaliações (restritivo / misto / permissivo) adotado por outras instituições canadenses.",
        tags: ["Ética de IA", "Framework de política", "Sem detectores"],
        color: "border-green-300 bg-green-50", badgeColor: "bg-green-100 text-green-700",
      },
      {
        name: "Carnegie Mellon University", country: "EUA", flag: "🇺🇸",
        highlight: "Simon: feedback personalizado em escrita acadêmica",
        details:
          "Ferramenta 'Simon' para feedback em rascunhos antes da revisão do professor. Reduz carga docente e melhora qualidade dos textos finais. Centro Eberly de Excelência em Ensino lidera integração pedagógica.",
        tags: ["Feedback em escrita", "IA pedagógica"],
        color: "border-purple-300 bg-purple-50", badgeColor: "bg-purple-100 text-purple-700",
      },
      {
        name: "Princeton University", country: "EUA", flag: "🇺🇸",
        highlight: "Método 'Comparação Humano vs. IA'",
        details:
          "Alunos resolvem exercícios sozinhos, depois comparam com a solução da IA e criticam as diferenças. Desenvolve pensamento crítico sobre os limites e vieses dos modelos. Abordagem integrada ao currículo de Ciências Humanas.",
        tags: ["Pensamento crítico", "Método comparativo"],
        color: "border-orange-300 bg-orange-50", badgeColor: "bg-orange-100 text-orange-700",
      },
      {
        name: "Johns Hopkins University", country: "EUA", flag: "🇺🇸",
        highlight: "Integração em Saúde Pública com Claude e ChatGPT",
        details:
          "Bloomberg School of Public Health integrou IA em múltiplos cursos. Usos: análise de casos epidemiológicos, feedback em relatórios, suporte a estudantes com barreiras de idioma. Claude (Anthropic) usado para análise de textos longos.",
        tags: ["Saúde pública", "Inclusão", "Análise de casos"],
        color: "border-blue-300 bg-blue-50", badgeColor: "bg-blue-100 text-blue-700",
      },
      {
        name: "Duke University", country: "EUA", flag: "🇺🇸",
        highlight: "Microsoft Copilot + Office 365 institucionalizados",
        details:
          "Acordo institucional com Microsoft para uso do Copilot em toda a universidade, com garantias de privacidade de dados (FERPA). Foco em produtividade docente e criação de materiais.",
        tags: ["Copilot", "FERPA", "Produtividade docente"],
        color: "border-blue-300 bg-blue-50", badgeColor: "bg-blue-100 text-blue-700",
      },
    ],
  },
  {
    region: "Europa",
    emoji: "🌍",
    unis: [
      {
        name: "University of Oxford", country: "Reino Unido", flag: "🇬🇧",
        highlight: "★ ChatGPT EDU adotado institucionalmente (set/2025)",
        details:
          "Primeira universidade do Reino Unido a adotar ChatGPT EDU institucionalmente, em setembro de 2025. Atualizou a definição de plágio para incluir IA como fonte citável. Plataforma ELM como gateway seguro para múltiplos LLMs.",
        tags: ["ChatGPT EDU", "Nova política de plágio", "Gateway seguro"],
        color: "border-blue-300 bg-blue-50", badgeColor: "bg-blue-100 text-blue-700",
      },
      {
        name: "University of Cambridge", country: "Reino Unido", flag: "🇬🇧",
        highlight: "ELM Platform: gateway seguro para múltiplos LLMs",
        details:
          "Plataforma ELM: acesso seguro a Llama (local), Copilot, Gemini e NotebookLM com proteção de dados (sem retenção por terceiros). IA como tutor em tempo real para análise de erros em programação.",
        tags: ["ELM Platform", "Privacidade de dados", "Tutor de programação"],
        color: "border-blue-300 bg-blue-50", badgeColor: "bg-blue-100 text-blue-700",
      },
      {
        name: "Imperial College London", country: "Reino Unido", flag: "🇬🇧",
        highlight: "★ dAIsy: plataforma multi-modelo + 'Teach the AI'",
        details:
          "dAIsy integra GPT, Claude e DeepSeek em uma única interface. Método inovador 'Teach the AI': alunos ensinam conceitos para a IA e identificam erros nos outputs, reforçando aprendizado por explicação. Role-play em medicina e engenharia.",
        tags: ["dAIsy", "Multi-modelo", "Teach the AI", "Role-play"],
        color: "border-blue-300 bg-blue-50", badgeColor: "bg-blue-100 text-blue-700",
      },
      {
        name: "University of Edinburgh", country: "Reino Unido", flag: "🇬🇧",
        highlight: "ELM + Llama local para privacidade de dados",
        details:
          "Implementou Llama localmente para garantir conformidade com GDPR. Políticas claras de citação de IA. IA como desqualificador em avaliações se não declarada. Tutor em tempo real para erros de programação.",
        tags: ["GDPR", "Llama local", "Citação de IA"],
        color: "border-purple-300 bg-purple-50", badgeColor: "bg-purple-100 text-purple-700",
      },
      {
        name: "UCL (Univ. College London)", country: "Reino Unido", flag: "🇬🇧",
        highlight: "Framework de 3 categorias de uso em avaliações",
        details:
          "Estrutura replicável: Categoria 1 (IA proibida), Categoria 2 (IA permitida com declaração), Categoria 3 (IA integrada à avaliação). Microsoft Copilot como ferramenta institucional com proteção de dados garantida.",
        tags: ["Framework de categorias", "Copilot institucional"],
        color: "border-blue-300 bg-blue-50", badgeColor: "bg-blue-100 text-blue-700",
      },
      {
        name: "University of Helsinki", country: "Finlândia", flag: "🇫🇮",
        highlight: "★ Elements of AI: 1M+ usuários em 25 idiomas",
        details:
          "MOOC 'Elements of AI': gratuito, sem pré-requisitos, criado com a empresa MinnaLearn. Tornou-se política nacional na Finlândia — todos os cidadãos que quiserem podem fazer o curso. Modelo global de literacia em IA em escala.",
        tags: ["MOOC gratuito", "Política nacional", "1M+ usuários"],
        color: "border-indigo-300 bg-indigo-50", badgeColor: "bg-indigo-100 text-indigo-700",
      },
      {
        name: "ETH Zürich", country: "Suíça", flag: "🇨🇭",
        highlight: "Integração de IA em STEM com foco em verificação",
        details:
          "Forte foco em ensinar alunos a verificar outputs da IA em contextos técnicos (engenharia, física). Diretrizes para professores de como integrar IA em projetos de pesquisa sem comprometer integridade científica.",
        tags: ["STEM", "Verificação de outputs", "Integridade científica"],
        color: "border-red-300 bg-red-50", badgeColor: "bg-red-100 text-red-700",
      },
    ],
  },
  {
    region: "Ásia e Oceania",
    emoji: "🌏",
    unis: [
      {
        name: "NUS – Nat. Univ. of Singapore", country: "Singapura", flag: "🇸🇬",
        highlight: "★ Simulações em Direito e Saúde; redesign curricular para era IA",
        details:
          "AI Community of Practice ativo. Aplicações: chatbot para cross-examination em Direito; prática de conversas difíceis com pacientes em Medicina. Redesign curricular completo para a 'graduation for the AI era' (2026). Identificação precoce de alunos em risco desde 2020.",
        tags: ["Role-play", "Redesign curricular", "Risco de alunos", "Direito", "Saúde"],
        color: "border-red-300 bg-red-50", badgeColor: "bg-red-100 text-red-700",
      },
      {
        name: "Nanyang Technological University", country: "Singapura", flag: "🇸🇬",
        highlight: "Aprendizagem adaptativa: conteúdo por nível de habilidade",
        details:
          "Agrupamento de alunos por nível de habilidade detectado pela IA em substituição a aulas tradicionais. Conteúdo personalizado por skill level. Identificação antecipada de alunos com dificuldades para intervenção direcionada.",
        tags: ["Aprendizagem adaptativa", "Agrupamento por habilidade"],
        color: "border-orange-300 bg-orange-50", badgeColor: "bg-orange-100 text-orange-700",
      },
      {
        name: "Seoul National University", country: "Coreia do Sul", flag: "🇰🇷",
        highlight: "★ 50.000 professores treinados em literacia de IA (2025)",
        details:
          "Maior programa de capacitação em IA para educadores da Ásia: 50.000 professores treinados em ética, literacia e impacto social da IA. Ferramentas nacionais de IA integradas no ensino diário.",
        tags: ["50k professores", "Literacia de IA", "Ferramentas nacionais"],
        color: "border-blue-300 bg-blue-50", badgeColor: "bg-blue-100 text-blue-700",
      },
      {
        name: "University of Hong Kong", country: "China (RAE)", flag: "🇭🇰",
        highlight: "Política de IA por disciplina com diretrizes departamentais",
        details:
          "Cada departamento define sua própria política dentro de um framework institucional. Diretrizes detalhadas para professores sobre como avaliar o uso ético de IA nos trabalhos.",
        tags: ["Política departamental", "Framework institucional"],
        color: "border-purple-300 bg-purple-50", badgeColor: "bg-purple-100 text-purple-700",
      },
      {
        name: "Univ. of Queensland", country: "Austrália", flag: "🇦🇺",
        highlight: "Pesquisa aplicada em IA educacional + políticas de uso",
        details:
          "Centro de pesquisa em IA para educação com publicações sobre impacto no aprendizado. Diretrizes práticas para professores integrarem IA sem comprometer objetivos pedagógicos.",
        tags: ["Pesquisa aplicada", "Diretrizes práticas"],
        color: "border-yellow-300 bg-yellow-50", badgeColor: "bg-yellow-100 text-yellow-700",
      },
    ],
  },
];

const totalCount = regionGroups.reduce((s, g) => s + g.unis.length, 0);

/* ============================================================
   PAGE
   ============================================================ */
export default function BenchmarkingPage() {
  return (
    <div className="bg-slate-50">
      {/* ── PAGE HEADER ─────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="section-label">
            <Globe className="w-4 h-4" /> Pesquisa global
          </p>
          <h1 className="section-title">Benchmarking Global</h1>
          <p className="section-sub max-w-3xl">
            Análise de <strong className="text-ufrgs-dark">{totalCount} universidades de referência</strong> sobre
            como integram IA no ensino superior — com dados reais, iniciativas inovadoras e práticas replicáveis.
            Base do trabalho acadêmico PEP2 · Engenharia de Produção UFRGS.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── KEY FINDINGS ────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-ufrgs-dark mb-6">Principais achados da pesquisa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {keyFindings.map(({ Icon, title, description }, i) => (
              <div key={i} className="card p-6 card-hover">
                <div className="bg-ufrgs-blue/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-ufrgs-blue" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── UNIVERSITIES BY REGION ──────────────────── */}
        {regionGroups.map(({ region, emoji, unis }) => (
          <section key={region} className="mb-14">
            <h2 className="text-2xl font-bold text-ufrgs-dark mb-6 flex items-center gap-2">
              <span>{emoji}</span> {region}
              <span className="text-base font-normal text-gray-400">({unis.length} universidades)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {unis.map((uni, i) => (
                <div key={i} className={`card p-6 border-l-4 ${uni.color} flex flex-col card-hover`}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl leading-none mt-0.5">{uni.flag}</span>
                    <div>
                      <h3 className="font-bold text-gray-900">{uni.name}</h3>
                      <p className="text-xs text-gray-400">{uni.country}</p>
                    </div>
                  </div>

                  <span className={`badge ${uni.badgeColor} mb-3 self-start text-xs`}>
                    {uni.highlight}
                  </span>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">{uni.details}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {uni.tags.map((tag, j) => (
                      <span key={j} className="text-xs bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* ── PROFESSOR INTERVIEW INSIGHT ─────────────── */}
        <section className="mb-14">
          <div className="bg-gradient-to-r from-ufrgs-dark to-ufrgs-blue rounded-2xl p-8 text-white">
            <p className="text-ufrgs-gold text-sm font-semibold mb-2">Perspectiva local · UFRGS</p>
            <h2 className="text-2xl font-bold mb-4">O que dizem os professores da UFRGS</h2>
            <p className="text-blue-100 leading-relaxed mb-4">
              Entrevista com professor com 29 anos de docência na UFRGS revelou o panorama local:
              uso semanal de ChatGPT e Gemini para criação de materiais e questões de prova,
              mas com <strong className="text-white">autopercepção de habilidade baixa em prompt engineering</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                { label: "Principal preocupação", value: "Perda de capacidade de análise crítica nos alunos" },
                { label: "Uso atual", value: "Semanal — materiais didáticos, questões, apoio a programação" },
                { label: "Demanda explícita", value: "Política institucional clara + treinamento em prompts" },
              ].map(({ label, value }, i) => (
                <div key={i} className="bg-white/10 rounded-xl p-4">
                  <p className="text-blue-200 text-xs font-semibold mb-1">{label}</p>
                  <p className="text-white text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────── */}
        <div className="text-center">
          <div className="card p-8 inline-block max-w-xl w-full">
            <h2 className="text-xl font-bold text-ufrgs-dark mb-3">Quer aplicar essas práticas?</h2>
            <p className="text-gray-500 text-sm mb-6">
              Comece pelas diretrizes e veja exemplos práticos de como outros professores estão usando IA hoje.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/diretrizes" className="btn-primary inline-flex items-center gap-2">
                Ver Diretrizes <ExternalLink className="w-4 h-4" />
              </Link>
              <Link href="/exemplos" className="btn-secondary inline-flex items-center gap-2">
                Ver Exemplos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
