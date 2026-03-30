import { Eye, Brain, Target, FileText, RefreshCw, AlertTriangle } from "lucide-react";
import { fetchPrinciples, fetchSyllabus } from "@/lib/sheets";
import { SHEETS_CONFIG } from "@/lib/config";
import SyllabusCard from "@/components/SyllabusCard";
import type { LucideIcon } from "lucide-react";

const PRINCIPLE_ICONS: LucideIcon[] = [Eye, Brain, Target, FileText, RefreshCw];

export default async function DiretrizesPage() {
  const [principles, syllabusModels] = await Promise.all([
    fetchPrinciples(SHEETS_CONFIG.principlesSheetUrl),
    fetchSyllabus(SHEETS_CONFIG.syllabusSheetUrl),
  ]);

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
            {principles.map((principle, i) => {
              const Icon = PRINCIPLE_ICONS[i] ?? FileText;
              return (
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
                      <span className="text-xs font-black" style={{ color: "#5de0e6" }}>
                        {principle.numero}
                      </span>
                      <h3 className="font-black text-gray-900">{principle.titulo}</h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{principle.descricao}</p>
                  </div>
                </div>
              );
            })}
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
            {syllabusModels.map((model, i) => (
              <SyllabusCard key={i} model={model} />
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
