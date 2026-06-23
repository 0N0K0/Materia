# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`@0n0k0/materia` is a Mantine v9 extension library. It extends Mantine's component system with custom components and a custom theme. Built with Rollup (ESM + CJS), documented via Next.js, developed/previewed via Storybook.

**Target environments:** web browsers and Electron. All components and utilities must be compatible with both. Avoid APIs unavailable in one or the other (e.g. no Node.js-only APIs in components, no browser-only globals without guards when used in Electron main process context).

Yarn workspaces: `package/` (the publishable library) and `docs/` (Next.js documentation site).

## Commands

All commands run from repo root unless noted.

```bash
yarn                    # install dependencies
npm run build           # compile library → package/dist/
npm run dev             # start docs site (Next.js, port varies)
npm run storybook       # start Storybook (port 8271)
npm run docgen          # regenerate docs/docgen.json from component types
npm run jest            # run tests only
npm run test            # full CI: syncpack + format + typecheck + lint + jest
npm run typecheck       # tsc + docs typecheck
npm run lint            # oxlint + stylelint
npm run format:write    # auto-format all .ts/.tsx/.css files
npm run format:test     # check formatting without writing
npm run clean           # remove package/dist/
```

Run a single test file:

```bash
npx jest package/src/components/MyComponent/MyComponent.test.tsx
```

## Architecture

### Library (`package/src/`)

- **`index.ts`** — re-exports all subdirectories: `./theme`, `./components`, `./icons`, `./hooks`, `./utils`, `./types`
- **`theme/theme.ts`** — assembles `createTheme({ components })` and exports `resolver`; imports from `./components` and `./variables` — keep this file minimal
- **`theme/components/`** — one directory per overridden Mantine base component (`Button/`, `TextInput/`, …); each contains a `*.theme.ts` (exports the component override object) and a `*.module.css` (classes injected via `classNames`); `index.ts` merges all overrides into a single `components` object
- **`theme/variables/`** — CSS variables resolver split by domain (`colors.ts`, `spacing.ts`, …); `index.ts` exports the assembled `resolver`
- **`theme/Providers/PublicThemeProvider.tsx`** — wraps `MantineProvider` with the Materia theme; accepts optional `customTheme` for consumer overrides; uses `classNamesPrefix="onoko"`

> `theme/components/` (Mantine base overrides) is distinct from `src/components/` (custom components).

- **`styles.css`** — entry point for package styles; imports `assets/styles/layers.css`
- **`assets/styles/layers.css`** — declares CSS cascade layers: `mantine, custom, override, custom-override, app`
- **`components/`** — one directory per component
- **`icons/`** — SVG icon components
- **`hooks/`**, **`utils/`**, **`types/`** — global hooks, utility functions, and shared TypeScript types

### Component structure (follow for new components)

Each component lives in `package/src/components/<ComponentName>/`:

```text
ComponentName.tsx          # component implementation
ComponentName.module.css   # CSS modules styles
ComponentName.story.tsx    # Storybook story
ComponentName.test.tsx     # Jest + @mantine-tests/core tests
index.ts                   # re-exports from ComponentName.tsx
```

Components use Mantine's factory pattern: `polymorphicFactory` / `factory`, `useProps`, `useStyles`, `createVarsResolver`, `StylesApiProps`. Export `*StylesNames` and `*CssVariables` types alongside the component.

### Build pipeline

Rollup compiles `package/src/index.ts` → `package/dist/{esm,cjs}/`. CSS modules are extracted and minimized; scoped names are hashed via `hash-css-selector` with prefix `me`. `prepare-css` script generates the layered `styles.layer.css` variant.

### Documentation (`docs/`)

- `docs/docgen.json` — auto-generated props docs (run `npm run docgen` after changing component props)
- `docs/data.ts` — navigation/page registry; register new component pages here
- `docs/demos/` — interactive demos embedded in MDX pages (`*.demo.usage.tsx`, `*.demo.configurator.tsx`)
- `docs/styles-api/` — styles API tables for each component
- `docs/pages/_app.tsx` — applies the Materia theme to the docs site via `PublicThemeProvider`

After adding a new component: update `scripts/docgen.ts` with the component path, run `npm run docgen`, add an entry to `docs/data.ts`, create demo files and a styles-api file.

### Testing

Tests use `@mantine-tests/core` helpers (`tests.itSupportsSystemProps`) which cover polymorphism, style props, variants, sizes, classNames, refs, and displayName in one call. Always include this block for new components.

CSS modules are mocked by `identity-obj-proxy` in Jest.

### Releases

```bash
npm run release:patch   # bump patch, publish npm, deploy docs
npm run release:minor
npm run release:major
```

Publishable package is `package/package.json` (`@0n0k0/materia`). Root `package.json` is not published.
