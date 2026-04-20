# CLAUDE.md

This file gives high-signal context for AI coding agents working in **Shorty URL Frontend**.

## Goal

Make correct, minimal, repo-consistent changes with as little token waste as possible.

## Project snapshot

- Frontend app: React 19 + TypeScript 5 + Vite 8
- Router: `react-router-dom` 7
- Forms: `react-hook-form` + `zod`
- HTTP: `axios`
- Auth state: `AuthContext` + `AuthService` + `storage`
- Styling: Tailwind CSS
- Tests: Vitest + Testing Library + Playwright
- Package manager: npm

## Truth sources, in order

When docs disagree, trust sources in this order:

1. Current code under `src/`
2. Config files such as `package.json`, `vite.config.ts`, `tsconfig.json`
3. Constants and types in `src/constants` and `src/types`
4. `README.md`
5. Older feature docs under `docs/features`

## Non-negotiable repo facts

- App entry point is `src/index.tsx`, not `src/main.tsx`.
- The app uses Vite, but environment variables are intentionally read as `REACT_APP_*` because `vite.config.ts` sets `envPrefix: 'REACT_APP_'`.
- Required backend base URL: `REACT_APP_BACKEND_REST_API_URL`.
- Build output directory is `build/`, not `dist/`.
- Current API flow is centered on:
  - `src/services/ApiService.ts`
  - `src/axiosConfig.ts`
  - `src/hooks/useApi.ts`
- Current auth flow is centered on:
  - `src/context/AuthContext.tsx`
  - `src/services/AuthService.ts`
  - `src/utils/storage.ts`
- Tokens are currently persisted via `storage.ts`. Do not assume "memory-only access token" without checking code.
- Routes are defined in `src/constants/index.ts` and wired in `src/App.tsx`.
- Prefer the existing custom `useApi` + `axios` pattern for incremental work.
- Do not introduce Redux, Zustand, React Query migrations, Next.js patterns, or global refactors unless the task explicitly asks for them.
- Keep TypeScript strictness intact.

## Read only the minimum relevant files first

### If task is about authentication
Read:
- `src/components/SignIn.tsx`
- `src/components/SignUp.tsx`
- `src/context/AuthContext.tsx`
- `src/services/AuthService.ts`
- `src/services/ApiService.ts`
- `src/axiosConfig.ts`
- `src/utils/storage.ts`
- `src/utils/validation.ts`
- `src/types/index.ts`
- `src/constants/index.ts`

### If task is about URL creation or dashboard flows
Read:
- `src/components/UrlShortener.tsx`
- `src/components/UserUrlMappings.tsx`
- `src/components/UrlMappingDetails.tsx`
- `src/components/Dashboard.tsx`
- `src/services/ApiService.ts`
- `src/hooks/useApi.ts`
- `src/types/index.ts`
- `src/constants/index.ts`

### If task is about routes or navigation
Read:
- `src/App.tsx`
- `src/constants/index.ts`
- `src/layouts/MainLayout.tsx`
- relevant page or component files

### If task is about forms or validation
Read:
- relevant component file
- `src/utils/validation.ts`
- `src/types/index.ts`
- `src/constants/index.ts`
- relevant UI input component

### If task is about styling or shared UI
Read:
- relevant component
- `src/components/ui/*`
- `src/index.css`

## Change strategy

- Make the smallest correct change.
- Reuse existing constants, types, hooks, and services.
- Keep endpoint paths in `src/constants/index.ts`.
- Keep API calls in `src/services/ApiService.ts` unless there is a strong reason not to.
- Keep auth persistence logic centralized in `storage.ts` / `AuthService.ts`.
- Prefer updating an existing abstraction over adding a second competing abstraction.
- Do not rename files or reorganize directories unless the task explicitly requires it.

## Output strategy

When proposing or making changes:

- Show only the files that actually change.
- Use patch-style thinking.
- Avoid repeating large file contents that are not modified.
- Avoid re-explaining repo basics if they are already captured here.
- Group related edits by purpose.
- Call out any doc drift if it affects the task.

## Important known drift

Before relying on docs under `docs/features`, verify against code. There is drift between some docs and the current implementation. See `docs/ai/truth-sources-and-known-drifts.md`.

## Commands

```bash
npm install
npm run dev
npm run build
npm run test
npm run type-check
npm run test:e2e
```
