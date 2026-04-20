# AGENTS.md

## Working agreement for AI agents

This repository already has a real structure and real conventions. Follow them before inventing new ones.

## Stack and runtime

- React 19
- TypeScript 5
- Vite 8
- React Router 7
- Axios
- React Hook Form + Zod
- Tailwind CSS
- Vitest + Playwright

## High-signal facts

- Entry file: `src/index.tsx`
- Env variable prefix: `REACT_APP_`
- Backend base URL variable: `REACT_APP_BACKEND_REST_API_URL`
- Build output directory: `build/`
- Main route wiring: `src/App.tsx`
- Route constants and API endpoints: `src/constants/index.ts`
- Auth state and persistence:
  - `src/context/AuthContext.tsx`
  - `src/services/AuthService.ts`
  - `src/utils/storage.ts`
  - `src/axiosConfig.ts`
- Current API calling pattern:
  - `src/services/ApiService.ts`
  - `src/hooks/useApi.ts`

## Do this

- Read the minimum relevant files first.
- Reuse existing abstractions.
- Keep changes narrow.
- Keep types strict.
- Keep endpoint and route constants centralized.
- Prefer concrete diffs over large rewrites.

## Avoid this

- Do not assume CRA or Next.js conventions.
- Do not switch env names to `VITE_*`.
- Do not claim the build output is `dist/`.
- Do not migrate the app to React Query, Redux, Zustand, or a different router style unless explicitly asked.
- Do not trust older docs over current code.

## Start here for more detail

- `docs/ai/repo-overview.md`
- `docs/ai/api-surface.md`
- `docs/ai/token-efficient-workflow.md`
- `docs/ai/truth-sources-and-known-drifts.md`
- `docs/ai/repo-context.json`
