# Jeterson Ferrari — AI-Directed Product Builder

Public source repository for Jeterson Ferrari's professional portfolio.

The portfolio presents an AI-native product development workflow centered on problem definition, product thinking, high-level architecture planning, prompt engineering, agent orchestration, and result validation.

## Portfolio experience

The interface is built around a Synaptic navigation hub that connects the main areas of the portfolio:

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

The portfolio supports Portuguese, English, and Spanish. Portuguese is the default language, with the selected language stored locally in the browser.

## Professional model

Jeterson does not present himself as a traditional manual programmer.

His direct contribution is focused on:

- product conception and problem definition
- research and product intelligence
- solution and high-level architecture planning
- constraints, specifications, and validation criteria
- prompt engineering and context design
- agent design and orchestration
- coordination of AI coding agents
- validation of behavior, interface, tests, and expected outcomes

Implementation code is produced by AI coding agents. Technical reviews and tests are also coordinated through AI-assisted workflows.

## Selected projects

### Pulsar

Financial Decision Intelligence exploring deterministic software boundaries alongside governed AI.

Case study: https://github.com/Jetferrari/pulsar-case-study

### RestaurantZero

Restaurant commerce focused on direct digital ordering, configurable catalog behavior, transactional integrity, and restaurant-owned customer experience.

Case study: https://github.com/Jetferrari/restaurantzero-case-study

## Implementation

The portfolio currently uses:

- vanilla HTML
- CSS
- JavaScript
- lightweight Node.js build and preview scripts
- local project artwork and Concept UI assets
- Manrope loaded through Google Fonts

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

Production build:

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

## Content source

The canonical Portuguese portfolio copy is maintained in:

```text
docs/portfolio-copy.md
```

Runtime translations for Portuguese, English, and Spanish are centralized in:

```text
src/i18n.js
```

## Public content policy

This repository is intentionally public and contains only portfolio-safe material.

It must not contain private project source code, credentials, internal prompts, proprietary business logic, private schemas, evaluation datasets, production secrets, or sensitive operational data.
