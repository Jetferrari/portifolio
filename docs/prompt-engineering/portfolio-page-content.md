# Prompt Engineering — Portfolio Page Content

> Prepared for later implementation in the portfolio after the current Codex work is complete.
>
> Source of truth: `docs/prompt-engineering/governed-ai-engineering-workflow-payments.md`
>
> Public case study. Keep the implementation concise on the site and link to the full document rather than rendering the entire prompt set inline.

---

## 1. Page purpose

This section should demonstrate Prompt Engineering as a governed engineering discipline rather than as isolated prompt writing.

The public story is:

- classify the risk before execution;
- route work to the appropriate executor;
- control context and specialist use;
- keep one active writer per work surface;
- require independent review for high-risk surfaces;
- remediate only proven findings;
- close with a delta re-review instead of restarting the full audit;
- optimize model cost without weakening the evidence required by the change.

The payment-integration case study is the concrete example used to prove this workflow.

---

# 2. Canonical Portuguese copy

## Section badge

PROMPT ENGINEERING

## Title

**Prompt Engineering como sistema de controle**

## Lead

Eu não trato um prompt como uma instrução isolada. Em fluxos técnicos de maior risco, o prompt define contexto, autoridade, escopo, executor, limites de decisão, evidências exigidas e o ponto exato em que uma etapa deve terminar.

O objetivo é transformar interação com agentes de IA em um processo verificável, com menos repetição, menos contexto desperdiçado e mais evidência útil para cada decisão.

## Supporting statement

> O valor não está no tamanho do prompt. Está no ciclo de controle que ele cria entre arquitetura, execução, revisão independente, correção direcionada e nova verificação.

---

## 3. What the method demonstrates

### Heading

**O que este case demonstra**

### Cards / compact points

**Roteamento por risco**  
O executor e a profundidade de revisão são escolhidos de acordo com o risco técnico da etapa, não por preferência fixa de modelo.

**Contexto progressivo**  
Cada agente recebe apenas o contexto necessário para sua responsabilidade atual. O escopo expande somente quando existe uma dependência concreta não resolvida.

**Um escritor por superfície**  
Uma única entidade executa alterações em cada superfície de trabalho. Revisores permanecem independentes e, quando possível, somente leitura.

**Evidência proporcional**  
Concorrência, persistência, recuperação após falhas e estado financeiro exigem evidência direta. Alterações delimitadas não precisam repetir uma auditoria completa.

**Remediação direcionada**  
Findings comprovados geram correções específicas. O fluxo não reabre toda a arquitetura quando a causa já está estabelecida.

**Governança de custo**  
Raciocínio mais caro é reservado para decisões que justificam esse custo. Implementações delimitadas usam agentes e verificações proporcionais ao risco.

---

# 4. Workflow

## Heading

**Um fluxo governado em cinco movimentos**

### Visual sequence

1. **Planejar**  
   Congelar contratos, invariantes, limites arquiteturais, riscos e evidências necessárias antes da implementação.

2. **Implementar**  
   Entregar ao agente executor um escopo delimitado, critérios de aceitação e invariantes que não podem ser violados.

3. **Revisar de forma independente**  
   Um agente diferente inspeciona o diff e as superfícies de maior risco sem se transformar em um segundo implementador.

4. **Corrigir findings comprovados**  
   O executor recebe apenas os problemas demonstrados, o comportamento esperado e o menor escopo de remediação aceitável.

5. **Fazer delta re-review**  
   A revisão final cobre somente o que mudou, os findings corrigidos, os invariantes afetados e a nova evidência.

### Diagram source

```text
Planejamento
    ↓
Implementação
    ↓
Revisão independente
    ↓
Findings bloqueadores?
    ├── não → decisão do Owner
    └── sim
          ↓
    Correções direcionadas
          ↓
    Delta re-review
          ↓
    decisão do Owner
```

---

# 5. Case study

## Eyebrow

CASE STUDY / HIGH-RISK PAYMENT INTEGRATION

## Title

**Integração financeira com governança de agentes**

## Intro

Este case público e sanitizado mostra como estruturo uma integração financeira sem transformar cada etapa em uma revisão profunda e cara.

O fluxo separa planejamento, implementação, revisão independente e remediação baseada em evidências. O contexto, os especialistas, a repetição de testes e a profundidade da revisão são limitados de acordo com o risco real de cada fase.

---

# 6. Prompt cases

The site should present these as expandable editorial cases. Do not render the full 1,000-line source document inline.

## Case 01 — Payment Adapter Planning

**Executor:** Codex  
**Mode:** High-Risk Technical Planning

### Objective

Congelar o desenho de um adapter de pagamento usando documentação oficial atual, sem permitir que a terminologia do provedor redefina o modelo financeiro canônico do produto.

### What the prompt controls

- escopo e fora de escopo;
- autoridade das fontes;
- limites arquiteturais;
- autenticação e ciclo de credenciais;
- criação e reconciliação de pagamentos;
- idempotência;
- callbacks;
- comportamento diante de resultado ambíguo;
- evidência de sandbox;
- decisões que realmente pertencem ao Owner.

