export interface Tool {
  nome: string;
  tipo: string;
  descricao: string;
  casos_de_uso: string;
  custo: string;
  link: string;
  universidades_que_recomendam: string;
}

export interface Example {
  categoria: string;
  titulo: string;
  descricao: string;
  universidade: string;
  ferramenta: string;
  impacto: string;
  dificuldade: "Baixa" | "Média" | "Alta";
}

// Fallback data for when Google Sheets is not configured yet
export const FALLBACK_TOOLS: Tool[] = [
  {
    nome: "ChatGPT",
    tipo: "LLM Conversacional",
    descricao: "Modelo de linguagem conversacional da OpenAI para tutoria, feedback e geração de conteúdo educacional.",
    casos_de_uso: "Tutorbot, feedback em textos, geração de problemas, role-play, perguntas socráticas",
    custo: "Gratuito/Plus",
    link: "https://chat.openai.com",
    universidades_que_recomendam: "Harvard, MIT, Stanford, Cornell",
  },
  {
    nome: "Microsoft Copilot",
    tipo: "LLM + Produtividade",
    descricao: "Assistente de IA da Microsoft integrado ao pacote Office, ideal para criação de materiais e feedback.",
    casos_de_uso: "Criação de materiais didáticos, feedback em textos, integração com Office 365",
    custo: "Gratuito para instituições",
    link: "https://copilot.microsoft.com",
    universidades_que_recomendam: "UCL, Cambridge, Imperial, Duke",
  },
  {
    nome: "Google NotebookLM",
    tipo: "Análise de documentos",
    descricao: "Ferramenta do Google para análise de documentos próprios: faça upload de aulas e obtenha resumos e perguntas.",
    casos_de_uso: "Upload de aulas → resumos automáticos, perguntas de revisão, debates com o material",
    custo: "Gratuito",
    link: "https://notebooklm.google.com",
    universidades_que_recomendam: "U. Michigan, Cambridge",
  },
  {
    nome: "Google Gemini",
    tipo: "LLM Conversacional",
    descricao: "Modelo de linguagem do Google com capacidades multimodais para suporte a estudantes e professores.",
    casos_de_uso: "Geração de conteúdo, pesquisa acadêmica, suporte personalizado a estudantes",
    custo: "Gratuito/Pro",
    link: "https://gemini.google.com",
    universidades_que_recomendam: "U. Michigan, Cambridge",
  },
  {
    nome: "Claude (Anthropic)",
    tipo: "LLM Conversacional",
    descricao: "Modelo de linguagem focado em segurança e análise de textos longos, ideal para escrita acadêmica.",
    casos_de_uso: "Análise de textos longos, feedback detalhado, escrita acadêmica, revisão de trabalhos",
    custo: "Gratuito/Pro",
    link: "https://claude.ai",
    universidades_que_recomendam: "JHU, Imperial",
  },
  {
    nome: "Perplexity AI",
    tipo: "Busca com IA",
    descricao: "Motor de busca com IA que cita fontes, ideal para pesquisa acadêmica com referências verificáveis.",
    casos_de_uso: "Pesquisa com fontes citadas, análise de tópicos com contexto acadêmico",
    custo: "Gratuito/Pro",
    link: "https://perplexity.ai",
    universidades_que_recomendam: "CMU",
  },
  {
    nome: "Whisper (OpenAI)",
    tipo: "Transcrição",
    descricao: "Modelo de transcrição automática de fala para texto, permite converter aulas gravadas em material escrito.",
    casos_de_uso: "Transcrição de aulas para material escrito, acessibilidade, geração de legendas",
    custo: "Gratuito (API)",
    link: "https://openai.com/research/whisper",
    universidades_que_recomendam: "Múltiplas universidades",
  },
  {
    nome: "Elements of AI",
    tipo: "Literacia em IA",
    descricao: "MOOC gratuito da Universidade de Helsinki para introdução à IA para não-especialistas. +1M usuários.",
    casos_de_uso: "Literacia em IA para alunos e professores sem formação técnica, curso introdutório",
    custo: "Gratuito",
    link: "https://www.elementsofai.com",
    universidades_que_recomendam: "U. Helsinki",
  },
];

