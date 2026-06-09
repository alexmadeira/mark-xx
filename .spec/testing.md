# Testing Spec

## Goal

Keep tests focused on behavior that protects MARK-XX architecture: data mapping, parsing, fetching orchestration, stores, utilities, controllers, UI behavior and performance-sensitive logic.

The project uses Vitest for tests. Component/UI tests should use Testing Library when React behavior needs validation.

## Test stack

Use the project testing stack consistently:

- Vitest: test runner, assertions, mocks and coverage.
- Testing Library: React component rendering and user-facing UI assertions.
- `@testing-library/user-event`: user interaction simulation.
- `@testing-library/jest-dom`: DOM-specific matchers, when installed.

Do not introduce another test runner or assertion library without an explicit task.

## Test commands

Use the existing scripts:

```bash
pnpm test:unit
pnpm test:unit:watch
pnpm test:coverage
pnpm test:ui
```

For full validation of code changes, prefer:

```bash
pnpm lint:check
pnpm type-check
pnpm test:unit
```

For production-impacting changes, also run:

```bash
pnpm build
```

## Vitest environment requirements

Logic-only tests can run in the default Vitest environment.

React component tests using Testing Library require a DOM environment. Use one of the following approaches:

1. Configure `vitest.config.ts` with a DOM environment for tests that need DOM APIs:

```ts
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
})
```

2. Or use a per-file environment directive when only some files need DOM APIs:

```ts
// @vitest-environment jsdom
```

If `jsdom` is used, it must be installed as a dev dependency. `happy-dom` is also acceptable if the project intentionally chooses it, but do not mix DOM environments without a clear reason.

Do not add DOM environment requirements to pure unit tests that do not need React rendering.

## Setup files for Testing Library

If `@testing-library/jest-dom` is installed, create a setup file under test utilities:

```txt
src/__tests__/utils/setup/testing-library.ts
```

Recommended content:

```ts
import '@testing-library/jest-dom/vitest'
```

Then register it in `vitest.config.ts`:

```ts
test: {
  setupFiles: ['./src/__tests__/utils/setup/testing-library.ts'],
}
```

Keep Testing Library setup inside `src/__tests__/utils/setup/`. Do not place setup files in production folders.

## Current test location

Tests live under:

```txt
src/__tests__/
  unit/
  utils/
```

Unit tests currently target service-level and utility-level behavior. Preserve this structure unless the repository explicitly adopts colocated tests later.

Recommended location for React component tests:

```txt
src/__tests__/unit/app/
src/__tests__/unit/components/
src/__tests__/unit/pages/
src/__tests__/unit/providers/
```

Use the folder that matches the source area being tested. Do not colocate test files inside production folders unless the project intentionally changes this convention.

## Test utilities location

All reusable mocks, fakes, stubs, fixtures, factories, render helpers and Testing Library helpers must live under:

```txt
src/__tests__/utils/
```

Do not create reusable test utilities inside production folders such as `src/services`, `src/app`, `src/game`, `src/config` or `src/styles`.

Do not duplicate reusable test helpers inside individual test folders when the helper can be shared safely from `src/__tests__/utils/`.

## Current test utilities structure

Preserve and extend the existing organization:

```txt
src/__tests__/utils/
  factories/
    fetcher/
    prismic/
    store-data/
  stubs/
    api/
    lib/
    mapper/
    stores/
```

When adding Testing Library support, extend it with:

```txt
src/__tests__/utils/
  render/
    render-with-providers.tsx
    create-test-query-client.ts
  setup/
    testing-library.ts
  events/
    setup-user.ts
```

Create only the files that are actually needed by tests.

## Testing Library render helpers

Use `src/__tests__/utils/render/` for shared render helpers.

### `render-with-providers.tsx`

Use this helper when a component depends on shared providers such as React Query, React Router, Helmet, app contexts or other project-level wrappers.

Rules:

- Create a fresh Query Client per test when React Query is involved.
- Disable retries by default in tests to avoid slow/flaky failures.
- Avoid global mutable provider state.
- Allow the test to opt into only the providers it needs.
- Return Testing Library's render result unchanged, plus useful helpers only when needed.
- Do not make one universal wrapper that hides too much test behavior.

Example shape:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

