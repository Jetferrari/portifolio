# Jeterson Ferrari Portfolio

## AI-Directed Product Builder

Public source repository for Jeterson Ferrari's professional portfolio.

The portfolio presents an AI-native product development workflow centered on product thinking, problem definition, high-level architecture planning, Prompt Engineering, Agent Orchestration, and result validation.

## Current status

The portfolio is implemented and multilingual.

Supported languages:

- Portuguese, default
- English
- Spanish

The interface uses a Synaptic visual navigation hub connecting the main areas of the portfolio.

## Professional model

Jeterson does not present himself as a traditional manual programmer.

His direct contribution is focused on:

- product conception and problem definition
- research and product intelligence
- expected outcome definition
- solution and high-level architecture planning with AI
- constraints, specifications, and validation criteria
- Prompt Engineering and Context Design
- specialized agent design
- Agent Orchestration and task decomposition
- coordination of AI coding agents
- Cross-Model Review and automated testing coordination
- validation of behavior, interface, evidence, and expected results

Implementation code is produced by AI coding agents.

Jeterson does not manually write implementation code, perform line-by-line code review, or use VS Code or another traditional code editor as the central environment in the workflow.

## Portfolio sections

- Profile
- Tools & Technologies
- Languages
- AI Workflow
- Process
- Architecture
- Problem Solving
- Pulsar
- RestaurantZero
- Contact

## Selected projects

### Pulsar

Financial Decision Intelligence exploring how deterministic software and governed AI can coexist within explicit boundaries.

Case study:

https://github.com/Jetferrari/pulsar-case-study

### RestaurantZero

Restaurant commerce focused on direct digital ordering, configurable catalog behavior, server-side pricing, persistent cart state, order creation, idempotency, and configurable branding.

Case study:

https://github.com/Jetferrari/restaurantzero-case-study

## Implementation

The portfolio currently uses:

- vanilla HTML
- CSS
- JavaScript
- lightweight Node.js build and preview scripts
- local project artwork and Concept UI assets
- Manrope through Google Fonts

There is no application framework and no runtime npm dependency.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173
```

Validate and build:

```bash
npm run check
npm run build
npm run preview
```

## Routes

```text
/
/profile
/process
/projects/pulsar
/projects/restaurantzero
/contact
```

## Internationalization

Portuguese is the default language.

Runtime translations for Portuguese, English, and Spanish are centralized in:

```text
src/i18n.js
```

The selected language is persisted locally in the browser.

## Public content policy

This repository is intentionally public and contains only portfolio-safe material. Runtime portfolio copy and translations are kept in the application source; internal planning notes and editorial guidance are not part of the public repository.

It must not contain:

- private project source code
- credentials or secrets
- internal prompts
- proprietary business logic
- private schemas
- evaluation datasets
- production configuration
- sensitive operational data

## Related

GitHub profile:

https://github.com/Jetferrari

LinkedIn:

https://www.linkedin.com/in/jf11

## Rights and reuse

Copyright 2026 Jeterson Ferrari. All rights reserved.

No license is granted for copying, redistribution, derivative works, or commercial reuse of the portfolio source and visual assets except where required by applicable law. See `NOTICE.md`.
