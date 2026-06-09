# GitHub Repository Spec

## Goal

Keep GitHub metadata, README positioning and repository presentation consistent with the real MARK-XX codebase.

MARK-XX should be presented as a personal frontend portfolio and technical lab, not as a generic template or production SaaS.

## Repository description

Use a concise description focused on value and stack.

Recommended description:

```txt
Portfólio frontend focado em performance, arquitetura, PWA/offline-first e experiência visual, construído com React, Vite e TypeScript.
```

Alternative shorter version:

```txt
Portfólio técnico em React, Vite e TypeScript com foco em performance, arquitetura frontend e PWA.
```

Avoid:

```txt
Meu portfólio pessoal
Site moderno feito com React
Aplicação fullstack completa
Plataforma production-ready
```

## Topics

Use only topics that represent actual code, tooling or domain.

Recommended topics:

```txt
react
typescript
vite
tailwindcss
zustand
tanstack-query
prismic
pwa
phaser
portfolio
frontend
web-performance
offline-first
vite-pwa
```

Optional topics, if aligned with the current README and code:

```txt
react-router
vitest
eslint
personal-portfolio
design-tokens
frontend-architecture
```

Do not use topics for tools not present in the project.

## README alignment

The GitHub description, topics and README must tell the same story:

- React/Vite/TypeScript frontend;
- portfolio as technical lab;
- performance and architecture;
- PWA/offline-first behavior;
- Prismic CMS integration;
- Phaser/Snake easter egg;
- design tokens and visual system.

Do not add metadata that the README does not support.

## Badge alignment

Badges in README should match topics and dependencies.

Allowed badge families:

- React
- Vite
- TypeScript
- TailwindCSS
- Zustand
- TanStack Query
- Prismic
- PWA
- Phaser
- Vitest
- pnpm

Only add CI/build badges if the workflow path/name is verified under `.github/workflows`.

## About links

Use the portfolio live URL if available and confirmed:

```txt
https://www.alexmadeira.com.br/
```

Use source code link only when relevant inside README:

```txt
https://github.com/alexmadeira/mark-xx
```

## Social/author section

Author identity:

```txt
Alex Madeira
Front-end Engineer focado em performance, arquitetura e experiência.
```

Allowed links if already present or requested:

- LinkedIn
- Website
- GitHub profile

Do not add email unless requested.

## Release/package metadata

This project is marked as private in `package.json`, even though the GitHub repository is public. Do not imply it is an npm package or library distributed publicly.

Do not add npm install usage for consuming this project as a dependency.

## Claims to avoid

Avoid unverified claims:

- “100% test coverage”;
- “WCAG compliant”;
- “SEO optimized” without specific implementation evidence;
- “used by thousands”;
- exact performance scores;
- production SLA;
- enterprise-ready;
- fullstack/backend capabilities.

## Suggested pinned-repo rationale

If describing why this repository should be pinned on GitHub, use concrete reasons:

- demonstrates modern frontend stack;
- shows architecture beyond static portfolio pages;
- includes PWA/cache/runtime strategy;
- integrates CMS/data fetching/state management;
- includes controlled experimental feature with Phaser;
- has tests, linting, typing and commit tooling.

## Codex output

When updating repository metadata guidance or README presentation, report:

- proposed GitHub description;
- proposed topics;
- README sections affected;
- claims intentionally avoided;
- any metadata that still needs manual update in GitHub UI.