export const FALLBACK_EXAMPLES: Example[] = [
  {
    categoria: "Tutoria e Suporte",
    titulo: "Tutor Personalizado 24/7",
    descricao:
      "O professor alimenta a IA com o syllabus e materiais do curso, transformando-a em um tutorbot disponível 24h. O Harvard PS2 Pal dobrou o aprendizado em um RCT com 194 alunos. A U. Michigan usa o Maizey para Gestão de Operações com resultados similares.",
    universidade: "Harvard, U. Michigan",
    ferramenta: "ChatGPT, Claude",
    impacto: "2× mais aprendizagem (RCT com 194 alunos – Harvard)",
    dificuldade: "Baixa",
  },
  {
    categoria: "Tutoria e Suporte",
    titulo: "IA que Pergunta em vez de Responder",
    descricao:
      "A IA é configurada para guiar o raciocínio com perguntas socráticas em vez de entregar respostas prontas. O aluno chega à solução por conta própria, desenvolvendo pensamento crítico. Usado na Universidade da Filadélfia e no Jill Watson da Georgia Tech.",
    universidade: "U. Filadélfia, Georgia Tech",
    ferramenta: "ChatGPT, Claude",
    impacto: "Maior retenção e pensamento crítico",
    dificuldade: "Baixa",
  },
  {
    categoria: "Produção de Material",
    titulo: "Transcrição e Material Pré-Aula",
    descricao:
      "O professor grava a aula → Whisper transcreve automaticamente → NotebookLM gera resumo, perguntas de revisão e pontos-chave → alunos chegam à aula mais preparados e o tempo de aula é aproveitado para discussão.",
    universidade: "Múltiplas universidades",
    ferramenta: "Whisper, Google NotebookLM",
    impacto: "Maior preparação prévia dos alunos",
    dificuldade: "Baixa",
  },
  {
    categoria: "Simulação e Prática",
    titulo: "Role-play e Simulação de Cenários",
    descricao:
      "A IA assume o papel de cliente, auditor, paciente ou stakeholder para que o aluno pratique situações reais antes de enfrentá-las. A NUS (Singapura) usa amplamente em cursos de Direito e Saúde.",
    universidade: "NUS (National University of Singapore)",
    ferramenta: "ChatGPT, Claude",
    impacto: "Prática segura antes de situações reais",
    dificuldade: "Média",
  },
  {
    categoria: "Avaliação e Feedback",
    titulo: "Feedback Inicial em Textos Acadêmicos",
    descricao:
      "O aluno submete um rascunho para a IA antes de enviar ao professor. A IA aponta problemas de estrutura, argumentação e clareza. O professor recebe uma versão mais polida e pode focar em feedback de nível mais alto.",
    universidade: "Harvard, JHU, CMU",
    ferramenta: "ChatGPT, Claude",
    impacto: "Textos finais de maior qualidade",
    dificuldade: "Baixa",
  },
  {
    categoria: "Avaliação e Feedback",
    titulo: "Comparação Humano vs. IA",
    descricao:
      "O aluno resolve um exercício ou escreve um texto sozinho. Depois pede à IA para resolver o mesmo problema e compara os dois resultados, identificando diferenças, erros e pontos de melhoria. Usado em Princeton.",
    universidade: "Princeton",
    ferramenta: "ChatGPT, Gemini",
    impacto: "Desenvolvimento de senso crítico sobre IA",
    dificuldade: "Baixa",
  },
  {
    categoria: "Tutoria e Suporte",
    titulo: "Nivelador de Habilidades Técnicas",
    descricao:
      "A IA ajuda alunos a superar barreiras de pré-requisitos: um aluno de MBA aprende análise de dados sem saber Python, com a IA gerando o código e explicando o raciocínio passo a passo. Reduz desigualdades de background.",
    universidade: "Harvard Business School",
    ferramenta: "ChatGPT, Copilot",
    impacto: "Redução de barreiras de entrada em disciplinas técnicas",
    dificuldade: "Baixa",
  },
  {
    categoria: "Avaliação e Feedback",
    titulo: "Redesign de Avaliações à Prova de IA",
    descricao:
      "Antes de aplicar uma prova ou trabalho, o professor testa com ChatGPT. Se a IA resolver trivialmente, a avaliação é redesenhada para exigir síntese, julgamento ou evidência de processo — habilidades que a IA não substitui.",
    universidade: "MIT, Cornell, U. Toronto",
    ferramenta: "ChatGPT",
    impacto: "Avaliações mais robustas e significativas",
    dificuldade: "Baixa",
  },
];

function parseCSV(csv: string): Record<string, string>[] {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, "").trim());

  return lines.slice(1).map((line) => {
    const values: string[] = [];
    let inQuotes = false;
    let current = "";

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header] = (values[i] || "").replace(/^"|"$/g, "").trim();
    });
    return obj;
  });
}

export async function fetchTools(sheetUrl?: string): Promise<Tool[]> {
  if (!sheetUrl || sheetUrl.includes("SEU_ID")) {
    return FALLBACK_TOOLS;
  }

  try {
    const res = await fetch(sheetUrl, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const csv = await res.text();
    const rows = parseCSV(csv);
    if (rows.length === 0) return FALLBACK_TOOLS;
    return rows as unknown as Tool[];
  } catch {
    console.warn("Could not fetch tools from Google Sheets, using fallback data.");
    return FALLBACK_TOOLS;
  }
}

export async function fetchExamples(sheetUrl?: string): Promise<Example[]> {
  if (!sheetUrl || sheetUrl.includes("SEU_ID")) {
    return FALLBACK_EXAMPLES;
  }

  try {
    const res = await fetch(sheetUrl, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const csv = await res.text();
    const rows = parseCSV(csv);
    if (rows.length === 0) return FALLBACK_EXAMPLES;
    return rows as unknown as Example[];
  } catch {
    console.warn("Could not fetch examples from Google Sheets, using fallback data.");
    return FALLBACK_EXAMPLES;
  }
}
