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
  como_fazer: string;
  universidade: string;
  ferramenta: string;
  dificuldade: "Baixa" | "Média" | "Alta";
}

export const FALLBACK_TOOLS: Tool[] = [
  {
    nome: "ChatGPT",
    tipo: "Tutor / Feedback",
    descricao: "Assistente conversacional para tutoria, feedback em textos e geração de problemas.",
    casos_de_uso: "Tutorbot, role-play, comparação humano vs. IA, revisão de textos",
    custo: "Gratuito / Pago",
    link: "https://chat.openai.com",
    universidades_que_recomendam: "Harvard, MIT, Stanford, Cornell, Princeton",
  },
  {
    nome: "Microsoft Copilot",
    tipo: "Criação de Conteúdo",
    descricao: "IA integrada ao Office 365 para criar materiais de aula, rubricas e slides.",
    casos_de_uso: "Criação de materiais, feedback em textos, integração com Word e PowerPoint",
    custo: "Gratuito para instituições",
    link: "https://copilot.microsoft.com",
    universidades_que_recomendam: "UCL, Cambridge, Imperial, Duke",
  },
  {
    nome: "Google NotebookLM",
    tipo: "Tutor",
    descricao: "Faz perguntas e debates com base nos documentos que você carrega.",
    casos_de_uso: "Material pré-aula a partir de gravações, resumos automáticos, perguntas de revisão",
    custo: "Gratuito",
    link: "https://notebooklm.google.com",
    universidades_que_recomendam: "U. Michigan, Cambridge",
  },
  {
    nome: "Google Gemini",
    tipo: "Feedback / Criação de Conteúdo",
    descricao: "Assistente Google para geração de conteúdo e suporte a estudantes.",
    casos_de_uso: "Geração de conteúdo, pesquisa, suporte a dúvidas",
    custo: "Gratuito / Pago",
    link: "https://gemini.google.com",
    universidades_que_recomendam: "U. Michigan, Cambridge",
  },
  {
    nome: "Claude (Anthropic)",
    tipo: "Feedback",
    descricao: "Excelente para textos longos, feedback detalhado e escrita acadêmica.",
    casos_de_uso: "Análise de textos, feedback em trabalhos, role-play",
    custo: "Gratuito / Pago",
    link: "https://claude.ai",
    universidades_que_recomendam: "JHU, Imperial",
  },
  {
    nome: "Perplexity AI",
    tipo: "Criação de Conteúdo",
    descricao: "Busca com IA que cita as fontes automaticamente.",
    casos_de_uso: "Pesquisa com fontes verificáveis, análise de dados com contexto",
    custo: "Gratuito / Pago",
    link: "https://perplexity.ai",
    universidades_que_recomendam: "CMU",
  },
  {
    nome: "Whisper",
    tipo: "Transcrição",
    descricao: "Transcreve automaticamente áudio e vídeo de aulas.",
    casos_de_uso: "Transcrição de aulas para material escrito, geração de legendas",
    custo: "Gratuito",
    link: "https://openai.com/research/whisper",
    universidades_que_recomendam: "Múltiplas universidades",
  },
  {
    nome: "Elements of AI",
    tipo: "Literacia em IA",
    descricao: "Curso gratuito de introdução à IA para não-especialistas, com mais de 1 milhão de usuários.",
    casos_de_uso: "Literacia básica em IA para professores e alunos",
    custo: "Gratuito",
    link: "https://www.elementsofai.com",
    universidades_que_recomendam: "University of Helsinki",
  },
];

