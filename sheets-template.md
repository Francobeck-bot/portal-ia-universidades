# Modelo de Planilhas Google Sheets

Este arquivo descreve como criar e formatar as planilhas do Google Sheets que alimentam o portal.

---

## Visão Geral

O portal usa **2 planilhas** do Google Sheets:

1. **Ferramentas** — lista de ferramentas de IA recomendadas
2. **Exemplos de Uso** — casos práticos de uso de IA no ensino

Você pode usar **uma única planilha com duas abas** ou duas planilhas separadas. Recomendamos uma planilha com duas abas (mais fácil de gerenciar).

---

## Como criar a planilha

1. Acesse [sheets.google.com](https://sheets.google.com) e clique em **+ Em branco**
2. Renomeie a planilha (ex: "Portal IA UFRGS - CMS")
3. Renomeie a **Aba 1** para `ferramentas`
4. Crie uma **Aba 2** e renomeie para `exemplos`
5. Preencha cada aba conforme abaixo

---

## Aba 1: `ferramentas`

### Colunas (linha 1 = cabeçalho, escreva EXATAMENTE assim):

| Coluna | Nome no cabeçalho | Descrição |
|--------|-------------------|-----------|
| A | `nome` | Nome da ferramenta |
| B | `tipo` | Categoria (ex: LLM Conversacional, Análise de documentos) |
| C | `descricao` | Descrição em 1-2 frases |
| D | `casos_de_uso` | Lista separada por vírgulas |
| E | `custo` | Gratuito / Gratuito/Pro / Pago / Freemium |
| F | `link` | URL completa (https://...) |
| G | `universidades_que_recomendam` | Lista de universidades, separadas por vírgula |

### Exemplo de dados:

```
nome,tipo,descricao,casos_de_uso,custo,link,universidades_que_recomendam
ChatGPT,LLM Conversacional,"Modelo de linguagem da OpenAI para tutoria e feedback","Tutorbot, feedback, geração de problemas",Gratuito/Plus,https://chat.openai.com,"Harvard, MIT, Stanford"
Google NotebookLM,Análise de documentos,"Upload de aulas → resumos e perguntas automáticas","Resumos, perguntas de revisão",Gratuito,https://notebooklm.google.com,"U. Michigan, Cambridge"
```

### Tipos aceitos (para filtros funcionarem):
- `LLM Conversacional`
- `LLM + Produtividade`
- `Análise de documentos`
- `Busca com IA`
- `Transcrição`
- `Literacia em IA`

---

## Aba 2: `exemplos`

### Colunas (linha 1 = cabeçalho):

| Coluna | Nome no cabeçalho | Descrição |
|--------|-------------------|-----------|
| A | `categoria` | Grupo do exemplo (ex: Tutoria e Suporte) |
| B | `titulo` | Título curto e descritivo |
| C | `descricao` | Descrição detalhada do caso |
| D | `universidade` | Instituição onde foi aplicado |
| E | `ferramenta` | Ferramenta usada |
| F | `impacto` | Resultado observado |
| G | `dificuldade` | **Deve ser exatamente**: `Baixa`, `Média` ou `Alta` |

### Exemplo de dados:

```
categoria,titulo,descricao,universidade,ferramenta,impacto,dificuldade
Tutoria e Suporte,Tutor Personalizado 24/7,"Professor alimenta IA com syllabus → tutorbot disponível 24h","Harvard, U. Michigan","ChatGPT, Claude","2× mais aprendizagem (RCT)",Baixa
Produção de Material,Transcrição de Aulas,"Grava aula → Whisper transcreve → NotebookLM gera resumo",Múltiplas universidades,"Whisper, NotebookLM","Alunos chegam mais preparados",Baixa
```

### Categorias sugeridas:
- `Tutoria e Suporte`
- `Produção de Material`
- `Avaliação e Feedback`
- `Simulação e Prática`

---

## Como tornar a planilha pública

**IMPORTANTE:** A planilha precisa ser pública para o site conseguir lê-la.

1. Clique em **Compartilhar** (botão azul no canto superior direito)
2. Em "Acesso geral", selecione **Qualquer pessoa com o link**
3. Certifique-se de que a permissão é **Leitor** (não Editor)
4. Clique em **Concluído**

---

## Como obter a URL de exportação CSV

1. Abra a planilha no Google Sheets
2. Olhe a URL na barra do navegador — ela terá este formato:
   ```
   https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXX/edit#gid=0
   ```
3. O **ID da planilha** é a parte entre `/d/` e `/edit` (os `X`s acima)
4. O **GID** é o número após `gid=` (cada aba tem um GID diferente)
   - Para encontrar o GID de uma aba específica: clique na aba → olhe o `gid=` na URL

5. Monte a URL de exportação:
   ```
   https://docs.google.com/spreadsheets/d/[ID]/export?format=csv&gid=[GID]
   ```

### Exemplo:
Se a URL da sua planilha de ferramentas for:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit#gid=0
```

A URL de exportação CSV será:
```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/export?format=csv&gid=0
```

---

## Onde configurar as URLs no projeto

Após obter as URLs, adicione-as no arquivo `.env.local` (na raiz do projeto):

```env
TOOLS_SHEET_URL=https://docs.google.com/spreadsheets/d/[SEU_ID]/export?format=csv&gid=[GID_FERRAMENTAS]
EXAMPLES_SHEET_URL=https://docs.google.com/spreadsheets/d/[SEU_ID]/export?format=csv&gid=[GID_EXEMPLOS]
```

No Vercel, adicione essas variáveis em **Settings → Environment Variables**.

---

## Dicas importantes

- **Nunca mude os nomes das colunas** — o site depende deles
- **Não deixe linhas em branco** no meio dos dados
- **Para o campo `dificuldade`**, use exatamente: `Baixa`, `Média` ou `Alta` (com acento)
- **Para URLs**, sempre inclua o `https://`
- **Para listas** (como `casos_de_uso` e `universidades_que_recomendam`), separe com vírgulas
- Após editar a planilha, o site se atualiza em até **1 hora** automaticamente