### Why it matters

O planejamento fecha as fronteiras antes que um agente de implementação comece a produzir código. Isso reduz decisões implícitas, acoplamento ao provedor e retrabalho posterior.

---

## Case 02 — Provider-Neutral Callback Implementation

**Executor:** Antigravity  
**Mode:** Bounded Provider-Neutral Backend Implementation

### Objective

Implementar a fatia congelada de callback e reconciliação com deduplicação durável, correlação canônica, recuperação de falhas e evidência real de concorrência.

### Core invariant

> Callback signal != financial truth.

Um callback não pode, sozinho, capturar ou falhar um pagamento nem confirmar um pedido. A transição financeira exige reconciliação do lado do servidor e aplicação guardada do resultado canônico.

### What the prompt controls

- inbox persistente;
- deduplicação apoiada pelo banco;
- correlação entre referência externa e estado canônico;
- claim / lease;
- proteção contra worker obsoleto;
- I/O do provedor fora de transações;
- crash recovery;
- concorrência real;
- testes focados.

### Why it matters

O prompt não descreve apenas o que construir. Ele estabelece quais falhas são inaceitáveis e qual evidência precisa existir antes de considerar a etapa concluída.

---

## Case 03 — Independent High-Risk Review

**Executor:** Codex  
**Mode:** Read-Only / Diff-First / Risk-First

### Objective

Revisar exatamente o worktree implementado, priorizando as superfícies que podem alterar segurança financeira ou integridade de dados.

### Review principles

- diff primeiro;
- leitura somente quando necessária;
- revisão independente;
- sem alterações de código;
- sem repetir verificações amplas já comprovadas no mesmo estado;
- findings classificados por severidade e evidência.

### Critical review matrix

A revisão concentra evidência em:

- verdade financeira;
- deduplicação no banco;
- correlação e fail-closed;
- conflito com estado já liquidado;
- claim / lease;
- ordem de locks;
- crash recovery;
- concorrência real.

### Why it matters

O revisor não recebe autorização para “melhorar” o sistema. Sua função é provar ou refutar critérios críticos e devolver findings acionáveis.

---

## Case 04 — Targeted Review Remediation

**Executor:** Antigravity  
**Mode:** Targeted High-Risk Remediation

### Objective

Corrigir findings comprovados sem rediagnosticar todo o sistema nem ampliar o escopo.

### What the prompt controls

- somente findings autorizados;
- preservação dos invariantes já aprovados;
- regressões mínimas necessárias;
- ausência de refatoração paralela;
- critérios explícitos para declarar um finding como corrigido.

### Why it matters

Uma revisão útil não deve reiniciar todo o projeto. O prompt transforma findings em um contrato de correção delimitado e verificável.

---

# 7. Closing checkpoint

## Heading

**Delta re-review em vez de recomeçar a auditoria**

Após a remediação, a revisão final cobre somente:

- o diff desde o checkpoint revisado;
- os findings marcados como corrigidos;
- os invariantes que essas correções poderiam regredir;
- a nova evidência de teste.

A revisão completa só é reiniciada quando a correção altera arquitetura, contratos públicos, topologia transacional ou o escopo autorizado de mutação.

---

# 8. Cost-aware execution

## Heading

**Mais evidência por unidade de contexto**

Nem toda etapa precisa do modelo mais caro, do maior contexto ou de uma revisão completa.

O workflow reserva maior capacidade de raciocínio para:

- arquitetura;
- segurança;
- concorrência;
- persistência;
- correção do estado financeiro;
- revisão independente.

Trabalho delimitado é roteado para agentes de execução com contexto menor e validação proporcional.

### Highlight

> O objetivo é maximizar evidência útil por unidade de contexto, tempo e crédito de modelo sem reduzir os controles exigidos pelo risco da mudança.

---

# 9. Why this is high assurance

## Heading

**Otimizar custo não significa reduzir o limite de segurança**

O workflow continua exigindo evidência direta onde atalhos são perigosos:

- transições do estado financeiro canônico;
- idempotência e deduplicação durável;
- fronteiras transacionais;
- recuperação após efeitos externos incertos;
- comportamento de workers obsoletos;
- concorrência real no banco;
- correlação canônica;
- tratamento fail-closed.

A otimização está em decidir onde e quantas vezes essas verificações precisam ser executadas, não em removê-las.

---

# 10. Closing statement

**Architecture decides → one writer implements → an independent reviewer checks the risky surface → a bounded writer fixes proven findings → a delta review closes the loop.**

Supporting copy:

Esse ciclo transforma Prompt Engineering em uma disciplina de coordenação: cada agente recebe autoridade limitada, contexto proporcional, critérios de saída e responsabilidade verificável.

---

# 11. Full-document CTA

## Label

**Ver o case técnico completo**

## Supporting copy

Leia os prompts integrais, critérios de aceitação, matrizes de revisão e regras de sanitização usados neste estudo público.

## URL

https://github.com/Jetferrari/portifolio/blob/main/docs/prompt-engineering/governed-ai-engineering-workflow-payments.md

