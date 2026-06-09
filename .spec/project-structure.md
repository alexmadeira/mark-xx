# Project Structure Spec

## Goal

Keep MARK-XX organized around the existing app/service/game separation. Do not replace the architecture with a generic React folder structure.

This repository already has a defined shape. New files should fit into the existing structure unless there is a concrete reason to extend it.

## Current high-level structure

```txt
src/
  @types/
  __tests__/
  _assets_/
  app/
  config/
  game/
  services/
  styles/
  env.ts
  main.tsx
  vite-env.d.ts
```

## Folder responsibilities

### `src/app`

Use for application UI composition:

```txt
src/app/
  components/    reusable UI components tied to the app interface
  easter-eggs/   app-level easter egg integrations
  games/snake/   React/app integration for Snake game
  layouts/       layout composition
  loader/        app loading/preloading behavior
  pages/         route-level screens
  providers/     app providers and context composition
  index.tsx      app root
  routes.tsx     route definitions
```

Rules:

- Route-level UI belongs in `pages`.
- Shared app UI belongs in `components`.
- Cross-page composition belongs in `layouts`.
- Provider setup belongs in `providers`.
- Do not place API access directly in `pages` or `components`.

### `src/services`

Use for non-visual application logic:

```txt
src/services/
  api/         API client/requester integrations
  builder/     object/config builders
  constant/    shared constants
  controller/  orchestration/control classes
  fetcher/     data fetching units
  lib/         external/internal library wrappers
  mapper/      data mapping from API/CMS to domain/UI contracts
  parser/      parsing and normalization
  presenter/   presentation-oriented transformations
  register/    registration/bootstrap service logic
  store/       Zustand stores and store helpers
  utils/       pure utilities
```

Rules:

- Keep HTTP/client details in `api` or fetcher-level abstractions.
- Keep data normalization in `mapper`, `parser` or `presenter` depending on current pattern.
- Keep stateful domain stores in `store`.
- Keep pure functions in `utils`.
- Do not move business/data transformation logic into React components.

### `src/game`

Use for game engine and Phaser/Snake internals.

Rules:

- Keep Phaser-specific code isolated from portfolio UI.
- Do not import React components into core game code.
- Game events should communicate through existing event/app boundaries.
- Preserve current keyboard/input and performance assumptions.

### `src/styles`

Use for global styles and design tokens.

Rules:

- Preserve token-driven styling.
- Do not scatter hardcoded colors or breakpoints across components when tokens/classes exist.
- Avoid local CSS files unless existing patterns support them.

### `src/@types`

Use for shared TypeScript contracts.

Rules:

- Prefer specific domain/service types close to their domain if they are not globally shared.
- Use `src/@types` only for contracts genuinely reused across the project.

### `src/__tests__`

Use for automated tests.

Current pattern:

```txt
src/__tests__/
  unit/
  utils/
```

Rules:

- Unit tests for services should remain under `src/__tests__/unit`.
- Test utilities/fakes/mocks should stay under test utility paths.
- Do not mix test files inside production folders unless the project adopts that pattern explicitly.

## Naming conventions

Follow existing style first. If no clear local precedent exists:

- React components: PascalCase.
- Component files: match exported component name when practical.
- Hooks: `useSomething`.
- Classes/controllers/builders: PascalCase.
- Functions/utilities: camelCase.
- Constants: UPPER_SNAKE_CASE only for global immutable constants; otherwise use explicit camelCase/const names.
- Folders: keep the repository's existing naming style; do not rename folders only for preference.

## Import rules

- Use existing aliases/path resolution configured by Vite/TypeScript.
- Avoid deep relative chains such as `../../../..` when an alias is available.
- Do not introduce barrel files everywhere by default.
- `index.ts` files should expose a deliberate public API, not dump every internal file.
- Do not create circular dependencies between `app`, `services` and `game`.

## Dependency direction

Preferred dependency direction:

```txt
app -> services
app -> game integration
services -> api/libs/types
services -> pure utilities
game -> game internals/utilities
```

Avoid:

```txt
services -> app
game core -> app UI
styles -> services
```

## When creating new folders

Create a new folder only when:

- there are at least two related files or clear future growth;
- the responsibility does not fit an existing folder;
- the naming improves discoverability;
- imports stay simple and predictable.

Do not create folders like `helpers`, `common`, `misc`, `shared` or `core` without a precise responsibility.

## Refactoring constraints

- Do not reorganize the project globally during a feature/fix task.
- Do not rename folders/files unless the task is explicitly structural.
- When moving files, update imports, tests and documentation.
- Preserve public exports used by other modules unless intentionally changed.

## Codex output

When changing structure, report:

- files moved/created/deleted;
- reason for each structural decision;
- import paths updated;
- validation commands executed;
- risks from moved files or changed boundaries.
