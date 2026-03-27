import {
  Shield,
  Eye,
  Brain,
  Target,
  BookOpen,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
} from "lucide-react";

const principles = [
  {
    icon: Eye,
    title: "Transparência",
    description:
      "Declare quando você usou IA para criar ou revisar materiais. Ensine os alunos a fazer o mesmo nos trabalhos. A transparência normaliza o uso ético e constrói confiança.",
    examples: ["Indicar no rodapé de uma apresentação que foi elaborada com auxílio de ChatGPT", "Incluir na política do curso como e quando os alunos devem declarar uso de IA"],
  },
  {
    icon: Brain,
    title: "Foco no Aprendizado",
    description:
      "IA é uma ferramenta de apoio, não substituta do pensamento crítico. O objetivo final é o desenvolvimento das competências do aluno — a IA deve amplificar esse processo, não cortocircuitá-lo.",
    examples: ["Usar IA como interlocutor para testar argumentos, não para gerá-los", "Pedir que alunos expliquem e critiquem a resposta que a IA deu"],
  },
  {
    icon: Target,
    title: "Objetivos Primeiro",
    description:
      "Defina o que quer ensinar ANTES de escolher a ferramenta de IA. A pergunta certa é: 'como esta ferramenta ajuda a alcançar este objetivo de aprendizagem?', não 'o que essa ferramenta faz?'.",
    examples: ["Mapear competências do curso → identificar onde IA pode ajudar vs. atrapalhar", "Evitar usar IA só por ser novidade, sem conexão com o objetivo pedagógico"],
  },
  {
    icon: FileText,
    title: "Política Clara",
    description:
      "Informe os alunos no início do semestre sobre o que é permitido, encorajado e proibido em relação ao uso de IA. Uma política clara reduz ambiguidade e conflitos.",
    examples: ["Incluir seção sobre IA no syllabus do curso", "Discutir abertamente na primeira aula os limites do uso de IA"],
  },
  {
    icon: RefreshCw,
    title: "Atualização Contínua",
    description:
      "As diretrizes evoluem com a tecnologia. O que vale hoje pode ser diferente em 6 meses. Revise suas políticas semestralmente e acompanhe o que outras universidades estão fazendo.",
    examples: ["Revisitar o syllabus a cada semestre para atualizar a política de IA", "Seguir publicações de centros de inovação em ensino de universidades de referência"],
  },
];

const syllabusModels = [
  {
    type: "Restritivo",
    color: "border-red-300 bg-red-50",
    badgeColor: "bg-red-100 text-red-700",
    icon: XCircle,
    iconColor: "text-red-500",
    text: `"O uso de ferramentas de Inteligência Artificial (ChatGPT, Copilot, Claude, etc.) para redigir, gerar ou reformular qualquer parte dos trabalhos avaliados desta disciplina é proibido. Isso inclui rascunhos, análises e relatórios. O objetivo das avaliações é desenvolver sua capacidade de raciocínio e comunicação. O uso indevido será tratado como desonestidade acadêmica, conforme o Regimento da UFRGS."`,
    note: "Adequado para disciplinas onde o processo de escrita ou raciocínio é a própria competência avaliada.",
  },
  {
    type: "Misto",
    color: "border-yellow-300 bg-yellow-50",
    badgeColor: "bg-yellow-100 text-yellow-700",
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
    text: `"Você pode usar ferramentas de IA como ChatGPT ou Copilot para: (a) pesquisar e entender conceitos, (b) revisar gramática e clareza do texto, (c) gerar ideias iniciais para brainstorm. Você NÃO pode usar IA para: redigir os argumentos centrais do trabalho, gerar análises ou conclusões. Sempre que usar IA, declare ao final do trabalho: 'Usei [ferramenta] para [finalidade específica].' Trabalhos sem declaração quando IA foi usada serão penalizados."`,
    note: "Recomendado para a maioria das disciplinas. Equilibra aprendizagem com letramento digital.",
  },
  {
    type: "Permissivo",
    color: "border-green-300 bg-green-50",
    badgeColor: "bg-green-100 text-green-700",
    icon: CheckCircle,
    iconColor: "text-green-500",
    text: `"Nesta disciplina, o uso de ferramentas de IA é encorajado como parte do processo de trabalho. Entendemos IA como uma ferramenta profissional que vocês usarão na carreira. O que avaliamos é sua capacidade de: (1) usar IA com critério para resolver problemas reais, (2) verificar, criticar e complementar o que a IA produz, (3) entregar resultado de qualidade. Documente como você usou IA em cada entrega. A reflexão sobre esse processo faz parte da avaliação."`,
    note: "Recomendado para disciplinas técnicas, projetos de conclusão ou quando o objetivo inclui letramento em IA.",
  },
];