---

# 12. Suggested portfolio interaction

Recommended presentation:

1. Hero / introduction
2. Five-step workflow
3. Six governance principle cards
4. Payment case-study introduction
5. Four expandable prompt cases
6. Delta re-review checkpoint
7. Cost-aware execution
8. High-assurance explanation
9. Link to full GitHub document

Use progressive disclosure.

Do not place the full prompts directly on the page.

For each expandable prompt case, show by default:

- executor;
- objective;
- what the prompt controls;
- why it matters.

Optionally provide a secondary action such as:

**Ver prompt completo no GitHub**

which can deep-link to the relevant heading in the full document if stable anchors are available.

---

# 13. Visual direction

Keep this section consistent with the existing portfolio:

- deep petroleum green / near-black background;
- restrained cyan-green accents;
- editorial spacing;
- thin borders;
- no gradients as decorative cards;
- no fake terminal aesthetic;
- no excessive code blocks;
- no cyberpunk treatment;
- no animated project artwork.

The workflow can be represented as a restrained horizontal sequence on desktop and a vertical sequence on mobile.

Prompt cases should feel like editorial evidence, not documentation dumps.

---

# 14. Responsive behavior

Desktop:
- workflow may be horizontal;
- governance principles in 2 or 3 columns;
- prompt cases as full-width editorial accordions.

Mobile:
- workflow becomes vertical;
- all cards become one column;
- prompt cases remain expandable;
- no horizontal code overflow;
- CTA stays full-width or naturally wraps.

No horizontal scrolling should be introduced.

---

# 15. Accessibility

Expandable prompt cases must use native or equivalent accessible disclosure behavior.

Recommended:

```html
<details>
  <summary>...</summary>
  ...
</details>
```

or a fully accessible custom accordion with:

- keyboard support;
- `aria-expanded`;
- `aria-controls`;
- visible focus;
- no focusable hidden content.

The section heading hierarchy must remain valid.

---

# 16. Translation guidance

The portfolio is multilingual, but this document is the canonical Portuguese source for the future page implementation.

When translated:

English:
- natural professional English;
- avoid noun-stack translationese;
- preserve technical terms such as Prompt Engineering, Agent Orchestration, fail-closed, delta re-review, worktree and diff when they are clearer as industry terms.

Spanish:
- neutral Latin-American Spanish;
- avoid Portuguese calques;
- preserve the same technical claims without strengthening them.

For all languages:
- translate meaning naturally;
- never enrich a technical claim;
- never imply production scale;
- never imply exactly-once execution;
- never turn a documented workflow into a claim of manual coding.

---

# 17. Suggested i18n namespace

When the page is implemented, keep all visible strings centralized.

Suggested key prefix:

```text
promptEngineering*
```

Suggested families:

```text
promptEngineeringSectionBadge
promptEngineeringTitle
promptEngineeringLead
promptEngineeringStatement

promptEngineeringDemoTitle
promptEngineeringDemoRiskTitle
promptEngineeringDemoRiskDesc
promptEngineeringDemoContextTitle
promptEngineeringDemoContextDesc
promptEngineeringDemoWriterTitle
promptEngineeringDemoWriterDesc
promptEngineeringDemoEvidenceTitle
promptEngineeringDemoEvidenceDesc
promptEngineeringDemoRemediationTitle
promptEngineeringDemoRemediationDesc
promptEngineeringDemoCostTitle
promptEngineeringDemoCostDesc

promptEngineeringWorkflowTitle
promptEngineeringWorkflowPlanTitle
promptEngineeringWorkflowPlanDesc
promptEngineeringWorkflowImplementTitle
promptEngineeringWorkflowImplementDesc
promptEngineeringWorkflowReviewTitle
promptEngineeringWorkflowReviewDesc
promptEngineeringWorkflowFixTitle
promptEngineeringWorkflowFixDesc
promptEngineeringWorkflowDeltaTitle
promptEngineeringWorkflowDeltaDesc

promptEngineeringCaseBadge
promptEngineeringCaseTitle
promptEngineeringCaseIntro

promptEngineeringPrompt1*
promptEngineeringPrompt2*
promptEngineeringPrompt3*
promptEngineeringPrompt4*

promptEngineeringDeltaTitle
promptEngineeringDeltaDesc

promptEngineeringCostTitle
promptEngineeringCostDesc
promptEngineeringCostHighlight

promptEngineeringAssuranceTitle
promptEngineeringAssuranceDesc

promptEngineeringClosing
promptEngineeringClosingDesc

promptEngineeringFullDocLabel
promptEngineeringFullDocDesc
```

Exact keys may be adjusted to the existing i18n conventions during implementation.

---

# 18. Implementation boundary

Do not implement this section until the current Synaptic Home / Codex work has been completed and approved.

When implementation begins:

- inspect the then-current official repository;
- preserve the approved Home;
- preserve existing routes and content;
- integrate this section without reintroducing old experimental code;
- use the full public case-study document only as supporting evidence, not as inline page content;
- run the existing checks and build before migration/deployment.
