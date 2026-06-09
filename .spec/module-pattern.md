# Module Pattern Spec

## Goal

Define how to create or evolve modules in MARK-XX without breaking the existing separation between UI, services, stores, content mapping and game logic.

This project does not follow a generic `components/hooks/services`-only structure. It uses an explicit `app` layer and a rich `services` layer.

## Decision model

Before creating a file, classify the responsibility:

| Responsibility | Preferred location |
|---|---|
| Route/page UI | `src/app/pages` |
| App-level reusable UI | `src/app/components` |
| Layout composition | `src/app/layouts` |
| Provider/context composition | `src/app/providers` |
| Loading/preloading orchestration | `src/app/loader` or existing loader pattern |
| External data fetching | `src/services/fetcher` or `src/services/api` |
| Requester/client setup | `src/services/api` or existing requester path |
| Data transformation | `src/services/mapper`, `parser` or `presenter` |
| Stateful domain data | `src/services/store` |
| Utility/pure function | `src/services/utils` |
| Constants | `src/services/constant` |
| Controllers/orchestration classes | `src/services/controller` |
| Snake/app integration | `src/app/games/snake` |
| Phaser/game internals | `src/game` |
| Global shared types | `src/@types` |
```

## Recommended flow for new data-backed feature

Use this flow unless the existing feature being modified uses a different local pattern:

```txt
API/CMS response
  -> fetcher
  -> mapper/parser/presenter
  -> React Query or Zustand store
  -> page/component
```

Do not skip directly from API response to JSX.

## Feature creation checklist

For a new portfolio/content feature:

1. Check whether Prismic already provides the content model/type.
2. Check existing fetchers and mappers for similar content.
3. Add or update fetcher logic only if existing fetcher cannot serve the use case.
4. Add mapper/parser/presenter logic for normalization.
5. Expose data through existing query/store pattern.
6. Render with page/component composition under `src/app`.
7. Add tests for transformation and state logic when behavior is non-trivial.

## Service module pattern

A service module may include:

```txt
src/services/<layer>/<domain-or-feature>/
  index.ts
  <feature>.ts
  <feature>.types.ts
  <feature>.test-support.ts   # only if an existing pattern supports it
```

Rules:

- Keep public exports explicit.
- Do not leak raw API/CMS response shape into UI unless that is already the accepted contract.
- Keep naming tied to domain responsibility, not implementation detail.
- Prefer small functions/classes with clear inputs and outputs.

## UI module pattern

For app UI:

```txt
src/app/components/<ComponentName>/
  index.tsx
```

or follow the exact local pattern if the surrounding components use a different convention.

Rules:

- UI receives already-normalized data when practical.
- UI should not know Prismic response internals unless the project already uses Prismic fields directly in that area.
- Avoid making one component responsible for fetching, mapping, storing and rendering.

## Store pattern

When working with Zustand stores:

- inspect existing stores before creating a new one;
- keep state shape narrow and domain-focused;
- keep actions explicit;
- avoid storing duplicated derived data if it can be computed cheaply;
- avoid using global store for local UI state.

Use React Query for server/cache state when that is the better fit.

Use Zustand for app/domain state when:

- state is shared across distant UI branches;
- state is not simply server data;
- behavior requires explicit actions or persistence patterns already present in the project.

## Mapper/parser/presenter rules

Use these boundaries:

- `mapper`: convert external/source contract into internal contract.
- `parser`: parse or normalize raw/untrusted values.
- `presenter`: shape already-valid data for UI display.

Do not mix UI rendering with these layers.

## Builder/controller rules

Use builders when creating structured objects/configs from inputs.

Use controllers when coordinating multi-step behavior or state transitions that would make components/services too procedural.

Avoid creating classes only to wrap one simple function.

## Game module rules

For Snake or future game/easter egg work:

- keep Phaser mechanics in `src/game`;
- keep React integration in `src/app/games/snake` or easter egg paths;
- communicate through existing event mechanisms where applicable;
- do not let game lifecycle affect portfolio app lifecycle unexpectedly;
- preserve lazy loading/isolation if the existing implementation uses it.

## TypeScript requirements

- Public functions/classes should have explicit input/output types.
- Avoid `any`.
- Prefer existing generated or shared types.
- Use Zod only where runtime validation is required or existing env/config pattern uses it.
- Keep type definitions close to the module unless shared globally.

## Anti-patterns

Do not:

- create API calls directly inside React components;
- map Prismic/API responses in JSX;
- introduce Redux/MobX/Jotai/etc.;
- duplicate Zustand store state and React Query state without reason;
- create generic `helpers` or `shared` folders without clear boundaries;
- rewrite working modules for style preference only;
- move Snake internals into app components.

## Codex output

When creating or changing a module, report:

- which layer each file belongs to;
- why the chosen location is correct;
- whether tests were added or not;
- validation commands executed;
- architectural trade-offs or limitations.