export default function DiretrizesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-ufrgs-blue text-sm font-medium mb-3">
          <Shield className="w-4 h-4" />
          Para professores e alunos
        </div>
        <h1 className="text-4xl font-bold text-ufrgs-dark mb-4">
          Diretrizes para Uso Responsável de IA
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
          O uso de IA no ensino superior não é uma questão de ser a favor ou contra — é uma questão de
          como fazer isso de forma que realmente beneficie o aprendizado. Estas diretrizes são baseadas
          nas melhores práticas identificadas em universidades de referência mundial.
        </p>
      </div>

      {/* What is responsible use */}
      <section className="mb-14">
        <div className="bg-ufrgs-dark text-white rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="bg-ufrgs-gold/20 p-3 rounded-xl">
              <BookOpen className="w-7 h-7 text-ufrgs-gold" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">O que é uso responsável de IA no ensino?</h2>
              <p className="text-blue-100 leading-relaxed mb-4">
                Uso responsável significa aproveitar o potencial da IA para melhorar o aprendizado —
                personalizando o suporte, liberando tempo para atividades de maior valor — sem
                comprometer o desenvolvimento das competências que o ensino deve cultivar.
              </p>
              <p className="text-blue-100 leading-relaxed">
                Não é sobre banir ou liberar tudo. É sobre definir, para cada contexto, <strong className="text-white">quando
                a IA amplifica o aprendizado e quando ela o substitui</strong>. Essa linha é diferente
                para cada disciplina e objetivo pedagógico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-ufrgs-dark mb-2">5 Princípios Fundamentais</h2>
        <p className="text-gray-600 mb-8">
          Baseados no que as melhores universidades do mundo praticam e recomendam.
        </p>

        <div className="space-y-6">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="card p-6 flex gap-5">
                <div className="shrink-0">
                  <div className="bg-ufrgs-blue/10 p-3 rounded-xl">
                    <Icon className="w-6 h-6 text-ufrgs-blue" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-ufrgs-blue bg-ufrgs-blue/10 px-2 py-0.5 rounded-full">
                      #{i + 1}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">{p.title}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-3">{p.description}</p>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Exemplos práticos
                    </p>
                    <ul className="space-y-1">
                      {p.examples.map((ex, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-ufrgs-blue shrink-0 mt-0.5" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Syllabus Models */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-ufrgs-dark mb-2">
          Como comunicar sua política de IA para os alunos
        </h2>
        <p className="text-gray-600 mb-8">
          Inclua uma dessas seções — adaptada para sua disciplina — no syllabus do seu curso. A clareza
          desde o início evita conflitos e educa os alunos sobre uso ético.
        </p>

        <div className="space-y-6">
          {syllabusModels.map((model, i) => {
            const Icon = model.icon;
            return (
              <div key={i} className={`rounded-xl border-2 ${model.color} p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <Icon className={`w-5 h-5 ${model.iconColor}`} />
                  <span className={`badge ${model.badgeColor} font-semibold`}>
                    Modelo {model.type}
                  </span>
                </div>
                <blockquote className="text-gray-700 leading-relaxed text-sm italic border-l-4 border-gray-300 pl-4 mb-4">
                  {model.text}
                </blockquote>
                <p className="text-xs text-gray-500">
                  <strong>Quando usar:</strong> {model.note}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Warning about detectors */}
      <section className="mb-10">
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-800 text-lg mb-2">
                Não recomendamos: detectores de IA em textos de alunos
              </h3>
              <p className="text-amber-700 leading-relaxed mb-3">
                Ferramentas como GPTZero, Turnitin AI Detection e similares <strong>não são confiáveis</strong> para
                fins disciplinares. As taxas de falso-positivo são altas — um aluno que escreveu genuinamente
                pode ser acusado injustamente.
              </p>
              <p className="text-amber-700 leading-relaxed mb-3">
                A Universidade de Toronto, entre outras, <strong>orienta explicitamente seus professores a não usar
                detectores de IA</strong> como evidência em processos disciplinares.
              </p>
              <p className="text-amber-700 text-sm">
                <strong>O que funciona melhor:</strong> redesenhar avaliações para que exijam evidências de processo
                (rascunhos, reflexões, apresentações orais), e usar a declaração de uso como mecanismo de integridade
                — ao invés de tentar detectar o que não se pode detectar com precisão.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
