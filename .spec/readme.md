# README Spec

## Goal

Create or update `README.md` for MARK-XX with a GitHub-ready presentation that reflects the real project: a personal frontend portfolio and technical lab focused on architecture, performance, offline-first behavior, visual identity and controlled experimentation.

## Source of truth

Before editing README, inspect:

- `package.json`
- `src/`
- `src/app/`
- `src/services/`
- `src/game/`
- `src/styles/`
- `vite.config.ts`
- `docs/assets/`
- existing `README.md`

Do not invent stack, metrics, production claims, integrations or features that are not supported by repository code or existing documentation.

## Required sections

Use these sections when applicable:

1. Hero/banner
2. Project name
3. Short description
4. Badges
5. Preview
6. About
7. Technical highlights
8. Stack
9. Architecture/data flow
10. Features
11. Folder structure
12. Running locally
13. Available scripts
14. Environment variables, if needed
15. Testing and quality checks
16. Assets used in README
17. Author

## Project positioning

The README should present MARK-XX as:

> Portfólio pessoal focado em performance, arquitetura frontend, experiência visual, PWA/offline-first, integração com CMS e experimentação controlada.

Avoid generic descriptions like:

- “simple portfolio”;
- “modern website”;
- “fullstack app”;
- “production-ready platform” unless explicitly evidenced.

## Badge rules

Badges should reflect actual technologies used in the project.

Relevant badges include:

- React 19
- Vite 7
- TypeScript 5.9
- TailwindCSS v4
- Zustand
- TanStack React Query
- Prismic CMS
- Vite PWA
- Phaser
- pnpm

Do not add badges for tools not present in `package.json`.

If GitHub Actions workflow exists, a build/test badge may be added only if the workflow name/path is confirmed.

## Preview and assets

Before adding preview images, inspect:

```txt
docs/assets/
public/
src/_assets_/
```

Preferred README assets, if present:

```txt
docs/assets/hero-readme.svg
docs/assets/logo-gradient.svg
docs/assets/preview-placeholder.svg
```

Rules:

- Reference only existing images.
- Do not create broken image links.
- Do not claim “live preview” unless a valid deployed URL is already documented.
- Do not alter README assets unless explicitly requested.

## Stack section

The stack section should be generated from real dependencies.

Expected stack for this project:

```txt
React 19
Vite 7
TypeScript 5.9
TailwindCSS v4
Zustand
TanStack React Query + Persist
Prismic CMS
Mitt
Phaser
Vite PWA
Vitest
ESLint
Prettier + Tailwind plugin
Husky + lint-staged
Commitlint + Conventional Commits
```

Keep versions aligned with `package.json`.

## Architecture section

Use the project's layered flow:

```txt
API -> Requester -> Fetcher -> Mapper/Parser/Presenter -> Store/Query -> UI
```

Explain architecture through actual repository folders:

```txt
src/app       UI shell, pages, layouts, providers and routes
src/services  API, fetchers, builders, mappers, parsers, presenters, stores and utilities
src/game      Phaser/Snake game engine and game modules
src/config    application configuration
src/styles    global CSS and design tokens
src/@types    shared TypeScript contracts
```

## Feature claims allowed

Allowed claims, when supported by current code/docs:

- token-driven visual system;
- modular frontend architecture;
- Prismic content integration;
- PWA/offline-first behavior;
- runtime caching through Vite PWA;
- persisted React Query cache;
- Zustand stores by domain;
- Snake/easter egg with Phaser;
- event-driven communication with Mitt;
- performance-oriented preload/background loading, only if supported by existing implementation/docs.

Avoid unsupported claims such as:

- specific Lighthouse scores;
- exact user numbers;
- commercial production SLA;
- accessibility certification;
- SEO guarantees;
- complete test coverage.

## Running locally

Use pnpm commands only:

```bash
pnpm install
pnpm dev
```

Additional scripts:

```bash
pnpm build
pnpm preview
pnpm preview:build
pnpm test:ui
pnpm test:unit
pnpm test:unit:watch
pnpm test:coverage
pnpm lint:check
pnpm lint:fix
pnpm type-check
pnpm prismic:generate-types
```

Mention that some commands use `.env` and `.env.test` through dotenvx when tests are executed.

## Environment variables

If documenting environment variables:

- inspect `src/env.ts` first;
- do not guess variable names;
- mark secrets as required without exposing values;
- include `.env.example` guidance only if creating or updating such file is in scope.

## Writing style

Use direct Portuguese, with technical density.

Avoid:

- hype without evidence;
- generic buzzwords;
- long marketing copy;
- duplicated explanations;
- claims not reflected in code.

Prefer:

- concrete stack;
- concrete folders;
- concrete scripts;
- architecture decisions;
- short rationale for why the project is technically relevant.

## Constraints

- Do not modify application code while updating README.
- Do not add new dependencies.
- Do not create new assets unless explicitly requested.
- Do not remove existing README assets without instruction.
- Do not change license or repository visibility claims.

## Output expected from Codex

At the end, report:

- README sections changed;
- badges added/updated;
- images referenced;
- scripts documented;
- any assumptions or unsupported items intentionally avoided.