export function renderWithQueryClient(ui: ReactElement) {
  const queryClient = createTestQueryClient()

  function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  }

  return {
    queryClient,
    ...render(ui, { wrapper: Wrapper }),
  }
}
```

Adapt the helper to the real providers used by the tested component. Do not add providers that the tested component does not need.

## Testing Library query rules

Tests must assert behavior from the user's perspective.

Preferred query order:

1. `getByRole` / `findByRole`
2. `getByLabelText` / `findByLabelText`
3. `getByPlaceholderText`
4. `getByText`
5. `getByDisplayValue`
6. `getByAltText`
7. `getByTitle`
8. `getByTestId` only when no accessible query is viable

Rules:

- Prefer `screen` for queries unless scoping with `within` improves clarity.
- Use `findBy*` for async appearance.
- Use `queryBy*` only for absence assertions.
- Avoid asserting CSS class names unless the class is the actual contract.
- Avoid snapshots for complex UI. Prefer explicit assertions.
- Do not test implementation details such as internal state names, private hook variables or component internals.

Good:

```tsx
expect(screen.getByRole('button', { name: /abrir menu/i })).toBeInTheDocument()
```

Avoid:

```tsx
expect(container.querySelector('.menu-button')).not.toBeNull()
```

## User interaction rules

Use `@testing-library/user-event` for user interactions.

Create a shared helper only if repeated across tests:

```txt
src/__tests__/utils/events/setup-user.ts
```

Example:

```ts
import userEvent from '@testing-library/user-event'

