import { Eye, Brain, Target, FileText, RefreshCw, AlertTriangle, Copy } from "lucide-react";

const principles = [
  {
    Icon: Eye,
    title: "Transparência",
    description:
      "Declare quando usou IA, como faria com qualquer fonte. Ensine os alunos a fazer o mesmo nos trabalhos.",
  },
  {
    Icon: Brain,
    title: "Aprendizado em primeiro lugar",
    description:
      "IA apoia, não substitui o pensamento crítico. O objetivo final é o desenvolvimento das competências do aluno.",
  },
  {
    Icon: Target,
    title: "Objetivos antes das ferramentas",
    description:
      "Defina o que quer ensinar antes de escolher a ferramenta. A pergunta certa é: como esta IA ajuda a alcançar este objetivo?",
  },
  {
    Icon: FileText,
    title: "Política clara",
    description:
      "Informe os alunos no início do semestre sobre o que é permitido. Uma política clara reduz ambiguidade e conflitos.",
  },
  {
    Icon: RefreshCw,
    title: "Revisão contínua",
    description:
      "As diretrizes evoluem com a tecnologia. Revise suas políticas a cada semestre e acompanhe o que outras universidades fazem.",
  },
];

const syllabusModels = [
  {
    type: "Restritivo",
    borderColor: "#ef4444",
    tagBg: "#fef2f2",
    tagColor: "#b91c1c",
    text: `"O uso de ferramentas de IA generativa não é permitido nesta disciplina. Todo trabalho deve ser de autoria própria do estudante."`,
  },
  {
    type: "Misto",
    borderColor: "#f59e0b",
    tagBg: "#fffbeb",
    tagColor: "#b45309",
    text: `"Ferramentas de IA podem ser usadas como apoio ao processo de aprendizagem, desde que seu uso seja declarado e o trabalho final reflita a compreensão própria do estudante. Indique no trabalho quais ferramentas utilizou e como."`,
  },
  {
    type: "Aberto",
    borderColor: "#5de0e6",
    tagBg: "#ecfeff",
    tagColor: "#0e7490",
    text: `"O uso de IA é encorajado nesta disciplina como parte da preparação para o mercado de trabalho. O estudante deve documentar seu processo, incluindo os prompts utilizados e uma análise crítica dos resultados gerados."`,
  },
];

export default function DiretrizesPage() {
  return (
    <div className="bg-white">

      {/* Page hero */}
      <div
        className="border-b border-gray-100"
        style={{ background: "linear-gradient(135deg, #004aad08, #5de0e615)" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="section-label">Para professores e alunos</p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Diretrizes para Uso<br />
            <span
              style={{
                background: "linear-gradient(135deg, #004aad, #5de0e6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Responsável de IA
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
            O uso de IA no ensino superior não é uma questão de ser a favor ou contra.
            É uma questão de como fazer de forma que realmente beneficie o aprendizado.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">

        {/* ── SEÇÃO 1: Princípios ── */}
        <section>
          <p className="section-label">01</p>
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Princípios para uso responsável de IA no ensino
          </h2>
          <p className="text-gray-500 mb-8">
            Cinco princípios baseados no que as melhores universidades do mundo praticam e recomendam.
          </p>

          <div className="space-y-3">
            {principles.map(({ Icon, title, description }, i) => (
              <div
                key={i}
                className="flex gap-5 p-6 rounded-xl border border-gray-100 hover:border-[#5de0e6]/50
                           hover:shadow-sm transition-all duration-200 bg-white"
              >
                <div className="shrink-0 mt-0.5">
                  <div
                    className="p-2.5 rounded-lg"
                    style={{ background: "linear-gradient(135deg, #004aad15, #5de0e620)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "#004aad" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-black" style={{ color: "#5de0e6" }}>0{i + 1}</span>
                    <h3 className="font-black text-gray-900">{title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEÇÃO 2: Modelos de syllabus ── */}
        <section>
          <p className="section-label">02</p>
          <h2 className="text-2xl font-black text-gray-900 mb-2">
            Como comunicar sua política de IA para os alunos
          </h2>
          <p className="text-gray-500 mb-8">
            Três modelos prontos para copiar e colar no syllabus do seu curso.
          </p>

          <div className="space-y-4">
            {syllabusModels.map(({ type, borderColor, tagBg, tagColor, text }, i) => (
              <div
                key={i}
                className="rounded-xl p-6 bg-white border"
                style={{ borderColor: `${borderColor}60` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: tagBg, color: tagColor }}
                  >
                    Modelo {type}
                  </span>
                  <button
                    className="inline-flex items-center gap-1.5 text-xs font-medium
                               text-gray-400 hover:text-gray-700 transition-colors"
                    title="Copiar texto"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copiar
                  </button>
                </div>
                <blockquote
                  className="text-gray-700 text-sm leading-relaxed italic border-l-2 pl-4"
                  style={{ borderColor }}
                >
                  {text}
                </blockquote>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEÇÃO 3: Aviso ── */}
        <section>
          <p className="section-label">03</p>
          <div className="rounded-xl p-6 border-2 border-amber-200 bg-amber-50">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-black text-amber-900 mb-2">
                  Aviso importante: detectores de IA não são confiáveis
                </h3>
                <p className="text-amber-800 text-sm leading-relaxed mb-3">
                  Ferramentas como <strong>Turnitin AI Detection</strong> e <strong>GPTZero</strong> apresentam
                  altas taxas de falso-positivo e são <strong>comprovadamente enviesadas contra falantes
                  não-nativos de inglês</strong>, acusando injustamente alunos que escreveram por conta própria.
                </p>
                <p className="text-amber-800 text-sm leading-relaxed mb-3">
                  Universidades como <strong>MIT</strong> e <strong>University of Toronto</strong> rejeitam
                  formalmente o uso dessas ferramentas como evidência em processos disciplinares.
                </p>
                <p className="text-amber-700 text-sm">
                  <strong>O que funciona melhor:</strong> redesenhar avaliações para exigir evidência de
                  processo (rascunhos, reflexões, defesas orais) e adotar declaração de uso como mecanismo
                  de integridade acadêmica.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
