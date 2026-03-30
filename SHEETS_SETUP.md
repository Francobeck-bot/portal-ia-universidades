# Configuração das Planilhas Google Sheets

Este guia explica quais planilhas criar, com quais colunas, e como conectar ao portal.

---

## 1. Criar as planilhas

Você vai precisar de **2 planilhas separadas** no Google Sheets:
- Uma para as **Ferramentas**
- Uma para os **Exemplos de Uso**

### Como criar:
1. Acesse [sheets.google.com](https://sheets.google.com) e clique em **+** para criar uma nova planilha
2. Repita para a segunda planilha

---

## 2. Planilha de Ferramentas

### Colunas obrigatórias (primeira linha = cabeçalho, exatamente assim):

| Coluna | Descrição |
|---|---|
| `nome` | Nome da ferramenta (ex: ChatGPT) |
| `tipo` | Categoria: `Tutor`, `Feedback`, `Criação de Conteúdo`, `Transcrição`, ou `Literacia em IA` |
| `descricao` | Descrição curta (1-2 frases) |
| `casos_de_uso` | Usos separados por vírgula |
| `custo` | `Gratuito`, `Freemium`, `Pago`, ou `Gratuito / Pago` |
| `link` | URL completa (ex: https://chat.openai.com) |
| `universidades_que_recomendam` | Lista separada por vírgula |

### Exemplo de linha preenchida:
```
ChatGPT | Tutor / Feedback | Assistente conversacional para tutoria e feedback | Tutorbot, role-play, revisão de textos | Gratuito / Pago | https://chat.openai.com | Harvard, MIT, Stanford
```

---

## 3. Planilha de Exemplos de Uso

### Colunas obrigatórias:

| Coluna | Descrição |
|---|---|
| `categoria` | Agrupamento: ex. `Tutor Personalizado`, `Avaliação e Feedback`, `Simulação e Prática` |
| `titulo` | Título curto do exemplo |
| `descricao` | O que é e para que serve (2-3 frases) |
| `como_fazer` | Instruções passo a passo para o professor implementar |
| `universidade` | Onde foi usado (ex: Harvard / MIT) |
| `ferramenta` | Ferramenta utilizada (ex: ChatGPT) |
| `dificuldade` | `Baixa`, `Média`, ou `Alta` |

---

## 4. Publicar as planilhas como CSV público

Para cada planilha:

1. Clique em **Arquivo → Compartilhar → Publicar na web**
2. Em "Planilha", selecione a aba com os dados
3. Em "Formato", selecione **Valores separados por vírgulas (.csv)**
4. Clique em **Publicar** e confirme
5. Copie o link gerado — ele terá este formato:
   ```
   https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/pub?gid=0&single=true&output=csv
   ```

---

## 5. Conectar ao portal

1. Na pasta do projeto, abra o arquivo **`.env.local`**
2. Substitua os valores:
   ```
   TOOLS_SHEET_URL=https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/pub?...
   EXAMPLES_SHEET_URL=https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/pub?...
   ```
3. Salve o arquivo e faça o redeploy no Vercel

> **No Vercel:** vá em Settings → Environment Variables e adicione as duas variáveis lá também.

---

## 6. Atualização automática

O portal recarrega os dados das planilhas a cada **1 hora** automaticamente.
Se precisar forçar atualização imediata, acesse o painel do Vercel e clique em **Redeploy**.

---

## Dúvidas?

Consulte o arquivo `COMO_ATUALIZAR.md` para instruções de edição do conteúdo.