export function setupUser() {
  return userEvent.setup()
}
```

Rules:

- Prefer `userEvent` over `fireEvent`.
- Use `fireEvent` only for low-level events not covered well by `userEvent`.
- Await user interactions when the API is async.
- Assert the visible result of the interaction, not the internal handler call, unless the handler is the public contract.

Good:

```tsx
const user = setupUser()
await user.click(screen.getByRole('button', { name: /copiar/i }))
expect(screen.getByText(/copiado/i)).toBeInTheDocument()
```

## Accessibility expectations

Component tests should reinforce accessible UI contracts.

When writing or updating component tests:

- Prefer semantic roles and accessible names.
- Ensure interactive elements are reachable by role.
- Avoid relying on visual-only text when an accessible name is expected.
- Use labels for inputs and controls.
- Use `aria-*` attributes only when native semantics are insufficient.

If a component cannot be queried without `getByTestId`, evaluate whether the component is missing accessible semantics before adding `data-testid`.

## `data-testid` rules

Use `data-testid` as a last resort.

Allowed cases:

- non-semantic animation containers;
- canvas/game containers;
- decorative wrappers whose presence is a real contract;
- duplicated elements where role/text cannot disambiguate safely.

Rules:

- Use stable names tied to domain behavior, not implementation details.
- Do not use generated IDs or class names as test IDs.
- Do not add test IDs to compensate for missing accessibility when a semantic query is possible.

## Factories

Use `factories/` for functions that build deterministic data objects used by tests.

Current pattern examples:

```txt
src/__tests__/utils/factories/fetcher/make-award-raw.ts
src/__tests__/utils/factories/fetcher/make-brand-raw.ts
src/__tests__/utils/factories/fetcher/make-company-raw.ts
src/__tests__/utils/factories/fetcher/make-network-raw.ts
src/__tests__/utils/factories/fetcher/make-page-raw.ts
src/__tests__/utils/factories/fetcher/make-pre-fetcher-raw.ts
src/__tests__/utils/factories/fetcher/make-pre-fetcher.ts
src/__tests__/utils/factories/fetcher/make-project-raw.ts
src/__tests__/utils/factories/fetcher/make-repository-language-raw.ts
src/__tests__/utils/factories/fetcher/make-repository-raw.ts
src/__tests__/utils/factories/fetcher/make-technology-raw.ts
src/__tests__/utils/factories/prismic/make-prismic-document.ts
src/__tests__/utils/factories/store-data/make-project-store-data.ts
```

Factory rules:

- Use the `make-*.ts` naming convention.
- Factories must return complete enough objects for the test scenario, with safe defaults.
- Accept partial overrides when useful, but keep output deterministic.
- Do not place assertions inside factories.
- Do not call real APIs, real storage or environment-dependent code from factories.
- Prefer domain-specific subfolders when the factory belongs to a clear area: `fetcher`, `prismic`, `store-data`, `game`, `component`, etc.

Example shape:

```ts
export function makeProjectRaw(overrides = {}) {
  return {
    id: 'project-id',
    uid: 'project-uid',
    ...overrides,
  }
}
```

## Stubs

Use `stubs/` for fake implementations that replace external boundaries, stateful collaborators, stores or third-party/runtime dependencies.

Current pattern examples:

```txt
src/__tests__/utils/stubs/api/fake-requester-api.ts
src/__tests__/utils/stubs/lib/image.ts
src/__tests__/utils/stubs/mapper/
src/__tests__/utils/stubs/stores/
```

Stub rules:

- Use `fake-*`, `stub-*` or explicit domain names when naming fake implementations.
- Put API/requester fakes in `stubs/api/`.
- Put runtime/library fakes in `stubs/lib/`.
- Put mapper stubs in `stubs/mapper/`.
- Put store stubs in `stubs/stores/`.
- Put browser API stubs in `stubs/browser/` when needed.
- Put router/navigation stubs in `stubs/router/` when needed.
- Do not mix factories and stubs in the same file.
- Stubs should expose only the minimum API required by tests.
- Stubs must be resettable or recreated per test when they hold state.

## Where to add new test utilities

Use this decision table:

| Need | Location |
|---|---|
| Build raw API/CMS response data | `src/__tests__/utils/factories/fetcher/` |
| Build Prismic document-like data | `src/__tests__/utils/factories/prismic/` |
| Build normalized store/domain data | `src/__tests__/utils/factories/store-data/` |
| Build component props/data | `src/__tests__/utils/factories/component/` if reused by multiple component tests |
| Fake requester/API boundary | `src/__tests__/utils/stubs/api/` |
| Fake image/runtime/browser helper | `src/__tests__/utils/stubs/lib/` |
| Fake browser API such as IntersectionObserver, ResizeObserver, matchMedia or clipboard | `src/__tests__/utils/stubs/browser/` |
| Fake mapper behavior | `src/__tests__/utils/stubs/mapper/` |
| Fake Zustand store/state collaborator | `src/__tests__/utils/stubs/stores/` |
| Fake router/navigation collaborator | `src/__tests__/utils/stubs/router/` |
| Shared Testing Library render helper | `src/__tests__/utils/render/` |
| Shared user-event setup | `src/__tests__/utils/events/` |
| Testing Library/jest-dom setup | `src/__tests__/utils/setup/` |
| Shared assertions/matchers | `src/__tests__/utils/assertions/` only when reused by multiple tests |
| Game-specific fake input/audio/rendering | `src/__tests__/utils/stubs/game/` if game tests need it |
| Game-specific data factories | `src/__tests__/utils/factories/game/` if game tests need it |

Only create a new subfolder under `src/__tests__/utils/` when the existing folders do not describe the helper accurately.

## Import rules for test utilities

- Prefer importing shared test utilities from `src/__tests__/utils/` instead of duplicating local helpers.
- Use the project alias if available and consistent in the existing tests.
- Keep imports explicit enough that the helper category is visible from the path.
- Avoid barrel files unless repeated import paths become noisy across multiple tests.

Good:

```ts
import { makeProjectRaw } from '@/__tests__/utils/factories/fetcher/make-project-raw'
import { FakeRequesterApi } from '@/__tests__/utils/stubs/api/fake-requester-api'
import { renderWithQueryClient } from '@/__tests__/utils/render/render-with-providers'
```

Avoid:

```ts
import { makeProjectRaw } from './helpers'
import { FakeRequesterApi } from '../../../../../utils'
```

## What must be tested

Add or update tests when changing:

- mappers;
- parsers;
- presenters;
- fetchers with branching behavior;
- stores/actions;
- controllers;
- utility functions;
- preload/background-loading decisions;
- cache key generation;
- environment parsing/validation;
- React components with conditional rendering, async loading, routing, forms or user interaction;
- providers and hooks with stateful behavior;
- game logic that affects movement, collision, score, state or speed.

## What usually does not need tests

Do not add low-value tests for:

- static visual-only components;
- pure layout wrappers with no behavior;
- simple re-exports;
- generated Prismic types;
- asset imports;
- one-line constants without branching;
- third-party component behavior already covered by the library.

## Test style

Prefer behavior-oriented tests:

```txt
Given a source response
When it is mapped
Then the UI/domain contract is stable and normalized
```

For component tests, use the same principle:

```txt
Given a rendered component
When the user interacts with it
Then the visible UI changes according to the expected behavior
```

Avoid tests that only assert implementation details such as internal variable names, private helper call order, component state variable names or hook internals.

## Mocking rules

- Use existing test utilities/fakes from `src/__tests__/utils/` before creating new ones.
- Keep reusable mocks, fakes, stubs and factories inside `src/__tests__/utils/`.
- Keep one-off inline mocks inside the test file only when they are small and not useful elsewhere.
- Use deterministic fixture data.
- Avoid over-mocking simple pure functions.
- Do not mock the unit under test.
- Do not create mocks inside production source folders.
- Do not create duplicate helpers with slightly different names if an existing factory/stub can be extended safely.

## Testing Library mocking rules

- Mock network/requester boundaries, not Testing Library.
- Do not mock React components unless the child component is irrelevant and expensive to render.
- Do not mock hooks from the same unit being tested.
- Mock browser APIs missing from the DOM environment through reusable stubs in `src/__tests__/utils/stubs/browser/`.
- Reset mocks between tests using Vitest lifecycle hooks when state can leak.
- Prefer factories for props and CMS/API data instead of hardcoded large objects inside component tests.

## Fetcher/API testing

When testing fetchers:

- mock the requester/API boundary using utilities from `src/__tests__/utils/stubs/api/`;
- use raw-response factories from `src/__tests__/utils/factories/fetcher/`;
- assert normalized output or correct delegation behavior;
- test empty/error/edge cases where the fetcher branches;
- do not hit real Prismic, GitHub, Cloudinary or external APIs in unit tests.

## Mapper/parser/presenter testing

For transformation layers:

- test minimal valid input;
- test missing optional fields;
- test malformed or empty source values if parser behavior exists;
- test ordering/grouping/formatting rules;
- test that raw external shape does not leak if the mapper is responsible for shielding UI;
- place reusable source objects in factories instead of repeating large inline objects across tests.

## Store testing

For Zustand stores:

- test initial state when relevant;
- test actions and resulting state transitions;
- test reset/clear behavior if available;
- avoid testing Zustand internals;
- isolate store state between tests;
- use store data factories from `src/__tests__/utils/factories/store-data/` when creating reusable state objects;
- use store stubs from `src/__tests__/utils/stubs/stores/` when replacing store collaborators.

## Component testing with Testing Library

Use Testing Library for React components when the component has observable behavior.

Test component behavior such as:

- conditional rendering;
- loading, empty, success and error states;
- click, keyboard and form interactions;
- accessible labels and roles;
- route-dependent UI;
- provider-dependent state;
- async data shown to the user.

Avoid component tests that only verify that static text renders when the component has no logic or risk.

Recommended pattern:

```tsx
import { screen } from '@testing-library/react'
import { renderWithQueryClient } from '@/__tests__/utils/render/render-with-providers'
import { setupUser } from '@/__tests__/utils/events/setup-user'

