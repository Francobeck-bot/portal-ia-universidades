# Como Atualizar o Portal — Guia para Não-Programadores

Este guia explica como qualquer professor ou colaborador pode atualizar o conteúdo do portal sem precisar escrever uma linha de código.

---

## Como funciona o sistema

O portal lê o conteúdo de **planilhas do Google Sheets**. Quando você edita a planilha, o site se atualiza automaticamente em até **1 hora**.

```
Você edita a planilha → Site lê a planilha de hora em hora → Conteúdo atualizado no ar
```

---

## O que você pode atualizar sem programador

| O que | Onde editar |
|-------|-------------|
| Adicionar/remover ferramentas de IA | Planilha "ferramentas" |
| Adicionar/remover exemplos de uso | Planilha "exemplos" |
| Atualizar descrições e links | Nas respectivas planilhas |

**O que NÃO pode ser alterado via planilha** (requer programador):
- Texto das páginas "Diretrizes" e "Benchmarking"
- Cores, layout e design do site
- Estrutura das páginas

---

## Como adicionar uma nova ferramenta

1. Abra a planilha do Google Sheets do portal (peça o link para o responsável)
2. Vá para a aba **"ferramentas"**
3. Role até o final dos dados (após a última linha preenchida)
4. Preencha uma nova linha com estas informações:

| Coluna | O que colocar |
|--------|---------------|
| `nome` | Nome da ferramenta (ex: "Gemini") |
| `tipo` | Categoria (ex: "LLM Conversacional") |
| `descricao` | 1-2 frases explicando o que faz |
| `casos_de_uso` | Usos separados por vírgula (ex: "tutoria, feedback") |
| `custo` | Gratuito / Gratuito/Pro / Pago / Freemium |
| `link` | Endereço web completo (começa com https://) |
| `universidades_que_recomendam` | Lista separada por vírgula |

5. Salve (o Google Sheets salva automaticamente)
6. Aguarde até 1 hora — a ferramenta aparecerá no site

---

## Como adicionar um novo exemplo de uso

1. Abra a planilha e vá para a aba **"exemplos"**
2. Adicione uma nova linha com:

| Coluna | O que colocar |
|--------|---------------|
| `categoria` | Grupo (ex: "Tutoria e Suporte") |
| `titulo` | Título curto |
| `descricao` | Descrição detalhada do caso |
| `universidade` | Onde foi aplicado |
| `ferramenta` | Qual ferramenta foi usada |
| `impacto` | Resultado observado |
| `dificuldade` | **Exatamente**: `Baixa`, `Média` ou `Alta` |

---

## Como forçar a atualização imediata (sem esperar 1 hora)

Se precisar que a mudança apareça imediatamente:

1. Acesse [vercel.com](https://vercel.com) com a conta do projeto
2. Clique no projeto
3. Vá em **Deployments**
4. Clique em **Redeploy** no deploy mais recente
5. O site será recarregado com as informações mais recentes da planilha

---

## Problemas comuns

### "Editei a planilha mas o site não mudou"
- Aguarde até 1 hora (o cache se renova nesse intervalo)
- Verifique se a planilha ainda está com acesso público (veja instruções em `sheets-template.md`)
- Se urgente, faça o Redeploy no Vercel (instruções acima)

### "Apareceu um erro no site"
- Verifique se as colunas da planilha têm os nomes corretos (sem espaços extras, sem acentos diferentes)
- Verifique se não há linhas em branco no meio dos dados
- Para o campo `dificuldade`, use **exatamente**: `Baixa`, `Média` ou `Alta`

### "A planilha foi editada mas não atualiza"
- Verifique se a planilha está pública: Compartilhar → "Qualquer pessoa com o link" → Leitor
- Verifique se a URL nas configurações do Vercel está correta

---

## Para quem vai fazer deploy de uma atualização de código

Se algum programador fizer mudanças no código e você precisar publicar:

1. O programador sobe as mudanças para o **GitHub**
2. O **Vercel detecta automaticamente** e publica em minutos
3. Não precisa fazer nada — o deploy é automático

---

## Estrutura dos arquivos do projeto (para referência)

```
portal-ia-universidades/
├── app/                    # Páginas do site
│   ├── page.tsx            # Página inicial
│   ├── diretrizes/         # Página Diretrizes
│   ├── ferramentas/        # Página Ferramentas
│   ├── exemplos/           # Página Exemplos de Uso
│   └── benchmarking/       # Página Benchmarking
├── components/             # Partes reutilizáveis (header, footer, cards)
├── lib/
│   ├── sheets.ts           # Lógica de leitura do Google Sheets
│   └── config.ts           # URLs das planilhas (via variável de ambiente)
├── .env.local              # Variáveis de ambiente (NÃO vai para o GitHub)
├── COMO_ATUALIZAR.md       # Este arquivo
└── sheets-template.md      # Modelo das planilhas
```

---

## Contato técnico

Em caso de dúvidas técnicas (bugs, erro no site, precisa de nova funcionalidade), entre em contato com:
- O grupo responsável pela disciplina PEP
- Ou o Centro de Teaching & Learning da UFRGS
