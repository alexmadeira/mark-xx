# AGENTS.md

## Project context

MARK-XX is a personal portfolio and technical lab focused on frontend architecture, perceived performance, visual consistency, offline-first behavior, content integration and controlled experimentation.

The project is a React + Vite + TypeScript application using TailwindCSS v4, Zustand, TanStack React Query with persistence, Prismic CMS, Vite PWA, Mitt and Phaser for the Snake easter egg.

Before changing code:

- inspect existing files with similar responsibility;
- preserve the current architecture and naming patterns;
- prefer small, isolated changes over broad rewrites;
- do not change visual identity, copy, animations, assets or routing unless the task explicitly asks for it;
- do not introduce new libraries unless the gain is concrete and the dependency is justified.

## Package manager

Use `pnpm`. The repository contains `pnpm-lock.yaml` and package scripts are defined for pnpm usage.

Do not use `npm install` or `yarn` in this project.

## Main commands

Use only scripts that exist in `package.json`:

```bash
pnpm install
pnpm dev
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

For validation, prefer this order when relevant:

```bash
pnpm lint:check
pnpm type-check
pnpm test:unit
pnpm build
```

Do not claim that a command passed unless it was actually executed.

## Repository layout

Current high-level structure:

```txt
src/
  @types/       # global and shared TypeScript contracts
  __tests__/    # automated tests, mainly unit tests
  _assets_/     # static/application assets grouped by concern
  app/          # UI shell, pages, layouts, providers, routes and app-level features
  config/       # application configuration
  game/         # Phaser/Snake game engine and game modules
  services/     # API, fetchers, builders, mappers, parsers, presenters, stores and utilities
  styles/       # global CSS and design tokens
  env.ts        # environment parsing/validation
  main.tsx      # React entrypoint
```

Important `src/app` areas:

```txt
src/app/
  components/
  easter-eggs/
  games/snake/
  layouts/
  loader/
  pages/
  providers/
  index.tsx
  routes.tsx
```

Important `src/services` areas:

```txt
src/services/
  api/
  builder/
  constant/
  controller/
  fetcher/
  lib/
  mapper/
  parser/
  presenter/
  register/
  store/
  utils/
```

## Architecture rules

The expected data flow is:

```txt
API -> Requester -> Fetcher -> Mapper/Parser/Presenter -> Store/Query -> UI
```

Rules:

- UI components should not call external APIs directly.
- Fetching belongs in `src/services/fetcher`, API clients/requesters or existing service abstractions.
- Transformation belongs in mapper/parser/presenter layers, not inside JSX.
- Shared state belongs in `src/services/store` only when local component state or React Query state is insufficient.
- Cross-cutting communication should follow the existing event-driven pattern; do not create ad-hoc global mutable state.
- Experimental features, easter eggs and game-related code must remain isolated from the core portfolio flow.

## React rules

- Use functional components and hooks.
- Keep rendering components focused on presentation.
- Extract orchestration, derived state and side effects into hooks/services when complexity grows.
- Avoid prop drilling when an existing provider/store pattern already solves the problem.
- Do not introduce state management alternatives to Zustand or TanStack Query.
- Preserve route organization in `src/app/routes.tsx` and page-level structure in `src/app/pages`.

## TypeScript rules

- Do not use `any` unless there is no practical alternative; if used, add a short justification.
- Prefer explicit return types for public functions, factories, mappers, builders and service methods.
- Reuse existing contracts from `src/@types`, Prismic generated types and service-level types.
- Avoid duplicating API/content schemas manually when generated or existing types are available.
- Keep environment-related validation centralized in `src/env.ts` or existing config abstractions.

## Styling and visual identity

- Use TailwindCSS v4 and existing global design tokens.
- Preserve token-driven styling in `src/styles`.
- Do not hardcode colors, spacing, animations or breakpoints when an existing token/class pattern exists.
- Do not change logo, README assets, hero assets, preview images or brand visuals unless explicitly requested.
- Class ordering should remain compatible with Prettier + `prettier-plugin-tailwindcss`.

## PWA, cache and performance

The project uses `vite-plugin-pwa` with runtime caching for fonts, GitHub API, Cloudinary and Prismic CDN.

When changing loading, caching or data-fetching behavior:

- avoid breaking offline-first behavior;
- avoid increasing initial payload without justification;
- preserve perceived performance patterns such as preload/background loading when present;
- check service worker, runtime cache and React Query persistence implications;
- do not disable PWA behavior to fix unrelated bugs.

## Prismic rules

- Prismic content integration should keep generated types in sync.
- Run `pnpm prismic:generate-types` when changing Prismic model/type usage if required.
- Do not hardcode content that should come from Prismic unless the task explicitly asks for static fallback behavior.

## Phaser/Snake rules

- Keep Phaser game logic isolated under `src/game` and app integration under `src/app/games/snake` or existing easter egg paths.
- Do not couple Snake/game state to portfolio page state unless mediated by the existing app/event architecture.
- Preserve game performance assumptions and keyboard/input behavior.

## Testing rules

- Unit tests live under `src/__tests__/unit`.
- Prefer tests for services, mappers, parsers, stores, controllers and utilities before UI snapshot-style tests.
- When changing behavior, update or add tests for the changed behavior.
- Do not delete failing tests unless the behavior is intentionally removed and the reason is documented.

## Commit and quality rules

The project uses Commitlint with Conventional Commits.

Use commit messages in this style when asked to produce commits:

```txt
type(scope): short description
```

Examples:

```txt
docs(readme): update project documentation
refactor(fetcher): isolate Prismic data mapping
fix(pwa): preserve runtime cache registration
```

## Specs

Use these task-specific specs when applicable:

- README and repository presentation: `.spec/readme.md`
- Project structure and file organization: `.spec/project-structure.md`
- Module creation/evolution: `.spec/module-pattern.md`
- Testing strategy: `.spec/testing.md`
- GitHub metadata and repo profile: `.spec/github-repository.md`

## Completion checklist

Before finishing a task, report:

- files created, changed or removed;
- technical decisions made;
- commands executed and results;
- validations not executed and why;
- risks, limitations or follow-up items.