it('shows the copied state after clicking the copy button', async () => {
  const user = setupUser()

  renderWithQueryClient(<CopyButton value="https://example.com" />)

  await user.click(screen.getByRole('button', { name: /copiar/i }))

  expect(screen.getByText(/copiado/i)).toBeInTheDocument()
})
```

## Async UI testing

For async UI:

- use `findBy*` when waiting for an element to appear;
- use `waitFor` only when no `findBy*` query expresses the expectation clearly;
- avoid arbitrary timers or sleeps;
- prefer fake timers only when testing timer-dependent behavior directly;
- reset timers after tests if fake timers are used;
- keep React Query retries disabled in test Query Clients.

Good:

```tsx
expect(await screen.findByRole('heading', { name: /projetos/i })).toBeInTheDocument()
```

Avoid:

```tsx
await new Promise((resolve) => setTimeout(resolve, 1000))
```

## Router-dependent component tests

For components that depend on routes or navigation:

- prefer real router wrappers when route behavior is part of the test;
- use router stubs only when navigation itself is not the behavior under test;
- place reusable router wrappers/stubs under `src/__tests__/utils/stubs/router/` or `src/__tests__/utils/render/`.

Do not mock routing globally if the test should validate link generation, route params or navigation behavior.

## Browser API stubs

Some project features may depend on browser APIs not fully implemented in the test DOM environment.

Examples:

- `IntersectionObserver`;
- `ResizeObserver`;
- `matchMedia`;
- `navigator.clipboard`;
- canvas/WebGL APIs;
- image loading APIs.

Reusable stubs must go under:

```txt
src/__tests__/utils/stubs/browser/
```

Use local inline stubs only when they are tiny, specific to one test and unlikely to be reused.

## Game testing

For Snake/Phaser-related logic:

- prefer testing pure game services/controllers over Phaser rendering;
- test movement rules, collision, score, state transitions and speed curves;
- avoid requiring real canvas/WebGL in unit tests;
- use fakes for rendering/audio/input when needed;
- place reusable game fakes under `src/__tests__/utils/stubs/game/` if introduced;
- place reusable game data factories under `src/__tests__/utils/factories/game/` if introduced.

## Coverage

Coverage is useful, but do not optimize for percentage over risk.

Higher priority:

1. transformation correctness;
2. state transitions;
3. cache/loading behavior;
4. user-visible component behavior;
5. game rules;
6. utilities used in many places.

Lower priority:

1. presentational markup;
2. static assets;
3. generated files;
4. vendor integration wrappers with no branching.

## Handling failing tests

Do not delete failing tests to make the suite pass.

If a test fails:

1. identify whether product behavior changed intentionally;
2. update expectations only when the new behavior is correct;
3. fix implementation when the test exposes a regression;
4. document any test that cannot run due to environment/dependency limitations.

## Codex output

When finishing a task, report:

- tests added/updated;
- Testing Library utilities added/updated, when applicable;
- test utility files added/updated under `src/__tests__/utils/`;
- test files affected;
- commands executed;
- failures and fixes;
- commands not executed and why.