export const FALLBACK_EXAMPLES: Example[] = [
  {
    categoria: "Tutor Personalizado",
    titulo: "Tutorbot 24/7 com o conteúdo do seu curso",
    descricao:
      "Professor alimenta o ChatGPT com o syllabus e materiais da disciplina; alunos tiram dúvidas a qualquer hora sem depender do horário do professor.",
    como_fazer:
      "1) Reúna o syllabus e os slides da disciplina.\n2) Abra o ChatGPT e cole o conteúdo com a instrução: \"Você é um assistente de ensino desta disciplina. Responda dúvidas dos alunos com base nesse material e nunca dê respostas diretas — faça perguntas que guiem o raciocínio.\"\n3) Compartilhe o link do chat com os alunos.",
    universidade: "Harvard / U. Michigan",
    ferramenta: "ChatGPT",
    dificuldade: "Baixa",
  },
  {
    categoria: "Tutor Personalizado",
    titulo: "IA que Pergunta em vez de Responder",
    descricao:
      "Em vez de dar respostas, a IA guia o aluno com perguntas que estimulam o raciocínio crítico. Método socrático implementado com um simples prompt.",
    como_fazer:
      "Configure o ChatGPT com o prompt: \"Quando o aluno fizer uma pergunta, não dê a resposta. Em vez disso, faça 2 ou 3 perguntas que o ajudem a chegar à resposta sozinho.\"\nUse em plantões de dúvidas ou como suporte fora do horário de aula.",
    universidade: "Universidade da Filadélfia / Georgia Tech",
    ferramenta: "ChatGPT",
    dificuldade: "Baixa",
  },
  {
    categoria: "Produção de Material",
    titulo: "Transcrição e Material Pré-Aula",
    descricao:
      "Whisper transcreve a aula; NotebookLM gera resumo, pontos-chave e perguntas de revisão para os alunos chegarem mais preparados.",
    como_fazer:
      "1) Grave a aula (qualquer celular serve).\n2) Faça upload no Whisper para obter a transcrição.\n3) Cole a transcrição no NotebookLM.\n4) Peça: \"Gere um resumo com os pontos principais e 5 perguntas de revisão.\"\n5) Compartilhe com os alunos antes da próxima aula.",
    universidade: "U. Edinburgh / Cambridge",
    ferramenta: "Whisper + NotebookLM",
    dificuldade: "Baixa",
  },
  {
    categoria: "Avaliação e Feedback",
    titulo: "Feedback em Rascunhos",
    descricao:
      "IA revisa o rascunho do aluno e aponta pontos de melhoria antes que o professor precise ver. O professor recebe versões mais polidas.",
    como_fazer:
      "Instrua os alunos a colar o rascunho no ChatGPT com o prompt: \"Você é um revisor acadêmico. Aponte os 3 principais pontos de melhoria deste texto em relação a clareza, argumentação e estrutura. Não reescreva — apenas aponte o que melhorar.\"",
    universidade: "Harvard / JHU / CMU",
    ferramenta: "ChatGPT",
    dificuldade: "Baixa",
  },
  {
    categoria: "Simulação e Prática",
    titulo: "Role-play e Simulação",
    descricao:
      "IA assume o papel de cliente, fornecedor, auditor ou stakeholder para o aluno praticar antes de situações reais.",
    como_fazer:
      "Configure o ChatGPT: \"Você é um gerente de produção insatisfeito com atrasos na entrega. O aluno vai tentar negociar contigo. Seja realista e exigente.\"\nUse antes de visitas técnicas, estágios ou apresentações.",
    universidade: "NUS / Imperial",
    ferramenta: "ChatGPT",
    dificuldade: "Baixa",
  },
  {
    categoria: "Pensamento Crítico",
    titulo: "Comparação Humano vs. IA",
    descricao:
      "Aluno faz o exercício sozinho, depois pede para a IA fazer o mesmo e compara — desenvolvendo senso crítico sobre as capacidades e limitações da IA.",
    como_fazer:
      "1) Aluno resolve o problema (análise de processo, diagnóstico, proposta de melhoria).\n2) Pede para o ChatGPT resolver o mesmo problema.\n3) Compara as duas respostas e escreve um parágrafo sobre as diferenças, o que a IA acertou, errou e o que só ele sabia por estar no contexto.",
    universidade: "Princeton / Cornell",
    ferramenta: "ChatGPT",
    dificuldade: "Baixa",
  },
  {
    categoria: "Avaliação e Feedback",
    titulo: "Redesign de Avaliações",
    descricao:
      "Professor testa a prova ou trabalho com ChatGPT antes de aplicar; se a IA resolver trivialmente, é hora de redesenhar.",
    como_fazer:
      "Cole a prova no ChatGPT e peça: \"Resolva essa avaliação da melhor forma possível.\"\nSe a resposta for boa, adicione elementos que a IA não consegue replicar: reflexão sobre experiência de campo, análise de dados específicos da turma, defesa oral das escolhas.",
    universidade: "MIT / Cornell / U. Toronto",
    ferramenta: "ChatGPT",
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
