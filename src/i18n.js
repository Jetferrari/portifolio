'use strict';

const root = typeof window !== 'undefined'
  ? window
  : (typeof globalThis !== 'undefined' ? globalThis : (typeof self !== 'undefined' ? self : this));

(function (root, factory) {
  const i18n = factory();
  if (typeof module === 'object' && module && module.exports) {
    module.exports = i18n;
  }
  if (root) {
    root.i18n = i18n;
  }
})(root, function () {
  const STORAGE_KEY = 'portfolio-language';
  const SUPPORTED_LANGS = ['pt', 'en', 'es'];
  const DEFAULT_LANG = 'pt';

  const HTML_LANG_MAP = {
    pt: 'pt-BR',
    en: 'en',
    es: 'es'
  };

  const DICTIONARY = {
  "pt": {
    "langLabel": "PT",
    "langToggleAria": "Alterar idioma",
    "navToggleAria": "Abrir menu de navegação",
    "navCloseAria": "Fechar menu",
    "homeGlyphAria": "Ir para a página inicial (Rede Sináptica)",
    "drawerTitle": "Navegação",
    "navHome": "Home",
    "navProfile": "Perfil",
    "navProjects": "Projetos",
    "navProcess": "Processo",
    "navContact": "Contato",
    "footerBackToHub": "Voltar ao hub",
    "footerBackToHubAria": "Retornar à página inicial (Rede Sináptica)",
    "homeHint": "Selecione um módulo para navegar pelo portfólio",
    "homeHeroStageAria": "Rede neural interativa de navegação profissional",
    "homeNetworkSvgAria": "Mapa interativo dos dez eixos profissionais de Jeterson Ferrari",
    "homeCoreAria": "Ativar pulso do núcleo de IA",
    "homeMetaDesc": "Portfólio de Jeterson Ferrari, AI-Directed Product Builder. Mapa de navegação visual conduzido por rede neural sináptica.",
    "homePageTitle": "Jeterson Ferrari — AI-Directed Product Builder",
    "nodeProfile": "Perfil",
    "nodeTechStack": "Tech Stack",
    "nodeLanguages": "Idiomas",
    "nodeAiWorkflow": "AI Workflow",
    "nodeContact": "Contato",
    "nodeArchitecture": "Architecture",
    "nodeProblemSolving": "Problem Solving",
    "nodePulsar": "Pulsar",
    "nodeProcess": "Processo",
    "nodeRestaurantZero": "RestaurantZero",
    "contactSectionBadge": "CONTATO / OPORTUNIDADE",
    "contactOppLead": "Se você tem um problema de produto que pode ser transformado em software, quero entender o problema.",
    "contactOppText": "Procuro minha primeira oportunidade profissional em desenvolvimento AI-native. Posso partir de um problema aberto e estruturar o processo do zero ou trabalhar dentro de tecnologias, arquiteturas, agentes e restrições previamente definidos pela equipe.",
    "contactOppGoal": "<strong>Meu objetivo é simples:</strong> receber um problema, entender o resultado esperado e coordenar os recursos de IA necessários para chegar a uma solução funcional e verificável.",
    "contactPhoneLabel": "Telefone",
    "contactEmailLabel": "E-mail",
    "contactLinkedInLabel": "LinkedIn",
    "contactGitHubLabel": "GitHub",
    "contactPageTitle": "Contato — Jeterson Ferrari | AI-Directed Product Builder",
    "contactMetaDesc": "Entre em contato com Jeterson Ferrari, AI-Directed Product Builder. Telefone, e-mail, LinkedIn e GitHub.",
    "profilePageTitle": "Perfil — Jeterson Ferrari | AI-Directed Product Builder",
    "profileMetaDesc": "Conheça Jeterson Ferrari, AI-Directed Product Builder: proposta de valor, modelo de atuação, ferramentas que utiliza diretamente e tecnologias presentes nos projetos.",
    "profileSectionBadge": "01 / PERFIL",
    "profileProposition": "“Me dê o problema. Eu estruturo a solução, defino o plano e coordeno os agentes de IA até que ele se torne um software funcional.”",
    "profileProseP1": "Sou autodidata e trabalho com desenvolvimento de software conduzido por inteligência artificial. Transformo problemas e ideias em produtos funcionais coordenando agentes de IA do planejamento à validação.",
    "profileProseP2": "Não escrevo código manualmente e não faço revisão de código linha por linha. Meu trabalho acontece antes e ao redor do código: pesquisa, entendimento do problema, inteligência de produto, planejamento da solução, arquitetura de alto nível, definição de regras e restrições, especificação, engenharia de prompts, coordenação de agentes e validação do resultado.",
    "profileProseP3": "Quando o projeto entra em implementação, os agentes executam a parte técnica. Eu direciono o trabalho, forneço contexto, defino o que deve ser entregue, solicito testes e revisões, avalio o comportamento do produto e decido quando corrigir, aprofundar ou avançar.",
    "profileProseP4": "Atualmente desenvolvo projetos próprios e busco minha primeira oportunidade profissional em um ambiente onde essa forma AI-native de construir produtos possa ser aplicada a problemas reais.",
    "profileHighlight1Desc": "Transformar necessidades, ideias e problemas pouco definidos em objetivos concretos de produto.",
    "profileHighlight2Desc": "Estruturar contexto, prompts, agentes, etapas e critérios para que diferentes IAs executem o trabalho técnico de forma coordenada.",
    "profileHighlight3Desc": "Validar comportamento, experiência e resultados contra o que foi planejado, com apoio de testes e revisões executados por agentes.",
    "profileToolsBadge": "02 / FERRAMENTAS & TECNOLOGIAS",
    "profileToolsTitle": "Ferramentas e Tecnologias",
    "profileToolsDirectHeading": "Ferramentas que opero diretamente",
    "profileToolGroup1": "Planejamento, pesquisa e raciocínio",
    "profileToolGroup2": "Agentes e ambientes de implementação",
    "profileToolGroup3": "Desenvolvimento local",
    "profileToolClarification": "Não utilizo VS Code ou outro editor de código manual como parte central do meu processo.",
    "profileTechHeading": "Tecnologias presentes nos meus projetos",
    "profileTechClarification": "Essas tecnologias aparecem nos sistemas construídos pelos agentes. Não as apresento como linguagens, frameworks ou ferramentas que programo manualmente.",
    "profileLanguagesBadge": "03 / IDIOMAS",
    "profileLanguagesTitle": "Comunicação e idiomas",
    "profileLangPtLevel": "Nativo",
    "profileLangPtDesc": "Língua nativa para formulação estratégica, comunicação clara e documentação aprofundada.",
    "profileLangEsLevel": "Fluente",
    "profileLangEsDesc": "Capacidade fluente de conversação, leitura e colaboração técnica em espanhol.",
    "profileLangEnLevel": "Basic / Intermediate speaking",
    "profileLangEnDesc": "Leitura e comunicação técnica escrita com apoio de ferramentas de IA.",
    "processPageTitle": "Processo — Como eu trabalho | Jeterson Ferrari",
    "processMetaDesc": "Como Jeterson Ferrari constrói software: metodologia AI-directed, resolução de problemas, princípios de arquitetura e workflow de agentes.",
    "processWorkflowBadge": "01 / FLUXO DE TRABALHO",
    "processWorkflowTitle": "Como eu trabalho",
    "processWorkflowLead": "Meu processo começa antes de qualquer código ser produzido. A implementação é apenas uma etapa dentro de um sistema maior de pesquisa, planejamento, direção, revisão por IA e validação.",
    "processStep1Desc": "Faço uma pesquisa ampla sobre o produto, o problema, o mercado, o público e as soluções existentes antes de definir a direção.",
    "processStep2Desc": "Crio um contexto especializado no assunto para concentrar pesquisa, raciocínio, decisões, restrições e referências relevantes para o projeto.",
    "processStep3Desc": "Defino o problema a resolver, para quem ele existe, quais restrições importam e qual resultado final deve ser alcançado.",
    "processStep4Desc": "Planejo com IA a arquitetura de alto nível, tecnologias, módulos, limites, dependências e sequência de desenvolvimento.",
    "processStep5Desc": "Crio um agente especializado para o projeto, com contexto, regras, arquitetura, objetivos e critérios de validação próprios.",
    "processStep6Desc": "O agente supervisor transforma o plano em instruções específicas para os agentes de código e analisa o retorno de cada etapa.",
    "processStep7Desc": "Antigravity, Codex, Claude Code, Lovable ou Google AI Studio executam a implementação técnica.",
    "processStep8Desc": "Sempre que necessário, utilizo uma IA diferente para revisar o trabalho produzido por outra, reduzindo dependência de um único modelo.",
    "processStep9Desc": "Os agentes executam testes e verificações definidos para cada módulo antes de avançar.",
    "processStep10Desc": "Eu verifico se comportamento, interface, fluxos e resultados correspondem ao que foi planejado. Não aprovo código pela leitura linha por linha.",
    "processStep11Desc": "Quando algo diverge do objetivo, retorno o resultado ao sistema de IA para investigação, correção, novos testes e nova validação.",
    "processProblemSolvingBadge": "02 / PROBLEM SOLVING",
    "processProblemSolvingLead": "Meu principal trabalho não é escrever código. É transformar problemas vagos em problemas solucionáveis e resultados verificáveis.",
    "processMethod1Title": "Entender o problema real",
    "processMethod1Desc": "Separar a necessidade central de sintomas, suposições e soluções prematuras.",
    "processMethod2Title": "Definir o resultado",
    "processMethod2Desc": "Determinar como deve se comportar o produto quando o problema estiver efetivamente resolvido.",
    "processMethod3Title": "Mapear restrições",
    "processMethod3Desc": "Identificar recursos, limites, requisitos, dependências e condições que a solução precisa respeitar.",
    "processMethod4Title": "Explorar alternativas com IA",
    "processMethod4Desc": "Usar pesquisa, comparação e debate com modelos para avaliar caminhos possíveis antes da implementação.",
    "processMethod5Title": "Planejar antes de executar",
    "processMethod5Desc": "Criar contexto, estrutura, regras e critérios suficientes para reduzir improvisação durante o desenvolvimento.",
    "processMethod6Title": "Construir e testar",
    "processMethod6Desc": "Delegar a execução técnica aos agentes e exigir verificações progressivas antes de avançar.",
    "processMethod7Title": "Refinar",
    "processMethod7Desc": "Corrigir o que diverge do objetivo até que comportamento e experiência estejam de acordo com o planejado.",
    "processArchBadge": "03 / PRINCÍPIOS DE ARQUITETURA",
    "processArchTitle": "Princípios usados nos projetos",
    "processArchNotice": "Não implemento esses padrões manualmente. Eles são utilizados como princípios e restrições durante o planejamento dos projetos. O detalhamento técnico, a implementação e a verificação ficam a cargo de agentes de IA.",
    "processPracticeDddDesc": "Usado para organizar o sistema em torno do domínio e das regras do produto.",
    "processPracticeHexDesc": "Usada para separar responsabilidades e reduzir dependência entre domínio, infraestrutura e interfaces externas.",
    "processPracticePortsDesc": "Usado como referência para definir contratos claros entre módulos e integrações.",
    "processPracticeBoundariesDesc": "Fronteiras intencionais entre módulos ajudam os agentes a manter responsabilidades separadas.",
    "processPracticeContractDesc": "Entradas e saídas são definidas com contratos que podem ser validados automaticamente.",
    "processPracticeFitnessDesc": "Verificações automatizadas podem ser usadas para avaliar se a implementação continua aderente às regras estruturais planejadas.",
    "processPracticeIdempotencyDesc": "Operações sensíveis podem ser planejadas para tolerar repetições sem produzir efeitos duplicados.",
    "processPracticeSecurityDesc": "Fronteiras de confiança, validação de entrada e tratamento de segredos entram como restrições desde o planejamento.",
    "processWorkflowHeading": "Todo código é produzido por agentes de IA",
    "processPhilosophyText": "Não escrevo código manualmente, não faço revisão linha por linha e não utilizo VS Code ou outro editor tradicional como ferramenta central de desenvolvimento. Minha função é dirigir o sistema que produz o software.",
    "processValidationCardTitle": "Minha validação é orientada pelo resultado",
    "processValidationCardP1": "Não determino que um trecho está correto porque consigo interpretar cada linha de código. Considero uma etapa aprovada quando o software apresenta o comportamento planejado, passa pelas verificações definidas para aquela fase e entrega o resultado esperado.",
    "processValidationCardP2": "Tenho especial foco em engenharia de prompts, contexto e coordenação de agentes, buscando reduzir ambiguidades, retrabalho, erros e alucinações durante a execução.",
    "pulsarPageTitle": "Pulsar — Financial Decision Intelligence | Jeterson Ferrari",
    "pulsarMetaDesc": "Estudo de caso do Pulsar: inteligência de decisão financeira que conjuga núcleo determinístico e síntese analítica por IA.",
    "pulsarBadge": "CASE STUDY / PULSAR",
    "pulsarCaseStudyLinkAria": "Abrir estudo de caso do Pulsar no GitHub",
    "pulsarIntroLead": "Um projeto criado para explorar como software determinístico e inteligência artificial podem coexistir dentro de limites claros.",
    "pulsarRoleBadge": "Minha Atuação Direta",
    "pulsarRoleText": "Minha contribuição no Pulsar está na concepção do produto, definição do problema, desenho do resultado esperado, planejamento da solução com IA, definição de restrições, coordenação dos agentes e validação do comportamento final. A implementação técnica é executada por agentes de código.",
    "pulsarCoverImgAlt": "Visão conceitual do sistema Pulsar",
    "pulsarCoverCaption": "Visão conceitual da arquitetura analítica do Pulsar.",
    "pulsarPrinciplesTitle": "Princípios do Sistema",
    "pulsarPrinciplesLead": "Fronteiras arquiteturais explícitas que asseguram consistência determinística e uso governado de modelos de linguagem.",
    "pulsarPrincipleCoreDesc": "Operações críticas permanecem fora da inferência probabilística e seguem regras verificáveis.",
    "pulsarPrincipleOutputsDesc": "Saídas de modelos são estruturadas antes de serem consumidas por partes críticas do sistema.",
    "pulsarPrincipleDomainDesc": "O domínio é organizado em torno das regras do produto, com separação clara entre responsabilidades.",
    "pulsarPrincipleLlmDesc": "Agentes e avaliações automatizadas verificam comportamento, consistência e possíveis regressões.",
    "pulsarPrincipleGovDesc": "Regras arquiteturais são definidas antes da implementação e usadas como restrições durante o trabalho dos agentes.",
    "pulsarPrincipleDevDesc": "A implementação é conduzida por agentes de IA a partir de especificações, restrições, testes e critérios definidos ao longo do processo.",
    "pulsarAnalyticsTitle": "Experiência Analítica",
    "pulsarAnalyticsLead": "Painel de consolidação para inteligência de dados financeiros, projetado para clareza visual e separação de métricas.",
    "pulsarDashboardImgAlt": "Dashboard analítico conceitual planejado para o Pulsar",
    "pulsarDashboardCaption": "Exploração visual da experiência analítica planejada para o Pulsar.",
    "pulsarDecisionTitle": "Análise & Decisão",
    "pulsarDecisionLead": "Mecanismo estruturado de decisão que conjuga regras determinísticas e síntese analítica por IA sob supervisão.",
    "pulsarDecisionImgAlt": "Tela de análise e decisão planejada para o Pulsar",
    "pulsarDecisionCaption": "Exploração visual da experiência de análise e decisão planejada para o Pulsar.",
    "pulsarTechTitle": "Tecnologias Presentes no Projeto",
    "pulsarTechClarification": "Tecnologias presentes na base técnica do Pulsar, especificadas no planejamento e implementadas através de agentes de código:",
    "pulsarNextProjectLabel": "Próximo Projeto",
    "restaurantZeroPageTitle": "RestaurantZero — Restaurant Commerce | Jeterson Ferrari",
    "restaurantZeroMetaDesc": "Estudo de caso do RestaurantZero: comércio digital direto para restaurantes com catálogo configurável e integridade transacional.",
    "restaurantZeroBadge": "CASE STUDY / RESTAURANTZERO",
    "restaurantZeroCaseStudyLinkAria": "Abrir estudo de caso do RestaurantZero no GitHub",
    "restaurantZeroIntroLead": "RestaurantZero é um projeto de comércio digital para restaurantes, pensado para reduzir dependência de intermediários e permitir maior controle sobre marca, catálogo, pedidos e experiência do cliente.",
    "restaurantZeroRoleBadge": "Minha Atuação Direta",
    "restaurantZeroRoleText": "Minha contribuição está na concepção do produto, definição dos fluxos, priorização das capacidades, planejamento da solução e coordenação dos agentes responsáveis pela implementação técnica. O código é produzido integralmente por agentes de IA.",
    "restaurantZeroCoverImgAlt": "Visão geral multi-dispositivo conceitual do RestaurantZero",
    "restaurantZeroCoverCaption": "Visão conceitual multi-dispositivo do RestaurantZero.",
    "restaurantZeroCapTitle": "Capacidades do Produto",
    "restaurantZeroCapLead": "Estrutura construída para sustentabilidade operacional e integridade transacional no comércio gastronômico.",
    "restaurantZeroCapCatalogDesc": "Estrutura de catálogo com itens, complementos e regras configuráveis.",
    "restaurantZeroCapCartDesc": "Carrinho persistente para preservar o estado da compra durante a experiência do usuário.",
    "restaurantZeroCapPricingDesc": "Cálculo de preços validado no servidor para manter consistência entre interface e regras do produto.",
    "restaurantZeroCapApisDesc": "APIs e contratos de dados estruturados para comunicação entre os módulos do sistema.",
    "restaurantZeroCapOrderDesc": "Fluxos de criação de pedidos planejados para evitar duplicações em operações repetidas.",
    "restaurantZeroCapPostgresDesc": "Persistência relacional e identidade configurável fazem parte da arquitetura atual do projeto.",
    "restaurantZeroStorefrontTitle": "Storefront Configurável",
    "restaurantZeroStorefrontLead": "Experiência de autoatendimento focada no cliente final, adaptável à identidade visual de cada restaurante.",
    "restaurantZeroStorefrontImgAlt": "Storefront conceitual configurável do RestaurantZero",
    "restaurantZeroStorefrontCaption": "Exemplo de storefront configurável dentro da experiência RestaurantZero.",
    "restaurantZeroOpsTitle": "Ambiente Operacional",
    "restaurantZeroOpsLead": "Gestão centralizada de pedidos em tempo real, controle de itens de menu e acompanhamento de fluxos de preparo.",
    "restaurantZeroOpsImgAlt": "Ambiente operacional conceitual planejado para o RestaurantZero",
    "restaurantZeroOpsCaption": "Exploração visual do ambiente operacional planejado para o RestaurantZero.",
    "restaurantZeroTechTitle": "Tecnologias Presentes no Projeto",
    "restaurantZeroTechClarification": "Tecnologias presentes na base técnica do RestaurantZero, especificadas no planejamento e implementadas por agentes de código:",
    "restaurantZeroOtherProjectLabel": "Outro Projeto"
  },
  "en": {
    "langLabel": "EN",
    "langToggleAria": "Change language",
    "navToggleAria": "Open navigation menu",
    "navCloseAria": "Close menu",
    "homeGlyphAria": "Go to home page (Synaptic Network)",
    "drawerTitle": "Navigation",
    "navHome": "Home",
    "navProfile": "Profile",
    "navProjects": "Projects",
    "navProcess": "Process",
    "navContact": "Contact",
    "footerBackToHub": "Back to hub",
    "footerBackToHubAria": "Return to home page (Synaptic Network)",
    "homeHint": "Select a module to navigate the portfolio",
    "homeHeroStageAria": "Interactive neural network for professional navigation",
    "homeNetworkSvgAria": "Interactive map of ten areas of Jeterson Ferrari's professional portfolio",
    "homeCoreAria": "Trigger AI core pulse",
    "homeMetaDesc": "Portfolio of Jeterson Ferrari, AI-Directed Product Builder. Visual portfolio navigation built around a synaptic neural network.",
    "homePageTitle": "Jeterson Ferrari — AI-Directed Product Builder",
    "nodeProfile": "Profile",
    "nodeTechStack": "Tech Stack",
    "nodeLanguages": "Languages",
    "nodeAiWorkflow": "AI Workflow",
    "nodeContact": "Contact",
    "nodeArchitecture": "Architecture",
    "nodeProblemSolving": "Problem Solving",
    "nodePulsar": "Pulsar",
    "nodeProcess": "Process",
    "nodeRestaurantZero": "RestaurantZero",
    "contactSectionBadge": "CONTACT / OPPORTUNITY",
    "contactOppLead": "If you have a product problem that could be solved with software, I want to understand it.",
    "contactOppText": "I'm looking for my first professional opportunity in AI-native development. I can start with an open-ended problem and structure the process from scratch, or work within technologies, architectures, agents, and constraints already defined by the team.",
    "contactOppGoal": "<strong>My goal is simple:</strong> start with a problem, understand the expected outcome, and coordinate the AI resources needed to reach a functional, verifiable solution.",
    "contactPhoneLabel": "Phone",
    "contactEmailLabel": "Email",
    "contactLinkedInLabel": "LinkedIn",
    "contactGitHubLabel": "GitHub",
    "contactPageTitle": "Contact — Jeterson Ferrari | AI-Directed Product Builder",
    "contactMetaDesc": "Contact Jeterson Ferrari, AI-Directed Product Builder. Phone, email, LinkedIn, and GitHub.",
    "profilePageTitle": "Profile — Jeterson Ferrari | AI-Directed Product Builder",
    "profileMetaDesc": "Learn about Jeterson Ferrari, AI-Directed Product Builder: value proposition, operating model, direct tooling, and technologies.",
    "profileSectionBadge": "01 / PROFILE",
    "profileProposition": "“Give me the problem. I’ll structure the solution, define the plan, and coordinate AI agents until it becomes functional software.”",
    "profileProseP1": "I am self-taught and work with AI-directed software development. I turn problems and ideas into functional products by coordinating AI agents from planning through validation.",
    "profileProseP2": "I do not write code manually or review generated code line by line. My work focuses on everything before and around the code: research, understanding the problem, product intelligence, solution planning, high-level architecture, defining rules and constraints, specification, prompt engineering, agent orchestration, and result validation.",
    "profileProseP3": "When a project enters implementation, agents handle the technical work. I direct the process, provide context, define what must be delivered, request tests and reviews, evaluate product behavior, and decide when to correct, investigate further, or move forward.",
    "profileProseP4": "I am currently developing my own projects and seeking my first professional opportunity in an environment where this AI-native way of building products can be applied to real problems.",
    "profileHighlight1Desc": "Turning needs, ideas, and loosely defined problems into concrete product goals.",
    "profileHighlight2Desc": "Structuring context, prompts, agents, stages, and criteria so different AI systems can execute technical work in a coordinated way.",
    "profileHighlight3Desc": "Validating behavior, experience, and outcomes against what was planned, supported by tests and reviews executed by agents.",
    "profileToolsBadge": "02 / TOOLS & TECHNOLOGIES",
    "profileToolsTitle": "Tools & Technologies",
    "profileToolsDirectHeading": "Tools I use directly",
    "profileToolGroup1": "Planning, research & reasoning",
    "profileToolGroup2": "Implementation agents & environments",
    "profileToolGroup3": "Local development",
    "profileToolClarification": "I do not use VS Code or another traditional code editor as a central part of my process.",
    "profileTechHeading": "Technologies used in my projects",
    "profileTechClarification": "These technologies are used in systems built by agents. I do not present them as languages, frameworks, or tools that I program manually.",
    "profileLanguagesBadge": "03 / LANGUAGES",
    "profileLanguagesTitle": "Communication & languages",
    "profileLangPtLevel": "Native",
    "profileLangPtDesc": "My native language, used for strategic thinking, clear communication, and in-depth documentation.",
    "profileLangEsLevel": "Fluent",
    "profileLangEsDesc": "Fluent in conversation and reading, with the ability to collaborate technically in Spanish.",
    "profileLangEnLevel": "Basic / Intermediate speaking",
    "profileLangEnDesc": "Technical reading and written communication with AI tool support.",
    "processPageTitle": "Process — How I Work | Jeterson Ferrari",
    "processMetaDesc": "How Jeterson Ferrari builds software: AI-directed methodology, problem solving, architecture principles, and agent workflow.",
    "processWorkflowBadge": "01 / WORKFLOW",
    "processWorkflowTitle": "How I work",
    "processWorkflowLead": "My process begins before any code is produced. Implementation is only one stage in a broader system of research, planning, direction, AI review, and validation.",
    "processStep1Desc": "I research the product, problem, market, audience, and existing solutions before choosing a direction.",
    "processStep2Desc": "I create a domain-specific context to bring together the research, reasoning, decisions, constraints, and references relevant to the project.",
    "processStep3Desc": "I define the problem to solve, who it affects, which constraints matter, and what final outcome must be achieved.",
    "processStep4Desc": "I plan high-level architecture, technologies, modules, boundaries, dependencies, and development sequencing using AI.",
    "processStep5Desc": "I create a specialized agent for the project, with its own context, rules, architecture, goals, and validation criteria.",
    "processStep6Desc": "The supervisor agent turns the plan into specific instructions for coding agents and reviews the output of each stage.",
    "processStep7Desc": "Antigravity, Codex, Claude Code, Lovable, or Google AI Studio execute the technical implementation.",
    "processStep8Desc": "Whenever necessary, I use a different AI to review the work produced by another, reducing reliance on a single model.",
    "processStep9Desc": "Agents run the tests and checks defined for each module before moving forward.",
    "processStep10Desc": "I verify that behavior, interface, user flows, and outcomes match the plan. I do not approve code based on line-by-line review.",
    "processStep11Desc": "When something diverges from the goal, I send the result back to the AI system for investigation, correction, new tests, and another round of validation.",
    "processProblemSolvingBadge": "02 / PROBLEM SOLVING",
    "processProblemSolvingLead": "My primary job is not writing code. It is turning vague problems into solvable problems and verifiable outcomes.",
    "processMethod1Title": "Understand the real problem",
    "processMethod1Desc": "Separate the core need from symptoms, assumptions, and premature solutions.",
    "processMethod2Title": "Define the outcome",
    "processMethod2Desc": "Determine how the product should behave once the problem is genuinely solved.",
    "processMethod3Title": "Map constraints",
    "processMethod3Desc": "Identify the resources, boundaries, requirements, dependencies, and conditions the solution must satisfy.",
    "processMethod4Title": "Explore alternatives with AI",
    "processMethod4Desc": "Use research, comparison, and discussion with models to assess possible paths before implementation.",
    "processMethod5Title": "Plan before executing",
    "processMethod5Desc": "Create sufficient context, structure, rules, and criteria to minimize improvisation during development.",
    "processMethod6Title": "Build and test",
    "processMethod6Desc": "Delegate technical execution to agents and require incremental checks before moving forward.",
    "processMethod7Title": "Refine",
    "processMethod7Desc": "Correct anything that diverges from the goal until the behavior and experience match the plan.",
    "processArchBadge": "03 / ARCHITECTURE PRINCIPLES",
    "processArchTitle": "Principles used across projects",
    "processArchNotice": "I do not implement these patterns manually. They are used as architectural principles and constraints during project planning. Technical specification, implementation, and verification are carried out by AI agents.",
    "processPracticeDddDesc": "Used to organize the system around the product domain and business rules.",
    "processPracticeHexDesc": "Used to separate concerns and reduce coupling between core domain, infrastructure, and external interfaces.",
    "processPracticePortsDesc": "Used as a reference to define clear contracts between modules and integrations.",
    "processPracticeBoundariesDesc": "Intentional boundaries between modules help agents keep responsibilities separated.",
    "processPracticeContractDesc": "Inputs and outputs are defined through contracts that can be validated automatically.",
    "processPracticeFitnessDesc": "Automated checks can evaluate whether the implementation remains compliant with planned structural rules.",
    "processPracticeIdempotencyDesc": "Sensitive operations can be designed to tolerate retries without causing duplicate side effects.",
    "processPracticeSecurityDesc": "Trust boundaries, input validation, and secrets handling are treated as constraints from the planning stage.",
    "processWorkflowHeading": "All code is produced by AI agents",
    "processPhilosophyText": "I do not write code manually, I do not review code line by line, and I do not use VS Code or any traditional editor as my central development tool. My role is to direct the system that produces the software.",
    "processValidationCardTitle": "My validation is outcome-driven",
    "processValidationCardP1": "I do not consider a piece of code correct just because I can interpret every line. I consider a stage approved when the software behaves as planned, passes the checks defined for that phase, and delivers the expected outcome.",
    "processValidationCardP2": "I place special focus on prompt engineering, context design, and agent orchestration, aiming to minimize ambiguities, rework, errors, and hallucinations during execution.",
    "pulsarPageTitle": "Pulsar — Financial Decision Intelligence | Jeterson Ferrari",
    "pulsarMetaDesc": "Pulsar case study: financial decision intelligence combining a deterministic core with governed AI analytical synthesis.",
    "pulsarBadge": "CASE STUDY / PULSAR",
    "pulsarCaseStudyLinkAria": "Open Pulsar case study on GitHub",
    "pulsarIntroLead": "A project built to explore how deterministic software and artificial intelligence can coexist within clear boundaries.",
    "pulsarRoleBadge": "My Direct Role",
    "pulsarRoleText": "My contribution to Pulsar covers product conception, problem definition, defining the expected outcome, AI-assisted solution planning, defining constraints, agent orchestration, and validating the final behavior. Technical implementation is handled by coding agents.",
    "pulsarCoverImgAlt": "Conceptual overview of the Pulsar system",
    "pulsarCoverCaption": "Conceptual overview of Pulsar's analytical architecture.",
    "pulsarPrinciplesTitle": "System Principles",
    "pulsarPrinciplesLead": "Explicit architectural boundaries ensuring deterministic consistency and governed use of language models.",
    "pulsarPrincipleCoreDesc": "Critical operations remain outside probabilistic inference and follow verifiable rules.",
    "pulsarPrincipleOutputsDesc": "Model outputs are structured before being consumed by critical parts of the system.",
    "pulsarPrincipleDomainDesc": "The domain is organized around product rules, with clean separation of concerns.",
    "pulsarPrincipleLlmDesc": "Automated evaluations and agents check behavior, consistency, and potential regressions.",
    "pulsarPrincipleGovDesc": "Architectural rules are defined before implementation and used as constraints during agent workflows.",
    "pulsarPrincipleDevDesc": "Implementation is driven by AI agents guided by specifications, constraints, tests, and criteria established throughout the process.",
    "pulsarAnalyticsTitle": "Analytical Experience",
    "pulsarAnalyticsLead": "Consolidation dashboard for financial intelligence, designed for visual clarity and metric separation.",
    "pulsarDashboardImgAlt": "Conceptual analytical dashboard planned for Pulsar",
    "pulsarDashboardCaption": "Visual exploration of the analytical experience planned for Pulsar.",
    "pulsarDecisionTitle": "Analysis & Decision",
    "pulsarDecisionLead": "Structured decision engine combining deterministic rules with supervised AI analytical synthesis.",
    "pulsarDecisionImgAlt": "Analysis and decision interface planned for Pulsar",
    "pulsarDecisionCaption": "Visual exploration of the analysis and decision experience planned for Pulsar.",
    "pulsarTechTitle": "Technologies Used in the Project",
    "pulsarTechClarification": "Technologies used in Pulsar's technical foundation, specified during planning and implemented by coding agents:",
    "pulsarNextProjectLabel": "Next Project",
    "restaurantZeroPageTitle": "RestaurantZero — Restaurant Commerce | Jeterson Ferrari",
    "restaurantZeroMetaDesc": "RestaurantZero case study: direct digital commerce for restaurants featuring configurable catalog and transactional integrity.",
    "restaurantZeroBadge": "CASE STUDY / RESTAURANTZERO",
    "restaurantZeroCaseStudyLinkAria": "Open RestaurantZero case study on GitHub",
    "restaurantZeroIntroLead": "RestaurantZero is a digital commerce project for restaurants designed to reduce intermediary dependency and give operators greater control over branding, catalog, orders, and customer experience.",
    "restaurantZeroRoleBadge": "My Direct Role",
    "restaurantZeroRoleText": "My contribution covers product conception, workflow definition, capability prioritization, solution planning, and coordinating the agents responsible for technical implementation. All code is produced by AI agents.",
    "restaurantZeroCoverImgAlt": "Multi-device conceptual overview of RestaurantZero",
    "restaurantZeroCoverCaption": "Multi-device conceptual overview of RestaurantZero.",
    "restaurantZeroCapTitle": "Product Capabilities",
    "restaurantZeroCapLead": "Structure built for operational sustainability and transactional integrity in restaurant commerce.",
    "restaurantZeroCapCatalogDesc": "Catalog structure with items, add-ons, and configurable rules.",
    "restaurantZeroCapCartDesc": "Persistent cart that preserves its state throughout the user experience.",
    "restaurantZeroCapPricingDesc": "Server-side price calculation that keeps the interface consistent with product rules.",
    "restaurantZeroCapApisDesc": "Structured APIs and data contracts governing communication across system modules.",
    "restaurantZeroCapOrderDesc": "Order creation flows designed for idempotency, preventing duplicate order creation when requests are repeated.",
    "restaurantZeroCapPostgresDesc": "Relational data persistence and configurable branding form core components of the current architecture.",
    "restaurantZeroStorefrontTitle": "Configurable Storefront",
    "restaurantZeroStorefrontLead": "Self-service experience designed for end customers and adaptable to each restaurant's visual identity.",
    "restaurantZeroStorefrontImgAlt": "Configurable conceptual storefront for RestaurantZero",
    "restaurantZeroStorefrontCaption": "Example of a configurable storefront within the RestaurantZero experience.",
    "restaurantZeroOpsTitle": "Operations Environment",
    "restaurantZeroOpsLead": "Centralized real-time order management, menu item controls, and tracking of preparation workflows.",
    "restaurantZeroOpsImgAlt": "Conceptual operations environment planned for RestaurantZero",
    "restaurantZeroOpsCaption": "Visual exploration of the operational environment planned for RestaurantZero.",
    "restaurantZeroTechTitle": "Technologies Used in the Project",
    "restaurantZeroTechClarification": "Technologies used in RestaurantZero's technical foundation, specified during planning and implemented by coding agents:",
    "restaurantZeroOtherProjectLabel": "Other Project"
  },
  "es": {
    "langLabel": "ES",
    "langToggleAria": "Cambiar idioma",
    "navToggleAria": "Abrir menú de navegación",
    "navCloseAria": "Cerrar menú",
    "homeGlyphAria": "Ir a la página de inicio (Red Sináptica)",
    "drawerTitle": "Navegación",
    "navHome": "Inicio",
    "navProfile": "Perfil",
    "navProjects": "Proyectos",
    "navProcess": "Proceso",
    "navContact": "Contacto",
    "footerBackToHub": "Volver al hub",
    "footerBackToHubAria": "Volver a la página de inicio (Red Sináptica)",
    "homeHint": "Selecciona un módulo para navegar por el portafolio",
    "homeHeroStageAria": "Red neuronal interactiva de navegación profesional",
    "homeNetworkSvgAria": "Mapa interactivo de diez áreas del portafolio profesional de Jeterson Ferrari",
    "homeCoreAria": "Activar pulso del núcleo de IA",
    "homeMetaDesc": "Portafolio de Jeterson Ferrari, AI-Directed Product Builder. Navegación visual del portafolio basada en una red neuronal sináptica.",
    "homePageTitle": "Jeterson Ferrari — AI-Directed Product Builder",
    "nodeProfile": "Perfil",
    "nodeTechStack": "Tech Stack",
    "nodeLanguages": "Idiomas",
    "nodeAiWorkflow": "AI Workflow",
    "nodeContact": "Contacto",
    "nodeArchitecture": "Architecture",
    "nodeProblemSolving": "Problem Solving",
    "nodePulsar": "Pulsar",
    "nodeProcess": "Proceso",
    "nodeRestaurantZero": "RestaurantZero",
    "contactSectionBadge": "CONTACTO / OPORTUNIDAD",
    "contactOppLead": "Si tienes un problema de producto que podría resolverse con software, quiero entenderlo.",
    "contactOppText": "Busco mi primera oportunidad profesional en desarrollo AI-native. Puedo partir de un problema abierto y estructurar el proceso desde cero, o trabajar con tecnologías, arquitecturas, agentes y restricciones ya definidos por el equipo.",
    "contactOppGoal": "<strong>Mi objetivo es simple:</strong> partir de un problema, entender el resultado esperado y coordinar los recursos de IA necesarios para llegar a una solución funcional y verificable.",
    "contactPhoneLabel": "Teléfono",
    "contactEmailLabel": "Correo",
    "contactLinkedInLabel": "LinkedIn",
    "contactGitHubLabel": "GitHub",
    "contactPageTitle": "Contacto — Jeterson Ferrari | AI-Directed Product Builder",
    "contactMetaDesc": "Contacta a Jeterson Ferrari, AI-Directed Product Builder. Teléfono, correo, LinkedIn y GitHub.",
    "profilePageTitle": "Perfil — Jeterson Ferrari | AI-Directed Product Builder",
    "profileMetaDesc": "Conoce a Jeterson Ferrari, AI-Directed Product Builder: propuesta de valor, modelo operativo, herramientas que utiliza directamente y tecnologías presentes en sus proyectos.",
    "profileSectionBadge": "01 / PERFIL",
    "profileProposition": "“Dame el problema. Estructuro la solución, defino el plan y coordino los agentes de IA hasta convertirlo en software funcional.”",
    "profileProseP1": "Soy autodidacta y trabajo con desarrollo de software dirigido por inteligencia artificial. Transformo problemas e ideas en productos funcionales coordinando agentes de IA desde la planificación hasta la validación.",
    "profileProseP2": "No escribo código manualmente ni reviso el código generado línea por línea. Mi trabajo se desarrolla antes y alrededor del código: investigación, comprensión del problema, inteligencia de producto, planificación de la solución, arquitectura de alto nivel, definición de reglas y restricciones, especificación, ingeniería de prompts, coordinación de agentes y validación del resultado.",
    "profileProseP3": "Cuando el proyecto entra en implementación, los agentes se encargan de la parte técnica. Dirijo el trabajo, aporto contexto, defino qué debe entregarse, solicito pruebas y revisiones, evalúo el comportamiento del producto y decido cuándo corregir, profundizar el análisis o avanzar.",
    "profileProseP4": "Actualmente desarrollo proyectos propios y busco mi primera oportunidad profesional en un entorno donde esta forma AI-native de construir productos pueda aplicarse a problemas reales.",
    "profileHighlight1Desc": "Transformar necesidades, ideas y problemas poco definidos en objetivos concretos de producto.",
    "profileHighlight2Desc": "Estructurar contexto, prompts, agentes, etapas y criterios para que distintos sistemas de IA ejecuten el trabajo técnico de forma coordinada.",
    "profileHighlight3Desc": "Validar comportamiento, experiencia y resultados frente a lo planificado, con el apoyo de pruebas y revisiones ejecutadas por agentes.",
    "profileToolsBadge": "02 / HERRAMIENTAS Y TECNOLOGÍAS",
    "profileToolsTitle": "Herramientas y Tecnologías",
    "profileToolsDirectHeading": "Herramientas que utilizo directamente",
    "profileToolGroup1": "Planificación, investigación y razonamiento",
    "profileToolGroup2": "Agentes y entornos de implementación",
    "profileToolGroup3": "Desarrollo local",
    "profileToolClarification": "No utilizo VS Code u otro editor de código manual como parte central de mi proceso.",
    "profileTechHeading": "Tecnologías presentes en mis proyectos",
    "profileTechClarification": "Estas tecnologías aparecen en los sistemas construidos por los agentes. No las presento como lenguajes, frameworks o herramientas que programe manualmente.",
    "profileLanguagesBadge": "03 / IDIOMAS",
    "profileLanguagesTitle": "Comunicación e idiomas",
    "profileLangPtLevel": "Nativo",
    "profileLangPtDesc": "Mi lengua nativa, utilizada para pensamiento estratégico, comunicación clara y documentación detallada.",
    "profileLangEsLevel": "Fluido",
    "profileLangEsDesc": "Fluidez para conversar, leer y colaborar técnicamente en español.",
    "profileLangEnLevel": "Basic / Intermediate speaking",
    "profileLangEnDesc": "Lectura y comunicación técnica escrita con apoyo de herramientas de IA.",
    "processPageTitle": "Proceso — Cómo trabajo | Jeterson Ferrari",
    "processMetaDesc": "Cómo construye software Jeterson Ferrari: metodología AI-directed, resolución de problemas, principios de arquitectura y workflow de agentes.",
    "processWorkflowBadge": "01 / FLUJO DE TRABAJO",
    "processWorkflowTitle": "Cómo trabajo",
    "processWorkflowLead": "Mi proceso comienza antes de que se produzca cualquier código. La implementación es solo una etapa dentro de un sistema más amplio de investigación, planificación, dirección, revisión por IA y validación.",
    "processStep1Desc": "Realizo una investigación amplia sobre el producto, el problema, el mercado, el público y las soluciones existentes antes de definir la dirección.",
    "processStep2Desc": "Creo un contexto especializado en el tema para reunir la investigación, el razonamiento, las decisiones, las restricciones y las referencias relevantes para el proyecto.",
    "processStep3Desc": "Defino el problema a resolver, a quién afecta, qué restricciones importan y qué resultado final debe alcanzarse.",
    "processStep4Desc": "Planifico con IA la arquitectura de alto nivel, tecnologías, módulos, límites, dependencias y secuencia de desarrollo.",
    "processStep5Desc": "Creo un agente especializado para el proyecto, con contexto, reglas, arquitectura, objetivos y criterios de validación propios.",
    "processStep6Desc": "El agente supervisor transforma el plan en instrucciones específicas para los agentes de código y analiza los resultados de cada etapa.",
    "processStep7Desc": "Antigravity, Codex, Claude Code, Lovable o Google AI Studio ejecutan la implementación técnica.",
    "processStep8Desc": "Siempre que es necesario, utilizo una IA diferente para revisar el trabajo producido por otra, reduciendo la dependencia de un único modelo.",
    "processStep9Desc": "Los agentes ejecutan pruebas y verificaciones definidas para cada módulo antes de avanzar.",
    "processStep10Desc": "Verifico si el comportamiento, la interfaz, los flujos y los resultados corresponden a lo planificado. No apruebo código mediante lectura línea por línea.",
    "processStep11Desc": "Cuando algo se desvía del objetivo, vuelvo a enviar el resultado al sistema de IA para investigarlo, corregirlo, ejecutar nuevas pruebas y validarlo de nuevo.",
    "processProblemSolvingBadge": "02 / PROBLEM SOLVING",
    "processProblemSolvingLead": "Mi trabajo principal no es escribir código. Es transformar problemas vagos en problemas solucionables y resultados verificables.",
    "processMethod1Title": "Entender el problema real",
    "processMethod1Desc": "Separar la necesidad central de síntomas, suposiciones y soluciones prematuras.",
    "processMethod2Title": "Definir el resultado",
    "processMethod2Desc": "Determinar cómo debe comportarse el producto cuando el problema esté realmente resuelto.",
    "processMethod3Title": "Mapear restricciones",
    "processMethod3Desc": "Identificar recursos, límites, requisitos, dependencias y condiciones que la solución debe respetar.",
    "processMethod4Title": "Explorar alternativas con IA",
    "processMethod4Desc": "Usar investigación, comparación y debate con modelos para evaluar caminos posibles antes de la implementación.",
    "processMethod5Title": "Planificar antes de ejecutar",
    "processMethod5Desc": "Crear contexto, estructura, reglas y criterios suficientes para reducir la improvisación durante el desarrollo.",
    "processMethod6Title": "Construir y probar",
    "processMethod6Desc": "Delegar la ejecución técnica a los agentes y exigir verificaciones progresivas antes de avanzar.",
    "processMethod7Title": "Refinar",
    "processMethod7Desc": "Corregir lo que se desvíe del objetivo hasta que el comportamiento y la experiencia coincidan con lo planificado.",
    "processArchBadge": "03 / PRINCIPIOS DE ARQUITECTURA",
    "processArchTitle": "Principios utilizados en los proyectos",
    "processArchNotice": "No implemento estos patrones manualmente. Se utilizan como principios y restricciones durante la planificación de los proyectos. La especificación técnica, implementación y verificación quedan a cargo de agentes de IA.",
    "processPracticeDddDesc": "Utilizado para organizar el sistema en torno al dominio y las reglas del producto.",
    "processPracticeHexDesc": "Utilizada para separar responsabilidades y reducir el acoplamiento entre dominio, infraestructura e interfaces externas.",
    "processPracticePortsDesc": "Utilizado como referencia para definir contratos claros entre módulos e integraciones.",
    "processPracticeBoundariesDesc": "Límites intencionales entre módulos ayudan a los agentes a mantener separadas las responsabilidades.",
    "processPracticeContractDesc": "Las entradas y salidas se definen mediante contratos que pueden validarse automáticamente.",
    "processPracticeFitnessDesc": "Verificaciones automatizadas pueden evaluar si la implementación continúa cumpliendo las reglas estructurales planificadas.",
    "processPracticeIdempotencyDesc": "Operaciones sensibles pueden diseñarse para tolerar reintentos sin generar efectos secundarios duplicados.",
    "processPracticeSecurityDesc": "Límites de confianza, validación de entrada y gestión de secretos se incorporan como restricciones desde la planificación.",
    "processWorkflowHeading": "Todo el código es producido por agentes de IA",
    "processPhilosophyText": "No escribo código manualmente, no realizo revisión de código línea por línea y no utilizo VS Code u otro editor tradicional como herramienta central de desarrollo. Mi función es dirigir el sistema que produce el software.",
    "processValidationCardTitle": "Mi validación está orientada al resultado",
    "processValidationCardP1": "No considero que un fragmento de código sea correcto solo porque pueda interpretar cada línea. Considero una etapa aprobada cuando el software se comporta según lo planificado, supera las verificaciones definidas para esa fase y entrega el resultado esperado.",
    "processValidationCardP2": "Pongo especial foco en la ingeniería de prompts, el contexto y la coordinación de agentes, buscando reducir ambigüedades, retrabajo, errores y alucinaciones durante la ejecución.",
    "pulsarPageTitle": "Pulsar — Financial Decision Intelligence | Jeterson Ferrari",
    "pulsarMetaDesc": "Estudio de caso de Pulsar: inteligencia de decisión financiera que combina un núcleo determinista con síntesis analítica por IA.",
    "pulsarBadge": "CASE STUDY / PULSAR",
    "pulsarCaseStudyLinkAria": "Abrir estudio de caso de Pulsar en GitHub",
    "pulsarIntroLead": "Un proyecto creado para explorar cómo el software determinista y la inteligencia artificial pueden coexistir dentro de límites claros.",
    "pulsarRoleBadge": "Mi contribución directa",
    "pulsarRoleText": "Mi contribución a Pulsar abarca la concepción del producto, la definición del problema, la definición del resultado esperado, la planificación de la solución con IA, la definición de restricciones, la coordinación de agentes y la validación del comportamiento final. La implementación técnica está a cargo de agentes de código.",
    "pulsarCoverImgAlt": "Visión conceptual del sistema Pulsar",
    "pulsarCoverCaption": "Visión conceptual de la arquitectura analítica de Pulsar.",
    "pulsarPrinciplesTitle": "Principios del Sistema",
    "pulsarPrinciplesLead": "Límites arquitectónicos explícitos que aseguran consistencia determinista y uso gobernado de modelos de lenguaje.",
    "pulsarPrincipleCoreDesc": "Operaciones críticas permanecen fuera de la inferencia probabilística y siguen reglas verificables.",
    "pulsarPrincipleOutputsDesc": "Salidas de modelos se estructuran antes de ser consumidas por partes críticas del sistema.",
    "pulsarPrincipleDomainDesc": "El dominio se organiza en torno a las reglas del producto, con separación clara entre responsabilidades.",
    "pulsarPrincipleLlmDesc": "Agentes y evaluaciones automatizadas verifican comportamiento, consistencia y posibles regresiones.",
    "pulsarPrincipleGovDesc": "Reglas arquitectónicas se definen antes de la implementación y se aplican como restricciones durante el trabajo de los agentes.",
    "pulsarPrincipleDevDesc": "La implementación es dirigida por agentes de IA a partir de especificaciones, restricciones, pruebas y criterios definidos a lo largo del proceso.",
    "pulsarAnalyticsTitle": "Experiencia Analítica",
    "pulsarAnalyticsLead": "Panel de consolidación para inteligencia de datos financieros, diseñado para claridad visual y separación de métricas.",
    "pulsarDashboardImgAlt": "Panel analítico conceptual planificado para Pulsar",
    "pulsarDashboardCaption": "Exploración visual de la experiencia analítica planificada para Pulsar.",
    "pulsarDecisionTitle": "Análisis y Decisión",
    "pulsarDecisionLead": "Mecanismo estructurado de decisión que combina reglas deterministas y síntesis analítica por IA bajo supervisión.",
    "pulsarDecisionImgAlt": "Pantalla de análisis y decisión planificada para Pulsar",
    "pulsarDecisionCaption": "Exploración visual de la experiencia de análisis y decisión planificada para Pulsar.",
    "pulsarTechTitle": "Tecnologías utilizadas en el proyecto",
    "pulsarTechClarification": "Tecnologías utilizadas en la base técnica de Pulsar, especificadas durante la planificación e implementadas por agentes de código:",
    "pulsarNextProjectLabel": "Siguiente Proyecto",
    "restaurantZeroPageTitle": "RestaurantZero — Restaurant Commerce | Jeterson Ferrari",
    "restaurantZeroMetaDesc": "Estudio de caso de RestaurantZero: comercio digital directo para restaurantes con catálogo configurable e integridad transaccional.",
    "restaurantZeroBadge": "CASE STUDY / RESTAURANTZERO",
    "restaurantZeroCaseStudyLinkAria": "Abrir estudio de caso de RestaurantZero en GitHub",
    "restaurantZeroIntroLead": "RestaurantZero es un proyecto de comercio digital para restaurantes diseñado para reducir la dependencia de intermediarios y permitir mayor control sobre marca, catálogo, pedidos y experiencia del cliente.",
    "restaurantZeroRoleBadge": "Mi contribución directa",
    "restaurantZeroRoleText": "Mi contribución abarca la concepción del producto, la definición de flujos, la priorización de capacidades, la planificación de la solución y la coordinación de los agentes responsables de la implementación técnica. Todo el código es producido por agentes de IA.",
    "restaurantZeroCoverImgAlt": "Visión general multidispositivo conceptual de RestaurantZero",
    "restaurantZeroCoverCaption": "Visión conceptual multidispositivo de RestaurantZero.",
    "restaurantZeroCapTitle": "Capacidades del Producto",
    "restaurantZeroCapLead": "Estructura diseñada para la sostenibilidad operativa y la integridad transaccional en el comercio digital para restaurantes.",
    "restaurantZeroCapCatalogDesc": "Estructura de catálogo con artículos, complementos y reglas configurables.",
    "restaurantZeroCapCartDesc": "Carrito persistente para preservar el estado de compra durante la experiencia del usuario.",
    "restaurantZeroCapPricingDesc": "Cálculo de precios validado en el servidor para mantener la coherencia entre la interfaz y las reglas del producto.",
    "restaurantZeroCapApisDesc": "APIs y contratos de datos estructurados para comunicación entre los módulos del sistema.",
    "restaurantZeroCapOrderDesc": "Flujos de creación de pedidos diseñados para evitar duplicados cuando una operación se repite.",
    "restaurantZeroCapPostgresDesc": "Persistencia relacional e identidad configurable forman parte de la arquitectura actual del proyecto.",
    "restaurantZeroStorefrontTitle": "Storefront Configurable",
    "restaurantZeroStorefrontLead": "Experiencia de autoservicio centrada en el cliente final, adaptable a la identidad visual de cada restaurante.",
    "restaurantZeroStorefrontImgAlt": "Storefront conceptual configurable de RestaurantZero",
    "restaurantZeroStorefrontCaption": "Ejemplo de storefront configurable dentro de la experiencia RestaurantZero.",
    "restaurantZeroOpsTitle": "Entorno Operativo",
    "restaurantZeroOpsLead": "Gestión centralizada de pedidos en tiempo real, control de elementos del menú y seguimiento de los flujos de preparación.",
    "restaurantZeroOpsImgAlt": "Entorno operativo conceptual planificado para RestaurantZero",
    "restaurantZeroOpsCaption": "Exploración visual del entorno operativo planificado para RestaurantZero.",
    "restaurantZeroTechTitle": "Tecnologías utilizadas en el proyecto",
    "restaurantZeroTechClarification": "Tecnologías utilizadas en la base técnica de RestaurantZero, especificadas durante la planificación e implementadas por agentes de código:",
    "restaurantZeroOtherProjectLabel": "Otro Proyecto"
  }
};

  let currentLang = getSavedLang();

  function getSavedLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGS.includes(saved)) {
        return saved;
      }
    } catch (e) {
      // localStorage disabled or blocked
    }
    return DEFAULT_LANG;
  }

  function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    applyLanguage(lang);

    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  function applyLanguage(lang) {
    const dict = DICTIONARY[lang] || DICTIONARY[DEFAULT_LANG];

    if (typeof document === 'undefined') return;

    // 1. Update documentElement lang
    document.documentElement.lang = HTML_LANG_MAP[lang] || lang;

    // 2. Translate text elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (dict[key].includes('<')) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // 3. Translate attributes with data-i18n-attr (e.g. "aria-label:navToggleAria,alt:someAlt")
    const attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach(el => {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach(pair => {
        const [attr, key] = pair.trim().split(':');
        if (attr && key && dict[key] !== undefined) {
          el.setAttribute(attr, dict[key]);
        }
      });
    });

    // 4. Update language indicator & active selector option
    const currentIndicator = document.getElementById('langCurrent');
    if (currentIndicator) {
      currentIndicator.textContent = lang.toUpperCase();
    }

    const options = document.querySelectorAll('.lang-option');
    options.forEach(opt => {
      const optLang = opt.getAttribute('data-lang');
      if (optLang === lang) {
        opt.classList.add('active');
        opt.setAttribute('aria-selected', 'true');
      } else {
        opt.classList.remove('active');
        opt.setAttribute('aria-selected', 'false');
      }
    });

    // 5. Update dynamic title & meta description if annotated
    const titleTag = document.querySelector('title[data-i18n-title]');
    if (titleTag) {
      const key = titleTag.getAttribute('data-i18n-title');
      if (dict[key]) document.title = dict[key];
    }

    const metaDesc = document.querySelector('meta[name="description"][data-i18n-desc]');
    if (metaDesc) {
      const key = metaDesc.getAttribute('data-i18n-desc');
      if (dict[key]) metaDesc.setAttribute('content', dict[key]);
    }
  }

  function closeSelector() {
    const toggle = document.getElementById('langToggle');
    const menu = document.getElementById('langMenu');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (menu) menu.classList.remove('is-open');
  }

  function openSelector() {
    // If nav drawer is open, close it cleanly
    if (typeof window !== 'undefined' && window.nav && typeof window.nav.closeMenu === 'function') {
      window.nav.closeMenu();
    } else {
      const drawer = document.getElementById('navDrawer');
      const backdrop = document.getElementById('navBackdrop');
      const navToggle = document.getElementById('navToggle');
      if (drawer && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        if (backdrop) backdrop.classList.remove('is-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-locked');
      }
    }

    const toggle = document.getElementById('langToggle');
    const menu = document.getElementById('langMenu');
    if (toggle) toggle.setAttribute('aria-expanded', 'true');
    if (menu) {
      menu.classList.add('is-open');
      const activeOpt = menu.querySelector('.lang-option.active');
      if (activeOpt) activeOpt.focus();
    }
  }

  function isSelectorOpen() {
    const menu = document.getElementById('langMenu');
    return menu ? menu.classList.contains('is-open') : false;
  }

  function toggleSelector() {
    if (isSelectorOpen()) {
      closeSelector();
    } else {
      openSelector();
    }
  }

  function bindSelector() {
    const toggle = document.getElementById('langToggle');
    const menu = document.getElementById('langMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSelector();
    });

    menu.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedLang = btn.getAttribute('data-lang');
        if (selectedLang) {
          setLanguage(selectedLang);
        }
        closeSelector();
        toggle.focus();
      });
    });

    document.addEventListener('click', (e) => {
      if (isSelectorOpen() && !menu.contains(e.target) && !toggle.contains(e.target)) {
        closeSelector();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isSelectorOpen()) {
        closeSelector();
        toggle.focus();
      }
    });
  }

  function init() {
    currentLang = getSavedLang();
    applyLanguage(currentLang);
    bindSelector();
    // Notify dynamic listeners of the restored saved language
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  return {
    getLanguage: () => currentLang,
    setLanguage,
    t: (key, lang = currentLang) => {
      const d = DICTIONARY[lang] || DICTIONARY[DEFAULT_LANG];
      return d[key] !== undefined ? d[key] : '';
    },
    openSelector,
    closeSelector,
    isSelectorOpen,
    SUPPORTED_LANGS,
    DEFAULT_LANG
  };
});
